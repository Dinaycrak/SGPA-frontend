<script>
    import Header from "$lib/components/Header_St.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import DashboardStats from "$lib/components/Projects.svelte";
    import SideBar from "../../../lib/components/CoordinatorSideBar.svelte";
    
    export let data;

    $: allStudents = data.allStudents || [];
    $: error = data.error;

    // Estadísticas actualizadas
    $: stats = [
        { 
            label: 'Estudiantes Registrados', 
            value: allStudents.length, 
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
            bgColor: 'skyblue',
            color: 'white'
        }
    ];

    // Función para cambiar el estado del estudiante
    function toggleUserStatus(student) {
        const nuevoEstado = !student.is_active;
        const accion = nuevoEstado ? "HABILITAR" : "DESHABILITAR";
        
        if (confirm(`¿Estás seguro de que deseas ${accion} al estudiante ${student.first_name} ${student.last_name}?`)) {
            // Aquí se haría el fetch a la API en un escenario real
            student.is_active = nuevoEstado;
            allStudents = [...allStudents]; // Disparamos la reactividad de Svelte
            
            alert(`Estudiante ${accion} con éxito en la base de datos.`);
        }
    }


    function handleCancelProject(projectName) {
        if (confirm(`¿Estás seguro de que deseas cancelar el proyecto "${projectName}"?`)) {
            alert(`Proyecto "${projectName}" marcado como CANCELADO.`);
        }
    }
</script>

<Header />
<SideBar />

<main>
    <div class="content-wrapper">
        <header class="main-header">
            <div class="header-top">
                <div>
                    <h1>MÓDULO COORDINADOR</h1>
                    <p>Gestión de proyectos y control de estado de estudiantes.</p>
                </div>

            </div>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {/if}

        <DashboardStats {stats} />

        <section class="list-section" style="margin-top: 3rem;">
            <div class="section-title">
                <h2>Control de Estudiantes</h2>
                <span class="badge blue">{allStudents.length} Total</span>
            </div>

            <div class="table-container">
                <table class="students-table">
                    <thead>
                        <tr>
                            <th>Nombre Completo</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each allStudents as student}
                            <tr>
                                <td>{student.first_name} {student.last_name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <span class="status-pill {student.is_active ? 'active' : 'inactive'}">
                                        {student.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        class="toggle-btn {student.is_active ? 'deactivate' : 'activate'}"
                                        on:click={() => toggleUserStatus(student)}
                                    >
                                        {student.is_active ? 'Deshabilitar' : 'Habilitar'}
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {#if allStudents.length === 0}
                    <div class="empty">No hay estudiantes registrados.</div>
                {/if}
            </div>
        </section>
    </div>
</main>

<Footer />

<style>
    main { background-color: #f1f5f9; min-height: 80vh; padding: 2rem 1rem; }
    .content-wrapper { max-width: 1100px; margin: 0 auto; }
    .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    h1 { color: #0b2d69; font-weight: 800; }

    /* TABLA DE ESTUDIANTES */
    .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; }
    .students-table { width: 100%; border-collapse: collapse; text-align: left; }
    .students-table th { background: #f8fafc; padding: 1rem; color: #1e293b; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
    .students-table td { padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #475569; }

    .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
    .status-pill.active { background: #dcfce7; color: #166534; }
    .status-pill.inactive { background: #fee2e2; color: #991b1b; }

    /* BOTONES DINÁMICOS */
    .toggle-btn { border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: 0.2s; min-width: 110px; }
    .toggle-btn.activate { background: #16a34a; color: white; }
    .toggle-btn.deactivate { background: #dc2626; color: white; }
    .toggle-btn:hover { opacity: 0.85; transform: scale(1.02); }

    .badge { background: #ff9500; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; }
    .badge.blue { background: #2563eb; }

</style>