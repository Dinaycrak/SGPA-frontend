export const API_BASE_URL = "https://academic-project-management-api.onrender.com/api";

export const token_coordinator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3Nzg1OTk2NDR9.qFyoVZQ3c1TDsWsItpQNn74_hNvemNVRq_1LoH8nT7E";
export const token_student = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3Nzg1OTk2OTZ9.vlhyh9bMcsW9jJxwo93AZdze866rpTBW-BojF1mFwKc";
export const token_teacher = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3ODU5OTU5Nn0.n04LZl_NC6C50LGsoYBFghQVR9IYXmYV7EpIMCwwg4A";


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