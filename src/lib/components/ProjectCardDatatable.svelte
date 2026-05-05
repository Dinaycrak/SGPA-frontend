<script>
  export let rows = [];
  export let title = 'Proyectos';
  export let badgeColor = '#0b2d69';
  export let emptyMessage = 'No hay proyectos para mostrar.';
  export let searchPlaceholder = 'Buscar proyecto por nombre...';

  let search = '';
  let currentPage = 1;
  const pageSize = 10;

  function stripHtml(html = '') {
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
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
    <div>
      <span class="section-kicker">Listado</span>
      <h2>{title}</h2>
    </div>

    <span class="badge" style={`--badge-color:${badgeColor}`}>
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
        <div class="empty-row">
          <strong>Sin resultados</strong>
          <span>{emptyMessage}</span>
        </div>
      {/if}
    </div>

    <div class="table-footer">
      <span>
        Mostrando {paginatedRows.length} de {filteredRows.length} registros
      </span>

      <div class="pagination">
        <button
          type="button"
          onclick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>Página {currentPage} de {totalPages}</span>

        <button
          type="button"
          onclick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .list-section {
    margin-top: 1.25rem;
  }

  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 1rem;
    margin: 1.4rem 0 1rem;
    flex-wrap: wrap;
  }

  .section-kicker {
    display: inline-flex;
    margin-bottom: 0.3rem;
    color: #0b2d69;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .section-title h2 {
    margin: 0;
    color: #002c8a;
    font-size: clamp(1.45rem, 3vw, 2rem);
    font-weight: 900;
    letter-spacing: -0.035em;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0.4rem 0.95rem;
    border-radius: 999px;
    color: #ffffff;
    background: var(--badge-color, #0b2d69);
    font-size: 0.82rem;
    font-weight: 850;
    box-shadow: 0 10px 22px rgba(11, 45, 105, 0.16);
  }

  .table-card {
    overflow: hidden;
    border-radius: 26px;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.24);
    box-shadow: 0 18px 44px rgba(15, 23, 42, 0.09);
  }

  .table-toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.15rem;
    border-bottom: 1px solid #e5e7eb;
    background: #ffffff;
  }

  .search-input {
    width: min(440px, 100%);
    padding: 0.86rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    outline: none;
    color: #111827;
    background: #f8fafc;
    font-size: 0.96rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .search-input:focus {
    border-color: #0b2d69;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(11, 45, 105, 0.1);
  }

  .projects-wrapper {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
  }

  .empty-row {
    display: grid;
    place-items: center;
    gap: 0.35rem;
    min-height: 180px;
    padding: 2rem;
    border: 1px dashed #cbd5e1;
    border-radius: 20px;
    color: #64748b;
    text-align: center;
    background: #ffffff;
  }

  .empty-row strong {
    color: #111827;
    font-size: 1.1rem;
  }

  .table-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.15rem;
    border-top: 1px solid #e5e7eb;
    color: #64748b;
    font-size: 0.92rem;
    font-weight: 650;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    gap: 0.65rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .pagination span {
    color: #334155;
    font-weight: 800;
  }

  .pagination button {
    border: 1px solid #0b2d69;
    background: #0b2d69;
    color: #ffffff;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    font-weight: 850;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  }

  .pagination button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(11, 45, 105, 0.18);
  }

  .pagination button:disabled {
    opacity: 0.42;
    cursor: not-allowed;
  }

  :global(.project-card) {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.4rem;
    padding: 1.45rem;
    border-radius: 22px;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.07);
    flex-wrap: wrap;
  }

  :global(.project-card::before) {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 6px;
    background: #0b2d69;
  }

  :global(.project-card__left) {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    flex: 1 1 520px;
    min-width: 0;
  }

  :global(.project-card__icon) {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    flex: 0 0 auto;
    border-radius: 18px;
    color: #ffffff;
    background: linear-gradient(135deg, #111827, #0b2d69);
    font-size: 1.7rem;
    box-shadow: 0 14px 26px rgba(15, 23, 42, 0.18);
  }

  :global(.project-card__content h3) {
    margin: 0 0 0.45rem;
    color: #111827;
    font-size: clamp(1.25rem, 2.2vw, 1.8rem);
    font-weight: 900;
    letter-spacing: -0.03em;
  }

  :global(.project-card__content p) {
    margin: 0 0 0.7rem;
    color: #64748b;
    line-height: 1.6;
  }

  :global(.project-card__meta) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.7rem;
    color: #475569;
    font-size: 0.92rem;
    font-weight: 650;
  }

  :global(.project-card__meta span),
  :global(.neutral-badge),
  :global(.joined-badge) {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 0.46rem 0.72rem;
    border-radius: 999px;
    color: #334155;
    background: #f1f5f9;
    font-weight: 800;
    font-size: 0.86rem;
  }

  :global(.joined-badge) {
    color: #166534;
    background: #dcfce7;
  }

  :global(.project-card__right) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.7rem;
    flex-wrap: wrap;
  }

  :global(.action-btn) {
    border: none;
    border-radius: 999px;
    padding: 0.82rem 1.05rem;
    color: #ffffff;
    background: #0b2d69;
    font-weight: 850;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  :global(.action-btn:hover) {
    transform: translateY(-1px);
    background: #111827;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.14);
  }

  :global(.inline-form) {
    margin: 0;
  }

  @media (max-width: 720px) {
    .table-toolbar,
    .table-footer {
      align-items: stretch;
      flex-direction: column;
    }

    .search-input {
      width: 100%;
    }

    .pagination {
      width: 100%;
      justify-content: space-between;
    }

    :global(.project-card) {
      padding: 1.15rem;
    }

    :global(.project-card__left) {
      flex-direction: column;
    }

    :global(.project-card__right) {
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>