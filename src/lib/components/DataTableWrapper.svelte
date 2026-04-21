<script>
  import { onMount, tick } from 'svelte';
  import 'simple-datatables/dist/style.css';

  export let columns = [];
  export let rows = [];
  export let emptyMessage = 'No hay datos para mostrar.';
  export let tableId = 'sgpa-table';

  let tableElement;
  let datatable;
  let mounted = false;

  async function initTable() {
    if (!mounted) return;

    await tick();

    const { DataTable } = await import('simple-datatables');

    if (datatable) {
      datatable.destroy();
      datatable = null;
    }

    if (tableElement) {
      datatable = new DataTable(tableElement, {
        searchable: true,
        perPage: 10,
        perPageSelect: [10, 20, 30, 50],
        fixedHeight: false,
        labels: {
          placeholder: 'Buscar...',
          perPage: '{select} registros por página',
          noRows: 'No se encontraron registros',
          info: 'Mostrando {start} a {end} de {rows} registros'
        }
      });
    }
  }

  onMount(async () => {
    mounted = true;
    await initTable();

    return () => {
      if (datatable) {
        datatable.destroy();
      }
    };
  });

  $: if (mounted) {
    initTable();
  }
</script>

<div class="datatable-card">
  {#if rows.length > 0}
    <table bind:this={tableElement} id={tableId} class="sgpa-datatable">
      <thead>
        <tr>
          {#each columns as column}
            <th>{column.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row}
          <tr>
            {#each columns as column}
              <td>
                {#if column.html}
                  {@html row[column.key] ?? ''}
                {:else}
                  {row[column.key] ?? '-'}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="empty-state">{emptyMessage}</div>
  {/if}
</div>

<style>
  .datatable-card {
    background: white;
    border-radius: 14px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    padding: 1rem;
  }

  .sgpa-datatable {
    width: 100%;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: #64748b;
  }

  :global(.datatable-top) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  :global(.datatable-search) {
    margin: 0;
  }

  :global(.datatable-input),
  :global(.datatable-selector) {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 0.55rem 0.75rem;
    font-size: 0.95rem;
  }

  :global(.datatable-bottom) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  :global(.datatable-info) {
    color: #64748b;
    font-size: 0.95rem;
  }

  :global(.datatable-pagination ul) {
    display: flex;
    gap: 0.4rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  :global(.datatable-pagination li a) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    text-decoration: none;
    color: #0b2d69;
    background: white;
    font-weight: 600;
  }

  :global(.datatable-pagination li.active a) {
    background: #0b2d69;
    color: white;
    border-color: #0b2d69;
  }

  :global(.datatable-table) {
    width: 100%;
    border-collapse: collapse;
  }

  :global(.datatable-table th) {
    background: #f8fafc;
    color: #0f172a;
    padding: 1rem;
    text-align: left;
    font-weight: 700;
    border-bottom: 2px solid #e2e8f0;
  }

  :global(.datatable-table td) {
    padding: 1rem;
    border-bottom: 1px solid #eef2f7;
    color: #475569;
    vertical-align: top;
  }
</style>