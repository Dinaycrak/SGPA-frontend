import { redirect } from '@sveltejs/kit';
import {
  clearSession,
  createLoginRedirect,
  getRequiredRoleForPath,
  getRoleHome,
  getSessionFromCookies,
  isExpired,
  isProtectedPath,
  normalizeRole
} from '$lib/server/auth-session.js';
import { API_BASE_URL } from '$lib/components/Tokens.js';

function isApiRequest(url) {
  return String(url).startsWith(API_BASE_URL);
}

export async function handle({ event, resolve }) {
  const pathname = event.url.pathname.replace(/\/$/, '') || '/';
  const session = getSessionFromCookies(event.cookies);

  event.locals.session = session;

  if (pathname === '/login' && session && !isExpired(session.exp)) {
    throw redirect(303, getRoleHome(session.user.normalizedRole));
  }

  if (isProtectedPath(pathname)) {
    if (!session) {
      throw redirect(303, createLoginRedirect(pathname, 'expired'));
    }

    if (isExpired(session.exp)) {
      clearSession(event.cookies);
      throw redirect(303, createLoginRedirect(pathname, 'expired'));
    }

    const requiredRole = getRequiredRoleForPath(pathname);
    const currentRole = normalizeRole(session.user?.normalizedRole || session.user?.role);

    if (requiredRole && currentRole !== requiredRole) {
      clearSession(event.cookies);
      throw redirect(303, createLoginRedirect(pathname, 'forbidden'));
    }
  }

  const response = await resolve(event);

  if (isProtectedPath(pathname)) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export async function handleFetch({ event, request, fetch }) {
  const session = event.locals.session;

  if (session?.accessToken && isApiRequest(request.url)) {
    const headers = new Headers(request.headers);

    headers.set('Authorization', `Bearer ${session.accessToken}`);
    headers.set('Accept', headers.get('Accept') || 'application/json');

    if (!headers.has('Content-Type') && request.method !== 'GET') {
      headers.set('Content-Type', 'application/json');
    }

    request = new Request(request, {
      headers
    });
  }

  const response = await fetch(request);

  if (response.status === 401 && isApiRequest(request.url)) {
    clearSession(event.cookies);
  }

  return response;
}