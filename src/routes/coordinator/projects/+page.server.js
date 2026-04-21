<<<<<<< HEAD
import {
  getProjects,
  getUsers,
  getStatusLabel,
  getUserFullName
} from '$lib/server/project-helpers.js';

import { API_BASE_URL, getAuthHeaders } from '$lib/components/Tokens.js';

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
    headers: getAuthHeaders('coordinator')
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
    const [projects, users, relations] = await Promise.all([
      getProjects(fetch, 'coordinator'),
      getUsers(fetch, 'coordinator'),
      getProjectUsersDirect(fetch)
    ]);

    const usersMap = new Map(users.map((user) => [Number(user.id_user), user]));
    const teacherByProject = new Map();

    for (const relation of relations) {
      if (Number(relation.id_role) === 3) {
        teacherByProject.set(Number(relation.id_project), Number(relation.id_user));
      }
    }

    const rows = projects.map((project) => {
      const teacherId = teacherByProject.get(Number(project.id_project));
      const teacher = teacherId ? usersMap.get(Number(teacherId)) : null;

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
                  <span><strong>Docente:</strong> ${teacher ? getUserFullName(teacher) : 'Sin asignar'}</span>
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
      error: error.message || 'No se pudieron obtener los proyectos.'
    };
  }
=======
    const API_URL = `${API_BASE_URL}/projects`;

    const statusMap = {
        1: "Activo",
        2: "Completado",
        3: "Pendiente"
    };

    try {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders("coordinator")
        });

        if (response.status === 401) {
            return {
                projects: [],
                error: "Sesión expirada o no autorizada."
            };
        }

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
            status: statusMap[p[5]] || "Desconocido"
        }));

        return { projects };
    } catch (error) {
        return {
            projects: [],
            error: "Error de conexión con el servidor."
        };
    }
>>>>>>> main
}