<script>
    import Header from "../../../lib/components/Header_St.svelte";
    import Footer from "../../../lib/components/Footer.svelte";
    import DashboardStats from "../../../lib/components/Projects.svelte";
    import SideBar from "../../../lib/components/TeacherSideBar.svelte";

    export let data;

    $: projects = data.projects || [];
    $: error = data.error;

    // Solo mantenemos la estadística de proyectos disponibles
    $: stats = [
        {
            label: "Proyectos Bajo Dirección",
            value: projects.length,
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
            bgColor: "#dbeafe",
            color: "#2563eb"
        }
    ];

    function handleEnrollment() {
        // Función deshabilitada por falta de login
        alert("La función de matriculación requiere inicio de sesión (No disponible actualmente).");
    }
</script>

<Header />
<SideBar />

<main>
    <div class="content-wrapper">
        <header class="main-header">
            <h1>MODULO ESTUDIANTE</h1>
            <p>Visualizacion de proyectos disponibles para participar</p>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {/if}

        <DashboardStats {stats} />

        <section class="list-section">
            <div class="section-title">
                <h2>Proyectos Disponibles</h2>
                <span class="badge">{projects.length}</span>
            </div>

            <div class="projects-grid">
                {#each projects as project}
                    <div class="project-card">
                        <div class="card-body">
                            <div class="icon-box">📁</div>
                            <div class="info">
                                <h3>{project.project_name}</h3>
                                <p class="date">Fecha de creación: {project.start_date}</p>
                                <p class="desc">{project.description || 'Sin descripción disponible'}</p>
                            </div>
                        </div>

                        <div class="card-actions">
                            <div class="status-info">
                                <span class="status-tag">Estado ID: {project.id_status}</span>
                            </div>
                            <button class="enroll-btn" on:click={handleEnrollment}>
                                Matricularse al proyecto
                            </button>
                        </div>
                    </div>
                {/each}

                {#if projects.length === 0 && !error}
                    <div class="empty">No hay proyectos registrados en la base de datos.</div>
                {/if}
            </div>
        </section>
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

    .main-header { margin-bottom: 2rem; }
    h1 { color: #0b2d69; margin: 0; font-size: 1.8rem; }
    p { color: #6b7280; }

    .section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 1.5rem;
    }

    .badge {
        background: #0b2d69;
        color: white;
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
    }

    .project-card {
        background: white;
        border-radius: 12px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-left: 6px solid #ff9500; /* Color distintivo */
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .card-body { display: flex; gap: 1rem; align-items: flex-start; }
    .icon-box { font-size: 1.5rem; }
    
    h3 { margin: 0; color: #ff9500; font-size: 1.2rem; }
    .date { font-size: 0.85rem; color: #9ca3af; margin: 2px 0; }
    .desc { font-size: 0.9rem; color: #4b5563; }

    .card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #f3f4f6;
        padding-top: 1rem;
    }

    .status-tag {
        font-size: 0.8rem;
        background: #f1f5f9;
        padding: 4px 10px;
        border-radius: 6px;
        color: #64748b;
        font-weight: 600;
    }

    .enroll-btn {
        background: #0b2d69;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
    }

    .enroll-btn:hover {
        background: #1540a5;
    }

    .error-msg { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
    .empty { text-align: center; padding: 3rem; background: white; border-radius: 12px; color: #94a3b8; }
</style>