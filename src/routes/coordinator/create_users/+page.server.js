import { fail } from '@sveltejs/kit';
const API_BASE_URL = 'https://academic-project-management-api-rizs.onrender.com';
const USERS_ENDPOINT = `${API_BASE_URL}/api/users`;

const COORDINATOR_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJyb2xlIjoiQ29vcmRpbmF0b3IiLCJleHAiOjE3NzYxNDkzODd9.mBeu8YPFA5SokmHwg2_ftgVNnfUtvSQbIP0Ft4gIeE4';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();

		const first_name = formData.get('first_name')?.toString().trim() || '';
		const last_name = formData.get('last_name')?.toString().trim() || '';
		const email = formData.get('email')?.toString().trim() || '';
		const phone = formData.get('phone')?.toString().trim() || '';
		const password = formData.get('password')?.toString().trim() || '';
		const id_role = Number(formData.get('id_role'));
		const is_active = formData.get('is_active') === 'on';

		const values = {
			first_name,
			last_name,
			email,
			phone,
			id_role,
			is_active
		};

		if (!first_name || !last_name || !email || !phone || !password || !id_role) {
			return fail(400, {
				success: false,
				error: 'Todos los campos son obligatorios.',
				values
			});
		}

		if (![1, 3].includes(id_role)) {
			return fail(400, {
				success: false,
				error: 'El rol seleccionado no es válido. Solo se permite Estudiante o Profesor.',
				values
			});
		}

		const payload = {
			first_name,
			last_name,
			email,
			password_hash: password,
			phone,
			id_role,
			is_active
		};

		try {
			console.log('=== CREAR USUARIO ===');
			console.log('Payload enviado:', payload);

			const response = await fetch(USERS_ENDPOINT, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${COORDINATOR_TOKEN}`,
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const rawText = await response.text();

			console.log('Status API:', response.status);
			console.log('Respuesta cruda API:', rawText);

			let result = null;

			try {
				result = rawText ? JSON.parse(rawText) : null;
			} catch {
				result = { raw: rawText };
			}

			if (response.status === 401) {
				return fail(401, {
					success: false,
					error: 'No autorizado. El token del coordinador expiró o no es válido.',
					values
				});
			}

			if (!response.ok) {
				return fail(400, {
					success: false,
					error:
						result?.message ||
						result?.error ||
						result?.detail ||
						result?.raw ||
						`La API devolvió error ${response.status}.`,
					values
				});
			}

			return {
				success: true,
				message: 'Usuario creado correctamente.',
				createdUser: result
			};
		} catch (error) {
			console.error('Error real al crear usuario:', error);

			return fail(400, {
				success: false,
				error: 'Falló la conexión o el procesamiento del servidor.',
				values
			});
		}
	}
};