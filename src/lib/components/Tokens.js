export const API_BASE_URL = "https://academic-project-management-api-2.onrender.com/api";

/*
  Reemplaza estos 3 tokens cada vez que expiren.
  Como ahora todo sale de este archivo, ya no tendrás que ir archivo por archivo.
*/
export const token_coordinator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzYyMDY5MjV9.5_wo0rQGI6A71mLo773FyOj6Ty2mTvCHm5N2n9DMifk";
export const token_student = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3NzYyMDY3OTJ9.zxbDtHK65x0hkZ8yDV8OB4xdDpNYQODIouwiMrefd-c";
export const token_teacher = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3NjIwNjg4NX0.x_X0OmwLTIyszvcS4nM9nYS9rF0KmyjmjcJRavzyV50";

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