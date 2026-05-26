const COOKIE_NAME = 'sgpa_teacher_project_status_overrides_v1';
const ONE_YEAR = 60 * 60 * 24 * 365;

function getKey(teacherId, projectId) {
  return `${Number(teacherId)}:${Number(projectId)}`;
}

function readOverrides(cookies) {
  const raw = cookies.get(COOKIE_NAME);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }

    return {};
  } catch (_) {
    return {};
  }
}

function writeOverrides(cookies, overrides) {
  cookies.set(COOKIE_NAME, JSON.stringify(overrides), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: ONE_YEAR
  });
}

export function getProjectStatusOverride(cookies, teacherId, projectId) {
  const overrides = readOverrides(cookies);
  const key = getKey(teacherId, projectId);
  const override = overrides[key];

  if (!override || typeof override !== 'object') {
    return null;
  }

  const statusId = Number(override.id_status);

  if (!statusId) {
    return null;
  }

  return {
    id_status: statusId,
    saved_at: override.saved_at || null
  };
}

export function setProjectStatusOverride(cookies, teacherId, projectId, statusId) {
  const overrides = readOverrides(cookies);
  const key = getKey(teacherId, projectId);

  overrides[key] = {
    id_status: Number(statusId),
    saved_at: new Date().toISOString()
  };

  writeOverrides(cookies, overrides);
}

export function clearProjectStatusOverride(cookies, teacherId, projectId) {
  const overrides = readOverrides(cookies);
  const key = getKey(teacherId, projectId);

  if (Object.prototype.hasOwnProperty.call(overrides, key)) {
    delete overrides[key];
    writeOverrides(cookies, overrides);
  }
}

export function applyProjectStatusOverride(project, override) {
  if (!project || !override) {
    return project;
  }

  return {
    ...project,
    backend_id_status: project.id_status,
    id_status: Number(override.id_status),
    has_frontend_status_override: true,
    frontend_status_saved_at: override.saved_at
  };
}