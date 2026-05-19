import { json } from '@sveltejs/kit';
import { clearSession } from '$lib/server/auth-session.js';

export async function POST({ cookies }) {
  clearSession(cookies);

  return json({
    success: true,
    message: 'Session closed.'
  });
}

export async function GET({ cookies }) {
  clearSession(cookies);

  return new Response(null, {
    status: 303,
    headers: {
      Location: '/login?logout=1'
    }
  });
}