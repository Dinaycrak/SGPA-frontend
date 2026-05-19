<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';

  export let data;
  export let form;

  function fullName(user) {
    if (!user) return 'Unassigned';
    return `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'Unnamed user';
  }

  function formatDate(value) {
    if (!value) return 'Not defined';
    return String(value).split('T')[0];
  }

  function confirmStatusChange(event) {
    if (!confirm('Do you want to update the project status?')) {
      event.preventDefault();
    }
  }

  function confirmTeacherAssign(event) {
    if (!confirm('Do you want to assign this teacher to the project?')) {
      event.preventDefault();
    }
  }

  function confirmCancelProject(event) {
    if (!confirm('This action will cancel the project. Do you want to continue?')) {
      event.preventDefault();
    }
  }

  function confirmReactivateProject(event) {
    if (!confirm('This action will reactivate the project as Active. Do you want to continue?')) {
      event.preventDefault();
    }
  }

  $: project = data?.project;
  $: assignedTeacher = data?.assignedTeacher || null;
  $: enrolledStudents = data?.enrolledStudents || [];
  $: teachers = data?.teachers || [];
  $: actionStatuses = data?.actionStatuses || [];
  $: isProjectCancelled = Boolean(data?.isProjectCancelled);
  $: error = form?.error || data?.error || '';
  $: successMessage = form?.message || '';
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    <header class="main-header">
      <div>
        <span class="eyebrow">Coordinator module</span>
        <h1>Manage project</h1>
        <p>Review project details, participants, status, and teacher assignment.</p>
      </div>

      <a href="/coordinator/projects" class="secondary-link">Back</a>
    </header>

    {#if successMessage}
      <div class="success-box">✅ {successMessage}</div>
    {/if}

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    {#if project}
      <div class="detail-layout">
        <section class="project-panel">
          <div class="panel-heading">
            <div class="project-icon">📁</div>
            <div>
              <span class="eyebrow small">Project information</span>
              <h2>{project.project_name || 'Unnamed project'}</h2>
              <span class="status-pill" class:cancelled={isProjectCancelled}>
                {data.statusLabel || 'Unknown'}
              </span>
            </div>
          </div>

          <p class="description">{project.description || 'No description available.'}</p>

          <div class="info-grid">
            <div class="info-item">
              <span>Start date</span>
              <strong>{formatDate(project.start_date)}</strong>
            </div>

            <div class="info-item">
              <span>End date</span>
              <strong>{formatDate(project.end_date)}</strong>
            </div>

            <div class="info-item">
              <span>Assigned teacher</span>
              <strong>{fullName(assignedTeacher)}</strong>
            </div>

            <div class="info-item">
              <span>Enrolled students</span>
              <strong>{enrolledStudents.length}</strong>
            </div>

            <div class="info-item">
              <span>Project ID</span>
              <strong>{project.id_project}</strong>
            </div>

            <div class="info-item">
              <span>Research group</span>
              <strong>{project.id_research_group || 'N/A'}</strong>
            </div>
          </div>
        </section>

        <aside class="actions-panel">
          <span class="eyebrow small">Coordinator actions</span>
          <h2>Project controls</h2>

          {#if isProjectCancelled}
            <div class="action-block">
              <h3>Reactivate project</h3>
              <p>
                This project is currently cancelled. You can reactivate it and its status
                will return to Active.
              </p>

              <form method="POST" action="?/reactivateProject" onsubmit={confirmReactivateProject}>
                <button type="submit" class="reactivate-btn">Reactivate project</button>
              </form>
            </div>
          {:else}
            <div class="action-block">
              <h3>Change status</h3>
              <p>
                Select a new status for this project. Cancellation is handled separately
                with the red cancel button.
              </p>

              <form method="POST" action="?/updateStatus" onsubmit={confirmStatusChange}>
                <label for="statusId">Project status</label>

                <select id="statusId" name="statusId" required>
                  <option value="">Select status</option>
                  {#each actionStatuses as status}
                    <option
                      value={status.id_status}
                      selected={Number(status.id_status) === Number(project.id_status)}
                    >
                      {status.status_name}
                    </option>
                  {/each}
                </select>

                <button type="submit" class="primary-btn">Update status</button>
              </form>
            </div>

            <div class="action-block danger-zone">
              <h3>Cancel project</h3>
              <p>
                Cancelling a project should only be done when it must stop being active.
                This option is reserved for the coordinator.
              </p>

              <form method="POST" action="?/cancelProject" onsubmit={confirmCancelProject}>
                <button type="submit" class="danger-btn">Cancel project</button>
              </form>
            </div>
          {/if}

          <div class="action-block">
            <h3>{assignedTeacher ? 'Change teacher' : 'Assign teacher'}</h3>

            {#if assignedTeacher}
              <p>
                Current teacher:
                <strong>{fullName(assignedTeacher)}</strong>.
                If the deployed API does not allow replacing project-users, this action may require a backend update.
              </p>
            {:else}
              <p>This project does not have a teacher assigned yet.</p>
            {/if}

            <form method="POST" action="?/assignTeacher" onsubmit={confirmTeacherAssign}>
              <label for="teacherId">Available teachers</label>

              <select id="teacherId" name="teacherId" required>
                <option value="">Select teacher</option>
                {#each teachers as teacher}
                  <option
                    value={teacher.id_user}
                    selected={assignedTeacher && Number(teacher.id_user) === Number(assignedTeacher.id_user)}
                  >
                    {fullName(teacher)} - {teacher.email}
                  </option>
                {/each}
              </select>

              <button type="submit" class="primary-btn">
                {assignedTeacher ? 'Change teacher' : 'Assign teacher'}
              </button>
            </form>
          </div>
        </aside>
      </div>

      <section class="participants-panel">
        <div class="section-title">
          <div>
            <span class="eyebrow small">Participants</span>
            <h2>Project team</h2>
          </div>

          <span class="count-badge">{enrolledStudents.length + (assignedTeacher ? 1 : 0)} people</span>
        </div>

        <div class="participant-block">
          <h3>Assigned teacher</h3>

          {#if assignedTeacher}
            <article class="participant-card teacher">
              <div class="avatar">T</div>
              <div>
                <strong>{fullName(assignedTeacher)}</strong>
                <span>{assignedTeacher.email || 'No email registered'}</span>
              </div>
            </article>
          {:else}
            <div class="empty-box">No teacher has been assigned yet.</div>
          {/if}
        </div>

        <div class="participant-block">
          <h3>Enrolled students</h3>

          {#if enrolledStudents.length > 0}
            <div class="students-list">
              {#each enrolledStudents as student}
                <article class="participant-card">
                  <div class="avatar">S</div>
                  <div>
                    <strong>{fullName(student)}</strong>
                    <span>{student.email || 'No email registered'}</span>
                  </div>
                </article>
              {/each}
            </div>
          {:else}
            <div class="empty-box">No students enrolled yet.</div>
          {/if}
        </div>
      </section>
    {:else if !error}
      <section class="empty-state">
        <div>📭</div>
        <h2>Project not found</h2>
        <p>The requested project could not be loaded.</p>
      </section>
    {/if}
  </div>
</main>

<Footer />

<style>
  main {
    min-height: 80vh;
    padding: 2rem 1rem 3rem;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.12), transparent 22rem),
      linear-gradient(180deg, #ffffff 0%, var(--sgpa-bg) 100%);
  }

  .content-wrapper {
    max-width: 1180px;
    margin: 0 auto;
  }

  .main-header,
  .project-panel,
  .actions-panel,
  .participants-panel,
  .empty-state {
    border-radius: 28px;
    border: 1px solid var(--sgpa-border);
    background: #ffffff;
    box-shadow: var(--sgpa-shadow-md);
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 1.4rem;
    padding: 1.6rem;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.16), transparent 18rem),
      linear-gradient(135deg, #ffffff 0%, var(--sgpa-blue-soft) 100%);
  }

  .eyebrow {
    display: inline-flex;
    width: fit-content;
    margin-bottom: 0.75rem;
    padding: 0.42rem 0.8rem;
    border-radius: 999px;
    background: var(--sgpa-yellow-soft);
    color: var(--sgpa-blue);
    font-size: 0.78rem;
    font-weight: 950;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid rgba(242, 183, 5, 0.28);
  }

  .eyebrow.small {
    margin-bottom: 0.55rem;
    font-size: 0.72rem;
  }

  .main-header h1,
  .project-panel h2,
  .actions-panel h2,
  .participants-panel h2,
  .empty-state h2 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-weight: 950;
    letter-spacing: -0.04em;
  }

  .main-header h1 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .main-header p,
  .description,
  .actions-panel p,
  .empty-state p {
    color: var(--sgpa-text-soft);
    line-height: 1.7;
  }

  .main-header p {
    max-width: 720px;
    margin: 0.7rem 0 0;
  }

  .secondary-link,
  .primary-btn,
  .danger-btn,
  .reactivate-btn {
    min-height: 44px;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    font-weight: 950;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .secondary-link {
    color: var(--sgpa-blue);
    background: #ffffff;
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-sm);
  }

  .primary-btn {
    width: 100%;
    margin-top: 1rem;
    border: none;
    color: #ffffff;
    background: linear-gradient(135deg, var(--sgpa-blue), var(--sgpa-blue-mid));
    cursor: pointer;
  }

  .danger-btn {
    width: 100%;
    margin-top: 1rem;
    border: none;
    color: #ffffff;
    background: linear-gradient(135deg, #b91c1c, #ef4444);
    cursor: pointer;
  }

  .reactivate-btn {
    width: 100%;
    margin-top: 1rem;
    border: none;
    color: #ffffff;
    background: linear-gradient(135deg, #15803d, #22c55e);
    cursor: pointer;
  }

  .primary-btn:hover,
  .danger-btn:hover,
  .reactivate-btn:hover,
  .secondary-link:hover {
    transform: translateY(-1px);
  }

  .detail-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(310px, 400px);
    gap: 1.2rem;
    align-items: start;
  }

  .project-panel,
  .actions-panel,
  .participants-panel,
  .empty-state {
    padding: 1.5rem;
  }

  .panel-heading {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 1.1rem;
  }

  .project-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    display: grid;
    place-items: center;
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue);
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .project-panel h2,
  .actions-panel h2,
  .participants-panel h2 {
    font-size: clamp(1.45rem, 3vw, 2.15rem);
  }

  .status-pill,
  .count-badge {
    display: inline-flex;
    width: fit-content;
    margin-top: 0.7rem;
    padding: 0.42rem 0.82rem;
    border-radius: 999px;
    color: var(--sgpa-blue);
    background: var(--sgpa-blue-soft);
    border: 1px solid rgba(11, 45, 105, 0.12);
    font-size: 0.82rem;
    font-weight: 950;
  }

  .status-pill.cancelled {
    color: #991b1b;
    background: #fee2e2;
    border-color: #fecaca;
  }

  .description {
    margin: 0 0 1.25rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .info-item,
  .empty-box,
  .participant-card {
    border-radius: 18px;
    background: var(--sgpa-bg);
    border: 1px solid var(--sgpa-border);
  }

  .info-item {
    padding: 1rem;
  }

  .info-item span {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--sgpa-text-soft);
    font-size: 0.82rem;
    font-weight: 850;
  }

  .info-item strong {
    display: block;
    color: var(--sgpa-blue-dark);
    font-weight: 950;
    word-break: break-word;
  }

  .actions-panel {
    position: sticky;
    top: 1rem;
  }

  .action-block {
    margin-top: 1.15rem;
    padding-top: 1.15rem;
    border-top: 1px solid var(--sgpa-border);
  }

  .action-block:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .danger-zone {
    border-top-color: #fecaca;
  }

  .action-block h3 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: 1rem;
    font-weight: 950;
  }

  label {
    display: block;
    margin: 0.85rem 0 0.4rem;
    color: var(--sgpa-blue-dark);
    font-weight: 950;
    font-size: 0.88rem;
  }

  select {
    width: 100%;
    min-height: 44px;
    border-radius: 14px;
    border: 1px solid var(--sgpa-border);
    background: #ffffff;
    color: var(--sgpa-blue-dark);
    padding: 0.7rem 0.85rem;
    outline: none;
    font-weight: 750;
  }

  select:focus {
    border-color: var(--sgpa-blue);
    box-shadow: 0 0 0 4px rgba(11, 45, 105, 0.1);
  }

  .participants-panel {
    margin-top: 1.2rem;
  }

  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .participant-block + .participant-block {
    margin-top: 1.25rem;
  }

  .participant-block h3 {
    margin: 0 0 0.8rem;
    color: var(--sgpa-blue-dark);
    font-size: 1rem;
    font-weight: 950;
  }

  .students-list {
    display: grid;
    gap: 0.75rem;
  }

  .participant-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.9rem;
  }

  .participant-card.teacher {
    background: var(--sgpa-blue-soft);
    border-color: rgba(11, 45, 105, 0.16);
  }

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: var(--sgpa-blue);
    color: #ffffff;
    font-weight: 950;
    flex-shrink: 0;
  }

  .participant-card strong {
    display: block;
    color: var(--sgpa-blue-dark);
    font-weight: 950;
  }

  .participant-card span {
    display: block;
    margin-top: 0.2rem;
    color: var(--sgpa-text-soft);
    font-size: 0.88rem;
  }

  .empty-box {
    padding: 0.9rem;
    color: var(--sgpa-text-soft);
    border-style: dashed;
    font-weight: 750;
  }

  .success-box,
  .error-msg {
    margin-bottom: 1rem;
  }

  .empty-state {
    text-align: center;
  }

  .empty-state div {
    font-size: 2.2rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 980px) {
    .detail-layout {
      grid-template-columns: 1fr;
    }

    .actions-panel {
      position: static;
    }
  }

  @media (max-width: 720px) {
    .main-header,
    .panel-heading,
    .section-title {
      align-items: flex-start;
      flex-direction: column;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }
  }
</style>