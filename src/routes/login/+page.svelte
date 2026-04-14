<script>
  import Header from '$lib/components/Header_L.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { goto } from '$app/navigation';

  let selectedRole = $state('student');

  function handleLogin() {
    if (selectedRole === 'student') {
      goto('/students');
    } else if (selectedRole === 'teacher') {
      goto('/teacher');
    } else if (selectedRole === 'coordinator') {
      goto('/coordinator');
    }
  }
</script>

<svelte:head>
  <title>Login | SGPA</title>
  <meta
    name="description"
    content="Ingreso al Sistema de Gestión de Proyectos Académicos - SGPA"
  />
</svelte:head>

<div class="page-wrapper">
  <Header />

  <main class="login-page">
    <section class="login-hero">
      <div class="login-hero-overlay">
        <div class="login-info">
          <span class="hero-badge">Acceso institucional</span>
          <h2 class="title">Iniciar sesión</h2>
          <p class="description">
            Bienvenido al Sistema de Gestión de Proyectos Académicos. Desde este espacio
            podrás acceder según tu rol dentro de la plataforma: estudiante, docente o
            coordinador principal.
          </p>

          <div class="info-boxes">
            <article class="info-card">
              <h3>Control académico</h3>
              <p>
                Administra procesos, revisa información y mantén seguimiento organizado de
                las actividades del sistema.
              </p>
            </article>

            <article class="info-card">
              <h3>Acceso por roles</h3>
              <p>
                Cada tipo de usuario cuenta con un ingreso diferenciado según sus funciones
                dentro del SGPA.
              </p>
            </article>
          </div>
        </div>

        <div class="login-image-slot">
          <img src="/images/login-banner.png" alt="Imagen institucional de acceso SGPA" />
        </div>
      </div>
    </section>

    <section class="login-section">
      <div class="login-card">
        <div class="card-top-line"></div>

        <div class="login-card-header">
          <span class="login-mini-badge">SGPA</span>
          <h2 class="login-card-title">Accede a tu cuenta</h2>
          <p class="login-card-subtitle">
            Ingresa tus datos y selecciona el tipo de acceso correspondiente.
          </p>
        </div>

        <div class="login-form">
          <div class="input-group-custom">
            <label for="usuario">Usuario</label>
            <input id="usuario" class="login-formulary" type="text" placeholder="Ingresa tu usuario" />
          </div>

          <div class="input-group-custom">
            <label for="password">Contraseña</label>
            <input id="password" class="login-formulary" type="password" placeholder="Ingresa tu contraseña" />
          </div>

          <div class="role-selector">
            <p class="role-title">Selecciona tu rol</p>

            <div class="radio-group-horizontal">
              <label class:selected={selectedRole === 'student'} class="radio-option-vertical student-card">
                <input type="radio" bind:group={selectedRole} value="student" />
                <span class="role-pill">Estudiante</span>
              </label>

              <label class:selected={selectedRole === 'teacher'} class="radio-option-vertical teacher-card">
                <input type="radio" bind:group={selectedRole} value="teacher" />
                <span class="role-pill">Docente</span>
              </label>

              <label class:selected={selectedRole === 'coordinator'} class="radio-option-vertical coordinator-card">
                <input type="radio" bind:group={selectedRole} value="coordinator" />
                <span class="role-pill">Coordinador</span>
              </label>
            </div>
          </div>

          <button class="btn-primary" onclick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    font-family: 'Montserrat', 'Lato', 'Segoe UI', Arial, sans-serif;
    background: #f3f3f3;
    color: #1d1d1d;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .page-wrapper {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(29, 115, 212, 0.08), transparent 28%),
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.08), transparent 22%),
      linear-gradient(180deg, #f8faff 0%, #eef3fb 35%, #f4f6fa 100%);
  }

  .login-page {
    padding-bottom: 70px;
  }

  .login-hero {
    padding: 42px 24px 20px;
  }

  .login-hero-overlay {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.08fr 1fr;
    gap: 32px;
    align-items: center;
  }

  .login-info {
    animation: fadeLeft 0.9s ease;
  }

  .hero-badge {
    display: inline-block;
    background: linear-gradient(135deg, #f2b705 0%, #ffd450 100%);
    color: #0b2d69;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 8px 16px;
    border-radius: 999px;
    margin-bottom: 18px;
    box-shadow: 0 10px 24px rgba(242, 183, 5, 0.25);
  }

  .title {
    margin: 0 0 16px;
    color: #0b2d69;
    font-size: clamp(2.1rem, 4vw, 3.6rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .description {
    margin: 0 0 26px;
    color: #454545;
    font-size: 1.04rem;
    line-height: 1.8;
    max-width: 690px;
  }

  .info-boxes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .info-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 22px;
    border: 1px solid rgba(11, 45, 105, 0.08);
    border-top: 4px solid #0b2d69;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .info-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.1);
  }

  .info-card h3 {
    margin: 0 0 10px;
    color: #0b2d69;
    font-size: 1.08rem;
  }

  .info-card p {
    margin: 0;
    color: #4f4f4f;
    line-height: 1.7;
  }

  .login-image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeRight 1s ease;
  }

  .login-image-slot img {
    width: 100%;
    max-width: 560px;
    border-radius: 28px;
    object-fit: cover;
    box-shadow: 0 24px 52px rgba(11, 45, 105, 0.18);
    border: 4px solid rgba(255, 255, 255, 0.85);
  }

  .login-section {
    padding: 20px 24px 0;
  }

  .login-card {
    max-width: 620px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(14px);
    border-radius: 28px;
    box-shadow: 0 22px 46px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border: 1px solid rgba(11, 45, 105, 0.08);
  }

  .card-top-line {
    height: 8px;
    background: linear-gradient(90deg, #0b2d69 0%, #1d73d4 55%, #f2b705 100%);
  }

  .login-card-header {
    padding: 28px 34px 10px;
    text-align: center;
  }

  .login-mini-badge {
    display: inline-block;
    margin-bottom: 10px;
    background: rgba(11, 45, 105, 0.08);
    color: #0b2d69;
    padding: 7px 14px;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .login-card-title {
    margin: 0;
    color: #0b2d69;
    font-size: 2rem;
  }

  .login-card-subtitle {
    margin: 10px 0 0;
    color: #5b5b5b;
    line-height: 1.7;
  }

  .login-form {
    padding: 20px 34px 34px;
  }

  .input-group-custom {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
  }

  .input-group-custom label {
    font-weight: 700;
    color: #0b2d69;
    margin-bottom: 8px;
  }

  .login-formulary {
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid #d4dceb;
    background: #f8fbff;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .login-formulary:focus {
    border-color: #1d73d4;
    box-shadow: 0 0 0 4px rgba(29, 115, 212, 0.12);
  }

  .role-selector {
    margin: 24px 0 26px;
  }

  .role-title {
    margin: 0 0 12px;
    font-weight: 800;
    color: #0b2d69;
  }

  .radio-group-horizontal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .radio-option-vertical {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 82px;
    border-radius: 18px;
    border: 2px solid transparent;
    cursor: pointer;
    font-weight: 700;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    user-select: none;
  }

  .radio-option-vertical input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .student-card {
    background: rgba(29, 115, 212, 0.08);
    color: #0b2d69;
  }

  .teacher-card {
    background: rgba(242, 183, 5, 0.12);
    color: #7b5a00;
  }

  .coordinator-card {
    background: rgba(11, 45, 105, 0.1);
    color: #0b2d69;
  }

  .radio-option-vertical:hover {
    transform: translateY(-3px);
  }

  .radio-option-vertical.selected {
    border-color: #1d73d4;
    box-shadow: 0 12px 24px rgba(29, 115, 212, 0.15);
  }

  .role-pill {
    font-size: 0.98rem;
  }

  .btn-primary {
    width: 100%;
    border: none;
    border-radius: 16px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #0b2d69 0%, #1d73d4 100%);
    color: white;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(11, 45, 105, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    filter: brightness(1.03);
    box-shadow: 0 18px 34px rgba(11, 45, 105, 0.25);
  }

  @keyframes fadeLeft {
    from {
      opacity: 0;
      transform: translateX(-24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeRight {
    from {
      opacity: 0;
      transform: translateX(24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 980px) {
    .login-hero-overlay {
      grid-template-columns: 1fr;
    }

    .login-image-slot {
      order: -1;
    }

    .info-boxes {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .radio-group-horizontal {
      grid-template-columns: 1fr;
    }

    .login-card-header,
    .login-form {
      padding-left: 20px;
      padding-right: 20px;
    }

    .login-hero {
      padding-left: 16px;
      padding-right: 16px;
    }

    .login-section {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
</style>