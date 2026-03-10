export async function getUsers() {
    try {
        const response = await fetch("https://academic-project-management-api.onrender.com/api/users");

        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
            return [];
        }

        const data = await response.json();
        
        const rawUsers = Array.isArray(data) ? data : [];

        return rawUsers
            .filter(p => p[5] === 1) // Solo usuarios con ID_ROL = 1 (Estudiantes)
            .map(p => ({
                id_user: p[0],           
                first_name: p[1],        
                last_name: p[2] // Cambiado a minúscula 'l' para consistencia
            })); 

    } catch (error) {
        // Corregido el mensaje de error para que sea descriptivo
        console.error("Error cargando estudiantes:", error);
        return [];
    }
}