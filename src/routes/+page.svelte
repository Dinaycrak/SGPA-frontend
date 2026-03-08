<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
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

  <Header />


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
  <Footer />
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
</style>