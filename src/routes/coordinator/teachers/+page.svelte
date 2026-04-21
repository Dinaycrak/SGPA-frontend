<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DashboardStats from '$lib/components/Projects.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';
  import DataTableWrapper from '$lib/components/DataTableWrapper.svelte';

  export let data;

  const columns = [
    { key: 'nombre', label: 'Nombre del docente' },
    { key: 'correo', label: 'Correo institucional' },
    { key: 'estado', label: 'Estado' }
  ];

  $: rows = data.rows || [];
  $: error = data.error;

  $: stats = [
    {
      label: 'Docentes Registrados',
      value: data.totalTeachers || 0,
      icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 14c4 0 7 2 7 5v1H5v-1c0-3 3-5 7-5z"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
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
      <h1>GESTIÓN DE DOCENTES</h1>
      <p>Listado de profesores registrados en el sistema.</p>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <section class="list-section">
      <div class="section-title">
        <h2>Lista de Profesores</h2>
        <span class="badge">{rows.length} registros</span>
      </div>

      <DataTableWrapper
        tableId="coordinator-teachers-table"
        {columns}
        {rows}
        emptyMessage="No hay profesores registrados."
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
    background: #009dff;
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
</style>