export const API_BASE_URL = "https://academic-project-management-api.onrender.com/api";

export const token_coordinator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzkxNTg4MTF9.MeDXBj2rqtHONiKxw1aER3cSntshGkQ_0D3kt48Zn60";
export const token_student = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3NzkxNTg4ODZ9.LBYXOg4QB3FI28NLbwkknMlqNtdZTwBfy96F1vAExtw";
export const token_teacher = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3OTE1ODg1OH0.X_3mUTpf35-iX348wXoH8ORA-NQjievwY1adbKXIOhY";


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