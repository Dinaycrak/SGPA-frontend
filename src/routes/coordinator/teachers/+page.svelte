<script>
  import { enhance } from '$app/forms';
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';

  export let data;
  export let form;

  let search = '';
  let currentPage = 1;
  const pageSize = 10;

  let localRows = [];

  $: if (data?.rows) {
    localRows = data.rows;
  }

  $: totalTeachers = data?.totalTeachers || 0;
  $: error = form?.error || data?.error || '';
  $: successMessage = form?.message || '';

  $: filteredRows = localRows.filter((row) => {
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
    return confirm(`¿Estás seguro de que deseas ${actionText} al docente ${name}?`);
  }

  function updateLocalUser(updatedUser) {
    localRows = localRows.map((row) =>
      Number(row.id_user) === Number(updatedUser.id_user)
        ? {
            ...row,
            is_active: updatedUser.is_active,
            estado: updatedUser.estado
          }
        : row
    );
  }

  function handleEnhance() {
    return async ({ result, update }) => {
      await update({ reset: false });

      if (result.type === 'success' && result.data?.updatedUser) {
        updateLocalUser(result.data.updatedUser);
      }
    };
  }
</script>

<Header />
<SideBar />

<main class="page-wrap">
  <section class="container">
    <div class="title-block">
      <h1>Lista de Profesores</h1>
      <span class="count-badge">{totalTeachers} Registrados</span>
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
              <th>Nombre del docente</th>
              <th>Correo institucional</th>
              <th>Estado</th>
              <th>Acción de seguridad</th>
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
                      use:enhance={handleEnhance}
                      onsubmit={(event) => {
                        if (!confirmToggle(row.nombre, !row.is_active)) {
                          event.preventDefault();
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
                        {row.is_active ? 'Deshabilitar Acceso' : 'Habilitar Acceso'}
                      </button>
                    </form>
                  </td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td colspan="4" class="empty-row">
                  No se encontraron docentes.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <span>Mostrando {paginatedRows.length} de {filteredRows.length} registros</span>

        <div class="pagination">
          <button type="button" onclick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>

          <span>Página {currentPage} de {totalPages}</span>

          <button type="button" onclick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
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
    min-height: 100vh;
    padding: 2rem 1rem 3rem;
  }

  .container {
    max-width: 1180px;
    margin: 0 auto;
  }

  .title-block {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .title-block h1 {
    font-size: clamp(2rem, 4vw, 2.7rem);
    font-weight: 900;
    margin: 0;
  }

  .count-badge {
    display: inline-flex;
    padding: 0.45rem 1rem;
    font-size: 0.92rem;
  }

  .table-card {
    margin-top: 1.2rem;
    border-radius: 24px;
    overflow: hidden;
  }

  .table-toolbar {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .search-input {
    width: min(440px, 100%);
    padding: 0.85rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 999px;
    outline: none;
    font-size: 0.98rem;
    background: #f8fafc;
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
    padding: 1.1rem 1.5rem;
    font-size: 0.82rem;
    color: #475569;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  tbody td {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid #eef2f7;
    color: #334155;
    vertical-align: middle;
  }

  .name-cell {
    font-weight: 850;
    color: #111827;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 104px;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    font-weight: 900;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
  }

  .action-btn {
    border: none;
    border-radius: 999px;
    padding: 0.78rem 1.1rem;
    font-weight: 850;
    cursor: pointer;
    color: white;
    min-width: 190px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 22px rgba(15, 23, 42, 0.12);
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
    color: #64748b;
    font-weight: 650;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .pagination button {
    border: none;
    color: white;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    font-weight: 800;
    cursor: pointer;
  }

  .pagination button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
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