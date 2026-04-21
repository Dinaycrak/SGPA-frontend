import { fail, redirect } from '@sveltejs/kit';
import { API_BASE_URL, getAuthHeaders } from '$lib/components/Tokens.js';

const PROJECT_USER_TEACHER_ROLE_ID = 1;
const COORDINATOR_USER_ID = 5;

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const usersResponse = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders('coordinator')
    });

    const usersText = await usersResponse.text();
    const usersData = usersText ? JSON.parse(usersText) : [];

    const teachers = Array.isArray(usersData)
      ? usersData
          .map((user) => ({
            id_user: user?.id_user ?? user?.id ?? null,
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            email: user?.email ?? '',
            id_role: user?.id_role ?? null
          }))
          .filter((user) => Number(user.id_role) === 3)
      : [];

    return {
      teachers,
      statuses: [
        { id: 1, name: 'Activo' },
        { id: 2, name: 'Completado' },
        { id: 3, name: 'Pendiente' }
      ]
    };
  } catch (error) {
    return {
      teachers: [],
      statuses: [
        { id: 1, name: 'Activo' },
        { id: 2, name: 'Completado' },
        { id: 3, name: 'Pendiente' }
      ],
      error: error.message || 'No se pudo cargar la información del formulario'
    };
  }
}

function normalizeProject(project) {
  if (Array.isArray(project)) {
    return {
      id_project: project[0] ?? null,
      project_name: project[1] ?? '',
      description: project[2] ?? '',
      start_date: project[3] ?? '',
      end_date: project[4] ?? '',
      id_status: project[5] ?? null,
      id_research_group: project[6] ?? null,
      created_by: project[7] ?? null
    };
  }

  return {
    id_project: project?.id_project ?? project?.id ?? null,
    project_name: project?.project_name ?? '',
    description: project?.description ?? '',
    start_date: project?.start_date ?? '',
    end_date: project?.end_date ?? '',
    id_status: project?.id_status ?? null,
    id_research_group: project?.id_research_group ?? null,
    created_by: project?.created_by ?? null
  };
}

async function getAllProjects(fetch) {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    headers: getAuthHeaders('coordinator')
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  return Array.isArray(data) ? data.map(normalizeProject) : [];
}

function findExistingExactProject(projects, payload) {
  return (
    projects
      .filter(
        (project) =>
          String(project.project_name).trim() === String(payload.project_name).trim() &&
          String(project.description || '') === String(payload.description || '') &&
          String(project.start_date) === String(payload.start_date) &&
          String(project.end_date || '') === String(payload.end_date || '') &&
          Number(project.id_status) === Number(payload.id_status) &&
          Number(project.created_by) === Number(payload.created_by)
      )
      .sort((a, b) => Number(b.id_project) - Number(a.id_project))[0] ?? null
  );
}

async function assignTeacher(fetch, { id_project, id_user, assigned_date }) {
  const payloadCandidates = [
    {
      id_project,
      id_user,
      id_role: PROJECT_USER_TEACHER_ROLE_ID,
      assigned_date
    },
    {
      id_project,
      id_user,
      id_role: PROJECT_USER_TEACHER_ROLE_ID
    }
  ];

  let lastErrorMessage = '';

  for (const payload of payloadCandidates) {
    const response = await fetch(`${API_BASE_URL}/project-users`, {
      method: 'POST',
      headers: getAuthHeaders('coordinator'),
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    if (response.ok) {
      return true;
    }

    lastErrorMessage = `Endpoint project-users respondió ${response.status}. ${text}`;
  }

  throw new Error(lastErrorMessage || 'No se pudo registrar en project-users');
}

async function teacherAlreadyAssigned(fetch, { id_project, id_user }) {
  const response = await fetch(`${API_BASE_URL}/project-users`, {
    headers: getAuthHeaders('coordinator')
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!Array.isArray(data)) return false;

  return data.some((item) => {
    if (Array.isArray(item)) {
      return Number(item[1]) === Number(id_project) && Number(item[2]) === Number(id_user);
    }

    return (
      Number(item?.id_project) === Number(id_project) &&
      Number(item?.id_user) === Number(id_user)
    );
  });
}

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();

    const values = {
      project_name: String(formData.get('project_name') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      start_date: String(formData.get('start_date') || '').trim(),
      end_date: String(formData.get('end_date') || '').trim(),
      id_status: Number(formData.get('id_status') || 1),
      id_research_group: String(formData.get('id_research_group') || '').trim(),
      teacher_id: Number(formData.get('teacher_id') || 0)
    };

    if (!values.project_name || !values.start_date || !values.teacher_id) {
      return fail(400, {
        error: 'Debes completar nombre del proyecto, fecha de inicio y profesor asignado.',
        values
      });
    }

    const projectPayload = {
      project_name: values.project_name,
      description: values.description || null,
      start_date: values.start_date,
      end_date: values.end_date || null,
      id_status: Number(values.id_status),
      id_research_group: values.id_research_group
        ? Number(values.id_research_group)
        : null,
      created_by: COORDINATOR_USER_ID
    };

    try {
      let createdProjectId = null;

      const existingProjects = await getAllProjects(fetch);
      const existingExact = findExistingExactProject(existingProjects, projectPayload);

      if (existingExact?.id_project) {
        createdProjectId = Number(existingExact.id_project);
      } else {
        const createResponse = await fetch(`${API_BASE_URL}/projects`, {
          method: 'POST',
          headers: getAuthHeaders('coordinator'),
          body: JSON.stringify(projectPayload)
        });

        const createText = await createResponse.text();

        if (!createResponse.ok) {
          let backendMessage = createText;

          try {
            const parsed = JSON.parse(createText);
            backendMessage = parsed?.detail || createText;
          } catch (_) {}

          return fail(400, {
            error: `No se pudo crear el proyecto. Estado ${createResponse.status}. ${backendMessage}`,
            values
          });
        }

        let createdProjectResponse = null;

        try {
          createdProjectResponse = createText ? JSON.parse(createText) : null;
        } catch (_) {
          createdProjectResponse = null;
        }

        const normalized = normalizeProject(
          createdProjectResponse?.data ?? createdProjectResponse ?? {}
        );

        if (normalized?.id_project) {
          createdProjectId = Number(normalized.id_project);
        } else {
          const refreshedProjects = await getAllProjects(fetch);
          const latestMatch = findExistingExactProject(refreshedProjects, projectPayload);
          createdProjectId = latestMatch?.id_project ? Number(latestMatch.id_project) : null;
        }
      }

      if (!createdProjectId) {
        return fail(400, {
          error: 'El proyecto se creó, pero no se pudo recuperar el id_project para asignar el docente.',
          values
        });
      }

      const alreadyAssigned = await teacherAlreadyAssigned(fetch, {
        id_project: createdProjectId,
        id_user: Number(values.teacher_id)
      });

      if (!alreadyAssigned) {
        await assignTeacher(fetch, {
          id_project: createdProjectId,
          id_user: Number(values.teacher_id),
          assigned_date: values.start_date
        });
      }

      throw redirect(303, '/coordinator/projects');
    } catch (error) {
      if (error?.status === 303) {
        throw error;
      }

      return fail(500, {
        error: error.message || 'Error interno al crear el proyecto o asignar el docente',
        values
      });
    }
  }
};