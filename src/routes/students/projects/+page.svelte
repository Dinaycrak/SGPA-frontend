<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DashboardStats from '$lib/components/Projects.svelte';
  import SideBar from '$lib/components/StudentSideBar.svelte';
  import ProjectCardsDataTable from '$lib/components/ProjectCardDataTable.svelte';
  export let data;

  $: rows = data.rows || [];
  $: error = data.error;

  $: stats = [
    {
      label: 'Proyectos Disponibles',
      value: data.totalProjects || 0,
      icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
      bgColor: '#dbeafe',
      color: '#2563eb'
    }
  ];
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    <header class="main-header">
      <h1>MÓDULO ESTUDIANTE</h1>
      <p>Consulta general de proyectos académicos disponibles.</p>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <ProjectCardsDataTable
      {rows}
      title="Proyectos Disponibles"
      badgeColor="#ff9500"
      emptyMessage="No hay proyectos disponibles."
      searchPlaceholder="Buscar proyecto por nombre..."
    />
  </div>
</main>

<Footer />

<style>
  main {
    background-color: #f1f5f9;
    min-height: 80vh;
    padding: 2rem 1rem;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
  }

  .main-header h1 {
    color: #0b2d69;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 800;
  }

  .main-header p {
    color: #64748b;
  }

  .error-msg {
    background: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
  }

  :global(.project-card) {
    background: white;
    border-radius: 20px;
    border-left: 6px solid #f59e0b;
    padding: 1.8rem;
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    align-items: center;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    flex-wrap: wrap;
  }

  :global(.project-card__left) {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    flex: 1;
  }

  :global(.project-card__icon) {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    background: #f8f1e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    flex-shrink: 0;
  }

  :global(.project-card__content h3) {
    margin: 0 0 0.6rem;
    color: #0b2d69;
    font-size: 1.9rem;
    font-weight: 800;
  }

  :global(.project-card__content p) {
    margin: 0 0 0.8rem;
    color: #4b5563;
    font-size: 1rem;
  }

  :global(.project-card__meta) {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    color: #475569;
    font-size: 1rem;
  }

  :global(.action-btn) {
    background: #0b2d69;
    color: white;
    border: none;
    padding: 0.95rem 1.4rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
  }

  :global(.inline-form) {
    margin: 0;
  }
</style>