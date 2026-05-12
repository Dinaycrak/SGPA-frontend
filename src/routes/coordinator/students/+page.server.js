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
    throw new Error('A valid student ID was not received for update.');
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

    lastError = `${attempt.method} /users/${userId} failed. Status ${response.status}. ${text}`;
  }

  throw new Error(lastError || 'Could not update the student status.');
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const users = await getUsers(fetch, 'coordinator');
    const students = users.filter((user) => Number(user.id_role) === ROLE_IDS.student);

    const rows = students.map((student) => {
      const isActive = normalizeActiveStatus(student.is_active);

      return {
        id_user: student.id_user,
        nombre: `${student.first_name ?? ''} ${student.last_name ?? ''}`.trim() || 'Unnamed',
        correo: student.email ?? 'No email',
        estado: isActive ? 'Active' : 'Inactive',
        is_active: isActive
      };
    });

    return {
      rows,
      totalStudents: students.length
    };
  } catch (error) {
    return {
      rows: [],
      totalStudents: 0,
      error: error.message || 'Error loading students'
    };
  }
}

export const actions = {
  toggleStatus: async ({ request, fetch }) => {
    const formData = await request.formData();

    const userId = Number(formData.get('id_user'));
    const nextIsActive = String(formData.get('next_is_active')) === 'true';
    const userName = String(formData.get('user_name') || 'Estudiante');

    try {
      const users = await getUsers(fetch, 'coordinator');
      const student = users.find((user) => Number(user.id_user) === userId);

      if (!student) {
        return fail(404, {
          error: 'The student to update was not found.'
        });
      }

      await updateUserActiveStatus(fetch, student, nextIsActive);

      return {
        success: true,
        message: nextIsActive
          ? `${userName} fue marcado como ACTIVO.`
          : `${userName} fue marcado como INACTIVO.`,
        updatedUser: {
          id_user: userId,
          is_active: nextIsActive,
          estado: nextIsActive ? 'Active' : 'Inactive'
        }
      };
    } catch (error) {
      return fail(500, {
        error: error.message || `Could not update access for ${userName}.`
      });
    }
  }
};