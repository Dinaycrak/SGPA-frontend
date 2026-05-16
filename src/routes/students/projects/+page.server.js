import { PROFILE_USER_IDS } from '$lib/components/Tokens.js';
import {
  getProjects,
  getUsers,
  getProjectUsers,
  ROLE_IDS,
  getStatusLabel,
  getUserFullName,
  getStatuses,
  buildProjectCardHtml
} from '$lib/server/project-helpers.js';

const CURRENT_STUDENT_ID = Number(PROFILE_USER_IDS.students || PROFILE_USER_IDS.student || 37);

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const [projects, users, relations, statuses] = await Promise.all([
      getProjects(fetch, 'students'),
      getUsers(fetch, 'students'),
      getProjectUsers(fetch, 'students').catch(() => []),
      getStatuses(fetch, 'students')
    ]);

    const usersMap = new Map(users.map((user) => [Number(user.id_user), user]));
    const enrolledProjectIds = new Set(
      relations
        .filter(
          (relation) =>
            Number(relation.id_role) === ROLE_IDS.student &&
            Number(relation.id_user) === CURRENT_STUDENT_ID
        )
        .map((relation) => Number(relation.id_project))
    );

    const teacherByProject = new Map();

    for (const relation of relations) {
      if (Number(relation.id_role) === ROLE_IDS.teacher) {
        teacherByProject.set(Number(relation.id_project), Number(relation.id_user));
      }
    }

    const rows = projects.map((project) => {
      const isEnrolled = enrolledProjectIds.has(Number(project.id_project));
      const teacherId = teacherByProject.get(Number(project.id_project));
      const teacher = teacherId ? usersMap.get(Number(teacherId)) : null;

      return {
        proyecto_card: buildProjectCardHtml({
          project,
          statusLabel: getStatusLabel(project.id_status, statuses),
          teacherName: teacher ? getUserFullName(teacher) : 'Unassigned',
          actionHref: `/students/view_project/${project.id_project}?source=available`,
          actionLabel: isEnrolled ? 'View project' : 'Enroll in project',
          badgeLabel: isEnrolled ? 'Already enrolled' : 'Available',
          badgeClass: isEnrolled ? 'joined-badge' : 'neutral-badge'
        })
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