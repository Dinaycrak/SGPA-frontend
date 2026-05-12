import {
  getProjects,
  getUsers,
  getProjectUsers,
  ROLE_IDS,
  getStatusLabel,
  getUserFullName
} from '$lib/server/project-helpers.js';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, users, relations] = await Promise.all([
      getProjects(fetch, 'coordinator'),
      getUsers(fetch, 'coordinator'),
      getProjectUsers(fetch, 'coordinator').catch(() => [])
    ]);

    const usersMap = new Map(
      users.map((user) => [Number(user.id_user), user])
    );

    const teacherByProject = new Map();

    for (const relation of relations) {
      if (Number(relation.id_role) === ROLE_IDS.teacher) {
        teacherByProject.set(
          Number(relation.id_project),
          Number(relation.id_user)
        );
      }
    }

    const rows = projects.map((project) => {
      const teacherId = teacherByProject.get(Number(project.id_project));
      const teacher = teacherId ? usersMap.get(teacherId) : null;

      const projectName = escapeHtml(project.project_name ?? 'Unnamed');
      const description = escapeHtml(project.description ?? 'No description');
      const startDate = escapeHtml(project.start_date ?? 'Not defined');
      const status = escapeHtml(getStatusLabel(project.id_status));
      const teacherName = escapeHtml(
        teacher ? getUserFullName(teacher) : 'Unassigned'
      );

      return {
        proyecto_card: `
          <div class="project-card">
            <div class="project-card__left">
              <div class="project-card__icon">📁</div>

              <div class="project-card__content">
                <h3>${projectName}</h3>
                <p>${description}</p>

                <div class="project-card__meta">
                  <span><strong>Start date:</strong> ${startDate}</span>
                  <span><strong>Status:</strong> ${status}</span>
                  <span><strong>Teacher:</strong> ${teacherName}</span>
                </div>
              </div>
            </div>

            <div class="project-card__right">
              <span class="neutral-badge">Coordinator management</span>
            </div>
          </div>
        `
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