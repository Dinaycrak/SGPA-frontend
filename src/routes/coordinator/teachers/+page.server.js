import { fail } from '@sveltejs/kit';
import { API_BASE_URL, getAuthHeaders } from '$lib/components/Tokens.js';
import { getUsers, ROLE_IDS } from '$lib/server/project-helpers.js';

function toBool(value) {
  return value === true || String(value).trim().toLowerCase() === 'true';
}

function normalizeActiveStatus(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;

  const normalized = String(value ?? '').trim().toLowerCase();

  if (['true', '1', 'active', 'enabled', 'activo', 'si', 'sí', 'yes'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'inactive', 'disabled', 'inactivo', 'no', '', 'null', 'undefined'].includes(normalized)) {
    return false;
  }

  return Boolean(value);
}

function getApiUrl(path) {
  return `${API_BASE_URL}/${String(path).replace(/^\/+/, '')}`;
}

async function apiRequest(fetch, path, method, payload) {
  const response = await fetch(getApiUrl(path), {
    method,
    headers: {
      ...getAuthHeaders('coordinator'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text().catch(() => '');
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = text;
  }

  if (!response.ok) {
    const detail =
      typeof data === 'string'
        ? data
        : data?.detail || data?.message || data?.error || JSON.stringify(data);

    throw new Error(`Status ${response.status}. ${detail}`);
  }

  return data;
}

function buildFullPayload(user, isActive) {
  const payload = {
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    phone: user.phone || user.phone_number || '',
    phone_number: user.phone_number || user.phone || '',
    id_role: Number(user.id_role || ROLE_IDS.teacher),
    is_active: Boolean(isActive)
  };

  if (user.password_hash) {
    payload.password_hash = user.password_hash;
  }

  return payload;
}

async function tryPersistUserStatus(fetch, userId, isActive) {
  const attempts = [];

  try {
    await apiRequest(fetch, `users/${userId}`, 'PATCH', {
      is_active: Boolean(isActive)
    });

    return {
      persisted: true,
      error: null
    };
  } catch (error) {
    attempts.push(error.message);
  }

  try {
    const users = await getUsers(fetch, 'coordinator');
    const user = users.find((item) => Number(item.id_user) === Number(userId));

    if (!user) {
      throw new Error('User not found for PUT fallback.');
    }

    await apiRequest(fetch, `users/${userId}`, 'PUT', buildFullPayload(user, isActive));

    return {
      persisted: true,
      error: null
    };
  } catch (error) {
    attempts.push(error.message);
  }

  return {
    persisted: false,
    error: attempts.at(-1) || 'The API did not persist the change.'
  };
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const users = await getUsers(fetch, 'coordinator');

    const teachers = users
      .filter((user) => Number(user.id_role) === ROLE_IDS.teacher)
      .map((user) => ({
        ...user,
        is_active: normalizeActiveStatus(user.is_active)
      }))
      .sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      );

    return {
      users: teachers,
      totalUsers: teachers.length
    };
  } catch (error) {
    return {
      users: [],
      totalUsers: 0,
      error: error.message || 'Could not load teachers.'
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  toggleStatus: async ({ request, fetch }) => {
    const formData = await request.formData();
    const userId = Number(formData.get('id_user'));
    const isActive = toBool(formData.get('is_active'));

    if (!userId) {
      return fail(400, {
        error: 'Invalid user.'
      });
    }

    const result = await tryPersistUserStatus(fetch, userId, isActive);

    return {
      success: true,
      visualOnly: !result.persisted,
      visualUserId: userId,
      visualIsActive: isActive,
      message: isActive
        ? result.persisted
          ? 'Teacher enabled successfully.'
          : 'Teacher enabled visually. The API did not persist the change yet.'
        : result.persisted
          ? 'Teacher disabled successfully.'
          : 'Teacher disabled visually. The API did not persist the change yet.'
    };
  }
};