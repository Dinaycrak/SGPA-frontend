export const API_BASE_URL = "https://academic-project-management-api-2.onrender.com/api";

/*
  Reemplaza estos 3 tokens cada vez que expiren.
  Como ahora todo sale de este archivo, ya no tendrás que ir archivo por archivo.
*/
export const token_coordinator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzY3ODcwMjR9.0V9AJaeYqc46R3iLHpqAJnyW_tGt9X0gj4qCNzQ4VQw";
export const token_student = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3NzY3ODcxNjB9.Z4R_-AE2XrERfKPrS5OAALRvlZLRv0Pyh6UjMG1E7rQ";
export const token_teacher = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3Njc4NzExNn0.0BnntGlHuNX1HcZk55ajWt7tByb1a2kIprb17fSMh1c";

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