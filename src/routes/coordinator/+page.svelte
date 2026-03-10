<script>
    import Header from "$lib/components/Header_St.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import DashboardStats from "$lib/components/DashboardStats.svelte";
    
    // Recibimos los datos del servidor para evitar CORS
    export let data;

    $: projects = data.projects || [];
    $: allStudents = data.allStudents || [];
    $: teachers = data.teachers || [];
    $: error = data.error;

    // Estadísticas para el Coordinador
    $: stats = [
        { 
            label: 'Total Proyectos', 
            value: projects.length, 
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
            bgColor: '#dbeafe',
            color: '#2563eb'
        },
        { 
            label: 'Docentes Activos', 
            value: teachers.length, 
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
            bgColor: '#f3e8ff',
            color: '#9333ea'
        }
    ];

    function openCreateModal() {
        // Mensaje solicitado para la funcionalidad a medias
        alert("MÓDULO DE REGISTRO:\nLa asignación de docentes y horarios estará disponible con la funcionalidad del inicio de sesión.");
    }

    function handleCancelProject(projectName) {
        if (confirm(`¿Estás seguro de que deseas cancelar el proyecto "${projectName}"? Esta acción no se puede deshacer.`)) {
            alert(`Proyecto "${projectName}" marcado como CANCELADO en la base de datos.`);
        }
    }

    function viewStudents(projectName) {
        alert(`Cargando lista de estudiantes vinculados a: ${projectName}`);
    }
</script>

<Header />

<main>
    <div class="content-wrapper">
        <header class="main-header">
            <div class="header-top">
                <div>
                    <h1>MÓDULO COORDINADOR</h1>
                    <p>Gestión integral de proyectos, asignación de docentes y supervisión académica.</p>
                </div>
                <button class="add-btn" on:click={openCreateModal}>
                    + Agregar Proyecto
                </button>
            </div>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {/if}

        <DashboardStats {stats} />

        <section class="list-section">
            <div class="section-title">
                <h2>Gestionar Proyectos</h2>
                <span class="badge">{projects.length} Activos</span>
            </div>

            <div class="projects-grid">
                {#each projects as project}
                    <div class="project-card">
                        <div class="card-body">
                            <div class="icon-box">📂</div>
                            <div class="info">
                                <h3>{project.project_name}</h3>
                                <p class="teacher">Docente: <span class="highlight">{project.teacherName || 'Pendiente'}</span></p>
                                <p class="schedule">Horario: {project.schedule || 'No definido'}</p>
                            </div>
                        </div>

                        <div class="card-actions">
                            <button class="students-btn" on:click={() => viewStudents(project.project_name)}>
                                Ver estudiantes
                            </button>
                            
                            <button class="cancel-btn" on:click={() => handleCancelProject(project.project_name)}>
                                Cancelar Proyecto
                            </button>
                        </div>
                    </div>
                {/each}

                {#if projects.length === 0 && !error}
                    <div class="empty">No hay proyectos para gestionar.</div>
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

    h1 { color: #0b2d69; margin: 0; font-size: 1.8rem; font-weight: 800; }
    p { color: #64748b; margin-top: 5px; }

    .add-btn {
        background: #0b2d69;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    }

    .add-btn:hover { background: #1540a5; transform: translateY(-2px); }

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

    /* ESTILO DE TARJETA COORDINADOR */
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

    .card-body { display: flex; gap: 1.2rem; align-items: center; }
    .icon-box { font-size: 1.8rem; background: #fff7ed; padding: 10px; border-radius: 10px; }
    
    h3 { margin: 0; color: #0b2d69; font-size: 1.25rem; }
    .teacher { font-size: 0.95rem; color: #475569; margin: 4px 0; }
    .highlight { color: #ff9500; font-weight: 600; }
    .schedule { font-size: 0.9rem; color: #94a3b8; }

    .card-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        border-top: 1px solid #f1f5f9;
        padding-top: 1.2rem;
    }

    .students-btn {
        background: #0b2d69;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: 0.2s;
    }

    .cancel-btn {
        background: white;
        color: #dc2626;
        border: 1.5px solid #dc2626;
        padding: 10px 18px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: 0.2s;
    }

    .students-btn:hover { background: #1540a5; }
    .cancel-btn:hover { background: #fee2e2; }

    .error-msg { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
</style>