/** @type {import('./$types').PageServerLoad} */

import { token_teacher } from "../../../lib/components/Tokens";

export async function load({ fetch }) {
    const USER_API_URL = "https://academic-project-management-api-2.onrender.com/docs";

    const token = token_teacher
    // Token temporal del docente mientras se implementa el login real

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