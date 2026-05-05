<script>
  export let stats = [];
</script>

<div class="stats-container">
  {#each stats as stat}
    <article class="stat-card">
      <div class="stat-icon" style="--stat-bg: {stat.bgColor}; --stat-color: {stat.color};">
        {@html stat.icon}
      </div>

      <div class="stat-info">
        <span class="stat-number">{stat.value}</span>
        <span class="stat-label">{stat.label}</span>
      </div>
    </article>
  {/each}
</div>

<style>
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1rem;
    margin: 1.2rem 0 1.5rem;
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 108px;
    padding: 1.25rem;
    border-radius: 22px;
    background: rgba(17, 24, 39, 0.92);
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.24);
  }

  .stat-icon {
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    flex: 0 0 auto;
    border-radius: 17px;
    color: var(--stat-color, #ffffff);
    background: var(--stat-bg, #0b2d69);
  }

  .stat-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .stat-number {
    color: #ffffff;
    font-size: 1.75rem;
    font-weight: 950;
    line-height: 1;
  }

  .stat-label {
    margin-top: 0.35rem;
    color: #94a3b8;
    font-size: 0.92rem;
    font-weight: 750;
  }
</style>