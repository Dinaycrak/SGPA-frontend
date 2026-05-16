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

    const students = users.filter(
      (user) => Number(user.id_role) === ROLE_IDS.student
    );

    const rows = students.map((student) => {
      const backendIsActive = normalizeActiveStatus(student.is_active);

      const isActive = applyUserAccessOverride(
        cookies,
        student.id_user,
        backendIsActive
      );

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
  toggleStatus: async ({ request, cookies }) => {
    const formData = await request.formData();

    const userId = Number(formData.get('id_user'));
    const nextIsActive = String(formData.get('next_is_active')) === 'true';
    const userName = String(formData.get('user_name') || 'Estudiante');

    if (!userId) {
      return fail(400, {
        error: 'A valid student ID was not received for update.'
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