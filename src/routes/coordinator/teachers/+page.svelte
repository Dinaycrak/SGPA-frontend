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
    return confirm(`¿Estás seguro of que deseas ${actionText} al docente ${name}?`);
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
    <header class="title-block">
      <div>
        <span class="eyebrow">Módulo coordinador</span>
        <h1>Teacher list</h1>
        <p>View and manage the access status of registered teachers.</p>
      </div>

      <span class="count-badge">{totalTeachers} registered</span>
    </header>

    {#if successMessage}
      <div class="success-box">✅ {successMessage}</div>
    {/if}

    {#if error}
      <div class="error-box">⚠️ {error}</div>
    {/if}

    <div class="table-card">
      <div class="table-toolbar">
        <div>
          <h2>Docentes registered</h2>
          <p>Search by name, email, or account status.</p>
        </div>

        <input
          type="text"
          bind:value={search}
          placeholder="Search teacher..."
          class="search-input"
          aria-label="Search teacher"
        />
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Teacher name</th>
              <th>Institutional email</th>
              <th>Status</th>
              <th>Security action</th>
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
                        {row.is_active ? 'Disable access' : 'Enable access'}
                      </button>
                    </form>
                  </td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td colspan="4" class="empty-row">
                  No teachers found.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <span>Showing {paginatedRows.length} of {filteredRows.length} records</span>

        <div class="pagination">
          <button
            type="button"
            onclick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            type="button"
            onclick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  .page-wrap {
    min-height: 80vh;
    padding: 2rem 1rem 3rem;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.12), transparent 22rem),
      linear-gradient(180deg, #ffffff 0%, var(--sgpa-bg) 100%);
  }

  .container {
    max-width: 1180px;
    margin: 0 auto;
  }

  .title-block {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    flex-wrap: wrap;
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

  .title-block h1 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 950;
    letter-spacing: -0.045em;
  }

  .title-block p {
    margin: 0.7rem 0 0;
    color: var(--sgpa-text-soft);
    line-height: 1.7;
  }

  .count-badge {
    display: inline-flex;
    flex: 0 0 auto;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    background: #ffffff;
    color: var(--sgpa-blue);
    border: 1px solid var(--sgpa-border);
    font-weight: 950;
    box-shadow: var(--sgpa-shadow-sm);
  }

  .success-box,
  .error-box {
    margin-bottom: 1rem;
  }

  .table-card {
    margin-top: 1.2rem;
    border-radius: 26px;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-md);
  }

  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    padding: 1.2rem 1.35rem;
    border-bottom: 1px solid var(--sgpa-border);
    background: var(--sgpa-surface-soft);
    flex-wrap: wrap;
  }

  .table-toolbar h2 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: 1.25rem;
    font-weight: 950;
  }

  .table-toolbar p {
    margin: 0.35rem 0 0;
    color: var(--sgpa-text-soft);
  }

  .search-input {
    width: min(420px, 100%);
    min-height: 44px;
    padding: 0.8rem 1rem;
    border: 1px solid var(--sgpa-border);
    border-radius: 999px;
    outline: none;
    font-size: 0.96rem;
    background: #ffffff;
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
    padding: 1rem 1.25rem;
    font-size: 0.78rem;
    color: var(--sgpa-blue-dark);
    background: var(--sgpa-blue-soft);
    border-bottom: 1px solid var(--sgpa-border);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  tbody td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--sgpa-border);
    color: var(--sgpa-text-soft);
    vertical-align: middle;
  }

  tbody tr:hover {
    background: var(--sgpa-surface-soft);
  }

  .name-cell {
    color: var(--sgpa-blue-dark);
    font-weight: 900;
  }

  .status-pill {
    display: inline-flex;
    padding: 0.42rem 0.75rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 950;
    white-space: nowrap;
  }

  .status-active {
    background: var(--sgpa-success-bg);
    color: var(--sgpa-success);
  }

  .status-inactive {
    background: var(--sgpa-danger-bg);
    color: var(--sgpa-danger);
  }

  .action-btn {
    min-height: 40px;
    padding: 0.65rem 0.9rem;
    border-radius: 999px;
    font-weight: 900;
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
  }

  .danger-btn {
    background: var(--sgpa-danger-bg);
    color: var(--sgpa-danger);
    border-color: rgba(220, 38, 38, 0.18);
  }

  .danger-btn:hover {
    background: #fecaca;
    color: #991b1b;
  }

  .enable-btn {
    background: var(--sgpa-success-bg);
    color: var(--sgpa-success);
    border-color: rgba(21, 128, 61, 0.18);
  }

  .enable-btn:hover {
    background: #bbf7d0;
    color: #166534;
  }

  .empty-row {
    text-align: center;
    color: var(--sgpa-muted);
    padding: 2rem;
    font-weight: 800;
  }

  .table-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: #ffffff;
    color: var(--sgpa-text-soft);
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .pagination button {
    min-height: 38px;
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--sgpa-border);
    background: #ffffff;
    color: var(--sgpa-blue);
    font-weight: 850;
    cursor: pointer;
  }

  .pagination button:hover {
    background: var(--sgpa-blue-soft);
  }

  .pagination button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .pagination span {
    color: var(--sgpa-text-soft);
    font-weight: 800;
  }

  @media (max-width: 760px) {
    .title-block {
      align-items: flex-start;
      flex-direction: column;
    }

    .search-input {
      width: 100%;
    }

    .table-footer {
      align-items: stretch;
      flex-direction: column;
    }

    .pagination {
      justify-content: space-between;
    }
  }
</style>