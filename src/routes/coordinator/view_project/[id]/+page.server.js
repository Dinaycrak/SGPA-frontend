import { fail } from '@sveltejs/kit';
import {
  getProjectDetails,
  assignTeacherToProject,
  updateProjectStatus
} from '$lib/server/project-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
  const projectId = Number(params.id);

  if (!projectId) {
    return {
      projectId: params.id,
      error: 'Invalid project ID.'
    };
  }

  try {
    const details = await getProjectDetails(fetch, 'coordinator', projectId);

    return {
      ...details,
      projectId
    };
  } catch (error) {
    return {
      projectId,
      error: error.message || 'Could not load project details.'
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  updateStatus: async ({ request, fetch, params }) => {
    const projectId = Number(params.id);
    const formData = await request.formData();
    const statusId = Number(formData.get('statusId'));

    if (!projectId) {
      return fail(400, {
        error: 'Invalid project.'
      });
    }

    if (!statusId) {
      return fail(400, {
        error: 'Select a valid status.'
      });
    }

    try {
      await updateProjectStatus(fetch, projectId, statusId);

      return {
        success: true,
        message: 'Project status updated successfully.'
      };
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not update project status.'
      });
    }
  },

  assignTeacher: async ({ request, fetch, params }) => {
    const projectId = Number(params.id);
    const formData = await request.formData();
    const teacherId = Number(formData.get('teacherId'));

    if (!projectId) {
      return fail(400, {
        error: 'Invalid project.'
      });
    }

    if (!teacherId) {
      return fail(400, {
        error: 'Select a valid teacher.'
      });
    }

    try {
      const result = await assignTeacherToProject(fetch, projectId, teacherId);

      return {
        success: true,
        message: result?.alreadyAssigned
          ? 'This teacher is already assigned to the project.'
          : 'Teacher assigned successfully.'
      };
    } catch (error) {
      return fail(500, {
        error:
          error.message ||
          'Could not assign teacher. The backend may need PUT/DELETE support for project-users.'
      });
    }
  }
};