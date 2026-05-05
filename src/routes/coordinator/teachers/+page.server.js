import { fail } from '@sveltejs/kit';
import {
  getUsers,
  getUserById,
  ROLE_IDS,
  normalizeActiveStatus
} from '$lib/server/project-helpers.js';
import { API_BASE_URL, getAuthHeaders } from '$lib/components/Tokens.js';

function buildUserPayload(user, nextIsActive) {
  const raw = user?.raw && !Array.isArray(user.raw) ? user.raw : user;

  const payload = {
    ...raw,
    first_name: raw?.first_name ?? user?.first_name ?? '',
    last_name: raw?.last_name ?? user?.last_name ?? '',
    email: raw?.email ?? user?.email ?? '',
    phone: raw?.phone ?? raw?.phone_number ?? user?.phone ?? user?.phone_number ?? '',
    id_role: Number(raw?.id_role ?? user?.id_role),
    is_active: nextIsActive
  };

  delete payload.raw;
  delete payload.id;

  return payload;
}

async function updateUserActiveStatus(fetch, user, nextIsActive) {
  const userId = Number(user.id_user ?? user.id);

  if (!userId) {
    throw new Error('No se recibió un ID válido para actualizar el docente.');
  }

  let detailedUser = user;

  try {
    detailedUser = await getUserById(fetch, userId, 'coordinator');
  } catch (_) {
    detailedUser = user;
  }

  const fullPayload = buildUserPayload(detailedUser, nextIsActive);

  const attempts = [
    { method: 'PATCH', body: { is_active: nextIsActive } },
    { method: 'PATCH', body: fullPayload },
    { method: 'PUT', body: fullPayload }
  ];

  let lastError = '';

  for (const attempt of attempts) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: attempt.method,
      headers: getAuthHeaders('coordinator'),
      body: JSON.stringify(attempt.body)
    });

    const text = await response.text().catch(() => '');

    if (response.ok) {
      return true;
    }

    lastError = `${attempt.method} /users/${userId} falló. Estado ${response.status}. ${text}`;
  }

  throw new Error(lastError || 'No se pudo actualizar el estado del docente.');
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const users = await getUsers(fetch, 'coordinator');
    const teachers = users.filter((user) => Number(user.id_role) === ROLE_IDS.teacher);

    const rows = teachers.map((teacher) => {
      const isActive = normalizeActiveStatus(teacher.is_active);

      return {
        id_user: teacher.id_user,
        nombre: `${teacher.first_name ?? ''} ${teacher.last_name ?? ''}`.trim() || 'Sin nombre',
        correo: teacher.email ?? 'Sin correo',
        estado: isActive ? 'Activo' : 'Inactivo',
        is_active: isActive
      };
    });

    return {
      rows,
      totalTeachers: teachers.length
    };
  } catch (error) {
    return {
      rows: [],
      totalTeachers: 0,
      error: error.message || 'Error al cargar los docentes'
    };
  }
}

export const actions = {
  toggleStatus: async ({ request, fetch }) => {
    const formData = await request.formData();

    const userId = Number(formData.get('id_user'));
    const nextIsActive = String(formData.get('next_is_active')) === 'true';
    const userName = String(formData.get('user_name') || 'Docente');

    try {
      const users = await getUsers(fetch, 'coordinator');
      const teacher = users.find((user) => Number(user.id_user) === userId);

      if (!teacher) {
        return fail(404, {
          error: 'No se encontró el docente a actualizar.'
        });
      }

      await updateUserActiveStatus(fetch, teacher, nextIsActive);

      return {
        success: true,
        message: nextIsActive
          ? `${userName} fue marcado como ACTIVO.`
          : `${userName} fue marcado como INACTIVO.`,
        updatedUser: {
          id_user: userId,
          is_active: nextIsActive,
          estado: nextIsActive ? 'Activo' : 'Inactivo'
        }
      };
    } catch (error) {
      return fail(500, {
        error: error.message || `No se pudo actualizar el acceso de ${userName}.`
      });
    }
  }
};