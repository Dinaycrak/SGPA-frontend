<script>
  import { page } from '$app/stores';
  import 'bootstrap/dist/css/bootstrap.min.css';

  let isOpen = $state(false);

  const menuItems = [
    { name: 'Dashboard', href: '/students' },
    { name: 'Available Projects', href: '/students/projects' },
    { name: 'My Projects', href: '/students/myprojects' },
    { name: 'Schedules', href: '/students/schedules' },
    { name: 'Profile', href: '/students/profile' },
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<button class="menu-btn" onclick={toggleMenu}>
  <span class="menu-icon">{isOpen ? '✕' : '☰'}</span>
  <span>{isOpen ? 'Cerrar' : 'Menú'}</span>
</button>

{#if isOpen}
  <div class="overlay" onclick={toggleMenu} aria-hidden="true"></div>
{/if}

<div class="sidebar" class:open={isOpen}>
  <div class="sidebar-top">
    <div class="logo-wrap">
      <div class="logo-circle">S</div>
      <div class="logo-text">
        <h2>SGPA</h2>
        <p>Student Panel</p>
      </div>
    </div>
  </div>

  <nav class="menu">
    {#each menuItems as item}
      <a
        href={item.href}
        class:active={$page.url.pathname === item.href}
        onclick={() => isOpen = false}
      >
        <span class="link-indicator"></span>
        <span>{item.name}</span>
      </a>
    {/each}
  </nav>
</div>

<style>
  .menu-btn {
    position: fixed;
    top: 18px;
    left: 18px;
    z-index: 1100;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #0b2d69 0%, #1d73d4 100%);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 12px 18px;
    border-radius: 14px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
    box-shadow:
      0 12px 28px rgba(11, 45, 105, 0.28),
      0 4px 10px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(10px);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      filter 0.25s ease;
  }

  .menu-btn:hover {
    transform: translateY(-2px);
    box-shadow:
      0 16px 34px rgba(11, 45, 105, 0.34),
      0 6px 14px rgba(0, 0, 0, 0.16);
    filter: brightness(1.04);
  }

  .menu-btn:active {
    transform: translateY(0);
  }

  .menu-icon {
    font-size: 1.1rem;
    line-height: 1;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 290px;
    height: 100vh;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
      linear-gradient(180deg, #041c43 0%, #07285d 45%, #0b2d69 100%);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 88px 1.2rem 1.2rem;
    z-index: 1050;
    transform: translateX(-100%);
    transition: transform 0.38s ease;
    box-shadow: 14px 0 40px rgba(0, 0, 0, 0.28);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .sidebar::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -60px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(30, 144, 255, 0.16);
    filter: blur(10px);
    pointer-events: none;
  }

  .sidebar::after {
    content: '';
    position: absolute;
    bottom: -70px;
    left: -70px;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: rgba(242, 183, 5, 0.12);
    filter: blur(10px);
    pointer-events: none;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-top {
    position: relative;
    z-index: 1;
    margin-bottom: 2rem;
  }

  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
  }

  .logo-circle {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f2b705 0%, #ffd34d 100%);
    color: #0b2d69;
    font-size: 1.25rem;
    font-weight: 800;
    box-shadow: 0 10px 20px rgba(242, 183, 5, 0.22);
  }

  .logo-text h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.03em;
  }

  .logo-text p {
    margin: 2px 0 0;
    font-size: 0.86rem;
    color: #b9c7de;
  }

  .menu {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .menu a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.95rem 1rem;
    border-radius: 16px;
    color: #d7e3f5;
    text-decoration: none;
    transition:
      background 0.25s ease,
      transform 0.25s ease,
      color 0.25s ease,
      box-shadow 0.25s ease;
    position: relative;
    overflow: hidden;
    font-weight: 500;
  }

  .menu a:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(4px);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  .link-indicator {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.35);
    flex-shrink: 0;
    transition: all 0.25s ease;
  }

  .menu a:hover .link-indicator {
    background: #f2b705;
    box-shadow: 0 0 12px rgba(242, 183, 5, 0.5);
  }

  .active {
    background: linear-gradient(90deg, rgba(29, 115, 212, 0.28), rgba(242, 183, 5, 0.18)) !important;
    color: white !important;
    font-weight: 700;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.08),
      0 10px 24px rgba(0, 0, 0, 0.12);
  }

  .active .link-indicator {
    background: #f2b705;
    box-shadow: 0 0 12px rgba(242, 183, 5, 0.48);
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(3, 12, 28, 0.52);
    backdrop-filter: blur(4px);
    z-index: 1040;
    animation: fadeOverlay 0.25s ease;
  }

  @keyframes fadeOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .menu-btn {
      top: 14px;
      left: 14px;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.9rem;
    }

    .sidebar {
      width: 270px;
      padding: 82px 1rem 1rem;
    }

    .logo-wrap {
      padding: 12px;
    }

    .logo-circle {
      width: 42px;
      height: 42px;
      font-size: 1.1rem;
    }
  }
</style>