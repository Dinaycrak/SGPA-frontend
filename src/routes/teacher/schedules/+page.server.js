/** @type {import('./$types').PageServerLoad} */
import { API_BASE_URL, getAuthHeaders } from "../../../lib/components/Tokens";

export async function load({ fetch }) {
    const API_URL = `${API_BASE_URL}/projects`;

    try {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders("teacher")
        });

        if (response.status === 401) {
            return {
                projects: [],
                error: "Session expired or unauthorized."
            };
        }

        if (!response.ok) {
            return {
                projects: [],
                error: `API error: ${response.status}`
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
            error: "Could not connect to the project server."
        };
    }
}