<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DashboardStats from '$lib/components/Projects.svelte';
  import SideBar from '$lib/components/StudentSideBar.svelte';

  export let data;

  $: projects = data.projects || [];
  $: error = data.error;

  $: stats = [
    {
      label: 'Available records',
      value: projects.length,
      icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M4 11h16M5 5h14a2 2 0 0 1 2 2v14H3V7a2 2 0 0 1 2-2z"></path></svg>`,
      bgColor: 'var(--sgpa-blue-soft)',
      color: 'var(--sgpa-blue)'
    }
  ];

  function handleEnrollment() {
    alert('The enrollment feature requires real login. It is not currently available.');
  }
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    <header class="main-header">
      <div>
        <span class="eyebrow">Student module</span>
        <h1>Schedules and activities</h1>
        <p>
          Temporary view of related activities and projects. This section can later be adapted
          to scheduled deliveries or an academic timeline.
        </p>
      </div>

      <span class="header-badge">Timeline</span>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <section class="list-section">
      <div class="section-title">
        <div>
          <h2>Available records</h2>
          <p>Information obtained from the API for student consultation.</p>
        </div>

        <span class="badge">{projects.length}</span>
      </div>

      <div class="projects-grid">
        {#each projects as project}
          <article class="project-card">
            <div class="card-body">
              <div class="icon-box">📅</div>

              <div class="info">
                <h3>{project.project_name}</h3>
                <p class="date">Start date: {project.start_date || 'Not defined'}</p>
                <p class="desc">{project.description || 'No description available'}</p>
              </div>
            </div>

            <div class="card-actions">
              <span class="status-tag">Status ID: {project.id_status}</span>

              <button class="enroll-btn" type="button" onclick={handleEnrollment}>
                Enroll in project
              </button>
            </div>
          </article>
        {/each}

        {#if projects.length === 0 && !error}
          <div class="empty">There are no available records at the moment.</div>
        {/if}
      </div>
    </section>
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
    max-width: 1100px;
    margin: 0 auto;
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 1.6rem;
    padding: 1.6rem;
    border-radius: 28px;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.16), transparent 18rem),
      linear-gradient(135deg, #ffffff 0%, var(--sgpa-blue-soft) 100%);
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-md);
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

  .main-header h1 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 950;
    letter-spacing: -0.045em;
  }

  .main-header p {
    max-width: 720px;
    margin: 0.7rem 0 0;
    color: var(--sgpa-text-soft);
    line-height: 1.7;
  }

  .header-badge {
    flex: 0 0 auto;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    background: #ffffff;
    color: var(--sgpa-blue);
    border: 1px solid var(--sgpa-border);
    font-weight: 950;
    box-shadow: var(--sgpa-shadow-sm);
  }

  .list-section {
    margin-top: 1.5rem;
  }

  .section-title {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .section-title h2 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: 1.45rem;
    font-weight: 950;
  }

  .section-title p {
    margin: 0.35rem 0 0;
    color: var(--sgpa-text-soft);
  }

  .badge {
    padding: 0.42rem 0.85rem;
    border-radius: 999px;
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue);
    border: 1px solid rgba(11, 45, 105, 0.12);
    font-weight: 950;
  }

  .projects-grid {
    display: grid;
    gap: 1rem;
  }

  .project-card {
    background: #ffffff;
    border-radius: 22px;
    padding: 1.25rem;
    border: 1px solid var(--sgpa-border);
    border-left: 6px solid var(--sgpa-orange);
    box-shadow: var(--sgpa-shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-body {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .icon-box {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: var(--sgpa-orange-soft);
    color: var(--sgpa-orange);
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  h3 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: 1.2rem;
    font-weight: 950;
  }

  .date {
    margin: 0.35rem 0;
    font-size: 0.88rem;
    color: var(--sgpa-muted);
    font-weight: 750;
  }

  .desc {
    margin: 0;
    color: var(--sgpa-text-soft);
    line-height: 1.65;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--sgpa-border);
    padding-top: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .status-tag {
    font-size: 0.82rem;
    background: var(--sgpa-blue-soft);
    padding: 0.42rem 0.75rem;
    border-radius: 999px;
    color: var(--sgpa-blue);
    font-weight: 900;
  }

  .enroll-btn {
    min-height: 42px;
    border: none;
    padding: 0.72rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 900;
    background: linear-gradient(135deg, var(--sgpa-blue), var(--sgpa-blue-mid));
    color: #ffffff;
  }

  .empty {
    text-align: center;
    padding: 3rem;
    background: #ffffff;
    border-radius: 22px;
    border: 1px dashed var(--sgpa-border-strong);
    color: var(--sgpa-muted);
    font-weight: 800;
  }

  @media (max-width: 720px) {
    .main-header {
      align-items: flex-start;
      flex-direction: column;
    }

    .card-body {
      flex-direction: column;
    }

    .card-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .enroll-btn {
      width: 100%;
    }
  }
</style>