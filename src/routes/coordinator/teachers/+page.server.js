import { fail, redirect } from '@sveltejs/kit';
import { getUsers, ROLE_IDS } from '$lib/server/project-helpers.js';
import { API_BASE_URL, getAuthHeaders } from '$lib/components/Tokens.js';

async function getUserDetail(fetch, userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: getAuthHeaders('coordinator')
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`No se pudo obtener el detalle del docente. Estado ${response.status}. ${text}`);
  }

  return data;
}

async function updateUserActiveStatus(fetch, user, nextIsActive) {
  const userId = Number(user.id_user ?? user.id);

  const patchResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: getAuthHeaders('coordinator'),
    body: JSON.stringify({ is_active: nextIsActive })
  });

  const patchText = await patchResponse.text();

  if (patchResponse.ok) {
    return true;
  }

  const fullUser = await getUserDetail(fetch, userId);

  const putPayload = {
    first_name: fullUser?.first_name ?? user.first_name ?? '',
    last_name: fullUser?.last_name ?? user.last_name ?? '',
    email: fullUser?.email ?? user.email ?? '',
    phone: fullUser?.phone ?? fullUser?.phone_number ?? user.phone ?? user.phone_number ?? '',
    is_active: nextIsActive,
    id_role: Number(fullUser?.id_role ?? user.id_role),
    password_hash: fullUser?.password_hash
  };

  if (!putPayload.password_hash) {
    throw new Error(
      `No se pudo actualizar el docente. El backend exige password_hash y no lo devuelve en /users/${userId}.`
    );
  }

  const putResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: getAuthHeaders('coordinator'),
    body: JSON.stringify(putPayload)
  });

  const putText = await putResponse.text();

  if (putResponse.ok) {
    return true;
  }

  throw new Error(
    `PATCH falló (${patchResponse.status}): ${patchText} | PUT falló (${putResponse.status}): ${putText}`
  );
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
  try {
    const users = await getUsers(fetch, 'coordinator');
    const teachers = users.filter((user) => Number(user.id_role) === ROLE_IDS.teacher);

    const rows = teachers.map((teacher) => ({
      id_user: teacher.id_user,
      nombre: `${teacher.first_name ?? ''} ${teacher.last_name ?? ''}`.trim(),
      correo: teacher.email ?? 'Sin correo',
      estado: teacher.is_active ? 'Activo' : 'Inactivo',
      is_active: Boolean(teacher.is_active)
    }));

    return {
      rows,
      totalTeachers: teachers.length,
      message: url.searchParams.get('message') || '',
      type: url.searchParams.get('type') || 'success'
    };
  } catch (error) {
    return {
      rows: [],
      totalTeachers: 0,
      message: '',
      type: 'error',
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
          error: 'No se encontró el docente a actualizar'
        });
      }

      await updateUserActiveStatus(fetch, teacher, nextIsActive);

      const message = nextIsActive
        ? 'Docente HABILITAR con éxito en el sistema.'
        : 'Docente DESHABILITAR con éxito en el sistema.';

      throw redirect(
        303,
        `/coordinator/teachers?message=${encodeURIComponent(message)}&type=success`
      );
    } catch (error) {
      if (error?.status === 303) throw error;

      return fail(500, {
        error: error.message || `No se pudo actualizar el acceso de ${userName}`
      });
    }
  }
};