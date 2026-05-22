import { getProjectsReport } from '$lib/server/report-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
  try {
    const report = await getProjectsReport({
      fetch,
      locals,
      moduleName: 'teacher',
      scope: 'all',
      title: 'Teacher available projects report',
      subtitle:
        'Report of academic projects visible from the teacher module, including project status, assigned teacher, and enrolled students.'
    });

    return { report };
  } catch (error) {
    return {
      error: error.message || 'Could not generate teacher projects report.',
      report: {
        title: 'Teacher available projects report',
        subtitle: 'Report of visible academic projects.',
        projects: []
      }
    };
  }
}