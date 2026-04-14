export const API_BASE_URL = "https://academic-project-management-api-2.onrender.com/api";

/*
  Reemplaza estos 3 tokens cada vez que expiren.
  Como ahora todo sale de este archivo, ya no tendrás que ir archivo por archivo.
*/
export const token_coordinator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzYxOTU3MTl9.T3C-gHrr1cdDurDUttBJL0mUqXPmJI9S8po3xEbG4wo";
export const token_student = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3NzYxOTU2MzV9.xX8sSxtpC-l2JtpkvfVpBItDcVcNwSsS7jZhCKkosJE";
export const token_teacher = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3NjE5NTY4OH0.Z4KsJv1nt_lAHKyJEODki_A7aMRRjLkue47GsZTHKfk";

/*
  Estos IDs son temporales para los perfiles.
  Si luego cambian los usuarios de prueba, solo ajustas aquí.
*/
export const PROFILE_USER_IDS = {
    students: 37,
    teacher: 39,
    coordinator: 5
};

export function getTokenByModule(moduleName) {
    switch (moduleName) {
        case "students":
            return token_student;
        case "teacher":
            return token_teacher;
        case "coordinator":
            return token_coordinator;
        default:
            return "";
    }
}

export function getAuthHeaders(moduleName) {
    const token = getTokenByModule(moduleName);

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    };
}

export function getUserEndpoint(moduleName) {
    const userId = PROFILE_USER_IDS[moduleName];

    if (!userId) {
        return null;
    }

    return `${API_BASE_URL}/users/${userId}`;
}