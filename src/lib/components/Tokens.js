export const API_BASE_URL = 'https://academic-project-management-api.onrender.com/api';

/**
 * El token real ya no se guarda aquí.
 * El token viene de la sesión creada en login y se inyecta desde hooks.server.js.
 */

export function getTokenByModule() {
  return '';
}

export function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
}

export function getUserEndpoint(_moduleName, userId = null) {
  if (!userId) {
    return null;
  }

  return `${API_BASE_URL}/users/${userId}`;
}