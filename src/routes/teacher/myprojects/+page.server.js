<<<<<<< HEAD
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

=======
>>>>>>> main
/** @type {import('./$types').PageServerLoad} */
import { API_BASE_URL, getAuthHeaders } from "../../../lib/components/Tokens";

export async function load({ fetch }) {
<<<<<<< HEAD
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
=======
    const API_URL = `${API_BASE_URL}/projects`;

    try {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders("teacher")
        });

        if (response.status === 401) {
            return {
                projects: [],
                error: "Sesión expirada o no autorizada."
            };
        }
>>>>>>> main

        if (!response.ok) {
            return {
                projects: [],
                error: `Error de API: ${response.status}`
            };
        }

        const data = await response.json();
        const projectsData = Array.isArray(data) ? data : [];

        const projects = projectsData.map((p) => ({
            id_project: p[0],
            project_name: p[1],
            description: p[2],
            start_date: p[3],
            id_status: p[5]
        }));

        return { projects };
    } catch (error) {
        return {
            projects: [],
            error: "No se pudo conectar con el servidor de proyectos."
        };
    }
}