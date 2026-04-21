import {
  getProjects,
  getProjectUsers,
  ROLE_IDS,
  getModuleUserId,
  getStatusLabel
} from '$lib/server/project-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, relations] = await Promise.all([
      getProjects(fetch, 'students'),
      getProjectUsers(fetch, 'students').catch(() => [])
    ]);

    const currentStudentId = Number(getModuleUserId('students'));

    const myProjectIds = new Set(
      relations
        .filter(
          (relation) =>
            Number(relation.id_user) === currentStudentId &&
            Number(relation.id_role) === ROLE_IDS.student
        )
        .map((relation) => Number(relation.id_project))
    );

    const rows = projects
      .filter((project) => myProjectIds.has(Number(project.id_project)))
      .map((project) => ({
        proyecto_card: `
          <div class="project-card">
            <div class="project-card__left">
              <div class="project-card__icon">📁</div>
              <div class="project-card__content">
                <h3>${project.project_name ?? 'Sin nombre'}</h3>
                <p>${project.description ?? 'Sin descripción'}</p>
                <div class="project-card__meta">
                  <span><strong>Fecha de inicio:</strong> ${project.start_date ?? 'No definida'}</span>
                  <span><strong>Estado:</strong> ${getStatusLabel(project.id_status)}</span>
                </div>
              </div>
            </div>
            <div class="project-card__right">
              <span class="joined-badge">Mi proyecto</span>
            </div>
          </div>
        `
      }));

    return {
      rows,
      totalProjects: rows.length
    };
  } catch (error) {
    return {
      rows: [],
      totalProjects: 0,
      error: error.message || 'No se pudieron cargar los proyectos del estudiante'
    };
  }
}