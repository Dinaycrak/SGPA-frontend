<script>
  export let rows = [];
  export let title = 'Proyectos';
  export let badgeColor = '#ff9500';
  export let emptyMessage = 'No hay proyectos para mostrar.';
  export let searchPlaceholder = 'Buscar proyecto por nombre...';

  let search = '';
  let currentPage = 1;
  const pageSize = 10;

  function stripHtml(html = '') {
    return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  $: filteredRows = rows.filter((row) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;

    const text = stripHtml(row.proyecto_card).toLowerCase();
    return text.includes(term);
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
</script>

<section class="list-section">
  <div class="section-title">
    <h2>{title}</h2>
    <span class="badge" style={`background:${badgeColor}`}>
      {filteredRows.length} registros
    </span>
  </div>

  <div class="table-card">
    <div class="table-toolbar">
      <input
        type="text"
        bind:value={search}
        placeholder={searchPlaceholder}
        class="search-input"
      />
    </div>

    <div class="projects-wrapper">
      {#if paginatedRows.length > 0}
        {#each paginatedRows as row}
          <article class="project-row">
            {@html row.proyecto_card}
          </article>
        {/each}
      {:else}
        <div class="empty-row">{emptyMessage}</div>
      {/if}
    </div>

    <div class="table-footer">
      <span>
        Mostrando {paginatedRows.length} de {filteredRows.length} registros
      </span>

      <div class="pagination">
        <button
          type="button"
          on:click={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>Página {currentPage} de {totalPages}</span>

        <button
          type="button"
          on:click={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1.5rem 0;
  }

  .section-title h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 800;
    color: #111827;
  }

  .badge {
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
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

  .projects-wrapper {
    padding: 1rem;
  }

  .project-row {
    margin-bottom: 1.2rem;
  }

  .project-row:last-child {
    margin-bottom: 0;
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
    border-top: 1px solid #eef2f7;
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
    background: #94a3b8;
    cursor: not-allowed;
  }
</style>