import { API_BASE_URL, getAuthHeaders, PROFILE_USER_IDS } from '$lib/components/Tokens.js';
import {
  getProjects,
  getUsers,
  ROLE_IDS,
  getStatusLabel,
  getUserFullName
} from '$lib/server/project-helpers.js';

const CURRENT_TEACHER_ID = Number(PROFILE_USER_IDS.teacher || 39);

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

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toISOString().split('T')[0];
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
  const modulesToTry = ['teacher', 'coordinator'];
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

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, users, relations] = await Promise.all([
      getProjects(fetch, 'teacher'),
      getUsers(fetch, 'teacher'),
      getProjectUsersFromApi(fetch)
    ]);

    const usersMap = new Map(
      users.map((user) => [Number(user.id_user), user])
    );

    const assignedProjectIds = new Set(
      relations
        .filter(
          (relation) =>
            Number(relation.id_role) === ROLE_IDS.teacher &&
            Number(relation.id_user) === CURRENT_TEACHER_ID
        )
        .map((relation) => Number(relation.id_project))
    );

    const teacherProjects = projects.filter((project) =>
      assignedProjectIds.has(Number(project.id_project))
    );

    const currentTeacher = usersMap.get(CURRENT_TEACHER_ID);

    const rows = teacherProjects.map((project) => {
      const projectName = escapeHtml(project.project_name ?? 'Unnamed');
      const description = escapeHtml(project.description ?? 'No description');
      const startDate = escapeHtml(project.start_date ?? 'Not defined');
      const status = escapeHtml(getStatusLabel(project.id_status));
      const teacherName = escapeHtml(
        currentTeacher ? getUserFullName(currentTeacher) : 'Current teacher'
      );

      return {
        proyecto_card: `
          <div class="project-card">
            <div class="project-card__left">
              <div class="project-card__icon">📁</div>

              <div class="project-card__content">
                <h3>${projectName}</h3>
                <p>${description}</p>

                <div class="project-card__meta">
                  <span><strong>Start date:</strong> ${startDate}</span>
                  <span><strong>Status:</strong> ${status}</span>
                  <span><strong>Teacher:</strong> ${teacherName}</span>
                </div>
              </div>
            </div>

            <div class="project-card__right">
              <span class="joined-badge">Assigned project</span>
            </div>
          </div>
        `
      };
    });

    return {
      rows,
      totalProjects: teacherProjects.length,
      currentTeacherId: CURRENT_TEACHER_ID
    };
  } catch (error) {
    return {
      rows: [],
      totalProjects: 0,
      currentTeacherId: CURRENT_TEACHER_ID,
      error: error.message || 'Could not load assigned projects.'
    };
  }
}