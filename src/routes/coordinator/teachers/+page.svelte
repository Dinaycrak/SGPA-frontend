<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';
  import CoordinatorUsersDataTable from '$lib/components/CoordinatorUsersDataTable.svelte';

  export let data;
  export let form;

  $: users = data?.users || [];
  $: error = form?.error || data?.error || '';
  $: successMessage = form?.message || '';
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    {#if successMessage}
      <div class="success-box">✅ {successMessage}</div>
    {/if}

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <CoordinatorUsersDataTable
      {users}
      {form}
      title="Teachers"
      subtitle="View, search, enable, and disable teacher accounts registered in SGPA."
      searchPlaceholder="Search teacher by name, email, phone, ID, or status..."
      emptyMessage="No teachers to display."
      userType="teachers"
    />
  </div>
</main>

<Footer />

<style>
  main {
    min-height: 80vh;
    padding: 2rem 1rem 3rem;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.12), transparent 22rem),
      linear-gradient(180deg, #ffffff 0%, var(--sgpa-bg) 100%);
  }

  .content-wrapper {
    max-width: 1180px;
    margin: 0 auto;
  }

  .success-box,
  .error-msg {
    max-width: 1180px;
    margin: 0 auto 1rem;
  }
</style>