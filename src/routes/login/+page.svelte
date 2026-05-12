<script>
  import Header from '$lib/components/Header_L.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { goto } from '$app/navigation';

  let selectedRole = $state('student');

  function handleLogin() {
    if (selectedRole === 'student') {
      goto('/students');
    } else if (selectedRole === 'teacher') {
      goto('/teacher');
    } else if (selectedRole === 'coordinator') {
      goto('/coordinator');
    }
  }
</script>

<svelte:head>
  <title>Login | SGPA</title>
  <meta
    name="description"
    content="Access to the Academic Project Management System - SGPA"
  />
</svelte:head>

<div class="page-wrapper">
  <Header />

  <main class="login-page">
    <section class="login-hero">
      <div class="login-hero-overlay">
        <div class="login-info">
          <span class="hero-badge">Institutional access</span>

          <h2 class="title">System login</h2>

          <p class="description">
            Welcome to the Academic Project Management System. Select your role
            to access the corresponding module within the platform.
          </p>

          <div class="info-boxes">
            <article class="info-card">
              <h3>Academic control</h3>
              <p>
                Manage processes, review information, and keep academic project activity
                organized.
              </p>
            </article>

            <article class="info-card">
              <h3>Role-based access</h3>
              <p>
                Each user type has a module designed according to its functions
                within the system.
              </p>
            </article>
          </div>
        </div>

        <div class="login-image-slot">
          <img src="/images/login-banner.png" alt="SGPA system access banner" />
        </div>
      </div>
    </section>

    <section class="login-section">
      <div class="login-card">
        <div class="card-top-line"></div>

        <div class="login-card-header">
          <span class="login-mini-badge">SGPA</span>

          <h2 class="login-card-title">Access your account</h2>

          <p class="login-card-subtitle">
            Enter your information and select the access type that matches your role.
          </p>
        </div>

        <div class="temporary-alert">
          Temporary testing access. The system currently redirects by role,
          but it does not validate username and password against the backend yet.
        </div>

        <div class="login-form">
          <div class="input-group-custom">
            <label for="usuario">User</label>
            <input
              id="usuario"
              class="login-formulary"
              type="text"
              placeholder="Enter your username"
              autocomplete="username"
            />
          </div>

          <div class="input-group-custom">
            <label for="password">Password</label>
            <input
              id="password"
              class="login-formulary"
              type="password"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
          </div>

          <div class="role-selector">
            <p class="role-title">Select your role</p>

            <div class="radio-group-horizontal">
              <label class:selected={selectedRole === 'student'} class="radio-option-vertical">
                <input type="radio" bind:group={selectedRole} value="student" />
                <span class="role-pill">Student</span>
              </label>

              <label class:selected={selectedRole === 'teacher'} class="radio-option-vertical">
                <input type="radio" bind:group={selectedRole} value="teacher" />
                <span class="role-pill">Teacher</span>
              </label>

              <label class:selected={selectedRole === 'coordinator'} class="radio-option-vertical">
                <input type="radio" bind:group={selectedRole} value="coordinator" />
                <span class="role-pill">Coordinator</span>
              </label>
            </div>
          </div>

          <button class="btn-primary" type="button" onclick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(11, 45, 105, 0.08), transparent 28rem),
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.14), transparent 20rem),
      linear-gradient(180deg, #ffffff 0%, var(--sgpa-bg) 100%);
  }

  .login-page {
    padding-bottom: 70px;
  }

  .login-hero {
    padding: 42px 24px 20px;
  }

  .login-hero-overlay {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.08fr 1fr;
    gap: 32px;
    align-items: center;
  }

  .hero-badge,
  .login-mini-badge {
    display: inline-flex;
    width: fit-content;
    background: var(--sgpa-yellow-soft);
    color: var(--sgpa-blue);
    font-weight: 950;
    font-size: 0.82rem;
    padding: 8px 16px;
    border-radius: 999px;
    margin-bottom: 18px;
    border: 1px solid rgba(242, 183, 5, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .title {
    margin: 0 0 16px;
    color: var(--sgpa-blue-dark);
    font-size: clamp(2.1rem, 4vw, 3.8rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    font-weight: 950;
  }

  .description {
    margin: 0 0 26px;
    color: var(--sgpa-text-soft);
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
    background: #ffffff;
    border-radius: 22px;
    padding: 22px;
    border: 1px solid var(--sgpa-border);
    border-top: 5px solid var(--sgpa-blue);
    box-shadow: var(--sgpa-shadow-sm);
  }

  .info-card h3 {
    margin: 0 0 10px;
    color: var(--sgpa-blue);
    font-weight: 900;
  }

  .info-card p {
    margin: 0;
    color: var(--sgpa-text-soft);
    line-height: 1.7;
  }

  .login-image-slot {
    border-radius: 30px;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-lg);
  }

  .login-image-slot img {
    width: 100%;
    height: 100%;
    min-height: 340px;
    object-fit: cover;
    display: block;
  }

  .login-section {
    padding: 30px 24px;
  }

  .login-card {
    max-width: 720px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #ffffff;
    border-radius: 28px;
    padding: 2rem;
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-lg);
  }

  .card-top-line {
    position: absolute;
    inset: 0 0 auto;
    height: 5px;
    background: linear-gradient(90deg, var(--sgpa-blue), var(--sgpa-yellow), var(--sgpa-orange));
  }

  .login-card-title {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: 1.8rem;
    font-weight: 950;
  }

  .login-card-subtitle {
    margin: 0.45rem 0 1.2rem;
    color: var(--sgpa-text-soft);
    line-height: 1.6;
  }

  .temporary-alert {
    margin-bottom: 1.2rem;
    padding: 0.95rem 1rem;
    border-radius: 16px;
    background: var(--sgpa-warning-bg);
    border: 1px solid rgba(183, 121, 31, 0.22);
    color: var(--sgpa-warning);
    font-weight: 800;
    line-height: 1.55;
  }

  .login-form {
    display: grid;
    gap: 1.1rem;
  }

  .input-group-custom {
    display: grid;
    gap: 0.45rem;
  }

  label,
  .role-title {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-weight: 850;
  }

  .login-formulary {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid var(--sgpa-border);
    color: var(--sgpa-text);
  }

  .role-selector {
    margin-top: 0.25rem;
  }

  .radio-group-horizontal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
    margin-top: 0.65rem;
  }

  .radio-option-vertical {
    cursor: pointer;
    border-radius: 18px;
    border: 1px solid var(--sgpa-border);
    background: var(--sgpa-surface-soft);
    padding: 1rem;
    text-align: center;
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      background 0.22s ease,
      box-shadow 0.22s ease;
  }

  .radio-option-vertical input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .radio-option-vertical:hover {
    transform: translateY(-2px);
    border-color: rgba(11, 45, 105, 0.24);
    background: #ffffff;
  }

  .radio-option-vertical.selected {
    border-color: rgba(11, 45, 105, 0.35);
    background: var(--sgpa-blue-soft);
    transform: translateY(-2px);
    box-shadow:
      inset 0 -4px 0 var(--sgpa-yellow),
      var(--sgpa-shadow-sm);
  }

  .role-pill {
    color: var(--sgpa-blue);
    font-weight: 950;
  }

  .btn-primary {
    width: 100%;
    min-height: 48px;
    border: none;
    padding: 0.95rem 1rem;
    border-radius: 999px;
    font-weight: 950;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  @media (max-width: 900px) {
    .login-hero-overlay {
      grid-template-columns: 1fr;
    }

    .info-boxes,
    .radio-group-horizontal {
      grid-template-columns: 1fr;
    }

    .login-image-slot img {
      min-height: 280px;
    }
  }

  @media (max-width: 640px) {
    .login-hero,
    .login-section {
      padding-inline: 16px;
    }

    .login-card {
      padding: 1.35rem;
      border-radius: 22px;
    }
  }
</style>