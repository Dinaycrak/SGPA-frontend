/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const API_URL = "https://academic-project-management-api.onrender.com/api/projects";
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            return { projects: [], error: `Error de API: ${response.status}` };
        }

        const data = await response.json();
        const projectsData = Array.isArray(data) ? data : [];

        // Mapeamos los datos de la API (id, nombre, descripción, fecha)
        const projects = projectsData.map(p => ({
            id_project: p[0],
            project_name: p[1],
            description: p[2],
            start_date: p[3],
            id_status: p[5]
        }));

        return { projects };

    } catch (e) {
        console.error("Error en servidor SvelteKit:", e);
        return { projects: [], error: "No se pudo conectar con el servidor de proyectos." };
    }
}