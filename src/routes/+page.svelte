<script>
  const quickAccess = [
    {
      title: 'Gestión de proyectos',
      description:
        'Consulta, registra y organiza los proyectos académicos dentro del sistema SGPA.',
      action: 'Ver más',
      image: '/images/gestion-proyectos.png'
    },
    {
      title: 'Convocatorias',
      description:
        'Accede a convocatorias activas, procesos de inscripción y seguimiento académico.',
      action: 'Explorar',
      image: '/images/convocatorias.png'
    },
    {
      title: 'Seguimiento académico',
      description:
        'Visualiza el estado general de los procesos, entregas, avances y responsables.',
      action: 'Consultar',
      image: '/images/seguimiento.png'
    }
  ];

  const teamCards = [
    {
      role: 'Coordinador',
      text: 'Administrador principal del sistema, encargado de la supervisión general y la validación de procesos.',
      image: '/images/coordinador.png'
    },
    {
      role: 'Equipo académico',
      text: 'Grupo de apoyo responsable del seguimiento, revisión y acompañamiento de la gestión de proyectos.',
      image: '/images/equipo-academico.png'
    },
    {
      role: 'Docentes',
      text: 'Participan en la orientación, evaluación y acompañamiento de iniciativas académicas.',
      image: '/images/docentes.png'
    }
  ];

  const modules = [
    'Registro de proyectos',
    'Seguimiento de avances',
    'Consulta de información',
    'Gestión de usuarios',
    'Control académico',
    'Organización de convocatorias'
  ];
</script>

<svelte:head>
  <title>SGPA | Sistema de Gestión de Proyectos Académicos</title>
  <meta
    name="description"
    content="Plataforma SGPA para la gestión de proyectos académicos de la Corporación Universitaria Latinoamericana."
  />
</svelte:head>

