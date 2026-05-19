import { fail } from '@sveltejs/kit';
import {
  getProjectDetails,
  enrollStudentInProject,
  ROLE_IDS
} from '$lib/server/project-helpers.js';

function getCurrentStudentId(locals) {
  return Number(locals?.session?.user?.id_user || 0);
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params, url, locals }) {
  const projectId = Number(params.id);
  const source = url.searchParams.get('source') || 'available';
  const currentStudentId = getCurrentStudentId(locals);

  if (!currentStudentId) {
    return {
      error: 'Could not identify the logged-in student.',
      projectId: params.id,
      currentStudentId,
      source
    };
  }

  if (!projectId) {
    return {
      error: 'Invalid project ID.',
      projectId: params.id,
      currentStudentId,
      source
    };
  }

  try {
    const details = await getProjectDetails(fetch, 'students', projectId);

    const isEnrolled = details.relations.some(
      (relation) =>
        Number(relation.id_project) === projectId &&
        Number(relation.id_user) === currentStudentId &&
        Number(relation.id_role) === ROLE_IDS.student
    );

    return {
      ...details,
      projectId,
      source,
      currentStudentId,
      isEnrolled
    };
  } catch (error) {
    return {
      projectId,
      source,
      currentStudentId,
      error: error.message || 'Could not load project details.'
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  enroll: async ({ fetch, params, locals }) => {
    const projectId = Number(params.id);
    const currentStudentId = getCurrentStudentId(locals);

    if (!projectId) {
      return fail(400, {
        error: 'Invalid project.'
      });
    }

    if (!currentStudentId) {
      return fail(400, {
        error: 'Could not identify the logged-in student.'
      });
    }

    try {
      const result = await enrollStudentInProject(fetch, projectId, currentStudentId);

      return {
        success: true,
        message: result?.alreadyExists
          ? 'You were already enrolled in this project.'
          : 'Enrollment completed successfully.'
      };
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not enroll in this project.'
      });
    }
  }
};