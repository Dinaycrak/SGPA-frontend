<script>
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';

  export let users = [];
  export let form = null;
  export let title = 'Users';
  export let subtitle = 'Manage registered users.';
  export let searchPlaceholder = 'Search user by name, email, phone, or status...';
  export let emptyMessage = 'No users found.';
  export let userType = 'users';

  let search = '';
  let page = 1;
  const pageSize = 10;

  let confirmOpen = false;
  let pendingForm = null;
  let allowSubmit = false;

  let modalTitle = 'Confirm action';
  let modalMessage = 'Are you sure you want to continue?';
  let modalDetails = '';
  let modalConfirmText = 'Confirm';
  let modalVariant = 'warning';

  function boolValue(value) {
    return value === true || String(value).trim().toLowerCase() === 'true';
  }

  function fullName(user) {
    return `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Unnamed user';
  }

  function initials(user) {
    const first = String(user?.first_name || '').trim()[0] || '';
    const last = String(user?.last_name || '').trim()[0] || '';

    return `${first}${last}`.toUpperCase() || 'U';
  }

  function statusText(user) {
    return user.is_active ? 'Active' : 'Inactive';
  }

  function openConfirmModal(event, user) {
    if (allowSubmit) {
      allowSubmit = false;
      return;
    }

    event.preventDefault();

    const nextStatus = !user.is_active;
    const singularType = userType.endsWith('s') ? userType.slice(0, -1) : userType;

    pendingForm = event.currentTarget;

    modalTitle = nextStatus
      ? `Enable ${singularType}?`
      : `Disable ${singularType}?`;

    modalMessage = nextStatus
      ? 'This user will regain visual access in the SGPA interface.'
      : 'This user will be visually marked as inactive in the SGPA interface.';

    modalDetails = `${fullName(user)} | ${user.email || 'No email registered'}`;
    modalConfirmText = nextStatus ? 'Enable user' : 'Disable user';
    modalVariant = nextStatus ? 'success' : 'danger';

    confirmOpen = true;
  }

  function closeConfirm() {
    confirmOpen = false;
    pendingForm = null;
  }

  function confirmAction() {
    if (!pendingForm) {
      closeConfirm();
      return;
    }

    const formToSubmit = pendingForm;

    confirmOpen = false;
    pendingForm = null;
    allowSubmit = true;

    formToSubmit.requestSubmit();
  }

  function resetPage() {
    page = 1;
  }

  $: visualUserId = Number(form?.visualUserId || 0);
  $: hasVisualOverride = Boolean(visualUserId);
  $: visualIsActive = boolValue(form?.visualIsActive);

  $: displayedUsers = users.map((user) => {
    if (hasVisualOverride && Number(user.id_user) === visualUserId) {
      return {
        ...user,
        is_active: visualIsActive
      };
    }

    return user;
  });

  $: filteredUsers = displayedUsers.filter((user) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return [
      fullName(user),
      user.email,
      user.phone_number,
      user.phone,
      statusText(user),
      user.id_user
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  $: totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  $: if (page > totalPages) page = totalPages;

  $: start = (page - 1) * pageSize;
  $: end = start + pageSize;
  $: paginatedUsers = filteredUsers.slice(start, end);

  $: activeCount = displayedUsers.filter((user) => Boolean(user.is_active)).length;
  $: inactiveCount = displayedUsers.length - activeCount;
</script>

<section class="datatable-shell">
  <header class="section-header">
    <div>
      <span class="eyebrow">Coordinator module</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>

    <div class="stats">
      <span>{displayedUsers.length} total</span>
      <span>{activeCount} active</span>
      <span>{inactiveCount} inactive</span>
    </div>
  </header>

  <section class="table-card">
    <div class="table-toolbar">
      <div class="search-box">
        <span>⌕</span>
        <input
          bind:value={search}
          on:input={resetPage}
          type="search"
          placeholder={searchPlaceholder}
          aria-label="Search users"
        />
      </div>

      <span class="records-pill">
        Showing {filteredUsers.length === 0 ? 0 : start + 1}
        -
        {Math.min(end, filteredUsers.length)}
        of {filteredUsers.length}
      </span>
    </div>

    {#if paginatedUsers.length > 0}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th class="action-heading">Action</th>
            </tr>
          </thead>

          <tbody>
            {#each paginatedUsers as user}
              <tr class:inactive-row={!user.is_active}>
                <td>
                  <div class="user-cell">
                    <div class="avatar" class:inactive={!user.is_active}>
                      {initials(user)}
                    </div>

                    <div>
                      <strong>{fullName(user)}</strong>
                      <span>ID: {user.id_user}</span>
                    </div>
                  </div>
                </td>

                <td>{user.email || 'No email registered'}</td>

                <td>{user.phone_number || user.phone || 'Not registered'}</td>

                <td>
                  <span class="status-badge" class:inactive={!user.is_active}>
                    {statusText(user)}
                  </span>
                </td>

                <td class="action-cell">
                  <form method="POST" action="?/toggleStatus" on:submit={(event) => openConfirmModal(event, user)}>
                    <input type="hidden" name="id_user" value={user.id_user} />
                    <input type="hidden" name="is_active" value={user.is_active ? 'false' : 'true'} />

                    <button
                      type="submit"
                      class:enable-btn={!user.is_active}
                      class:disable-btn={user.is_active}
                    >
                      {user.is_active ? 'Disable' : 'Enable'}
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <footer class="pagination">
        <span>
          Page {page} of {totalPages}
        </span>

        <div class="pagination-actions">
          <button type="button" on:click={() => (page = Math.max(1, page - 1))} disabled={page === 1}>
            Previous
          </button>

          <button type="button" on:click={() => (page = Math.min(totalPages, page + 1))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </footer>
    {:else}
      <section class="empty-state">
        <div>📭</div>
        <h2>{emptyMessage}</h2>
        <p>No records match your current search.</p>
      </section>
    {/if}
  </section>
</section>

<ConfirmModal
  open={confirmOpen}
  title={modalTitle}
  message={modalMessage}
  details={modalDetails}
  confirmText={modalConfirmText}
  cancelText="Cancel"
  variant={modalVariant}
  onCancel={closeConfirm}
  onConfirm={confirmAction}
/>

<style>
  .datatable-shell {
    max-width: 1180px;
    margin: 0 auto;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 1.2rem;
    padding: 1.5rem;
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
    margin-bottom: 0.7rem;
    padding: 0.4rem 0.78rem;
    border-radius: 999px;
    background: var(--sgpa-yellow-soft);
    color: var(--sgpa-blue);
    font-size: 0.76rem;
    font-weight: 950;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid rgba(242, 183, 5, 0.28);
  }

  .section-header h1 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 950;
    letter-spacing: -0.045em;
  }

  .section-header p {
    max-width: 720px;
    margin: 0.6rem 0 0;
    color: var(--sgpa-text-soft);
    line-height: 1.65;
  }

  .stats {
    display: flex;
    justify-content: flex-end;
    gap: 0.55rem;
    flex-wrap: wrap;
  }

  .stats span {
    padding: 0.48rem 0.8rem;
    border-radius: 999px;
    background: #ffffff;
    color: var(--sgpa-blue);
    border: 1px solid var(--sgpa-border);
    font-size: 0.82rem;
    font-weight: 950;
    box-shadow: var(--sgpa-shadow-sm);
  }

  .table-card {
    overflow: hidden;
    border-radius: 28px;
    background: #ffffff;
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-md);
  }

  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--sgpa-border);
    background:
      radial-gradient(circle at top left, rgba(11, 45, 105, 0.04), transparent 18rem),
      #ffffff;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: min(100%, 560px);
    min-height: 46px;
    padding: 0 1rem;
    border-radius: 999px;
    background: var(--sgpa-bg);
    border: 1px solid var(--sgpa-border);
  }

  .search-box span {
    color: var(--sgpa-blue);
    font-weight: 950;
    font-size: 1.1rem;
  }

  .search-box input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--sgpa-blue-dark);
    font-size: 0.95rem;
    font-weight: 750;
  }

  .records-pill {
    flex: 0 0 auto;
    padding: 0.48rem 0.85rem;
    border-radius: 999px;
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue);
    border: 1px solid rgba(11, 45, 105, 0.12);
    font-weight: 950;
    font-size: 0.82rem;
  }

  .table-wrap {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 860px;
  }

  th {
    padding: 0.95rem 1rem;
    background: var(--sgpa-blue);
    color: #ffffff;
    text-align: left;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  td {
    padding: 0.95rem 1rem;
    border-bottom: 1px solid var(--sgpa-border);
    color: var(--sgpa-text-soft);
    vertical-align: middle;
  }

  tbody tr:hover {
    background: var(--sgpa-blue-soft);
  }

  .inactive-row {
    background: rgba(254, 226, 226, 0.32);
  }

  .user-cell {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    min-width: 240px;
  }

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue);
    border: 1px solid rgba(11, 45, 105, 0.12);
    font-weight: 950;
    flex-shrink: 0;
  }

  .avatar.inactive {
    background: #fee2e2;
    color: #991b1b;
    border-color: #fecaca;
  }

  .user-cell strong {
    display: block;
    color: var(--sgpa-blue-dark);
    font-weight: 950;
  }

  .user-cell span {
    display: block;
    margin-top: 0.18rem;
    color: var(--sgpa-text-soft);
    font-size: 0.82rem;
  }

  .status-badge {
    display: inline-flex;
    width: fit-content;
    padding: 0.38rem 0.75rem;
    border-radius: 999px;
    color: #166534;
    background: #dcfce7;
    border: 1px solid #bbf7d0;
    font-size: 0.8rem;
    font-weight: 950;
  }

  .status-badge.inactive {
    color: #991b1b;
    background: #fee2e2;
    border-color: #fecaca;
  }

  .action-heading,
  .action-cell {
    text-align: right;
  }

  .action-cell button {
    min-height: 38px;
    min-width: 104px;
    padding: 0.62rem 0.9rem;
    border-radius: 999px;
    border: none;
    color: #ffffff;
    font-size: 0.84rem;
    font-weight: 950;
    cursor: pointer;
  }

  .action-cell button:hover {
    transform: translateY(-1px);
  }

  .disable-btn {
    background: linear-gradient(135deg, #dc2626, #991b1b);
  }

  .enable-btn {
    background: linear-gradient(135deg, #15803d, #166534);
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #ffffff;
  }

  .pagination span {
    color: var(--sgpa-text-soft);
    font-weight: 850;
  }

  .pagination-actions {
    display: flex;
    gap: 0.6rem;
  }

  .pagination-actions button {
    min-height: 38px;
    padding: 0.62rem 0.95rem;
    border-radius: 999px;
    border: 1px solid var(--sgpa-border);
    background: #ffffff;
    color: var(--sgpa-blue);
    font-weight: 950;
    cursor: pointer;
  }

  .pagination-actions button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
  }

  .empty-state div {
    font-size: 2rem;
    margin-bottom: 0.7rem;
  }

  .empty-state h2 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-weight: 950;
  }

  .empty-state p {
    margin: 0.45rem 0 0;
    color: var(--sgpa-text-soft);
  }

  @media (max-width: 820px) {
    .section-header,
    .table-toolbar,
    .pagination {
      align-items: flex-start;
      flex-direction: column;
    }

    .stats,
    .records-pill,
    .pagination-actions,
    .pagination-actions button {
      width: 100%;
    }

    .pagination-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>