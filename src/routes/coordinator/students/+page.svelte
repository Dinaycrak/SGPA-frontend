<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';

  export let data;
  export let form;

  let search = '';
  let currentPage = 1;
  const pageSize = 10;

  $: rows = data?.rows || [];
  $: totalStudents = data?.totalStudents || 0;
  $: error = form?.error || data?.error || '';
  $: successMessage = data?.message || '';

  $: filteredRows = rows.filter((row) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;

    return (
      row.nombre.toLowerCase().includes(term) ||
      row.correo.toLowerCase().includes(term) ||
      row.estado.toLowerCase().includes(term)
    );
  });

  $: totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));

  $: if (currentPage > totalPages) {
    currentPage = 1;
  }

  $: paginatedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
  }

  function confirmToggle(name, nextIsActive) {
    const actionText = nextIsActive ? 'HABILITAR' : 'DESHABILITAR';
    return confirm(`¿Estás seguro de que deseas ${actionText} al estudiante ${name}?`);
  }
</script>

<Header />
<SideBar />

<main class="page-wrap">
  <section class="container">
    <div class="title-block">
      <h1>Lista de Estudiantes</h1>
      <span class="count-badge">{totalStudents} Registrados</span>
    </div>

    {#if successMessage}
      <div class="success-box">✅ {successMessage}</div>
    {/if}

    {#if error}
      <div class="error-box">⚠️ {error}</div>
    {/if}

    <div class="table-card">
      <div class="table-toolbar">
        <input
          type="text"
          bind:value={search}
          placeholder="Buscar por nombre, correo o estado..."
          class="search-input"
        />
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre completo</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acción de Seguridad</th>
            </tr>
          </thead>
          <tbody>
            {#if paginatedRows.length > 0}
              {#each paginatedRows as row}
                <tr>
                  <td class="name-cell">{row.nombre}</td>
                  <td>{row.correo}</td>
                  <td>
                    <span
                      class="status-pill"
                      class:status-active={row.is_active}
                      class:status-inactive={!row.is_active}
                    >
                      {row.estado.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <form
                      method="POST"
                      action="?/toggleStatus"
                      on:submit={(e) => {
                        if (!confirmToggle(row.nombre, !row.is_active)) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id_user" value={row.id_user} />
                      <input type="hidden" name="user_name" value={row.nombre} />
                      <input type="hidden" name="next_is_active" value={(!row.is_active).toString()} />

                      <button
                        type="submit"
                        class="action-btn"
                        class:danger-btn={row.is_active}
                        class:enable-btn={!row.is_active}
                      >
                        {#if row.is_active}
                          Deshabilitar Acceso
                        {:else}
                          Habilitar Acceso
                        {/if}
                      </button>
                    </form>
                  </td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td colspan="4" class="empty-row">
                  No se encontraron estudiantes.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <span>Mostrando {paginatedRows.length} de {filteredRows.length} registros</span>

        <div class="pagination">
          <button type="button" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>

          <span>Página {currentPage} de {totalPages}</span>

          <button type="button" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  .page-wrap {
    background: #eef3f8;
    min-height: 100vh;
    padding: 1.5rem 1rem 3rem;
  }

  .container {
    max-width: 1180px;
    margin: 0 auto;
  }

  .title-block {
    margin-bottom: 1rem;
  }

  .title-block h1 {
    font-size: 2.7rem;
    font-weight: 800;
    color: #111827;
    margin: 0 0 0.5rem;
  }

  .count-badge {
    display: inline-block;
    background: #1d9bf0;
    color: white;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 0.35rem 1rem;
    border-radius: 999px;
  }

  .table-card {
    background: white;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
  }

  .table-toolbar {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .search-input {
    width: 100%;
    max-width: 420px;
    padding: 0.85rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    outline: none;
    font-size: 0.98rem;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead th {
    text-align: left;
    padding: 1.35rem 1.5rem;
    font-size: 0.95rem;
    color: #111827;
    border-bottom: 1px solid #e5e7eb;
    background: #ffffff;
  }

  tbody td {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #eef2f7;
    font-size: 1rem;
    color: #334155;
    vertical-align: middle;
  }

  .name-cell {
    font-weight: 700;
    color: #334e68;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 102px;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.9rem;
  }

  .status-active {
    background: #dff5df;
    color: #137333;
  }

  .status-inactive {
    background: #f7dede;
    color: #991b1b;
  }

  .action-btn {
    border: none;
    border-radius: 10px;
    padding: 0.9rem 1.2rem;
    font-weight: 700;
    cursor: pointer;
    color: white;
    min-width: 210px;
  }

  .danger-btn {
    background: #ef2222;
  }

  .enable-btn {
    background: #1fa83d;
  }

  .empty-row {
    text-align: center;
    padding: 2rem;
    color: #64748b;
  }

  .table-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .pagination button {
    border: none;
    background: #0f2f6b;
    color: white;
    padding: 0.65rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .pagination button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .success-box {
    background: #dcfce7;
    color: #166534;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .error-box {
    background: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .title-block h1 {
      font-size: 2rem;
    }

    thead th,
    tbody td {
      padding: 1rem;
    }

    .action-btn {
      min-width: auto;
      width: 100%;
    }
  }
</style>