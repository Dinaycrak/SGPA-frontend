/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const API_BASE = "https://academic-project-management-api-rizs.onrender.com/api";
    // Token de Alejandro (Coordinador)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzYwOTQ5Mzd9.w0K_HggutG8wKzrFEPZFYM38pVyI_YO7sWreIXgSUqw";

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
            allStudents: usersData.filter(u => u.id_role === 1) 
        };
    } catch (e) {
        return { projects: [], allStudents: [], error: "Error de conexión" };
    }
}
