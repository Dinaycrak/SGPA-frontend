import { fail } from '@sveltejs/kit';
import {
  getProjectDetails,
  assignTeacherToProject,
  updateProjectStatus,
  getStatuses
} from '$lib/server/project-helpers.js';

function isCancelledStatus(statusId, statuses = []) {
  const selectedStatus = statuses.find(
    (status) => Number(status.id_status) === Number(statusId)
  );

  const name = String(selectedStatus?.status_name || '').trim().toLowerCase();

  return (
    Number(statusId) === 4 ||
    name === 'cancelled' ||
    name === 'canceled' ||
    name === 'cancelado'
  );
}

function getCancelledStatusId(statuses = []) {
  const status = statuses.find((item) => {
    const name = String(item.status_name || '').trim().toLowerCase();

    return (
      Number(item.id_status) === 4 ||
      name === 'cancelled' ||
      name === 'canceled' ||
      name === 'cancelado'
    );
  });

  return Number(status?.id_status || 4);
}

function getActiveStatusId(statuses = []) {
  const status = statuses.find((item) => {
    const name = String(item.status_name || '').trim().toLowerCase();

    return Number(item.id_status) === 1 || name === 'active' || name === 'activo';
  });

  return Number(status?.id_status || 1);
}

function filterStatusesForCoordinatorSelector(statuses = []) {
  return statuses.filter((status) => !isCancelledStatus(status.id_status, statuses));
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
  const projectId = Number(params.id);

  if (!projectId) {
    return {
      projectId: params.id,
      actionStatuses: [],
      isProjectCancelled: false,
      error: 'Invalid project ID.'
    };
  }

  try {
    const details = await getProjectDetails(fetch, 'coordinator', projectId);
    const isProjectCancelled = isCancelledStatus(details.project?.id_status, details.statuses);

    return {
      ...details,
      projectId,
      actionStatuses: filterStatusesForCoordinatorSelector(details.statuses),
      isProjectCancelled
    };
  } catch (error) {
    return {
      projectId,
      actionStatuses: [],
      isProjectCancelled: false,
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
      const statuses = await getStatuses(fetch, 'coordinator');

      if (isCancelledStatus(statusId, statuses)) {
        return fail(403, {
          error: 'Use the Cancel project button to cancel a project.'
        });
      }

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

  cancelProject: async ({ fetch, params }) => {
    const projectId = Number(params.id);

    if (!projectId) {
      return fail(400, {
        error: 'Invalid project.'
      });
    }

    try {
      const statuses = await getStatuses(fetch, 'coordinator');
      const cancelledStatusId = getCancelledStatusId(statuses);

      await updateProjectStatus(fetch, projectId, cancelledStatusId);

      return {
        success: true,
        message: 'Project cancelled successfully.'
      };
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not cancel project.'
      });
    }
  },

  reactivateProject: async ({ fetch, params }) => {
    const projectId = Number(params.id);

    if (!projectId) {
      return fail(400, {
        error: 'Invalid project.'
      });
    }

    try {
      const statuses = await getStatuses(fetch, 'coordinator');
      const activeStatusId = getActiveStatusId(statuses);

      await updateProjectStatus(fetch, projectId, activeStatusId);

      return {
        success: true,
        message: 'Project reactivated successfully.'
      };
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not reactivate project.'
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