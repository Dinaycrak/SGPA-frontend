import { PROFILE_USER_IDS } from '$lib/components/Tokens.js';
import {
  getProjects,
  getUsers,
  getProjectUsers,
  ROLE_IDS,
  getStatusLabel,
  getUserFullName
} from '$lib/server/project-helpers.js';

const CURRENT_TEACHER_ID = Number(PROFILE_USER_IDS.teacher || 39);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildProjectCardHtml({
  project,
  statusLabel = 'Unknown',
  teacherName = 'Current teacher',
  actionHref = '#',
  actionLabel = 'View project',
  badgeLabel = 'Assigned project'
}) {
  const projectName = escapeHtml(project?.project_name ?? 'Unnamed');
  const description = escapeHtml(project?.description ?? 'No description');
  const startDate = escapeHtml(project?.start_date || 'Not defined');
  const endDate = escapeHtml(project?.end_date || 'Not defined');
  const status = escapeHtml(statusLabel);
  const teacher = escapeHtml(teacherName);
  const href = escapeHtml(actionHref);
  const actionText = escapeHtml(actionLabel);
  const badge = escapeHtml(badgeLabel);

  return `
    <div class="project-card">
      <div class="project-card__left">
        <div class="project-card__icon">📁</div>

        <div class="project-card__content">
          <h3>${projectName}</h3>
          <p>${description}</p>

          <div class="project-card__meta">
            <span><strong>Start date:</strong> ${startDate}</span>
            <span><strong>End date:</strong> ${endDate}</span>
            <span><strong>Status:</strong> ${status}</span>
            <span><strong>Teacher:</strong> ${teacher}</span>
          </div>
        </div>
      </div>

      <div class="project-card__right" style="gap:.75rem;flex-wrap:wrap;">
        <span class="joined-badge">${badge}</span>
        <a href="${href}" class="action-btn" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;padding:.72rem 1rem;min-height:42px;">${actionText}</a>
      </div>
    </div>
  `;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, users, relations] = await Promise.all([
      getProjects(fetch, 'teacher'),
      getUsers(fetch, 'teacher'),
      getProjectUsers(fetch, 'teacher')
    ]);

    const usersMap = new Map(users.map((user) => [Number(user.id_user), user]));

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

    const rows = teacherProjects.map((project) => ({
      proyecto_card: buildProjectCardHtml({
        project,
        statusLabel: getStatusLabel(project.id_status),
        teacherName: currentTeacher ? getUserFullName(currentTeacher) : 'Current teacher',
        actionHref: `/teacher/view_project/${project.id_project}`,
        actionLabel: 'View project',
        badgeLabel: 'Assigned project'
      })
    }));

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