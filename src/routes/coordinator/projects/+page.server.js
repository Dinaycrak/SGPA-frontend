/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const API_URL = "https://academic-project-management-api-rizs.onrender.com/api/projects";
    
    // Mapeo de estados para que el frontend los entienda
    const statusMap = {
        1: "Activo",
        2: "Completado",
        3: "Pendiente"
    };

    // Pegamos el token de Alejandro (Coordinador) directamente como texto
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzYxNDkzODd9.mBeu8YPFA5SokmHwg2_ftgVNnfUtvSQbIP0Ft4gIeE4";

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return { projects: [], error: "Sesión expirada o no autorizada. Por favor inicia sesión." };
        }

        if (!response.ok) {
            return { projects: [], error: `Error de API: ${response.status}` };
        }

        const data = await response.json();
        
        // Validamos si la data es un array
        const projectsData = Array.isArray(data) ? data : [];

        // Mapeamos los datos según el formato que recibe tu frontend
        const projects = projectsData.map(p => ({
            id_project: p[0],
            project_name: p[1],
            description: p[2],
            start_date: p[3],
            status: statusMap[p[5]] || "Desconocido"
        }));

        return { projects };

    } catch (e) {
        return { projects: [], error: "Error de conexión con el servidor." };
    }
}