/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const API_URL = "https://academic-project-management-api.onrender.com/api/projects";
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            return { projects: [], error: `Error del servidor: ${response.status}` };
        }

        const projectsData = await response.json();
        
        // Transformamos la respuesta de la API para que coincida con el diseño
        const projects = Array.isArray(projectsData) ? projectsData.map(p => {
            return {
                id_project: p[0],
                project_name: p[1],
                description: p[2],
                start_date: p[3],
                end_date: p[4],
                id_status: p[5],
                // Datos simulados para la vista de coordinador (hasta que el login sea funcional)
                teacherName: p[6] ? `Docente ID: ${p[6]}` : "Asignación Pendiente",
                schedule: "Lun - Mie (2:00 PM - 4:00 PM)", // Ejemplo de horario
                studentCount: Math.floor(Math.random() * 5) + 1 // Simulación de carga de estudiantes
            };
        }) : [];

        // Simulamos una lista de docentes para los selectores del modal
        const teachers = [
            { id: 1, name: "Dr. Roberto Gómez" },
            { id: 2, name: "Dra. Elena Martínez" },
            { id: 3, name: "Ing. Carlos Ruiz" }
        ];

        return { 
            projects, 
            teachers,
            allStudents: [] // Se llenará cuando la API de estudiantes esté integrada
        };

    } catch (e) {
        console.error("Error cargando datos para el coordinador:", e);
        return { 
            projects: [], 
            error: "No se pudo establecer conexión con la base de datos de Render." 
        };
    }
}