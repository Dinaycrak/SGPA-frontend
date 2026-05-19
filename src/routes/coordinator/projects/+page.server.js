import {
  getProjects,
  getUsers,
  getProjectUsers,
  getStatuses,
  ROLE_IDS,
  getStatusLabel,
  getUserFullName,
  buildProjectCardHtml
} from '$lib/server/project-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, users, relations, statuses] = await Promise.all([
      getProjects(fetch, 'coordinator'),
      getUsers(fetch, 'coordinator'),
      getProjectUsers(fetch, 'coordinator').catch(() => []),
      getStatuses(fetch, 'coordinator')
    ]);

    const usersMap = new Map(users.map((user) => [Number(user.id_user), user]));
    const teacherByProject = new Map();

    for (const relation of relations) {
      if (Number(relation.id_role) === ROLE_IDS.teacher) {
        teacherByProject.set(Number(relation.id_project), Number(relation.id_user));
      }
    }

    const rows = projects.map((project) => {
      const teacherId = teacherByProject.get(Number(project.id_project));
      const teacher = teacherId ? usersMap.get(Number(teacherId)) : null;

      return {
        proyecto_card: buildProjectCardHtml({
          project,
          statusLabel: getStatusLabel(project.id_status, statuses),
          teacherName: teacher ? getUserFullName(teacher) : 'Unassigned',
          actionHref: `/coordinator/view_project/${project.id_project}`,
          actionLabel: 'Manage project',
          badgeLabel: teacher ? 'Teacher assigned' : 'Needs teacher',
          badgeClass: teacher ? 'joined-badge' : 'neutral-badge'
        })
      };
    });

    return {
      rows,
      totalProjects: projects.length
    };
  } catch (error) {
    return {
      rows: [],
      totalProjects: 0,
      error: error.message || 'Could not load projects.'
    };
  }
}