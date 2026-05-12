import { fail } from '@sveltejs/kit';
import {
  getProjects,
  getProjectUsers,
  assignUserToProject,
  ROLE_IDS,
  getModuleUserId,
  getStatusLabel
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
            <input type="hidden" name="id_project" value="${escapeHtml(project.id_project)}">
            <button type="submit" class="action-btn">Enter project</button>
          </form>
        `;

      return {
        proyecto_card: `
          <div class="project-card">
            <div class="project-card__left">
              <div class="project-card__icon">📁</div>
              <div class="project-card__content">
                <h3>${escapeHtml(project.project_name || 'Unnamed')}</h3>
                <p>${escapeHtml(project.description || 'No description')}</p>
                <div class="project-card__meta">
                  <span><strong>Start date:</strong> ${escapeHtml(project.start_date || 'Not defined')}</span>
                  <span><strong>Status:</strong> ${escapeHtml(getStatusLabel(project.id_status))}</span>
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
      error: error.message || 'Error loading available projects'
    };
  }
}

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const idProject = Number(formData.get('id_project'));

    if (!idProject) {
      return fail(400, { error: 'Invalid project.' });
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

      return {
        success: true,
        message: 'The student was successfully enrolled in the project.'
      };
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not enroll the student in the project.'
      });
    }
  }
};