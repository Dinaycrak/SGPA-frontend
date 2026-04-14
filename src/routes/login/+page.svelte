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

          <button class="btn-primary" on:click={handleLogin}>
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
    font-size: 1.1rem;
  }

  .info-card p {
    margin: 0;
    color: #4f4f4f;
    line-height: 1.7;
  }

  .login-image-slot {
    min-height: 420px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(11, 45, 105, 0.16);
    animation: fadeRight 0.95s ease;
    position: relative;
  }

  .login-image-slot::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(11, 45, 105, 0.12) 0%,
      rgba(11, 45, 105, 0.24) 100%
    );
    pointer-events: none;
  }

  .login-image-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .login-section {
    padding: 20px 24px 0;
  }

  .login-card {
    max-width: 560px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.65);
    border-radius: 30px;
    padding: 0 34px 36px;
    box-shadow:
      0 24px 60px rgba(11, 45, 105, 0.12),
      0 10px 24px rgba(0, 0, 0, 0.05);
    animation: fadeUp 0.9s ease;
    overflow: hidden;
    position: relative;
  }

  .login-card-header {
    text-align: center;
    margin-bottom: 24px;
  }

  .card-top-line {
    height: 8px;
    background: linear-gradient(90deg, #0b2d69 0%, #1d73d4 55%, #f2b705 100%);
    margin: 0 -34px 28px;
    width: calc(100% + 68px);
  }

  .login-mini-badge {
    display: inline-block;
    padding: 7px 14px;
    border-radius: 999px;
    background: rgba(11, 45, 105, 0.08);
    color: #0b2d69;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .login-card-title {
    margin: 0;
    color: #0b2d69;
    text-align: center;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .login-card-subtitle {
    margin: 12px 0 0;
    text-align: center;
    color: #5c6b82;
    line-height: 1.7;
    font-size: 0.98rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .input-group-custom {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-group-custom label {
    font-size: 0.92rem;
    font-weight: 700;
    color: #0b2d69;
    padding-left: 2px;
  }

  .login-formulary {
    width: 100%;
    padding: 15px 16px;
    border-radius: 16px;
    border: 1.5px solid #d7dfef;
    background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
    color: #1d1d1d;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
  }

  .login-formulary::placeholder {
    color: #8b98ad;
  }

  .login-formulary:focus {
    border-color: #1d73d4;
    box-shadow: 0 0 0 5px rgba(29, 115, 212, 0.12);
    background: #fff;
    transform: translateY(-1px);
  }

  .role-selector {
    margin-top: 4px;
    padding: 18px;
    border-radius: 22px;
    background: linear-gradient(180deg, rgba(241, 246, 255, 0.9), rgba(255, 255, 255, 0.95));
    border: 1px solid rgba(11, 45, 105, 0.08);
  }

  .role-title {
    margin: 0 0 14px;
    color: #0b2d69;
    font-size: 0.95rem;
    font-weight: 700;
    text-align: center;
  }

  .radio-group-horizontal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    width: 100%;
  }

  .radio-option-vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    padding: 18px 12px;
    border-radius: 18px;
    background: #ffffff;
    border: 1.5px solid #dde6f3;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    min-height: 108px;
  }

  .radio-option-vertical:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(11, 45, 105, 0.08);
  }

  .radio-option-vertical.selected {
    border-color: #1d73d4;
    box-shadow: 0 16px 28px rgba(29, 115, 212, 0.14);
    transform: translateY(-2px);
  }

  .role-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 38px;
    padding: 8px 12px;
    border-radius: 12px;
    font-weight: 700;
    width: 100%;
    font-size: 0.92rem;
  }

  .student-card .role-pill {
    color: white;
    background: linear-gradient(135deg, #0b2d69 0%, #1f5efe 100%);
    box-shadow: 0 12px 24px rgba(31, 94, 254, 0.18);
  }

  .teacher-card .role-pill {
    color: white;
    background: linear-gradient(135deg, #163d87 0%, #2e7edb 100%);
    box-shadow: 0 12px 24px rgba(46, 126, 219, 0.18);
  }

  .coordinator-card .role-pill {
    color: white;
    background: linear-gradient(135deg, #0b2d69 0%, #f2b705 180%);
    box-shadow: 0 12px 24px rgba(242, 183, 5, 0.18);
  }

  input[type="radio"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #0b2d69;
  }

  .btn-primary {
    width: 100%;
    margin-top: 4px;
    padding: 15px 24px;
    cursor: pointer;
    background: linear-gradient(135deg, #0b2d69 0%, #1d73d4 100%);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    box-shadow: 0 16px 28px rgba(11, 45, 105, 0.18);
    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 34px rgba(11, 45, 105, 0.22);
    filter: brightness(1.03);
  }

  .btn-primary:active {
    transform: translateY(-1px);
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeLeft {
    from {
      opacity: 0;
      transform: translateX(-28px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeRight {
    from {
      opacity: 0;
      transform: translateX(28px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 1080px) {
    .login-hero-overlay {
      grid-template-columns: 1fr;
    }

    .info-boxes {
      grid-template-columns: 1fr;
    }

    .login-image-slot {
      min-height: 320px;
    }
  }

  @media (max-width: 720px) {
    .login-card {
      padding: 0 22px 24px;
    }

    .card-top-line {
      margin: 0 -22px 24px;
      width: calc(100% + 44px);
    }

    .title {
      font-size: 2.2rem;
    }

    .login-card-title {
      font-size: 1.6rem;
    }

    .radio-group-horizontal {
      grid-template-columns: 1fr;
    }

    .role-selector {
      padding: 16px;
    }
  }
</style>