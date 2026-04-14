/** @type {import('./$types').PageServerLoad} */
import { getAuthHeaders, getUserEndpoint } from "../../../lib/components/Tokens";

export async function load({ fetch }) {
    const USER_API_URL = getUserEndpoint("teacher");

    try {
        const response = await fetch(USER_API_URL, {
            headers: getAuthHeaders("teacher")
        });

        if (response.status === 401) {
            return {
                user: {},
                error: "Sesión expirada o no autorizada."
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
    } catch (error) {
        return {
            user: {},
            error: "Error de conexión con el servidor."
        };
    }
}