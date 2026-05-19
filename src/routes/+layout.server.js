import { getPublicSession } from '$lib/server/auth-session.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  return {
    session: getPublicSession(locals.session)
  };
}