<div class="page">
  <header class="site-header">
    <div class="top-bar"></div>

    <div class="header-container">
      <div class="brand">
        <div class="logo-slot" aria-label="Logo universitario">
          <img src="/images/logo-cul.png" alt="Logo de la universidad" />
        </div>

        <div class="brand-text">
          <h1>SGPA</h1>
          <p>Sistema de Gestión de Proyectos Académicos</p>
        </div>
      </div>

      <nav class="main-nav" aria-label="Navegación principal">
        <a href="#inicio" class="active">Inicio</a>
        <a href="#funcionamiento">Funcionamiento</a>
        <a href="#equipo">Equipo</a>
        <a href="#modulos">Módulos</a>
        <a href="/login" class="login-btn">Login</a>
      </nav>
    </div>
  </header>

  <main id="inicio">
    <section class="hero">
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="hero-badge">Plataforma institucional</span>
          <h2>Sistema de Gestión de Proyectos Académicos</h2>
          <p>
            SGPA es una plataforma orientada a la organización, seguimiento y administración
            de proyectos académicos dentro del entorno universitario. Su propósito es facilitar
            el control de procesos, responsables, avances y consulta de información relevante
            en un solo lugar.
          </p>

          <div class="hero-actions">
            <a href="/login" class="primary-btn">Ingresar al sistema</a>
            <a href="#funcionamiento" class="secondary-btn">Conocer más</a>
          </div>
        </div>

        <div class="hero-image-slot">
          <img src="/images/login-banner.png" alt="Banner principal del sistema SGPA" />
        </div>
      </div>
    </section>

    <section id="funcionamiento" class="info-section">
      <div class="section-header">
        <h3>¿Cómo funciona SGPA?</h3>
        <p>
          El sistema está diseñado para centralizar la gestión académica relacionada con
          proyectos, convocatorias, seguimiento y control administrativo.
        </p>
      </div>

      <div class="info-grid">
        <article class="info-card">
          <h4>Administración central</h4>
          <p>
            El coordinador actúa como administrador principal del sistema, supervisando procesos,
            verificando información y gestionando el flujo general de los proyectos académicos.
          </p>
        </article>

        <article class="info-card">
          <h4>Control y seguimiento</h4>
          <p>
            SGPA permite llevar trazabilidad de actividades, estados, entregables y evolución
            de cada proyecto, reduciendo desorden y mejorando la consulta institucional.
          </p>
        </article>

        <article class="info-card">
          <h4>Acceso organizado</h4>
          <p>
            La plataforma busca ofrecer una navegación clara para usuarios académicos,
            administrativos y responsables de procesos relacionados con los proyectos.
          </p>
        </article>
      </div>
    </section>

    <section class="cards-section">
      <div class="section-header">
        <h3>Áreas principales del sistema</h3>
      </div>

      <div class="cards-grid">
        {#each quickAccess as item}
          <article class="feature-card">
            <div class="feature-image-slot">
              <img src={item.image} alt={item.title} />
            </div>

            <div class="feature-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href="/login">{item.action}</a>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section id="equipo" class="team-section">
      <div class="section-header">
        <h3>Coordinador y equipo principal</h3>
        <p>
          Este apartado puede usarse para presentar al coordinador del sistema y al equipo base
          encargado de la administración y acompañamiento del proyecto.
        </p>
      </div>

      <div class="team-grid">
        {#each teamCards as person}
          <article class="team-card">
            <div class="team-image-slot">
              <img src={person.image} alt={person.role} />
            </div>
            <div class="team-content">
              <h4>{person.role}</h4>
              <p>{person.text}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section id="modulos" class="modules-section">
      <div class="section-header">
        <h3>Módulos del sistema</h3>
        <p>
          Estructura base pensada para presentar los componentes funcionales principales de SGPA.
        </p>
      </div>

      <div class="modules-wrapper">
        <div class="modules-image-slot">
          <img src="/images/modulos-sgpa.png" alt="Imagen representativa de módulos SGPA" />
        </div>

        <div class="modules-list">
          {#each modules as module}
            <div class="module-item">
              <span class="module-dot"></span>
              <p>{module}</p>
            </div>
          {/each}
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
  :global(body) {
    margin: 0;
    font-family: 'Montserrat', 'Lato', 'Segoe UI', Arial, sans-serif;
    background: #f3f3f3;
    color: #1d1d1d;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .page {
    min-height: 100vh;
    background: #f3f3f3;
  }

  .top-bar {
    height: 26px;
    background: #0b2d69;
  }

  .site-header {
    position: sticky;
    top: 0;
    z-index: 30;
    background: #ffffff;
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
  }

  .logo-slot {
    width: 78px;
    height: 78px;
    border-radius: 12px;
    overflow: hidden;
    background: #f8fbff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .main-nav a.active {
    color: #0b2d69;
  }

  .main-nav a.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: #0b2d69;
    border-radius: 999px;
  }

  .login-btn {
    padding: 10px 18px !important;
    background: #0b2d69;
    color: #fff !important;
    border-radius: 999px;
    font-weight: 600 !important;
  }

  .login-btn:hover {
    background: #08214d;
    transform: translateY(-1px);
  }

  .hero {
    position: relative;
    background: linear-gradient(135deg, #e9eef7 0%, #f3f3f3 100%);
    padding: 54px 24px 48px;
  }

  .hero-overlay {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 32px;
    align-items: center;
  }

  .hero-content {
    padding: 10px 0;
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
  }

  .hero-content h2 {
    margin: 0 0 16px;
    font-size: clamp(2.1rem, 4vw, 3.8rem);
    line-height: 1.1;
    color: #0b2d69;
    letter-spacing: -0.02em;
  }

  .hero-content p {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.8;
    color: #3f3f3f;
    max-width: 700px;
  }

  .hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 28px;
  }

  .primary-btn,
  .secondary-btn {
    text-decoration: none;
    padding: 13px 22px;
    border-radius: 999px;
    font-weight: 700;
    transition: 0.25s ease;
  }

  .primary-btn {
    background: #0b2d69;
    color: white;
  }

  .primary-btn:hover {
    background: #081f49;
    transform: translateY(-1px);
  }

  .secondary-btn {
    border: 1.5px solid #0b2d69;
    color: #0b2d69;
    background: transparent;
  }

  .secondary-btn:hover {
    background: rgba(11, 45, 105, 0.06);
  }

  .hero-image-slot {
    min-height: 420px;
    border-radius: 24px;
    overflow: hidden;
    background: #dbe6f7;
  }

  .hero-image-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .info-section,
  .cards-section,
  .team-section,
  .modules-section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 78px 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 38px;
  }

  .section-header h3 {
    margin: 0 0 14px;
    color: #0b2d69;
    font-size: clamp(1.9rem, 3vw, 3rem);
    font-weight: 500;
  }

  .section-header p {
    max-width: 860px;
    margin: 0 auto;
    color: #5b5b5b;
    font-size: 1.03rem;
    line-height: 1.8;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .info-card {
    background: white;
    border-radius: 22px;
    padding: 28px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
    border-top: 4px solid #0b2d69;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .info-card:hover,
  .feature-card:hover,
  .team-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.1);
  }

  .info-card h4,
  .feature-content h4,
  .team-content h4 {
    margin: 0 0 14px;
    color: #0b2d69;
    font-size: 1.2rem;
  }

  .info-card p,
  .feature-content p,
  .team-content p {
    margin: 0;
    color: #4d4d4d;
    line-height: 1.75;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
  }

  .feature-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .feature-image-slot {
    aspect-ratio: 9 / 8;
    background: #dbe6f7;
    overflow: hidden;
  }

  .feature-image-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .feature-content {
    padding: 24px;
    text-align: center;
  }

  .feature-content a {
    display: inline-block;
    margin-top: 18px;
    text-decoration: none;
    font-weight: 700;
    color: #0b2d69;
    border-bottom: 2px solid #f2b705;
    padding-bottom: 3px;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
  }

  .team-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .team-image-slot {
    aspect-ratio: 4 / 3;
    background: #dbe6f7;
    overflow: hidden;
  }

  .team-image-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .team-content {
    padding: 24px;
  }

  .modules-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    align-items: stretch;
  }

  .modules-image-slot {
    min-height: 380px;
    border-radius: 24px;
    background: #dbe6f7;
    overflow: hidden;
  }

  .modules-image-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .modules-list {
    background: white;
    border-radius: 24px;
    padding: 26px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
  }

  .module-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 0;
    border-bottom: 1px solid #ececec;
  }

  .module-item:last-child {
    border-bottom: none;
  }

  .module-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #f2b705;
    box-shadow: 0 0 0 5px rgba(242, 183, 5, 0.16);
    flex-shrink: 0;
  }

  .module-item p {
    margin: 0;
    color: #2d2d2d;
    font-weight: 500;
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

  @media (max-width: 1080px) {
    .hero-overlay,
    .modules-wrapper,
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .cards-grid,
    .team-grid,
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .main-nav {
      justify-content: flex-end;
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

    .cards-grid,
    .team-grid,
    .info-grid {
      grid-template-columns: 1fr;
    }

    .hero {
      padding-top: 34px;
    }

    .hero-image-slot {
      min-height: 260px;
    }

    .brand-text h1 {
      font-size: 1.5rem;
    }

    .brand-text p {
      font-size: 0.88rem;
    }
  }
</style>