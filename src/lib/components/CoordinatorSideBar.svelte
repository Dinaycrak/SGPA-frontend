<script>
  import { page } from '$app/stores';
  import 'bootstrap/dist/css/bootstrap.min.css';

  let isOpen = $state(false); 

  const menuItems = [
    { name: 'Dashboard', href: '/coordinator' },
    { name: 'Available Projects', href: '/coordinator/projects' },
    { name: 'Teachers', href: '/coordinator/teachers' },
    { name: 'Students', href: '/coordinator/students' },
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<button class="menu-btn" onclick={toggleMenu}>
  {isOpen ? '✕ Cerrar' : '☰ Menú'}
</button>

{#if isOpen}
  <div class="overlay" onclick={toggleMenu} aria-hidden="true"></div>
{/if}

<div class="sidebar" class:open={isOpen}>
  <div class="logo">SGPA</div>

  <nav class="menu">
    {#each menuItems as item}
      <a
        href={item.href}
        class:active={$page.url.pathname === item.href}
        onclick={() => isOpen = false} 
      >
        {item.name}
      </a>
    {/each}
  </nav>
</div>

<style>
  .menu-btn {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1100; 
    background: #003366;
    color: white;
    border: 2px solid #1e90ff;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .menu-btn:hover {
    background: #1e90ff;
    box-shadow: 0 0 10px rgba(30, 144, 255, 0.5);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100vh;
    background-color: #001f3f; /* Azul profundo que combina con tu logo */
    color: white;
    display: flex;
    flex-direction: column;
    padding: 80px 1.5rem 1rem; /* Padding superior para no chocar con el botón */
    z-index: 1050; /* Por encima del contenido y el header */
    transform: translateX(-100%); /* Escondida por defecto */
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.3);
  }

  .sidebar.open {
    transform: translateX(0); /* Se muestra al activar 'open' */
  }

  .logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #1e90ff; /* Azul brillante para resaltar */
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #1e3a5f;
    padding-bottom: 1rem;
  }

  .menu a {
    display: block;
    padding: 0.85rem 1.2rem;
    border-radius: 10px;
    color: #cbd5e1;
    text-decoration: none;
    margin-bottom: 0.6rem;
    transition: all 0.2s;
  }

  .menu a:hover {
    background-color: #1e3a5f;
    color: white;
    padding-left: 1.5rem; /* Efecto de desplazamiento */
  }

  .active {
    background: linear-gradient(90deg, #003366, #1e90ff) !important;
    color: white !important;
    font-weight: bold;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
  }
</style>