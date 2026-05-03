import { fail, redirect } from '@sveltejs/kit';
import { getUsers, ROLE_IDS } from '$lib/server/project-helpers.js';
import { API_BASE_URL, getAuthHeaders } from '$lib/components/Tokens.js';

async function updateUserActiveStatus(fetch, user, nextIsActive) {
  const userId = Number(user.id_user ?? user.id);

  const attempts = [
    {
      method: 'PATCH',
      body: { is_active: nextIsActive }
    },
    {
      method: 'PUT',
      body: { is_active: nextIsActive }
    },
    {
      method: 'PUT',
      body: {
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? user.phone_number ?? '',
        is_active: nextIsActive,
        id_role: Number(user.id_role)
      }
    }
  ];

  let lastError = '';

  for (const attempt of attempts) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: attempt.method,
      headers: getAuthHeaders('coordinator'),
      body: JSON.stringify(attempt.body)
    });

    const text = await response.text();

    if (response.ok) {
      return true;
    }

    lastError = `Método ${attempt.method} falló. Estado ${response.status}. ${text}`;
  }

  throw new Error(lastError || 'No se pudo actualizar el estado del estudiante');
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
  try {
    const users = await getUsers(fetch, 'coordinator');
    const students = users.filter((user) => Number(user.id_role) === ROLE_IDS.student);

    const rows = students.map((student) => ({
      id_user: student.id_user,
      nombre: `${student.first_name ?? ''} ${student.last_name ?? ''}`.trim(),
      correo: student.email ?? 'Sin correo',
      estado: student.is_active ? 'Activo' : 'Inactivo',
      is_active: Boolean(student.is_active)
    }));

    return {
      rows,
      totalStudents: students.length,
      message: url.searchParams.get('message') || '',
      type: url.searchParams.get('type') || 'success'
    };
  } catch (error) {
    return {
      rows: [],
      totalStudents: 0,
      message: '',
      type: 'error',
      error: error.message || 'Error al cargar los estudiantes'
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
          error: 'No se encontró el estudiante a actualizar'
        });
      }

      await updateUserActiveStatus(fetch, student, nextIsActive);

      const message = nextIsActive
        ? `Estudiante HABILITAR con éxito en el sistema.`
        : `Estudiante DESHABILITAR con éxito en el sistema.`;

      throw redirect(
        303,
        `/coordinator/students?message=${encodeURIComponent(message)}&type=success`
      );
    } catch (error) {
      if (error?.status === 303) throw error;

      return fail(500, {
        error: error.message || `No se pudo actualizar el acceso de ${userName}`
      });
    }
  }
};