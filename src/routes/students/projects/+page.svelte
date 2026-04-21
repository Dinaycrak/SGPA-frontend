<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DashboardStats from '$lib/components/Projects.svelte';
  import SideBar from '$lib/components/StudentSideBar.svelte';
  import DataTableWrapper from '$lib/components/DataTableWrapper.svelte';

  export let data;
  export let form;

  const columns = [
    { key: 'proyecto_card', label: 'Proyectos Disponibles', html: true }
  ];

  $: rows = data.rows || [];
  $: error = form?.error || data.error;

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
      <p>Consulta de proyectos disponibles para participación estudiantil.</p>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <section class="list-section">
      <div class="section-title">
        <h2>Proyectos Disponibles</h2>
        <span class="badge">{rows.length} disponibles</span>
      </div>

      <DataTableWrapper
        tableId="students-projects-table"
        {columns}
        {rows}
        emptyMessage="No hay proyectos disponibles."
      />
    </section>
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

  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1.5rem 0;
  }

  .badge {
    background: #ff9500;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .error-msg {
    background: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
  }

  :global(.datatable-table th) {
    display: none;
  }

  :global(.datatable-table td) {
    padding: 0;
    border: none;
    background: transparent;
  }

  :global(.datatable-table tr) {
    display: block;
    margin-bottom: 1.5rem;
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

  :global(.project-card__right) {
    display: flex;
    align-items: center;
    justify-content: center;
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

  :global(.joined-badge) {
    background: #dcfce7;
    color: #166534;
    padding: 0.6rem 1rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.9rem;
    display: inline-block;
  }

  :global(.inline-form) {
    margin: 0;
  }
</style>