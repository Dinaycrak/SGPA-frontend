import { getUserById } from '$lib/server/project-helpers.js';

function getCurrentStudentId(locals) {
  return Number(locals?.session?.user?.id_user || 0);
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
  const currentStudentId = getCurrentStudentId(locals);

  if (!currentStudentId) {
    return {
      user: {},
      error: 'Could not identify the logged-in student.'
    };
  }

  try {
    const data = await getUserById(fetch, currentStudentId, 'students');

    const user = {
      id_user: data.id_user,
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      phone: data.phone || data.phone_number || '',
      phone_number: data.phone_number || data.phone || '',
      id_role: data.id_role,
      is_active: data.is_active
    };

    return {
      user
    };
  } catch (error) {
    return {
      user: {},
      error: error.message || 'Server connection error.'
    };
  }
}