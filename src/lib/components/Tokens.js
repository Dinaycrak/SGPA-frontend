export const API_BASE_URL = "https://academic-project-management-api-2.onrender.com/api";

/*
  Reemplaza estos 3 tokens cada vez que expiren.
  Como ahora todo sale de este archivo, ya no tendrás que ir archivo por archivo.
*/
export const token_coordinator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3Nzc5OTc5MDJ9.YEX43hBVTHbVeLMhNIDyziinBtg5W5vVqqua9zJNfOE";
export const token_student = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3Nzc5OTc4NzB9.y-C16u2y-1phZ3wcOu0YZL7gCntYoCY6F6vUePTWfPI";
export const token_teacher = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3Nzk5NzgzMH0.8KGeHvvUOIEPTIouyEVScXvKbDrfp8Fnz-UuEOVNwJ0";

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