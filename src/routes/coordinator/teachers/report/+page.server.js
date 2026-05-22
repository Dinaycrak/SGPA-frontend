import { getCoordinatorUsersReport } from '$lib/server/coordinator-user-report-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
  try {
    const report = await getCoordinatorUsersReport({
      fetch,
      locals,
      userType: 'teachers'
    });

    return { report };
  } catch (error) {
    return {
      error: error.message || 'Could not generate teachers report.',
      report: {
        title: 'Teachers report',
        subtitle: 'Coordinator report of teacher accounts.',
        users: []
      }
    };
  }
}