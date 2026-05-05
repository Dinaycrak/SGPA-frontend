<script>
  import { page } from '$app/stores';

  let isOpen = $state(false);

  const menuItems = [
    { name: 'Dashboard', href: '/students' },
    { name: 'Available Projects', href: '/students/projects' },
    { name: 'My Projects', href: '/students/myprojects' },
    { name: 'Schedules', href: '/students/schedules' },
    { name: 'Profile', href: '/students/profile' }
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  function isActive(href) {
    const currentPath = $page.url.pathname.replace(/\/$/, '');
    const itemPath = href.replace(/\/$/, '');

    return currentPath === itemPath;
  }
</script>

<button
  class="menu-toggle"
  class:open={isOpen}
  type="button"
  aria-label={isOpen ? 'Close side menu' : 'Open side menu'}
  aria-expanded={isOpen}
  onclick={toggleMenu}
>
  <span class="hamburger" aria-hidden="true">
    <span></span>
    <span></span>
    <span></span>
  </span>
</button>

{#if isOpen}
  <button class="overlay" type="button" aria-label="Close side menu" onclick={closeMenu}></button>
{/if}

<aside class="sidebar" class:open={isOpen}>
  <div class="sidebar-header">
    <div class="brand-mark">S</div>
    <div>
      <h2>SGPA</h2>
      <p>Student Module</p>
    </div>
  </div>

  <nav class="menu" aria-label="Student menu">
    {#each menuItems as item}
      <a
        href={item.href}
        class:active={isActive(item.href)}
        aria-current={isActive(item.href) ? 'page' : undefined}
        onclick={closeMenu}
      >
        <span class="dot"></span>
        <span>{item.name}</span>
      </a>
    {/each}
  </nav>
</aside>

<style>
  .menu-toggle {
    position: fixed;
    left: 18px;
    top: 50%;
    z-index: 1200;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: #111827;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.3);
    transition: left 0.32s ease, background 0.22s ease, transform 0.22s ease;
  }

  .menu-toggle:hover {
    background: #0b2d69;
    transform: translateY(-50%) scale(1.04);
  }

  .menu-toggle.open {
    left: 316px;
    background: #0b2d69;
  }

  .hamburger {
    display: grid;
    gap: 5px;
  }

  .hamburger span {
    width: 22px;
    height: 2px;
    border-radius: 999px;
    background: white;
    transition: transform 0.22s ease, opacity 0.22s ease;
  }

  .menu-toggle.open .hamburger span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .menu-toggle.open .hamburger span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.open .hamburger span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 1150;
    width: 300px;
    height: 100vh;
    padding: 1.2rem;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.1), transparent 12rem),
      radial-gradient(circle at bottom left, rgba(249, 115, 22, 0.08), transparent 14rem),
      linear-gradient(180deg, #05070d 0%, #111827 58%, #0b2d69 100%);
    color: white;
    transform: translateX(-100%);
    transition: transform 0.32s ease;
    box-shadow: 18px 0 50px rgba(0, 0, 0, 0.34);
    overflow-y: auto;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.4rem;
    padding: 1rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: #ffffff;
    color: #0b2d69;
    font-weight: 950;
    font-size: 1.2rem;
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 950;
  }

  .sidebar-header p {
    margin: 0.15rem 0 0;
    color: #cbd5e1;
    font-size: 0.86rem;
  }

  .menu {
    display: grid;
    gap: 0.55rem;
  }

  .menu a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 0.95rem;
    border-radius: 16px;
    color: #dbe4f0;
    text-decoration: none;
    font-weight: 760;
    transition: transform 0.22s ease, background 0.22s ease, color 0.22s ease;
  }

  .menu a:hover {
    transform: translateX(4px);
    background: rgba(255, 255, 255, 0.08);
    color: white;
  }

  .menu a.active {
    background: rgba(255, 255, 255, 0.13);
    color: white;
    box-shadow: inset 4px 0 0 #f2b705;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: #64748b;
    flex: 0 0 auto;
  }

  .menu a.active .dot,
  .menu a:hover .dot {
    background: #f2b705;
    box-shadow: 0 0 0 5px rgba(242, 183, 5, 0.12);
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1100;
    border: none;
    background: rgba(5, 7, 13, 0.58);
    backdrop-filter: blur(4px);
    cursor: pointer;
  }

  @media (max-width: 720px) {
    .sidebar {
      width: min(300px, 84vw);
    }

    .menu-toggle.open {
      left: min(316px, calc(84vw + 14px));
    }
  }
</style>