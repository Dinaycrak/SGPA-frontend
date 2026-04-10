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

        <h2 class="login-card-title">Accede a tu cuenta</h2> <br>
        <p class="login-card-subtitle">
          Ingresa tus datos y selecciona el tipo de acceso correspondiente.
        </p>

          <input class= "login-formulary" type="text" placeholder="Usuario" />
          <input class= "login-formulary" type="password" placeholder="Contraseña" /> <br>

      <div class="radio-group-horizontal">
        <label class="radio-option-vertical">
          <span class= "student-span">Estudiante</span>
          <input type="radio" bind:group={selectedRole} value="student" />
        </label>

        <label class="radio-option-vertical">
          <span class= "teacher-span">Docente</span>
          <input type="radio" bind:group={selectedRole} value="teacher" />
        </label>

        <label class="radio-option-vertical">
          <span class= "coordinator-span"> Coordinador</span>
          <input type="radio" bind:group={selectedRole} value="coordinator" />
        </label>
      </div>
      <button class="btn-primary" on:click={handleLogin}>
        Ingresar
      </button>
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
    background: linear-gradient(180deg, #f8f9fc 0%, #eef2f8 35%, #f3f3f3 100%);
  }

  .login-page {
    padding-bottom: 60px;
  }

  .login-hero {
    padding: 42px 24px 28px;
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
    background: #f2b705;
    color: #0b2d69;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 8px 14px;
    border-radius: 999px;
    margin-bottom: 18px;
    box-shadow: 0 8px 20px rgba(242, 183, 5, 0.2);
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
    background: rgba(255, 255, 255, 0.92);
    border-radius: 20px;
    padding: 22px;
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
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 18px 40px rgba(11, 45, 105, 0.16);
    animation: fadeRight 0.95s ease;
    position: relative;
  }

  .login-image-slot::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(11, 45, 105, 0.08) 0%,
      rgba(11, 45, 105, 0.2) 100%
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
    padding: 24px;
  }

  .login-card {
    display: flex;
    flex-direction: column; 
    align-items: center;
    max-width: 560px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 28px;
    padding: 0 34px 34px;
    box-shadow:
      0 20px 50px rgba(11, 45, 105, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.05);
    animation: fadeUp 0.9s ease;
    overflow: hidden;
  }

  .card-top-line {
    height: 8px;
    width: 100%;
    background: linear-gradient(90deg, #0b2d69 0%, #1d73d4 60%, #f2b705 100%);
    margin: 0 -34px 28px;
    width: calc(100% + 68px);
  }

  .login-card-title {
    margin: 0;
    color: #0b2d69;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .login-card-subtitle {
    margin: 12px 0 28px;
    text-align: center;
    color: #00b7ff;
    line-height: 1.7;
  }

   .login-formulary input{
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1.5px solid #d9e1f0;
    background: #f9fbff;
    color: #1d1d1d;
    font-size: 1rem;
    outline: none;
    transition: 0.25s ease;
  }

  .login-formulary input:focus {
    border-color: #1d73d4;
    box-shadow: 0 0 0 4px rgba(29, 115, 212, 0.12);
    background: #fff;
  }
 

 
  .radio-group-horizontal {
    display: flex;
    justify-content: space-around; 
    align-items: center;
    gap: 20px;
    margin: 25px 0;
    width: 100%;
  }

  .radio-option-vertical {
    display: flex;
    flex-direction: column; 
    align-items: center;    
    gap: 8px;               
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #333;
  }

  .btn-primary {
      padding: 10px 30px; 
      cursor: pointer;
      background-color: #1e90ff;
      color: white;
      border: none;
      border-radius: 6px;
    }

  .student-span {
    color: white;
    background: linear-gradient(135deg, #0b2d69 0%, #1f5efe 100%);
    border-radius: 4px;
    box-shadow: 0 12px 24px rgba(31, 94, 254, 0.22);
  }

  .teacher-span {
    color: white;
    background: linear-gradient(135deg, #163d87 0%, #2e7edb 100%);
    border-radius: 4px;
    box-shadow: 0 12px 24px rgba(46, 126, 219, 0.22);
  }

  .coordinator-span {
    color: white;
    background: linear-gradient(135deg, #0b2d69 0%, #f2b705 180%);
    border-radius: 4px;
    box-shadow: 0 12px 24px rgba(242, 183, 5, 0.18);
  }

  input[type="radio"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
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
  }
</style>