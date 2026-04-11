/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const API_BASE = "https://academic-project-management-api-rizs.onrender.com/api";
    // Token de Alejandro (Coordinador)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzU4OTMxNDB9.pcquIbESwP0bNpopGXBDC-h1mt8fFpzpKF1ZNxLCp4k";

    const headers = { 'Authorization': `Bearer ${token}` };

    try {
        const [resProjects, resUsers] = await Promise.all([
            fetch(`${API_BASE}/projects`, { headers }),
            fetch(`${API_BASE}/users`, { headers })
        ]);

        const projectsData = resProjects.ok ? await resProjects.json() : [];
        const usersData = resUsers.ok ? await resUsers.json() : [];

        return {
            projects: projectsData.map(p => ({
                id_project: p[0],
                project_name: p[1]
            })),
            // Filtramos específicamente por id_role 1 (Estudiante)
            allTeachers: usersData.filter(u => u.id_role === 3) 
        };
    } catch (e) {
        return { projects: [], allTeachers: [], error: "Error de conexión" };
    }
}