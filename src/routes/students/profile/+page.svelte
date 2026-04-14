<script>
    import Header from "../../../lib/components/Header_St.svelte";
    import Footer from "../../../lib/components/Footer.svelte";
    import SideBar from "../../../lib/components/StudentSideBar.svelte";
    import Profile from "../../../lib/components/Profile.svelte";

    export let data;

    $: user = data.user || {};
    $: error = data.error;
</script>

<Header />
<SideBar />

<main>
    <div class="content-wrapper">
        <header class="main-header">
            <h1>MÓDULO ESTUDIANTE</h1>
            <p>Consulta de información personal y estado de cuenta.</p>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {:else}
            <Profile {user} />
        {/if}
    </div>
</main>

<Footer />

<style>
    main {
        background-color: #f3f4f6;
        min-height: 80vh;
        padding: 2rem 1rem;
    }

    .content-wrapper {
        max-width: 1100px;
        margin: 0 auto;
    }

    .main-header {
        margin-bottom: 2rem;
    }

    h1 {
        color: #0b2d69;
        margin: 0;
        font-size: 1.8rem;
        font-weight: 800;
    }

    p {
        color: #64748b;
        margin-top: 5px;
    }

    .error-msg {
        background: #fee2e2;
        color: #b91c1c;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }
</style>