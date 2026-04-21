<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DashboardStats from '$lib/components/Projects.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';
  import DataTableWrapper from '$lib/components/DataTableWrapper.svelte';

  export let data;

  const columns = [
    { key: 'nombre', label: 'Nombre completo' },
    { key: 'correo', label: 'Correo' },
    { key: 'estado', label: 'Estado' }
  ];

  $: rows = data.rows || [];
  $: error = data.error;

  $: stats = [
    {
      label: 'Estudiantes Registrados',
      value: data.totalStudents || 0,
      icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
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
      <h1>GESTIÓN DE ESTUDIANTES</h1>
      <p>Listado general de estudiantes registrados en el sistema.</p>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <DashboardStats {stats} />

    <section class="list-section">
      <div class="section-title">
        <h2>Lista de Estudiantes</h2>
        <span class="badge">{rows.length} registros</span>
      </div>

      <DataTableWrapper
        tableId="coordinator-students-table"
        {columns}
        {rows}
        emptyMessage="No hay estudiantes registrados."
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
    background: #2563eb;
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