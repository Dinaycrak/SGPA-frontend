import { fail, redirect } from '@sveltejs/kit';
import { API_BASE_URL, getAuthHeaders, PROFILE_USER_IDS } from '$lib/components/Tokens.js';

const PROJECT_USER_TEACHER_ROLE_ID = 3;
const COORDINATOR_USER_ID = 5;
const DEFAULT_TEACHER_ID = Number(PROFILE_USER_IDS.teacher || 39);
const DEFAULT_RESEARCH_GROUP_ID = 1;

const DEFAULT_STATUSES = [
  { id: 1, name: 'Activo' },
  { id: 2, name: 'Completado' },
  { id: 3, name: 'Pendiente' }
];

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
          .filter((user) => Number(user.id_role) === PROJECT_USER_TEACHER_ROLE_ID)
      : [];

    return {
      teachers,
      defaultTeacherId: DEFAULT_TEACHER_ID,
      defaultResearchGroupId: DEFAULT_RESEARCH_GROUP_ID,
      statuses: DEFAULT_STATUSES
    };
  } catch (error) {
    return {
      teachers: [],
      defaultTeacherId: DEFAULT_TEACHER_ID,
      defaultResearchGroupId: DEFAULT_RESEARCH_GROUP_ID,
      statuses: DEFAULT_STATUSES,
      error: error.message || 'No se pudo cargar la información del formulario'
    };
  }
}

function normalizeDate(dateValue) {
  if (!dateValue) return '';

  const value = String(dateValue).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toISOString().split('T')[0];
}

function normalizeProject(project) {
  if (Array.isArray(project)) {
    return {
      id_project: project[0] ?? null,
      project_name: project[1] ?? '',
      description: project[2] ?? '',
      start_date: normalizeDate(project[3]),
      end_date: normalizeDate(project[4]),
      id_status: project[5] ?? null,
      id_research_group: project[6] ?? null,
      created_by: project[7] ?? null
    };
  }

  return {
    id_project: project?.id_project ?? project?.id ?? null,
    project_name: project?.project_name ?? '',
    description: project?.description ?? '',
    start_date: normalizeDate(project?.start_date),
    end_date: normalizeDate(project?.end_date),
    id_status: project?.id_status ?? null,
    id_research_group: project?.id_research_group ?? null,
    created_by: project?.created_by ?? null
  };
}

function normalizeProjectUser(item) {
  if (Array.isArray(item)) {
    return {
      id_project_user: item[0] ?? null,
      id_project: item[1] ?? null,
      id_user: item[2] ?? null,
      id_role: item[3] ?? null,
      assigned_date: normalizeDate(item[4] ?? '')
    };
  }

  return {
    id_project_user: item?.id_project_user ?? item?.id ?? null,
    id_project: item?.id_project ?? null,
    id_user: item?.id_user ?? null,
    id_role: item?.id_role ?? null,
    assigned_date: normalizeDate(item?.assigned_date ?? '')
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

async function getAllProjectUsers(fetch) {
  const response = await fetch(`${API_BASE_URL}/project-users`, {
    headers: getAuthHeaders('coordinator')
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(`No se pudo consultar project-users. Estado ${response.status}. ${text}`);
  }

  return Array.isArray(data) ? data.map(normalizeProjectUser) : [];
}

function findExistingExactProject(projects, payload) {
  return (
    projects
      .filter(
        (project) =>
          String(project.project_name).trim() === String(payload.project_name).trim() &&
          String(project.description || '').trim() === String(payload.description || '').trim() &&
          String(normalizeDate(project.start_date)) === String(normalizeDate(payload.start_date)) &&
          String(normalizeDate(project.end_date || '')) ===
            String(normalizeDate(payload.end_date || '')) &&
          Number(project.id_status) === Number(payload.id_status) &&
          Number(project.created_by) === Number(payload.created_by)
      )
      .sort((a, b) => Number(b.id_project) - Number(a.id_project))[0] ?? null
  );
}

async function ensureTeacherAssigned(fetch, { id_project, id_user, assigned_date }) {
  const payload = {
    id_project: Number(id_project),
    id_user: Number(id_user),
    id_role: PROJECT_USER_TEACHER_ROLE_ID,
    assigned_date
  };

  const createResponse = await fetch(`${API_BASE_URL}/project-users`, {
    method: 'POST',
    headers: getAuthHeaders('coordinator'),
    body: JSON.stringify(payload)
  });

  const createText = await createResponse.text();

  if (!createResponse.ok) {
    throw new Error(
      `No se pudo registrar el profesor en project-users. Estado ${createResponse.status}. Respuesta: ${createText}`
    );
  }

  const relations = await getAllProjectUsers(fetch);

  const exists = relations.some(
    (relation) =>
      Number(relation.id_project) === Number(id_project) &&
      Number(relation.id_user) === Number(id_user) &&
      Number(relation.id_role) === PROJECT_USER_TEACHER_ROLE_ID
  );

  if (!exists) {
    throw new Error(
      `La API respondió OK al registrar el profesor, pero la relación no aparece en /project-users.`
    );
  }

  return true;
}

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const teacherRaw = formData.get('teacher_id');
    const researchGroupRaw = formData.get('id_research_group');

    const values = {
      project_name: String(formData.get('project_name') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      start_date: normalizeDate(formData.get('start_date')),
      end_date: normalizeDate(formData.get('end_date')),
      id_status: Number(formData.get('id_status') || 1),
      id_research_group: researchGroupRaw
        ? Number(researchGroupRaw)
        : DEFAULT_RESEARCH_GROUP_ID,
      teacher_id: teacherRaw ? Number(teacherRaw) : DEFAULT_TEACHER_ID
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
      id_research_group: Number(values.id_research_group),
      created_by: COORDINATOR_USER_ID
    };

    try {
      let createdProjectId = null;

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
          backendMessage = parsed?.detail || parsed?.message || createText;
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

      if (!createdProjectId) {
        return fail(400, {
          error: 'El proyecto se creó, pero no se pudo recuperar el id_project para asignar el docente.',
          values
        });
      }

      await ensureTeacherAssigned(fetch, {
        id_project: createdProjectId,
        id_user: Number(values.teacher_id),
        assigned_date: values.start_date
      });

      throw redirect(303, '/coordinator/projects');
    } catch (error) {
      if (error?.status === 303) throw error;

      return fail(500, {
        error: error.message || 'Error interno al crear el proyecto o asignar el docente',
        values
      });
    }
  }
};