<script>
    import Header from "$lib/components/Header_St.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import DashboardStats from "$lib/components/Projects.svelte";
    import SideBar from "../../../lib/components/StudentSideBar.svelte";

    export let data;

    $: projects = data.projects || [];
    $: error = data.error;

    $: stats = [
        {
            label: 'Proyectos Disponibles',
            value: projects.length,
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
            bgColor: '#dbeafe',
            color: '#2563eb'
        }
    ];

    function joinProject(projectName) {
        alert(`La funcionalidad para ingresar al proyecto "${projectName}" estará disponible cuando se defina completamente con el profesor.`);
    }
</script>

<Header />

<SideBar />

<main>
    <div class="content-wrapper">
        <header class="main-header">
            <div class="header-top">
                <div>
                    <h1>MÓDULO ESTUDIANTE</h1>
                    <p>Consulta de proyectos disponibles para participación estudiantil.</p>
                </div>
            </div>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {/if}

        <DashboardStats {stats} />

        <section class="list-section">
            <div class="section-title">
                <h2>Proyectos Disponibles</h2>
                <span class="badge">{projects.length} Disponibles</span>
            </div>

            <div class="projects-grid">
                {#each projects as project}
                    <div class="project-card">
                        <div class="card-body">
                            <div class="icon-box">📂</div>
                            <div class="info">
                                <h3>{project.project_name}</h3>
                                <p class="description">
                                    {project.description || 'Sin descripción disponible.'}
                                </p>
                                <p class="date">Fecha de inicio: {project.start_date || 'No definida'}</p>
                                <p class="status">
                                    Estado:
                                    <span class="highlight">{project.status}</span>
                                </p>
                            </div>
                        </div>

                        <div class="card-actions">
                            <button
                                class="join-btn"
                                on:click={() => joinProject(project.project_name)}
                            >
                                Ingresar al proyecto
                            </button>
                        </div>
                    </div>
                {/each}

                {#if projects.length === 0 && !error}
                    <div class="empty">No hay proyectos disponibles en este momento.</div>
                {/if}
            </div>
        </section>
    </div>
</main>

<Footer />

<style>
    main {
        background-color: #f1f5f9;
        min-height: 80vh;
        padding: 2rem 1rem;
    }

    .content-wrapper {
        max-width: 1100px;
        margin: 0 auto;
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
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

    .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 1.5rem;
    }

    .badge {
        background: #ff9500;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
    }

    .project-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border-left: 6px solid #ff9500;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .card-body {
        display: flex;
        gap: 1.2rem;
        align-items: flex-start;
    }

    .icon-box {
        font-size: 1.8rem;
        background: #fff7ed;
        padding: 10px;
        border-radius: 10px;
    }

    h3 {
        margin: 0;
        color: #0b2d69;
        font-size: 1.25rem;
    }

    .description {
        font-size: 0.95rem;
        color: #475569;
        margin: 6px 0;
    }

    .date {
        font-size: 0.9rem;
        color: #64748b;
        margin: 4px 0;
    }

    .status {
        font-size: 0.95rem;
        color: #475569;
        margin: 4px 0;
    }

    .highlight {
        color: #ff9500;
        font-weight: 600;
    }

    .card-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        border-top: 1px solid #f1f5f9;
        padding-top: 1.2rem;
    }

    .join-btn {
        background: #0b2d69;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: 0.2s;
    }

    .join-btn:hover {
        background: #1540a5;
    }

    .error-msg {
        background: #fee2e2;
        color: #b91c1c;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }

    .empty {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        color: #64748b;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
</style>