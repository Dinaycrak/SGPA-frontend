/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const PROJECTS_API = "";
    const USERS_API = "https://academic-project-management-api-rizs.onrender.com/api/projects";
    
    try {
        // Ejecutamos ambas peticiones en paralelo
        const [resProjects, resUsers] = await Promise.all([
            fetch(PROJECTS_API),
            fetch(USERS_API)
        ]);

        // Verificamos si alguna falló
        if (!resProjects.ok || !resUsers.ok) {
            return { 
                projects: [], 
                students: [], 
                error: "Error al obtener datos de la base de datos." 
            };
        }

        const projectsData = await resProjects.json();
        const usersData = await resUsers.json();

        // 1. Mapeo de Proyectos
        const projects = Array.isArray(projectsData) ? projectsData.map(p => ({
            id_project: p[0],
            project_name: p[1],
            description: p[2],
            start_date: p[3],
            end_date: p[4],
            id_status: p[5],
            progress: p[6] // Simulación para el docente
        })) : [];

        // 2. Mapeo de Estudiantes (Filtramos por id_rol: 1)
        // Asumiendo que el id_rol está en el índice 5 del array de usuario
        const students = Array.isArray(usersData) ? usersData
            .filter(u => u[5] === 1) 
            .map(u => ({
                id_user: u[0],
                first_name: u[1],
                last_name: u[2]
            })) : [];

        return { 
            projects, 
            students 
        };

    } catch (e) {
        console.error("Error en servidor SvelteKit:", e);
        return { 
            projects: [], 
            students: [], 
            error: "Fallo de conexión con la API de Render." 
        };
    }
}