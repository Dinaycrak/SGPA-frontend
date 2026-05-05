<script>
  import { onMount, tick } from 'svelte';
  import 'simple-datatables/dist/style.css';

  export let columns = [];
  export let rows = [];
  export let emptyMessage = 'No data to display.';
  export let tableId = 'sgpa-table';
  export let searchable = true;
  export let perPage = 10;
  export let perPageSelect = [10, 20, 30, 50];
  export let searchPlaceholder = 'Search by name...';

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

    if (tableElement && rows.length > 0) {
      datatable = new DataTable(tableElement, {
        searchable,
        perPage,
        perPageSelect,
        fixedHeight: false,
        labels: {
                 placeholder: searchPlaceholder,
                 perPage: '{select} records per page',
                 noRows: 'No records found',
                 info: 'Showing {start} to {end} of {rows} records'
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
    border-radius: 18px;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
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

  :global(.datatable-input) {
    width: 100%;
    min-width: 280px;
    max-width: 420px;
    padding: 0.85rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    outline: none;
    font-size: 0.98rem;
  }

  :global(.datatable-selector) {
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 0.65rem 0.8rem;
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
    color: #111827;
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
    min-width: 38px;
    height: 38px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    text-decoration: none;
    color: #0b2d69;
    background: white;
    font-weight: 700;
  }

  :global(.datatable-pagination li.active a) {
    background: #0b2d69;
    color: white;
    border-color: #0b2d69;
  }

  :global(.datatable-pagination li.disabled a) {
    opacity: 0.45;
    cursor: not-allowed;
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