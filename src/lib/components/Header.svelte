<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<header class="site-header">
  <div class="top-bar"></div>

  <div class="header-container">
    <div class="brand">
      <div class="logo-slot" aria-label="University logo">
        <img src="/images/logo-cul.png" alt="University logo" />
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
        <p>Academic Project Management System</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Main navigation">
      <a href="#home" class="active">Home</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#team">Team</a>
      <a href="/login" class="login-btn">Log In</a>
    </nav>
  </div>
</header>

<style>
  .top-bar {
    height: 8px;
    background: linear-gradient(90deg, #0b2d69, #111827, #f2b705);
  }

  .site-header {
    position: sticky;
    top: 0;
    z-index: 30;
    background: rgba(5, 7, 13, 0.9);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  }

  .header-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 16px 24px;
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
    width: 70px;
    height: 70px;
    border-radius: 18px;
    overflow: hidden;
    background: #ffffff;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.22);
  }

  .logo-slot img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .brand-title {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 9px;
    color: #ffffff;
    font-size: 1.8rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.02em;
  }

  .brand-title .dot {
    width: 7px;
    height: 7px;
    background: #f2b705;
    border-radius: 50%;
  }

  .brand-text p {
    margin: 8px 0 0;
    color: #94a3b8;
    font-size: 0.92rem;
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
  }

  .main-nav a {
    text-decoration: none;
    color: #cbd5e1;
    font-size: 0.95rem;
    font-weight: 700;
    position: relative;
    transition: color 0.22s ease, transform 0.22s ease;
    padding: 8px 0;
  }

  .main-nav a:hover,
  .main-nav a.active {
    color: #ffffff;
  }

  .main-nav a.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: #f2b705;
    border-radius: 999px;
  }

  .login-btn {
    padding: 10px 18px !important;
    background: linear-gradient(135deg, #0b2d69, #153f8f);
    color: #fff !important;
    border-radius: 999px;
    font-weight: 800 !important;
  }

  .login-btn:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 720px) {
    .header-container {
      flex-direction: column;
      align-items: flex-start;
    }

    .brand-title {
      font-size: 1.5rem;
    }
  }
</style>