/** @type {import('./$types').PageServerLoad} */
import { API_BASE_URL, getAuthHeaders } from "../../../lib/components/Tokens";

export async function load({ fetch }) {
    const API_URL = `${API_BASE_URL}/projects`;

    try {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders("students")
        });

        if (response.status === 401) {
            return {
                projects: [],
                error: "Sesión expirada o no autorizada."
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
            id_status: p[5]
        }));

        return { projects };
    } catch (error) {
        return {
            projects: [],
            error: "No se pudo conectar con el servidor de proyectos."
        };
    }
}