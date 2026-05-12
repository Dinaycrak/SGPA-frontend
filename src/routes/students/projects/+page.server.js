import { fail } from '@sveltejs/kit';
import { API_BASE_URL, getAuthHeaders, PROFILE_USER_IDS } from '$lib/components/Tokens.js';
import {
  getProjects,
  getStatusLabel
} from '$lib/server/project-helpers.js';

const STUDENT_ROLE_ID = 1;

const CURRENT_STUDENT_ID = Number(
  PROFILE_USER_IDS.students ||
  PROFILE_USER_IDS.student ||
  37
);

function parseJsonSafe(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

function normalizeDate(dateValue) {
  if (!dateValue) return '';

  const value = String(dateValue).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return value.split('T')[0];
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toISOString().split('T')[0];
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function normalizeProjectUser(item) {
  if (Array.isArray(item)) {
    const possibleRole = item[3];
    const possibleDate = item[4];

    const thirdPositionLooksLikeDate =
      typeof possibleRole === 'string' && /^\d{4}-\d{2}-\d{2}/.test(possibleRole);

    return {
      id_project_user: item[0] ?? null,
      id_project: item[1] ?? null,
      id_user: item[2] ?? null,
      assigned_date: thirdPositionLooksLikeDate
        ? normalizeDate(item[3])
        : normalizeDate(item[4]),
      id_role: thirdPositionLooksLikeDate
        ? item[4] ?? null
        : item[3] ?? null
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

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function getProjectUsersFromApi(fetch) {
  const modulesToTry = ['students', 'student', 'coordinator'];
  let lastError = null;

  for (const moduleName of modulesToTry) {
    try {
      const response = await fetch(`${API_BASE_URL}/project-users`, {
        headers: getAuthHeaders(moduleName)
      });

      const text = await response.text();
      const data = parseJsonSafe(text) ?? [];

      if (!response.ok) {
        lastError = new Error(
          `Could not load project-users. Status ${response.status}. ${text}`
        );
        continue;
      }

      return Array.isArray(data) ? data.map(normalizeProjectUser) : [];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Could not load project-users.');
}

async function relationAlreadyExists(fetch, { id_project, id_user }) {
  try {
    const relations = await getProjectUsersFromApi(fetch);

    return relations.some(
      (relation) =>
        Number(relation.id_project) === Number(id_project) &&
        Number(relation.id_user) === Number(id_user) &&
        Number(relation.id_role) === STUDENT_ROLE_ID
    );
  } catch (_) {
    return false;
  }
}

async function assignStudentToProject(fetch, { id_project, id_user }) {
  const payload = {
    id_project: Number(id_project),
    id_user: Number(id_user),
    id_role: STUDENT_ROLE_ID,
    assigned_date: getTodayDate()
  };

  const alreadyExists = await relationAlreadyExists(fetch, payload);

  if (alreadyExists) {
    return true;
  }

  const modulesToTry = ['students', 'student', 'coordinator'];
  let lastError = null;

  for (const moduleName of modulesToTry) {
    try {
      const response = await fetch(`${API_BASE_URL}/project-users`, {
        method: 'POST',
        headers: getAuthHeaders(moduleName),
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      if (!response.ok) {
        lastError = new Error(
          `Could not enroll the student in the project. Status ${response.status}. Response: ${text}`
        );
        continue;
      }

      return true;
    } catch (error) {
      lastError = error;
    }
  }

  const existsAfterError = await relationAlreadyExists(fetch, payload);

  if (existsAfterError) {
    return true;
  }

  throw lastError || new Error('Could not enroll the student in the project.');
}

function buildProjectCard(project, isEnrolled) {
  const projectName = escapeHtml(project.project_name ?? 'Unnamed');
  const description = escapeHtml(project.description ?? 'No description');
  const startDate = escapeHtml(project.start_date ?? 'Not defined');
  const status = escapeHtml(getStatusLabel(project.id_status));
  const projectId = escapeHtml(project.id_project ?? '');

  const rightContent = isEnrolled
    ? `<span class="joined-badge">Already enrolled</span>`
    : `
      <form method="POST" class="inline-form">
        <input type="hidden" name="id_project" value="${projectId}" />
        <button type="submit" class="action-btn">Enter project</button>
      </form>
    `;

  return `
    <div class="project-card">
      <div class="project-card__left">
        <div class="project-card__icon">📁</div>

        <div class="project-card__content">
          <h3>${projectName}</h3>
          <p>${description}</p>

          <div class="project-card__meta">
            <span><strong>Start date:</strong> ${startDate}</span>
            <span><strong>Status:</strong> ${status}</span>
          </div>
        </div>
      </div>

      <div class="project-card__right">
        ${rightContent}
      </div>
    </div>
  `;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, relations] = await Promise.all([
      getProjects(fetch, 'students'),
      getProjectUsersFromApi(fetch).catch(() => [])
    ]);

    const enrolledProjectIds = new Set(
      relations
        .filter(
          (relation) =>
            Number(relation.id_role) === STUDENT_ROLE_ID &&
            Number(relation.id_user) === CURRENT_STUDENT_ID
        )
        .map((relation) => Number(relation.id_project))
    );

    const rows = projects.map((project) => {
      const isEnrolled = enrolledProjectIds.has(Number(project.id_project));

      return {
        proyecto_card: buildProjectCard(project, isEnrolled)
      };
    });

    return {
      rows,
      totalProjects: projects.length,
      currentStudentId: CURRENT_STUDENT_ID
    };
  } catch (error) {
    return {
      rows: [],
      totalProjects: 0,
      currentStudentId: CURRENT_STUDENT_ID,
      error: error.message || 'Error loading available projects.'
    };
  }
}

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();

    const idProject = Number(formData.get('id_project'));

    if (!idProject) {
      return fail(400, {
        error: 'Invalid project.'
      });
    }

    if (!CURRENT_STUDENT_ID) {
      return fail(400, {
        error: 'Invalid student.'
      });
    }

    try {
      await assignStudentToProject(fetch, {
        id_project: idProject,
        id_user: CURRENT_STUDENT_ID
      });

      return {
        success: true,
        message: 'The student was successfully enrolled in the project.'
      };
    } catch (error) {
      return fail(500, {
        error: error.message || 'Could not enroll the student in the project.'
      });
    }
  }
};