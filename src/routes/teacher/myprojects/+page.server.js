import { getProjects, getStatusLabel } from '$lib/server/project-helpers.js';
import { API_BASE_URL, getAuthHeaders, PROFILE_USER_IDS } from '$lib/components/Tokens.js';

const CURRENT_TEACHER_ID = Number(PROFILE_USER_IDS.teacher || 39);

function normalizeProjectUser(item) {
  if (Array.isArray(item)) {
    return {
      id_project_user: item[0] ?? null,
      id_project: item[1] ?? null,
      id_user: item[2] ?? null,
      id_role: item[3] ?? null,
      assigned_date: item[4] ?? null
    };
  }

  return {
    id_project_user: item?.id_project_user ?? item?.id ?? null,
    id_project: item?.id_project ?? null,
    id_user: item?.id_user ?? null,
    id_role: item?.id_role ?? null,
    assigned_date: item?.assigned_date ?? null
  };
}

async function getProjectUsersDirect(fetch) {
  const response = await fetch(`${API_BASE_URL}/project-users`, {
    headers: getAuthHeaders('teacher')
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(`No se pudo obtener project-users. Estado ${response.status}. ${text}`);
  }

  return Array.isArray(data) ? data.map(normalizeProjectUser) : [];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, relations] = await Promise.all([
      getProjects(fetch, 'teacher'),
      getProjectUsersDirect(fetch)
    ]);

    const myProjectIds = new Set(
      relations
        .filter(
          (relation) =>
            Number(relation.id_user) === CURRENT_TEACHER_ID &&
            Number(relation.id_role) === 3
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
      error: error.message || 'No se pudieron cargar los proyectos del profesor'
    };
  }
}