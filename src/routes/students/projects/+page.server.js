/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const API_URL = "https://academic-project-management-api-rizs.onrender.com/api/projects";

    const statusMap = {
        1: "Activo",
        2: "Completado",
        3: "Pendiente"
    };

    // Token temporal del estudiante mientras se implementa el login real
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3NzYxNTA3Njd9.rSwft5Bv3TM7F7rDN3IScF-ImdlFtdWJ2KK73KVaZzI";

    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            return {
                projects: [],
                error: "Sesión expirada o no autorizada. Por favor inicia sesión."
            };
        }

        if (!response.ok) {
            return {
                projects: [],
                error: `Error de API: ${response.status}`
            };
        }

        const data = await response.json();
        const projectsData = Array.isArray(data) ? data : [];

        const projects = projectsData.map((p) => ({
            id_project: p[0],
            project_name: p[1],
            description: p[2],
            start_date: p[3],
            status: statusMap[p[5]] || "Desconocido"
        }));

        return { projects };
    } catch (e) {
        return {
            projects: [],
            error: "Error de conexión con el servidor."
        };
    }
}