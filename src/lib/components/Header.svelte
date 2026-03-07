<script>
</script>

<header class="site-header">
  <div class="top-bar"></div>

  <div class="header-container">
    <div class="brand">
      <div class="logo-slot">
        LOGO
      </div>

      <div class="brand-text">
        <h1>SGPA</h1>
        <p>Sistema de Gestión de Proyectos Académicos</p>
      </div>
    </div>

    <nav class="main-nav">
      <a href="#inicio" class="active">Inicio</a>
      <a href="#funcionamiento">Funcionamiento</a>
      <a href="#equipo">Equipo</a>
      <a href="#modulos">Módulos</a>
      <a href="/login" class="login-btn">Login</a>
    </nav>
  </div>
</header>

<style>
  .top-bar {
    height: 26px;
    background: #0b2d69;
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
    border: 2px dashed #0b2d69;
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #0b2d69;
    font-weight: 700;
    font-size: 0.9rem;
    background: #f8fbff;
    flex-shrink: 0;
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

</style>