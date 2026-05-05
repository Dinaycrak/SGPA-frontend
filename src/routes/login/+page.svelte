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
  <title>Log In | SGPA</title>
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
          <span class="hero-badge">Institutional Access</span>
          <h2 class="title">Log In</h2>
          <p class="description">
            Welcome to the Academic Project Management System. Select your role
            to access the corresponding module inside the platform.
          </p>

          <div class="info-boxes">
            <article class="info-card">
              <h3>Academic Control</h3>
              <p>
                Manage processes, review information and keep academic project activity organized.
              </p>
            </article>

            <article class="info-card">
              <h3>Role-Based Access</h3>
              <p>
                Each user type has a dedicated entry point according to their responsibilities.
              </p>
            </article>
          </div>
        </div>

        <div class="login-image-slot">
          <img src="/images/login-banner.png" alt="SGPA access banner" />
        </div>
      </div>
    </section>

    <section class="login-section">
      <div class="login-card">
        <div class="card-top-line"></div>

        <div class="login-card-header">
          <span class="login-mini-badge">SGPA</span>
          <h2 class="login-card-title">Access Your Account</h2>
          <p class="login-card-subtitle">
            Enter your information and select the access type that matches your role.
          </p>
        </div>

        <div class="login-form">
          <div class="input-group-custom">
            <label for="usuario">User</label>
            <input id="usuario" class="login-formulary" type="text" placeholder="Enter your user" />
          </div>

          <div class="input-group-custom">
            <label for="password">Password</label>
            <input id="password" class="login-formulary" type="password" placeholder="Enter your password" />
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

          <button class="btn-primary" onclick={handleLogin}>
            Log In
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
      radial-gradient(circle at top left, rgba(11, 45, 105, 0.28), transparent 28rem),
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.1), transparent 20rem),
      linear-gradient(180deg, #05070d 0%, #0b1220 45%, #111827 100%);
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
    display: inline-block;
    background: rgba(242, 183, 5, 0.14);
    color: #fde68a;
    font-weight: 900;
    font-size: 0.82rem;
    padding: 8px 16px;
    border-radius: 999px;
    margin-bottom: 18px;
    border: 1px solid rgba(242, 183, 5, 0.22);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .title {
    margin: 0 0 16px;
    color: #ffffff;
    font-size: clamp(2.1rem, 4vw, 3.8rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .description {
    margin: 0 0 26px;
    color: #cbd5e1;
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
    background: rgba(17, 24, 39, 0.88);
    border-radius: 22px;
    padding: 22px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-top: 4px solid #0b2d69;
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.25);
  }

  .info-card h3 {
    margin: 0 0 10px;
    color: #ffffff;
  }

  .info-card p {
    margin: 0;
    color: #94a3b8;
    line-height: 1.7;
  }

  .login-image-slot {
    border-radius: 30px;
    overflow: hidden;
    background: rgba(17, 24, 39, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
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
    background: rgba(17, 24, 39, 0.92);
    border-radius: 28px;
    padding: 2rem;
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
  }

  .card-top-line {
    position: absolute;
    inset: 0 0 auto;
    height: 5px;
    background: linear-gradient(90deg, #0b2d69, #f2b705, #f97316);
  }

  .login-card-title {
    margin: 0;
    color: #ffffff;
    font-size: 1.8rem;
    font-weight: 950;
  }

  .login-card-subtitle {
    margin: 0.45rem 0 1.5rem;
    color: #94a3b8;
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
    color: #e5e7eb;
    font-weight: 800;
  }

  .login-formulary {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 14px;
  }

  .role-selector {
    margin-top: 0.25rem;
  }

  .radio-group-horizontal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }

  .radio-option-vertical {
    cursor: pointer;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.24);
    background: #0b1220;
    padding: 1rem;
    text-align: center;
    transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
  }

  .radio-option-vertical input {
    display: none;
  }

  .radio-option-vertical.selected {
    border-color: rgba(242, 183, 5, 0.65);
    background: rgba(242, 183, 5, 0.1);
    transform: translateY(-2px);
  }

  .role-pill {
    color: #ffffff;
    font-weight: 900;
  }

  .btn-primary {
    width: 100%;
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
  }
</style>