<script>
  export let roleName = 'SGPA';
  export let eyebrow = 'Main Panel';
  export let title = 'SGPA Dashboard';
  export let description = 'View the main information of the academic project management system.';

  const quickCards = [
    {
      label: 'Academic Management',
      text: 'Organize projects, users and academic processes from one place.'
    },
    {
      label: 'Visual Tracking',
      text: 'Review indicators and reports while keeping the system structure clear.'
    },
    {
      label: 'Role-Based Access',
      text: 'Each module keeps its own navigation, permissions and workflow.'
    }
  ];
</script>

<main class="dashboard-page">
  <section class="dashboard-shell">
    <div class="hero-card">
      <div class="hero-content">
        <span class="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div class="role-card" aria-label="Active role">
        <span>Active Role</span>
        <strong>{roleName}</strong>
      </div>
    </div>

    <section class="quick-grid" aria-label="System summary">
      {#each quickCards as card}
        <article class="quick-card">
          <span class="quick-dot"></span>
          <h2>{card.label}</h2>
          <p>{card.text}</p>
        </article>
      {/each}
    </section>

    <section class="report-card">
      <div class="report-header">
        <div>
          <span class="eyebrow dark">Integrated Report</span>
          <h2>General System Overview</h2>
        </div>

        <span class="report-badge">Power BI</span>
      </div>

      <div class="iframe-wrap">
        <iframe
          title="Academic project management dashboard"
          src="https://app.powerbi.com/reportEmbed?reportId=b94b4a99-28d8-4866-826f-0f59ec21f874&autoAuth=true&ctid=740be6bd-fd36-470e-94d9-0f0c777fadb9"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
      </div>
    </section>
  </section>
</main>

<style>
  .dashboard-page {
    min-height: 80vh;
    padding: 2rem 1rem 3rem;
  }

  .dashboard-shell {
    width: min(1180px, 100%);
    margin: 0 auto;
  }

  .hero-card {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 260px;
    gap: 1.25rem;
    align-items: stretch;
    padding: clamp(1.4rem, 3vw, 2.4rem);
    border-radius: 28px;
    color: #ffffff;
    background: linear-gradient(135deg, #05070d, #111827 55%, #0b2d69);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .hero-card::before {
    content: '';
    position: absolute;
    width: 260px;
    height: 260px;
    right: -90px;
    top: -110px;
    border-radius: 999px;
    background: rgba(242, 183, 5, 0.12);
    filter: blur(10px);
  }

  .hero-content,
  .role-card {
    position: relative;
    z-index: 1;
  }

  .eyebrow {
    display: inline-flex;
    width: fit-content;
    margin-bottom: 0.75rem;
    padding: 0.42rem 0.8rem;
    border-radius: 999px;
    background: rgba(242, 183, 5, 0.14);
    color: #fde68a;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .eyebrow.dark {
    margin-bottom: 0.45rem;
    background: rgba(11, 45, 105, 0.45);
    color: #dbeafe;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  .hero-content h1 {
    max-width: 720px;
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 950;
    letter-spacing: -0.04em;
    line-height: 1.02;
  }

  .hero-content p {
    max-width: 720px;
    margin-top: 1rem;
    color: #cbd5e1;
    font-size: 1.03rem;
    line-height: 1.7;
  }

  .role-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 190px;
    padding: 1.25rem;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(14px);
  }

  .role-card span {
    color: #cbd5e1;
    font-size: 0.88rem;
    font-weight: 800;
  }

  .role-card strong {
    margin-top: 0.35rem;
    color: #ffffff;
    font-size: 1.45rem;
  }

  .quick-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin: 1.25rem 0;
  }

  .quick-card {
    padding: 1.25rem;
    border-radius: 22px;
    background: rgba(17, 24, 39, 0.92);
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  }

  .quick-dot {
    display: inline-block;
    width: 11px;
    height: 11px;
    margin-bottom: 0.85rem;
    border-radius: 999px;
    background: #f2b705;
    box-shadow: 0 0 0 7px rgba(242, 183, 5, 0.09);
  }

  .quick-card h2 {
    color: #ffffff;
    font-size: 1.05rem;
    font-weight: 900;
  }

  .quick-card p {
    margin-top: 0.45rem;
    color: #94a3b8;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .report-card {
    overflow: hidden;
    border-radius: 28px;
    background: rgba(17, 24, 39, 0.92);
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  }

  .report-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.35rem 1.45rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  }

  .report-header h2 {
    color: #ffffff;
    font-size: 1.35rem;
    font-weight: 900;
  }

  .report-badge {
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    color: #111827;
    background: #f2b705;
    font-size: 0.82rem;
    font-weight: 900;
  }

  .iframe-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 8.2;
    min-height: 420px;
    background: #0f172a;
  }

  .iframe-wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    .hero-card {
      grid-template-columns: 1fr;
    }

    .role-card {
      min-height: auto;
    }

    .quick-grid {
      grid-template-columns: 1fr;
    }

    .iframe-wrap {
      aspect-ratio: auto;
      height: 460px;
    }
  }
</style>