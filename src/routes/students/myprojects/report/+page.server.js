import { getProjectsReport } from '$lib/server/report-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
  try {
    const report = await getProjectsReport({
      fetch,
      locals,
      moduleName: 'students',
      scope: 'student_mine',
      title: 'Student enrolled projects report',
      subtitle:
        'Report of academic projects where the logged-in student is registered as a participant.'
    });

    return { report };
  } catch (error) {
    return {
      error: error.message || 'Could not generate student projects report.',
      report: {
        title: 'Student enrolled projects report',
        subtitle: 'Report of enrolled academic projects.',
        projects: []
      }
    };
  }
}