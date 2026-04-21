import { getUsers, ROLE_IDS } from '$lib/server/project-helpers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const users = await getUsers(fetch, 'coordinator');
    const students = users.filter((user) => Number(user.id_role) === ROLE_IDS.student);

    const rows = students.map((student) => ({
      nombre: `${student.first_name} ${student.last_name}`.trim(),
      correo: student.email,
      estado: student.is_active ? 'Activo' : 'Inactivo'
    }));

    return {
      rows,
      totalStudents: students.length
    };
  } catch (error) {
    return {
      rows: [],
      totalStudents: 0,
      error: error.message || 'Error al cargar los estudiantes'
    };
  }
}