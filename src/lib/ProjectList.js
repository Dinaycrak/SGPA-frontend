// lib/ProjectList.js

export async function getProjects() {
    try {
        const response = await fetch("https://academic-project-management-api.onrender.com/api/projects");

        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const projectsData = Array.isArray(data) ? data : [];

        // Mapeamos siguiendo tu modelo de Pydantic
        return projectsData.map(p => ({
            id_project: p[0],           // pydantic: id_project
            project_name: p[1],         // pydantic: project_name
            description: p[2],          // pydantic: description
            start_date: p[3],           // pydantic: start_date
            end_date: p[4],             // pydantic: end_date
            id_status: p[5],            // pydantic: id_status
            id_research_line: p[6],     // pydantic: id_research_line
            created_by: p[7]            // pydantic: created_by
        })); 

    } catch (error) {
        console.error("Error cargando proyectos:", error);
        return [];
    }
}