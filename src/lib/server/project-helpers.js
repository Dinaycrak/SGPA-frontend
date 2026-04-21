import { API_BASE_URL, getAuthHeaders, PROFILE_USER_IDS } from '$lib/components/Tokens.js';

export const ROLE_IDS = {
  student: 1,
  coordinator: 2,
  teacher: 3
};

const PROJECT_USER_CANDIDATES = [
  'project_users',
  'project-user',
  'project_user',
  'projectusers',
  'project-users'
];

export function normalizeProject(project) {
  if (Array.isArray(project)) {
    return {
      id_project: project[0] ?? null,
      project_name: project[1] ?? '',
      description: project[2] ?? '',
      start_date: project[3] ?? '',
      end_date: project[4] ?? '',
      id_status: project[5] ?? null,
      id_research_group: project[6] ?? null,
      created_by: project[7] ?? null
    };
  }

  return {
    id_project: project?.id_project ?? project?.id ?? null,
    project_name: project?.project_name ?? '',
    description: project?.description ?? '',
    start_date: project?.start_date ?? '',
    end_date: project?.end_date ?? '',
    id_status: project?.id_status ?? null,
    id_research_group: project?.id_research_group ?? null,
    created_by: project?.created_by ?? null
  };
}

export function normalizeUser(user) {
  return {
    id_user: user?.id_user ?? user?.id ?? null,
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    email: user?.email ?? '',
    id_role: user?.id_role ?? null,
    is_active: user?.is_active ?? false
  };
}

export function normalizeProjectUser(item) {
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

export function getStatusLabel(idStatus) {
  const map = {
    1: 'Activo',
    2: 'Completado',
    3: 'Pendiente'
  };

  return map[idStatus] ?? 'Desconocido';
}

export function getUserFullName(user) {
  return `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
}

export async function getProjects(fetch, moduleName = 'coordinator') {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    headers: getAuthHeaders(moduleName)
  });

  if (!response.ok) {
    throw new Error(`No se pudieron obtener los proyectos. Estado ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeProject) : [];
}

export async function getUsers(fetch, moduleName = 'coordinator') {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: getAuthHeaders(moduleName)
  });

  if (!response.ok) {
    throw new Error(`No se pudieron obtener los usuarios. Estado ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeUser) : [];
}

export async function resolveProjectUserEndpoint(fetch, moduleName = 'coordinator') {
  const headers = getAuthHeaders(moduleName);

  for (const candidate of PROJECT_USER_CANDIDATES) {
    const url = `${API_BASE_URL}/${candidate}`;

    try {
      const response = await fetch(url, { headers });

      if (response.ok || response.status === 405 || response.status === 401) {
        return url;
      }
    } catch (_) {
    }
  }

  return `${API_BASE_URL}/project_users`;
}

export async function getProjectUsers(fetch, moduleName = 'coordinator') {
  const url = await resolveProjectUserEndpoint(fetch, moduleName);

  const response = await fetch(url, {
    headers: getAuthHeaders(moduleName)
  });

  if (!response.ok) {
    throw new Error(`No se pudo obtener project_user. Estado ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeProjectUser) : [];
}

export async function assignUserToProject(fetch, moduleName, payload) {
  const url = await resolveProjectUserEndpoint(fetch, moduleName);

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(moduleName),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`No se pudo registrar en project_user. Estado ${response.status}. ${text}`);
  }

  return response.json().catch(() => null);
}

export function findLatestMatchingProject(projects, payload) {
  return projects
    .filter(
      (project) =>
        project.project_name === payload.project_name &&
        project.start_date === payload.start_date &&
        Number(project.created_by) === Number(payload.created_by)
    )
    .sort((a, b) => Number(b.id_project) - Number(a.id_project))[0] ?? null;
}

export function getModuleUserId(moduleName) {
  return PROFILE_USER_IDS[moduleName];
}