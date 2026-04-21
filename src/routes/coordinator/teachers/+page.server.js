import { getUsers, ROLE_IDS } from '$lib/server/project-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const users = await getUsers(fetch, 'coordinator');
    const teachers = users.filter((user) => Number(user.id_role) === ROLE_IDS.teacher);

    const rows = teachers.map((teacher) => ({
      nombre: `${teacher.first_name} ${teacher.last_name}`.trim(),
      correo: teacher.email,
      estado: teacher.is_active ? 'Activo' : 'Inactivo'
    }));

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