<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<header class="site-header">
  <div class="top-bar"></div>

  <div class="header-container">
    <div class="brand">
      <div class="logo-slot" aria-label="Logo universitario">
        <img src="/images/logo-cul.png" alt="Logo de la universidad" />
      </div>

      <div class="brand-text">
        <h1 class="brand-title" aria-label="SGPA">
          <span>S</span>
          <span class="dot"></span>
          <span>G</span>
          <span class="dot"></span>
          <span>P</span>
          <span class="dot"></span>
          <span>A</span>
        </h1>
        <p>Sistema de Gestión de Proyectos Académicos</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Navegación principal">
      <a href="#inicio" class="active">Inicio</a>
      <a href="#funcionamiento">Funcionamiento</a>
      <a href="#equipo">Equipo</a>
      <a href="/login" class="login-btn">Login</a>
    </nav>
  </div>
</header>

<style>
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

  .brand-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .brand-title {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #0b2d69;
    font-size: 1.9rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .brand-title .dot {
    width: 8px;
    height: 8px;
    background: #f2b705;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
    transform: translateY(1px);
  }

  .brand-text p {
    margin: 8px 0 0;
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

  @media (max-width: 1080px) {
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
      align-items: center;
    }

    .main-nav {
      width: 100%;
      justify-content: flex-start;
    }

    .brand-title {
      font-size: 1.5rem;
      gap: 8px;
    }

    .brand-title .dot {
      width: 6px;
      height: 6px;
    }

    .brand-text p {
      font-size: 0.88rem;
    }
  }
</style>