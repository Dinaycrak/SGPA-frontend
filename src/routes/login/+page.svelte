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


<div>
  <header class="site-header">
    <div class="top-bar"></div>

    <div class="header-container">
      <div class="brand">
        <div class="logo-slot" aria-label="Espacio para logo universitario">
          LOGO
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

    <div>
        <h1 class="tittle">Iniciar sesión</h1>
    </div>
    <div class="login-container">

        <input type="text" placeholder="Usuario" />

        <input type="password" placeholder="Contraseña" />

        <button class="button" on:click={StudentLogin}>
            Ingresar como Estudiante
        </button>

        <button class="button" on:click={TeacherLogin}>
            Ingresar como Docente
        </button>

        <button class="button" on:click={CoordinatorLogin}>
            Ingresar como Coordinador
        </button>
        <br>
        <br>

    </div>
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
.tittle {
    color:blue;
    text-align: center;
}
.login-container{
	display:flex;
	flex-direction:column;
	width:300px;
	margin:auto;
	gap:10px;
}
.button{
    background-color: rgb(31, 94, 254);
    color: white;
    border-radius: 3px;
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

</style>