<script>
    // Recibimos los datos del usuario como una prop única
    export let user = {};
    
    // Función de apoyo para identificar el rol visualmente
    function getRoleConfig(roleId) {
        const configs = {
            1: { name: "Estudiante", color: "#ff9500", label: "Pregrado" },
            3: { name: "Profesor", color: "#9333ea", label: "Docente / Investigador" },
            4: { name: "Coordinador", color: "#0b2d69", label: "Gestión Académica" }
        };
        return configs[roleId] || { name: "Usuario", color: "#64748b", label: "Sistema" };
    }

    $: role = getRoleConfig(user.id_role);
</script>

<div class="profile-card">
    <div class="profile-header" style="border-left-color: {role.color}">
        <div class="avatar" style="background-color: {role.color}">
            {user.first_name?.[0] || 'U'}{user.last_name?.[0] || ''}
        </div>
        <div class="user-meta">
            <h1>{user.first_name} {user.last_name}</h1>
            <span class="role-tag" style="background-color: {role.color}15; color: {role.color}">
                {role.name} - {role.label}
            </span>
        </div>
    </div>

    <div class="info-sections">
        <section class="data-group">
            <h3><i class="icon">📧</i> Contacto y Acceso</h3>
            <div class="field">
                <span class="label">Correo Institucional</span>
                <span class="value">{user.email}</span>
            </div>
            <div class="field">
                <span class="label">Teléfono de contacto</span>
                <span class="value">{user.phone || 'No registrado'}</span>
            </div>
        </section>

        <section class="data-group">
            <h3><i class="icon">🔑</i> Identificación</h3>
            <div class="field">
                <span class="label">Estado de cuenta</span>
                <span class="status-indicator {user.is_active ? 'active' : 'inactive'}">
                    {user.is_active ? '● Activa' : '○ Inactiva'}
                </span>
            </div>
        </section>
    </div>
</div>

<style>
    .profile-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        max-width: 800px;
        margin: 0 auto;
    }

    .profile-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 2rem;
        background: #fff;
        border-left: 10px solid;
        border-bottom: 1px solid #f1f5f9;
    }

    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.8rem;
        font-weight: 800;
        text-transform: uppercase;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .user-meta h1 {
        margin: 0;
        font-size: 1.5rem;
        color: #1e293b;
    }

    .role-tag {
        font-size: 0.8rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 20px;
        margin-top: 0.5rem;
        display: inline-block;
        text-transform: uppercase;
    }

    .info-sections {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
    }

    .data-group h3 {
        font-size: 0.9rem;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 1.2rem;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .field {
        margin-bottom: 1rem;
    }

    .label {
        display: block;
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 600;
    }

    .value {
        font-size: 1rem;
        color: #334155;
        font-weight: 500;
    }

    .status-indicator {
        font-weight: 700;
        font-size: 0.9rem;
    }

    .status-indicator.active { color: #10b981; }
    .status-indicator.inactive { color: #ef4444; }

    @media (max-width: 600px) {
        .info-sections { grid-template-columns: 1fr; }
        .profile-header { flex-direction: column; text-align: center; }
    }
</style>