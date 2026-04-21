<script>
    import Header from "$lib/components/Header_St.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import DashboardStats from "$lib/components/Projects.svelte";
    import SideBar from "../../../lib/components/CoordinatorSideBar.svelte";
    
    export let data;

    // Conectamos con las variables que envía tu +page.server.js
    $: projects = data.projects || [];
    $: allTeachers = data.allTeachers || [];
    $: error = data.error;

    // Estadísticas enfocadas en Docentes
    $: stats = [

        { 
            label: 'Docentes Registrados', 
            value: allTeachers.length, 
            icon: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 14c4 0 7 2 7 5v1H5v-1c0-3 3-5 7-5z"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
            bgColor: 'skyblue',
            color: 'white'
        }
    ];

    // Función para cambiar el estado del Docente
    function toggleUserStatus(teacher) {
        const nuevoEstado = !teacher.is_active;
        const accion = nuevoEstado ? "HABILITAR" : "DESHABILITAR";
        
        if (confirm(`¿Estás seguro de que deseas ${accion} al docente ${teacher.first_name} ${teacher.last_name}?`)) {
            // Actualización reactiva local
            teacher.is_active = nuevoEstado;
            allTeachers = [...allTeachers]; 
            
            alert(`Docente ${accion} con éxito en el sistema.`);
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
                    <h1>GESTIÓN DE DOCENTES</h1>
                    <p>Supervisión de personal académico y control de acceso al sistema.</p>
                </div>

            </div>
        </header>

        {#if error}
            <div class="error-msg">⚠️ {error}</div>
        {/if}

        <DashboardStats {stats} />

        <section class="list-section" style="margin-top: 3rem;">
            <div class="section-title">
                <h2>Lista de Profesores</h2>
                <span class="badge purple">{allTeachers.length} Registrados</span>
            </div>

            <div class="table-container">
                <table class="students-table">
                    <thead>
                        <tr>
                            <th>Nombre del Docente</th>
                            <th>Correo Institucional</th>
                            <th>Estado</th>
                            <th>Acción de Seguridad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each allTeachers as teacher}
                            <tr>
                                <td><strong>{teacher.first_name} {teacher.last_name}</strong></td>
                                <td>{teacher.email}</td>
                                <td>
                                    <span class="status-pill {teacher.is_active ? 'active' : 'inactive'}">
                                        {teacher.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        class="toggle-btn {teacher.is_active ? 'deactivate' : 'activate'}"
                                        on:click={() => toggleUserStatus(teacher)}
                                    >
                                        {teacher.is_active ? 'Deshabilitar Acceso' : 'Habilitar Acceso'}
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                
                {#if allTeachers.length === 0 && !error}
                    <div class="empty">No se encontraron docentes con ID_ROLE 3 en la base de datos.</div>
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
    h1 { color: #0b2d69; font-weight: 800; letter-spacing: -0.5px; }
    p { color: #64748b; }


    .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0; }
    .students-table { width: 100%; border-collapse: collapse; text-align: left; }
    .students-table th { background: #f8fafc; padding: 1.2rem; color: #1e293b; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
    .students-table td { padding: 1.2rem; border-bottom: 1px solid #f1f5f9; color: #475569; }

    .status-pill { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; }
    .status-pill.active { background: #dcfce7; color: #166534; }
    .status-pill.inactive { background: #fee2e2; color: #991b1b; }

    .toggle-btn { border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: 0.2s; min-width: 160px; }
    .toggle-btn.activate { background: #16a34a; color: white; }
    .toggle-btn.deactivate { background: #dc2626; color: white; }
    .toggle-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; color: white; }
    .badge.purple { background: #009dff; }

    .error-msg { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #dc2626; }
    .empty { padding: 3rem; text-align: center; color: #94a3b8; font-style: italic; }
</style>