import { fail } from '@sveltejs/kit';
import {
  getUsers,
  ROLE_IDS,
  normalizeActiveStatus
} from '$lib/server/project-helpers.js';
import {
  applyUserAccessOverride,
  setUserAccessOverride
} from '$lib/server/access-overrides.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies }) {
  try {
    const users = await getUsers(fetch, 'coordinator');

    const teachers = users.filter(
      (user) => Number(user.id_role) === ROLE_IDS.teacher
    );

    const rows = teachers.map((teacher) => {
      const backendIsActive = normalizeActiveStatus(teacher.is_active);

      const isActive = applyUserAccessOverride(
        cookies,
        teacher.id_user,
        backendIsActive
      );

      return {
        id_user: teacher.id_user,
        nombre: `${teacher.first_name ?? ''} ${teacher.last_name ?? ''}`.trim() || 'Unnamed',
        correo: teacher.email ?? 'No email',
        estado: isActive ? 'Active' : 'Inactive',
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
      error: error.message || 'Error loading teachers'
    };
  }
}

export const actions = {
  toggleStatus: async ({ request, cookies }) => {
    const formData = await request.formData();

    const userId = Number(formData.get('id_user'));
    const nextIsActive = String(formData.get('next_is_active')) === 'true';
    const userName = String(formData.get('user_name') || 'Docente');

    if (!userId) {
      return fail(400, {
        error: 'A valid teacher ID was not received for update.'
      });
    }

    setUserAccessOverride(cookies, userId, nextIsActive);

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
  }
};