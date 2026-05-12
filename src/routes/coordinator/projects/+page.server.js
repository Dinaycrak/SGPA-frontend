import {
  getProjects,
  getUsers,
  getProjectUsers,
  ROLE_IDS,
  getStatusLabel,
  getUserFullName
} from '$lib/server/project-helpers.js';

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

      return {
        proyecto_card: `
          <div class="project-card">
            <div class="project-card__left">
              <div class="project-card__icon">📁</div>
              <div class="project-card__content">
                <h3>${project.project_name ?? 'Unnamed'}</h3>
                <p>${project.description ?? 'No description'}</p>
                <div class="project-card__meta">
                  <span><strong>Start date:</strong> ${project.start_date ?? 'Not defined'}</span>
                  <span><strong>Status:</strong> ${getStatusLabel(project.id_status)}</span>
                  <span><strong>Teacher:</strong> ${teacher ? getUserFullName(teacher) : 'Unassigned'}</span>
                </div>
              </div>
            </div>
            <div class="project-card__right">
              <span class="neutral-badge">Gestión coordinador</span>
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