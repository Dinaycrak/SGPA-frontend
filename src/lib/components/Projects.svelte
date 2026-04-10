<script>
    export let stats = [];
</script>

<div class="stats-container">
    {#each stats as stat}
        <div class="stat-card">
            <div class="left-section">
                <div class="stat-icon" style="background: {stat.bgColor}; color: {stat.color};">
                    {@html stat.icon}
                </div>
                <div class="stat-info">
                    <span class="stat-number">{stat.value}</span>
                    <span class="stat-label">{stat.label}</span>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .stats-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .stat-card {
        display: flex;
        align-items: center;
        background: white;
        padding: 1.25rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
    .left-section { display: flex; align-items: center; gap: 15px; }
    .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .stat-info { display: flex; flex-direction: column; }
    .stat-number { font-size: 1.5rem; font-weight: 700; color: #0b2d69; }
    .stat-label { color: #64748b; font-size: 0.9rem; }
</style>