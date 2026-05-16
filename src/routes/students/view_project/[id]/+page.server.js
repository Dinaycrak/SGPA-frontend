import { fail } from '@sveltejs/kit';
import { PROFILE_USER_IDS } from '$lib/components/Tokens.js';
import {
  getProjectDetails,
  enrollStudentInProject,
  ROLE_IDS
} from '$lib/server/project-helpers.js';

const CURRENT_STUDENT_ID = Number(PROFILE_USER_IDS.students || PROFILE_USER_IDS.student || 37);

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params, url }) {
  const projectId = Number(params.id);
  const source = url.searchParams.get('source') || 'available';

  if (!projectId) {
    return {
      error: 'Invalid project ID.',
      projectId: params.id,
      currentStudentId: CURRENT_STUDENT_ID,
      source
    };
  }

  try {
    const details = await getProjectDetails(fetch, 'students', projectId);
    const isEnrolled = details.relations.some(
      (relation) =>
        Number(relation.id_project) === projectId &&
        Number(relation.id_user) === CURRENT_STUDENT_ID &&
        Number(relation.id_role) === ROLE_IDS.student
    );

    return {
      ...details,
      projectId,
      source,
      currentStudentId: CURRENT_STUDENT_ID,
      isEnrolled
    };
  } catch (error) {
    return {
      projectId,
      source,
      currentStudentId: CURRENT_STUDENT_ID,
      error: error.message || 'Could not load project details.'
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  enroll: async ({ fetch, params }) => {
    const projectId = Number(params.id);

    if (!projectId) {
      return fail(400, { error: 'Invalid project.' });
    }

    if (!CURRENT_STUDENT_ID) {
      return fail(400, { error: 'Invalid student.' });
    }

    try {
      const result = await enrollStudentInProject(fetch, projectId, CURRENT_STUDENT_ID);

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