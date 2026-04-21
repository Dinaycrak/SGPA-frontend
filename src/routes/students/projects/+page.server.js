import { fail } from '@sveltejs/kit';
import {
  getProjects,
  getProjectUsers,
  assignUserToProject,
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

    const myJoinedProjects = new Set(
      relations
        .filter(
          (relation) =>
            Number(relation.id_user) === currentStudentId &&
            Number(relation.id_role) === ROLE_IDS.student
        )
        .map((relation) => Number(relation.id_project))
    );

    const rows = projects.map((project) => {
      const alreadyJoined = myJoinedProjects.has(Number(project.id_project));

      const actionHtml = alreadyJoined
        ? `<span class="joined-badge">Ya inscrito</span>`
        : `
          <form method="POST" class="inline-form">
            <input type="hidden" name="id_project" value="${project.id_project}">
            <button type="submit" class="action-btn">Ingresar al proyecto</button>
          </form>
        `;

      return {
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
              ${actionHtml}
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
      error: error.message || 'Error al cargar proyectos disponibles'
    };
  }
}

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const idProject = Number(formData.get('id_project'));

    if (!idProject) {
      return fail(400, { error: 'Proyecto inválido.' });
    }

    try {
      const relations = await getProjectUsers(fetch, 'students').catch(() => []);
      const studentId = Number(getModuleUserId('students'));

      const alreadyExists = relations.some(
        (relation) =>
          Number(relation.id_project) === idProject &&
          Number(relation.id_user) === studentId &&
          Number(relation.id_role) === ROLE_IDS.student
      );

      if (!alreadyExists) {
        await assignUserToProject(fetch, 'students', {
          id_project: idProject,
          id_user: studentId,
          id_role: ROLE_IDS.student
        });
      }

      return { success: true };
    } catch (error) {
      return fail(500, {
        error: error.message || 'No se pudo registrar al estudiante en el proyecto.'
      });
    }
  }
};