import { PROFILE_USER_IDS } from '$lib/components/Tokens.js';
import {
  getProjects,
  getUsers,
  getProjectUsers,
  ROLE_IDS,
  getStatusLabel
} from '$lib/server/project-helpers.js';

const CURRENT_TEACHER_ID = Number(PROFILE_USER_IDS.teacher || 39);

function getStudentsAssignedToProject(relations = [], users = [], projectId) {
  const studentIds = new Set(
    relations
      .filter(
        (relation) =>
          Number(relation.id_project) === Number(projectId) &&
          Number(relation.id_role) === ROLE_IDS.student
      )
      .map((relation) => Number(relation.id_user))
  );

  return users.filter((user) => studentIds.has(Number(user.id_user)));
}

function getTeacherAssignedToProject(relations = [], users = [], projectId) {
  const relation = relations.find(
    (item) =>
      Number(item.id_project) === Number(projectId) &&
      Number(item.id_role) === ROLE_IDS.teacher
  );

  if (!relation) return null;

  return users.find((user) => Number(user.id_user) === Number(relation.id_user)) ?? null;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
  const projectId = Number(params.id);

  if (!projectId) {
    return {
      projectId: params.id,
      currentTeacherId: CURRENT_TEACHER_ID,
      error: 'Invalid project ID.'
    };
  }

  try {
    const [projects, users, relations] = await Promise.all([
      getProjects(fetch, 'teacher'),
      getUsers(fetch, 'teacher'),
      getProjectUsers(fetch, 'teacher').catch(() => [])
    ]);

    const project = projects.find((item) => Number(item.id_project) === projectId) ?? null;

    if (!project) {
      return {
        projectId,
        currentTeacherId: CURRENT_TEACHER_ID,
        error: 'Project not found.'
      };
    }

    const assignedTeacher = getTeacherAssignedToProject(relations, users, projectId);
    const enrolledStudents = getStudentsAssignedToProject(relations, users, projectId);

    const isAssignedToCurrentTeacher = relations.some(
      (relation) =>
        Number(relation.id_project) === projectId &&
        Number(relation.id_user) === CURRENT_TEACHER_ID &&
        Number(relation.id_role) === ROLE_IDS.teacher
    );

    return {
      projectId,
      project,
      currentTeacherId: CURRENT_TEACHER_ID,
      assignedTeacher,
      enrolledStudents,
      statusLabel: getStatusLabel(project.id_status),
      isAssignedToCurrentTeacher
    };
  } catch (error) {
    return {
      projectId,
      currentTeacherId: CURRENT_TEACHER_ID,
      error: error.message || 'Could not load project details.'
    };
  }
}