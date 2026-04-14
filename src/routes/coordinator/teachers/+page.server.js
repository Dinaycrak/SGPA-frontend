/** @type {import('./$types').PageServerLoad} */
import { API_BASE_URL, getAuthHeaders } from "../../../lib/components/Tokens";

export async function load({ fetch }) {
    const headers = getAuthHeaders("coordinator");

    try {
        const [resProjects, resUsers] = await Promise.all([
            fetch(`${API_BASE_URL}/projects`, { headers }),
            fetch(`${API_BASE_URL}/users`, { headers })
        ]);

        const projectsData = resProjects.ok ? await resProjects.json() : [];
        const usersData = resUsers.ok ? await resUsers.json() : [];

        return {
            projects: projectsData.map((p) => ({
                id_project: p[0],
                project_name: p[1]
            })),
            allTeachers: usersData.filter((u) => u.id_role === 3)
        };
    } catch (error) {
        return {
            projects: [],
            allTeachers: [],
            error: "Error de conexión"
        };
    }
}