import { API_BASE_URL, getAuthHeaders, PROFILE_USER_IDS } from '$lib/components/Tokens.js';

export const ROLE_IDS = {
  student: 1,
  coordinator: 2,
  teacher: 3
};

const PROJECT_USER_CANDIDATES = [
  'project-users',
  'project_users',
  'project-user',
  'project_user',
  'projectusers'
];

function getApiUrl(path) {
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`;
}

function parseJson(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (_) {
    return text;
  }
}

async function requestJson(fetch, path, moduleName = 'coordinator', options = {}) {
  const url = getApiUrl(path);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(moduleName),
      ...(options.headers || {})
    }
  });

  const text = await response.text().catch(() => '');
  const data = parseJson(text);

  if (!response.ok) {
    const error = new Error(
      `No se pudo consultar ${path}. Estado ${response.status}. ${
        typeof data === 'string' ? data : JSON.stringify(data ?? '')
      }`
    );

    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

async function requestJsonWithReadFallback(fetch, path, moduleName = 'coordinator', options = {}) {
  const modulesToTry = [moduleName];

  if (moduleName !== 'coordinator') {
    modulesToTry.push('coordinator');
  }

  let lastError;

  for (const moduleToTry of modulesToTry) {
    try {
      return await requestJson(fetch, path, moduleToTry, options);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function extractList(data, keys = []) {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.rows)) return data.rows;

  return [];
}

export function normalizeActiveStatus(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;

  const normalized = String(value ?? '').trim().toLowerCase();

  if (['true', '1', 'activo', 'active', 'yes', 'si', 'sí'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'inactivo', 'inactive', 'no', 'null', 'undefined', ''].includes(normalized)) {
    return false;
  }

  return Boolean(value);
}

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
      created_by: project[7] ?? null,
      raw: project
    };
  }

  return {
    id_project: project?.id_project ?? project?.id ?? null,
    project_name: project?.project_name ?? project?.name ?? '',
    description: project?.description ?? '',
    start_date: project?.start_date ?? '',
    end_date: project?.end_date ?? '',
    id_status: project?.id_status ?? project?.status_id ?? null,
    id_research_group: project?.id_research_group ?? null,
    created_by: project?.created_by ?? null,
    raw: project
  };
}

export function normalizeUser(user) {
  if (Array.isArray(user)) {
    return {
      id_user: user[0] ?? null,
      first_name: user[1] ?? '',
      last_name: user[2] ?? '',
      email: user[3] ?? '',
      phone: user[4] ?? '',
      phone_number: user[4] ?? '',
      password_hash: user[5] ?? '',
      id_role: user[6] ?? user[5] ?? null,
      is_active: normalizeActiveStatus(user[7] ?? user[6] ?? false),
      raw: user
    };
  }

  return {
    id_user: user?.id_user ?? user?.id ?? null,
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? user?.phone_number ?? '',
    phone_number: user?.phone_number ?? user?.phone ?? '',
    password_hash: user?.password_hash ?? '',
    id_role: user?.id_role ?? user?.role_id ?? null,
    is_active: normalizeActiveStatus(user?.is_active),
    raw: user
  };
}

export function normalizeProjectUser(item) {
  if (Array.isArray(item)) {
    return {
      id_project_user: item[0] ?? null,
      id_project: item[1] ?? null,
      id_user: item[2] ?? null,
      id_role: item[3] ?? null,
      assigned_date: item[4] ?? null,
      raw: item
    };
  }

  return {
    id_project_user: item?.id_project_user ?? item?.id ?? null,
    id_project: item?.id_project ?? null,
    id_user: item?.id_user ?? null,
    id_role: item?.id_role ?? null,
    assigned_date: item?.assigned_date ?? null,
    raw: item
  };
}

export function getStatusLabel(idStatus) {
  const map = {
    1: 'Active',
    2: 'Completed',
    3: 'Pending'
  };

  return map[Number(idStatus)] ?? 'Unknown';
}

export function getUserFullName(user) {
  return `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
}

export async function getProjects(fetch, moduleName = 'coordinator') {
  const data = await requestJsonWithReadFallback(fetch, 'projects', moduleName);
  return extractList(data, ['projects']).map(normalizeProject);
}

export async function getUsers(fetch, moduleName = 'coordinator') {
  const data = await requestJsonWithReadFallback(fetch, 'users', moduleName);
  return extractList(data, ['users']).map(normalizeUser);
}

export async function getUserById(fetch, userId, moduleName = 'coordinator') {
  const data = await requestJsonWithReadFallback(fetch, `users/${userId}`, moduleName);

  const userData = Array.isArray(data)
    ? data[0]
    : data?.user ?? data?.data ?? data;

  return normalizeUser(userData);
}

export async function resolveProjectUserEndpoint(fetch, moduleName = 'coordinator') {
  const probeModule = moduleName === 'coordinator' ? 'coordinator' : 'coordinator';

  for (const candidate of PROJECT_USER_CANDIDATES) {
    const url = `${API_BASE_URL}/${candidate}`;

    try {
      const response = await fetch(url, {
        headers: getAuthHeaders(probeModule)
      });

      if (response.ok || [401, 403, 405].includes(response.status)) {
        return url;
      }
    } catch (_) {
      // Sigue probando candidatos.
    }
  }

  return `${API_BASE_URL}/project-users`;
}

export async function getProjectUsers(fetch, moduleName = 'coordinator') {
  const url = await resolveProjectUserEndpoint(fetch, moduleName);
  const data = await requestJsonWithReadFallback(fetch, url, moduleName);

  return extractList(data, ['project_users', 'projectUsers', 'project_users']).map(normalizeProjectUser);
}

export async function assignUserToProject(fetch, moduleName, payload) {
  const url = await resolveProjectUserEndpoint(fetch, moduleName);

  const modulesToTry = [moduleName];

  if (moduleName !== 'coordinator') {
    modulesToTry.push('coordinator');
  }

  let lastError;

  for (const moduleToTry of modulesToTry) {
    try {
      return await requestJson(fetch, url, moduleToTry, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export function findLatestMatchingProject(projects, payload) {
  return (
    projects
      .filter(
        (project) =>
          project.project_name === payload.project_name &&
          project.start_date === payload.start_date &&
          Number(project.created_by) === Number(payload.created_by)
      )
      .sort((a, b) => Number(b.id_project) - Number(a.id_project))[0] ?? null
  );
}

export function getModuleUserId(moduleName) {
  return PROFILE_USER_IDS[moduleName];
}