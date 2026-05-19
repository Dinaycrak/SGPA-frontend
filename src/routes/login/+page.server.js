import { fail, redirect } from '@sveltejs/kit';
import { API_BASE_URL } from '$lib/components/Tokens.js';
import {
  buildSession,
  getRoleHome,
  getSessionFromCookies,
  normalizeRole,
  setSession
} from '$lib/server/auth-session.js';

const ROLE_LABELS = {
  students: 'Student',
  teacher: 'Teacher',
  coordinator: 'Coordinator'
};

function getLoginUrl() {
  return `${API_BASE_URL}/auth/login`;
}

function normalizeSelectedRole(role = '') {
  const normalized = normalizeRole(role);

  if (normalized === 'students') return 'students';
  if (normalized === 'teacher') return 'teacher';
  if (normalized === 'coordinator') return 'coordinator';

  return '';
}

function getFriendlyLoginError(status, data) {
  const detail =
    typeof data === 'string'
      ? data
      : data?.detail || data?.message || data?.error || '';

  if (status === 400) return 'Incorrect credentials.';
  if (status === 401) return 'Incorrect credentials.';
  if (status === 403) return 'You do not have permission to access the system.';
  if (status === 422) return 'The login request format is not accepted by the API.';
  if (status >= 500) return 'The server had an internal error. Please try again later.';

  if (detail) return String(detail);

  return 'Could not complete login. Please try again.';
}

async function parseResponse(response) {
  const text = await response.text().catch(() => '');

  try {
    return text ? JSON.parse(text) : null;
  } catch (_) {
    return text;
  }
}

async function tryLoginRequest(fetch, payload) {
  const queryParams = new URLSearchParams({
    email: payload.email,
    password: payload.password
  });

  const usernameQueryParams = new URLSearchParams({
    username: payload.email,
    password: payload.password
  });

  const attempts = [
    {
      type: 'query-email',
      url: `${getLoginUrl()}?${queryParams.toString()}`,
      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        }
      }
    },
    {
      type: 'query-username',
      url: `${getLoginUrl()}?${usernameQueryParams.toString()}`,
      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        }
      }
    },
    {
      type: 'json-email',
      url: getLoginUrl(),
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      }
    },
    {
      type: 'json-username',
      url: getLoginUrl(),
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: payload.email,
          password: payload.password
        })
      }
    },
    {
      type: 'form-username',
      url: getLoginUrl(),
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        body: new URLSearchParams({
          username: payload.email,
          password: payload.password
        })
      }
    }
  ];

  let lastResult = null;

  for (const attempt of attempts) {
    try {
      const response = await fetch(attempt.url, attempt.options);
      const data = await parseResponse(response);

      if (response.ok) {
        return {
          ok: true,
          data,
          status: response.status,
          attempt: attempt.type
        };
      }

      lastResult = {
        ok: false,
        data,
        status: response.status,
        attempt: attempt.type
      };

      /*
        Si la API responde 401 o 403, normalmente las credenciales son incorrectas
        o el usuario no tiene permiso. No tiene sentido seguir probando formatos.
      */
      if ([401, 403].includes(response.status)) {
        break;
      }

      /*
        Si responde 422, sí probamos el siguiente formato porque puede ser un problema
        de cómo la API espera recibir email/password.
      */
    } catch (error) {
      lastResult = {
        ok: false,
        data: null,
        status: 0,
        attempt: attempt.type,
        error
      };
    }
  }

  return (
    lastResult || {
      ok: false,
      data: null,
      status: 0,
      error: new Error('No response from API.')
    }
  );
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
  const session = getSessionFromCookies(cookies);

  if (session) {
    throw redirect(303, getRoleHome(session.user.normalizedRole));
  }

  const reason = url.searchParams.get('reason');
  const logout = url.searchParams.get('logout');

  let notice = '';

  if (reason === 'expired') {
    notice = 'Your session expired. Please log in again.';
  } else if (reason === 'forbidden') {
    notice = 'You do not have permission to access that module.';
  } else if (logout === '1') {
    notice = 'Session closed successfully.';
  }

  return {
    notice
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();

    const email = String(formData.get('email') || formData.get('usuario') || '').trim();
    const password = String(formData.get('password') || '').trim();
    const selectedRole = normalizeSelectedRole(formData.get('role'));

    if (!selectedRole) {
      return fail(400, {
        error: 'Select a valid role.',
        email,
        selectedRole: 'students'
      });
    }

    if (!email || !password) {
      return fail(400, {
        error: 'Enter your email and password.',
        email,
        selectedRole
      });
    }

    const loginResult = await tryLoginRequest(fetch, {
      email,
      password
    });

    if (!loginResult?.ok) {
      return fail(loginResult?.status || 500, {
        error:
          loginResult?.status === 0
            ? 'Could not connect to the server. Please try again.'
            : getFriendlyLoginError(loginResult.status, loginResult.data),
        email,
        selectedRole
      });
    }

    const accessToken =
      loginResult.data?.access_token ||
      loginResult.data?.token ||
      loginResult.data?.accessToken;

    const user = loginResult.data?.user;

    if (!accessToken) {
      return fail(500, {
        error: 'The API response did not include an access token.',
        email,
        selectedRole
      });
    }

    if (!user) {
      return fail(500, {
        error: 'The API response did not include user data.',
        email,
        selectedRole
      });
    }

    const session = buildSession({
      accessToken,
      user
    });

    const apiRole = normalizeRole(session.user.normalizedRole || session.user.role);

    if (!apiRole) {
      return fail(500, {
        error: 'The API response did not include a valid user role.',
        email,
        selectedRole
      });
    }

    if (apiRole !== selectedRole) {
      return fail(403, {
        error: `You do not have permission to log in as ${ROLE_LABELS[selectedRole]}.`,
        email,
        selectedRole
      });
    }

    try {
      setSession(cookies, session);
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not save the session.',
        email,
        selectedRole
      });
    }

    throw redirect(303, getRoleHome(apiRole));
  }
};