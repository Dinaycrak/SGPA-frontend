const COOKIE_NAME = 'sgpa_user_access_overrides_v1';
const ONE_YEAR = 60 * 60 * 24 * 365;

export function getUserAccessOverrides(cookies) {
  const raw = cookies.get(COOKIE_NAME);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }

    return {};
  } catch (_) {
    return {};
  }
}

export function getUserAccessOverride(cookies, userId) {
  const overrides = getUserAccessOverrides(cookies);
  const key = String(userId);

  if (typeof overrides[key] === 'boolean') {
    return overrides[key];
  }

  return null;
}

export function applyUserAccessOverride(cookies, userId, backendIsActive) {
  const override = getUserAccessOverride(cookies, userId);

  if (override === null) {
    return backendIsActive;
  }

  return override;
}

export function setUserAccessOverride(cookies, userId, isActive) {
  const overrides = getUserAccessOverrides(cookies);

  overrides[String(userId)] = Boolean(isActive);

  cookies.set(COOKIE_NAME, JSON.stringify(overrides), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: ONE_YEAR
  });
}