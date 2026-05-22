import { getCoordinatorUsersReport } from '$lib/server/coordinator-user-report-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
  try {
    const report = await getCoordinatorUsersReport({
      fetch,
      locals,
      userType: 'students'
    });

    return { report };
  } catch (error) {
    return {
      error: error.message || 'Could not generate students report.',
      report: {
        title: 'Students report',
        subtitle: 'Coordinator report of student accounts.',
        users: []
      }
    };
  }
}