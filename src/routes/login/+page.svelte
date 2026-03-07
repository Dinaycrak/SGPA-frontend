<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { goto } from '$app/navigation';

  function StudentLogin() {
    goto('/students');
  }

  function TeacherLogin() {
    goto('/teacher');
  }

  function CoordinatorLogin() {
    goto('/coordinator');
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
  <header class="site-header">
    <div class="top-bar"></div>

    <div class="header-container">
      <div class="brand">
        <div class="logo-slot" aria-label="Logo universitario">
          <img src="/images/logo-cul.png" alt="Logo universitario CUL" />
        </div>

        <div class="brand-text">
          <h1>SGPA</h1>
          <p>Sistema de Gestión de Proyectos Académicos</p>
        </div>
      </div>

      <nav class="main-nav" aria-label="Navegación principal">
        <a href="/" class="home-link">Inicio</a>
      </nav>
    </div>
  </header>

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

        <h2 class="login-card-title">Accede a tu cuenta</h2>
        <p class="login-card-subtitle">
          Ingresa tus datos y selecciona el tipo de acceso correspondiente.
        </p>

        <div class="login-container">
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />

          <button class="button student-btn" on:click={StudentLogin}>
            Ingresar como Estudiante
          </button>

          <button class="button teacher-btn" on:click={TeacherLogin}>
            Ingresar como Docente
          </button>

          <button class="button coordinator-btn" on:click={CoordinatorLogin}>
            Ingresar como Coordinador
          </button>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-divider"></div>

    <div class="footer-grid">
      <div class="footer-column">
        <h4>CONTACTO</h4>
        <p>Calle 58 # 55 - 24A Barranquilla - Colombia</p>

        <h5>Proceso de admisión</h5>
        <p>Celular (+57) 314 8962734</p>
        <p>Correo promocion@ul.edu.co</p>

        <h5>Proceso de transferencia y reintegro</h5>
        <p>Celular (+57) 317 6688650</p>
        <p>Correo kilarioss@ul.edu.co</p>
      </div>

      <div class="footer-column">
        <h4>ENLACE DE INTERÉS</h4>
        <a href="/">Directorio</a>
        <a href="/">Ley de Protección de Datos</a>
        <a href="/">Información DIAN</a>
        <a href="/">Reserva de audiovisuales</a>
        <a href="/">Atención al usuario</a>
        <a href="/">Asesoría psicológica</a>
        <a href="/">Solicitud monitorías o tutorías</a>
      </div>

      <div class="footer-column">
        <h4>OFERTA ACADÉMICA</h4>
        <a href="/">Profesionales</a>
        <a href="/">Tecnológicos</a>
        <a href="/">Ciclos propedéuticos</a>
      </div>
    </div>

    <div class="footer-divider bottom"></div>

    <div class="footer-social">
      <a href="/" aria-label="Facebook">f</a>
      <a href="/" aria-label="Twitter">t</a>
      <a href="/" aria-label="Instagram">ig</a>
      <a href="/" aria-label="YouTube">yt</a>
    </div>
  </footer>
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
      linear-gradient(180deg, #f8f9fc 0%, #eef2f8 35%, #f3f3f3 100%);
  }

  .top-bar {
    height: 26px;
    background: #0b2d69;
  }

  .site-header {
    position: sticky;
    top: 0;
    z-index: 30;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  .header-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 18px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 16px;
    animation: fadeDown 0.8s ease;
  }

  .logo-slot {
    width: 78px;
    height: 78px;
    border-radius: 12px;
    overflow: hidden;
    background: #f8fbff;
    flex-shrink: 0;
    border: 2px solid rgba(11, 45, 105, 0.08);
    box-shadow: 0 8px 18px rgba(11, 45, 105, 0.08);
  }

  .logo-slot img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .brand-text h1 {
    margin: 0;
    color: #0b2d69;
    font-size: 1.9rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .brand-text p {
    margin: 6px 0 0;
    color: #666;
    font-size: 0.95rem;
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    animation: fadeDown 0.8s ease;
  }

  .main-nav a {
    text-decoration: none;
    color: #666;
    font-size: 0.96rem;
    font-weight: 500;
    position: relative;
    transition: 0.25s ease;
    padding: 8px 0;
  }

  .main-nav a:hover {
    color: #0b2d69;
  }

  .home-link {
    padding: 10px 18px !important;
    background: #0b2d69;
    color: #fff !important;
    border-radius: 999px;
    font-weight: 600 !important;
    box-shadow: 0 10px 22px rgba(11, 45, 105, 0.18);
  }

  .home-link:hover {
    background: #08214d;
    transform: translateY(-2px);
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
    color: #666;
    line-height: 1.7;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .login-container input {
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

  .login-container input:focus {
    border-color: #1d73d4;
    box-shadow: 0 0 0 4px rgba(29, 115, 212, 0.12);
    background: #fff;
  }

  .button {
    border: none;
    border-radius: 14px;
    padding: 14px 18px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
  }

  .button:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
  }

  .button:active {
    transform: translateY(0);
  }

  .student-btn {
    background: linear-gradient(135deg, #0b2d69 0%, #1f5efe 100%);
    box-shadow: 0 12px 24px rgba(31, 94, 254, 0.22);
  }

  .teacher-btn {
    background: linear-gradient(135deg, #163d87 0%, #2e7edb 100%);
    box-shadow: 0 12px 24px rgba(46, 126, 219, 0.22);
  }

  .coordinator-btn {
    background: linear-gradient(135deg, #0b2d69 0%, #f2b705 180%);
    box-shadow: 0 12px 24px rgba(242, 183, 5, 0.18);
  }

  .site-footer {
    background: #131827;
    color: #f3f3f3;
    padding: 64px 24px 42px;
  }

  .footer-divider {
    max-width: 1280px;
    margin: 0 auto 42px;
    height: 1px;
    background: rgba(255, 255, 255, 0.28);
  }

  .footer-divider.bottom {
    margin-top: 38px;
    margin-bottom: 30px;
  }

  .footer-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 42px;
  }

  .footer-column h4 {
    margin: 0 0 24px;
    color: #fff;
    font-size: 1.05rem;
    letter-spacing: 0.03em;
  }

  .footer-column h5 {
    margin: 22px 0 10px;
    color: #fff;
    font-size: 1.1rem;
  }

  .footer-column p,
  .footer-column a {
    display: block;
    margin: 0 0 12px;
    color: #e9e9e9;
    text-decoration: none;
    line-height: 1.7;
  }

  .footer-column a:hover {
    color: #f2b705;
  }

  .footer-social {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 18px;
  }

  .footer-social a {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-decoration: none;
    background: #3a6fe2;
    color: white;
    font-weight: 700;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .footer-social a:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  @keyframes fadeDown {
    from {
      opacity: 0;
      transform: translateY(-18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
    .login-hero-overlay,
    .footer-grid {
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
    .header-container {
      flex-direction: column;
      align-items: flex-start;
    }

    .brand {
      width: 100%;
    }

    .main-nav {
      width: 100%;
      justify-content: flex-start;
    }

    .brand-text h1 {
      font-size: 1.5rem;
    }

    .brand-text p {
      font-size: 0.88rem;
    }

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