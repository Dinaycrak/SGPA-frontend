/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const USER_API_URL = "https://academic-project-management-api-rizs.onrender.com/api/users/39";

    // Token temporal del docente mientras se implementa el login real
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozOSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTc3NjE1MTIzN30.FwzFnEoi-mj5Pro0V6O7P16P6XgQHz0CDwY76xd97VY";

    try {
        const response = await fetch(USER_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            return {
                user: {},
                error: "Sesión expirada o no autorizada. Por favor inicia sesión."
            };
        }

        if (!response.ok) {
            return {
                user: {},
                error: `Error de API: ${response.status}`
            };
        }

        const data = await response.json();

        const user = {
            id_user: data.id_user,
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            id_role: data.id_role,
            is_active: data.is_active
        };

        return { user };
    } catch (e) {
        return {
            user: {},
            error: "Error de conexión con el servidor."
        };
    }
}