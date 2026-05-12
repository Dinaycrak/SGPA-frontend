<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DashboardStats from '$lib/components/Projects.svelte';
  import SideBar from '$lib/components/StudentSideBar.svelte';
  import ProjectCardsDataTable from '$lib/components/ProjectCardDatatable.svelte';

  export let data;

  $: rows = data.rows || [];
  $: error = data.error;

  $: stats = [
    {
      label: 'My projects',
      value: data.totalProjects || 0,
      icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
      bgColor: 'var(--sgpa-success-bg)',
      color: 'var(--sgpa-success)'
    }
  ];
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    <header class="main-header">
      <div>
        <span class="eyebrow">Student module</span>
        <h1>My projects</h1>
        <p>View the academic projects you are already enrolled in.</p>
      </div>

      <span class="header-badge">Tracking</span>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <ProjectCardsDataTable
      {rows}
      title="My projects"
      badgeColor="var(--sgpa-success)"
      emptyMessage="You do not have enrolled projects yet."
      searchPlaceholder="Search enrolled project..."
    />
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

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 1.4rem;
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

  .error-msg {
    margin: 1rem 0;
  }

  @media (max-width: 760px) {
    .main-header {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>