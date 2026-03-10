<script>
    import Header from "../../lib/components/Header_St.svelte";
    import Footer from "../../lib/components/Footer.svelte";
    import DashboardStats from "../../lib/components/DashboardStats.svelte";

    // Recibimos los datos del servidor (evita el error 500 y CORS)
    export let data;

    $: projects = data.projects || [];
    $: error = data.error;

    // Estadísticas dinámicas
    $: avgProgress = projects.length > 0
        ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
        : 0;

    $: stats = [
        {
            label: "Proyectos Asignados",
            value: projects.length,
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
            color: "#2563eb"
        },
        {
            label: "Progreso Promedio",
            value: `${avgProgress}%`,
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
            bgColor: "#fef3c7",
            color: "#d97706"
        }
    ];

    function viewStudents(name) {
        alert("Mostrando equipo del proyecto: " + name);
    }

    function uploadDocument(projectName) {
        // Funcionalidad futura
        alert(`Módulo de carga para: ${projectName}\n(Esta función estará disponible al activar el inicio de sesión).`);
    }
</script>

<Header />

<main>
    <div class="content-wrapper">
        <header class="main-header">
            <h1>MÓDULO DOCENTE</h1>
            <p>Gestión de proyectos asignados y seguimiento de estudiantes participando.</p>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {/if}

        <DashboardStats {stats} />

        <section class="list-section">
            <div class="section-title">
                <h2>Mis Proyectos</h2>
                <span class="badge">{projects.length}</span>
            </div>

            <div class="projects-grid">
                {#each projects as project}
                    <div class="project-card">
                        <div class="card-body">
                            <div class="icon-box">📁</div>
                            <div class="info">
                                <h3>{project.project_name}</h3>
                                <p class="date">Iniciado: {project.start_date}</p>
                                <p class="desc">{project.description || 'Sin descripción'}</p>
                            </div>
                        </div>

                        <div class="card-actions">
                            <div class="progress-mini">
                                <span>Progreso</span>
                                <div class="bar-bg"><div class="bar" style="width: {project.progress || 0}%"></div></div>
                            </div>
                            
                            <div class="button-group">
                                <button class="upload-btn" on:click={() => uploadDocument(project.project_name)} title="Subir material para estudiantes">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                    Documento
                                </button>

                                <button class="students-btn" on:click={() => viewStudents(project.project_name)}>
                                    Ver estudiantes
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}

                {#if projects.length === 0 && !error}
                    <div class="empty">No tienes proyectos asignados actualmente.</div>
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
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-left: 6px solid #ff9500;
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
        flex-wrap: wrap;
        gap: 1rem;
    }

    .progress-mini { width: 35%; min-width: 150px; }
    .progress-mini span { font-size: 0.75rem; color: #6b7280; }
    .bar-bg { background: #e5e7eb; height: 6px; border-radius: 10px; margin-top: 4px; }
    .bar { background: #ff9500; height: 100%; border-radius: 10px; }

    .button-group {
        display: flex;
        gap: 8px;
    }

    /* ESTILOS DE BOTONES */
    .students-btn, .upload-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: 0.3s;
        font-size: 0.9rem;
    }

    .students-btn {
        background: #0b2d69;
        color: white;
    }

    .students-btn:hover { background: #1540a5; }

    .upload-btn {
        background: #e2e8f0;
        color: #475569;
    }

    .upload-btn:hover {
        background: #cbd5e1;
        color: #1e293b;
    }

    .error-msg { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
    .empty { text-align: center; padding: 2rem; color: #9ca3af; }
</style>