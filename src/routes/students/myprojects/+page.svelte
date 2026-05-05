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
      label: 'Mis Proyectos',
      value: data.totalProjects || 0,
      icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
      bgColor: '#e5e7eb',
      color: '#0b2d69'
    }
  ];
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    <header class="main-header">
      <h1>MÓDULO ESTUDIANTE</h1>
      <p>Proyectos en los que ya participas.</p>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <ProjectCardsDataTable
      {rows}
      title="Mis Proyectos"
      badgeColor="#0b2d69"
      emptyMessage="No tienes proyectos inscritos todavía."
      searchPlaceholder="Buscar proyecto por nombre..."
    />
  </div>
</main>

<Footer />

<style>
  main {
    min-height: 80vh;
    padding: 2rem 1rem;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
  }

  .main-header h1 {
    margin: 0;
    font-size: 1.9rem;
    font-weight: 900;
  }

  .main-header p {
    margin-top: 0.35rem;
    color: #475569;
  }

  .error-msg {
    margin: 1rem 0;
  }
</style>