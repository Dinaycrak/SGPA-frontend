<script>
  import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { onDestroy, onMount } from 'svelte';

  let remaining = $state(0);
  let timer = null;
  let loggingOut = $state(false);

  let session = $derived(page.data?.session ?? null);
  let user = $derived(session?.user ?? null);
  let exp = $derived(Number(session?.exp || 0));
  let isWarning = $derived(remaining > 0 && remaining <= 300);

  let userLabel = $derived(user?.displayName || `${user?.first_name || 'User'} - ${user?.roleLabel || 'User'}`);

  function calculateRemaining() {
    if (!exp) {
      remaining = 0;
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    remaining = Math.max(0, exp - now);

    if (remaining === 0 && session && !loggingOut) {
      logout('expired');
    }
  }

  function formatRemaining(seconds) {
    const total = Math.max(0, Number(seconds) || 0);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    return [hours, minutes, secs]
      .map((value) => String(value).padStart(2, '0'))
      .join(':');
  }

  async function logout(reason = 'manual') {
    if (loggingOut) return;

    loggingOut = true;

    try {
      await fetch('/logout', {
        method: 'POST'
      });
    } catch (_) {
      // If the logout request fails, the interface should still leave the private area.
    }

    await invalidateAll();

    const query = reason === 'expired' ? '?reason=expired' : '?logout=1';

    goto(`/login${query}`, {
      replaceState: true
    });
  }

  onMount(() => {
    calculateRemaining();

    timer = setInterval(() => {
      calculateRemaining();
    }, 1000);
  });

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

{#if session && user}
  <div class="session-box" class:warning={isWarning}>
    <div class="session-copy">
      <span class="user-role-label">{userLabel}</span>
      <strong>Session expires in {formatRemaining(remaining)}</strong>
      <small>{user.email}</small>
    </div>

    <button
      type="button"
      class="logout-btn"
      onclick={() => logout('manual')}
      disabled={loggingOut}
    >
      {loggingOut ? 'Signing out...' : 'Logout'}
    </button>
  </div>
{/if}

<style>
  .session-box {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.55rem 0.65rem;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid var(--sgpa-border);
    box-shadow: var(--sgpa-shadow-sm);
  }

  .session-box.warning {
    background: var(--sgpa-warning-bg, #fff7d6);
    border-color: rgba(183, 121, 31, 0.3);
  }

  .session-copy {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .user-role-label {
    width: fit-content;
    max-width: 230px;
    padding: 0.28rem 0.68rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--sgpa-blue-soft), #ffffff);
    color: var(--sgpa-blue);
    border: 1px solid rgba(11, 45, 105, 0.14);
    font-size: 0.74rem;
    font-weight: 950;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .session-copy strong {
    color: var(--sgpa-blue-dark);
    font-size: 0.82rem;
    line-height: 1.25;
    white-space: nowrap;
  }

  .session-copy small {
    max-width: 190px;
    color: var(--sgpa-text-soft);
    font-size: 0.75rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .logout-btn {
    min-height: 38px;
    padding: 0.58rem 0.9rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, var(--sgpa-danger, #dc2626), #991b1b);
    color: #ffffff;
    font-size: 0.82rem;
    font-weight: 950;
    cursor: pointer;
  }

  .logout-btn:hover {
    transform: translateY(-1px);
  }

  .logout-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  @media (max-width: 760px) {
    .session-box {
      width: 100%;
      align-items: flex-start;
      flex-direction: column;
    }

    .logout-btn {
      width: 100%;
    }

    .user-role-label,
    .session-copy small {
      max-width: 100%;
    }
  }
</style>