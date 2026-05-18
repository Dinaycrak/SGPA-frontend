<script>
  export let open = false;
  export let eyebrow = 'Confirm action';
  export let title = 'Are you sure?';
  export let message = 'Please confirm this action before continuing.';
  export let details = '';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';
  export let tone = 'primary';
  export let onConfirm = () => {};
  export let onCancel = () => {};

  function handleKeydown(event) {
    if (open && event.key === 'Escape') {
      onCancel();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div class="confirm-overlay" role="presentation" onclick={onCancel}>
    <div
      class="confirm-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
      tabindex="-1"
      onclick={(event) => event.stopPropagation()}
      onkeydown={(event) => event.stopPropagation()}
    >
      <div class="modal-top-line"></div>

      <button
        type="button"
        class="close-button"
        aria-label="Close confirmation modal"
        onclick={onCancel}
      >
        ×
      </button>

      <div class="modal-content">
        <div class="modal-icon" class:danger={tone === 'danger'} class:success={tone === 'success'} class:warning={tone === 'warning'}>
          {#if tone === 'danger'}
            !
          {:else if tone === 'success'}
            ✓
          {:else if tone === 'warning'}
            ?
          {:else}
            ✓
          {/if}
        </div>

        <div class="modal-copy">
          <span class="modal-eyebrow">{eyebrow}</span>
          <h2 id="confirm-modal-title">{title}</h2>
          <p id="confirm-modal-message">{message}</p>

          {#if details}
            <div class="modal-details">{details}</div>
          {/if}
        </div>
      </div>

      <div class="modal-actions">
        <button type="button" class="cancel-button" onclick={onCancel}>
          {cancelText}
        </button>

        <button
          type="button"
          class="confirm-button"
          class:danger={tone === 'danger'}
          class:success={tone === 'success'}
          class:warning={tone === 'warning'}
          onclick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .confirm-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: 1.25rem;
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.14), transparent 22rem),
      rgba(7, 18, 40, 0.58);
    backdrop-filter: blur(8px);
    animation: fade-in 0.18s ease both;
  }

  .confirm-modal {
    position: relative;
    width: min(520px, 100%);
    overflow: hidden;
    border-radius: 30px;
    border: 1px solid rgba(219, 228, 240, 0.88);
    background:
      radial-gradient(circle at top right, rgba(242, 183, 5, 0.14), transparent 16rem),
      linear-gradient(180deg, #ffffff 0%, var(--sgpa-surface-soft) 100%);
    box-shadow: 0 30px 80px rgba(7, 18, 40, 0.32);
    animation: modal-in 0.22s ease both;
  }

  .modal-top-line {
    position: absolute;
    inset: 0 0 auto;
    height: 6px;
    background: linear-gradient(90deg, var(--sgpa-blue), var(--sgpa-yellow), var(--sgpa-orange));
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 999px;
    border: 1px solid var(--sgpa-border);
    background: #ffffff;
    color: var(--sgpa-blue-dark);
    font-size: 1.35rem;
    line-height: 1;
    box-shadow: var(--sgpa-shadow-sm);
  }

  .close-button:hover {
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue);
  }

  .modal-content {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 2rem 2rem 1.25rem;
  }

  .modal-icon {
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 22px;
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue);
    border: 1px solid rgba(11, 45, 105, 0.14);
    font-size: 1.75rem;
    font-weight: 950;
  }

  .modal-icon.danger {
    background: var(--sgpa-danger-bg);
    color: var(--sgpa-danger);
    border-color: rgba(220, 38, 38, 0.16);
  }

  .modal-icon.success {
    background: var(--sgpa-success-bg);
    color: var(--sgpa-success);
    border-color: rgba(21, 128, 61, 0.16);
  }

  .modal-icon.warning {
    background: var(--sgpa-warning-bg);
    color: var(--sgpa-warning);
    border-color: rgba(183, 121, 31, 0.18);
  }

  .modal-copy {
    min-width: 0;
    padding-right: 2rem;
  }

  .modal-eyebrow {
    display: inline-flex;
    width: fit-content;
    margin-bottom: 0.65rem;
    padding: 0.38rem 0.72rem;
    border-radius: 999px;
    background: var(--sgpa-yellow-soft);
    color: var(--sgpa-blue);
    border: 1px solid rgba(242, 183, 5, 0.28);
    font-size: 0.72rem;
    font-weight: 950;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .modal-copy h2 {
    margin: 0;
    color: var(--sgpa-blue-dark);
    font-size: clamp(1.45rem, 4vw, 2rem);
    line-height: 1.1;
    font-weight: 950;
    letter-spacing: -0.04em;
  }

  .modal-copy p {
    margin: 0.75rem 0 0;
    color: var(--sgpa-text-soft);
    line-height: 1.7;
  }

  .modal-details {
    margin-top: 1rem;
    padding: 0.9rem 1rem;
    border-radius: 18px;
    background: #ffffff;
    border: 1px dashed var(--sgpa-border-strong);
    color: var(--sgpa-blue-dark);
    font-weight: 850;
    line-height: 1.55;
    word-break: break-word;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    padding: 1rem 2rem 2rem;
    flex-wrap: wrap;
  }

  .cancel-button,
  .confirm-button {
    min-height: 44px;
    padding: 0.78rem 1.1rem;
    border-radius: 999px;
    font-weight: 950;
  }

  .cancel-button {
    background: #ffffff;
    color: var(--sgpa-blue);
    border: 1px solid var(--sgpa-border-strong);
  }

  .cancel-button:hover {
    background: var(--sgpa-blue-soft);
    color: var(--sgpa-blue-dark);
  }

  .confirm-button {
    color: #ffffff;
    background: linear-gradient(135deg, var(--sgpa-blue), var(--sgpa-blue-mid));
    border: 1px solid transparent;
  }

  .confirm-button.danger {
    background: linear-gradient(135deg, #b91c1c, var(--sgpa-danger));
  }

  .confirm-button.success {
    background: linear-gradient(135deg, #166534, var(--sgpa-success));
  }

  .confirm-button.warning {
    background: linear-gradient(135deg, var(--sgpa-orange), var(--sgpa-yellow));
    color: var(--sgpa-blue-dark);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes modal-in {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 560px) {
    .confirm-overlay {
      align-items: end;
      padding: 0.75rem;
    }

    .confirm-modal {
      border-radius: 26px;
    }

    .modal-content {
      grid-template-columns: 1fr;
      padding: 1.6rem 1.2rem 1rem;
    }

    .modal-copy {
      padding-right: 0;
    }

    .modal-actions {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0.8rem 1.2rem 1.3rem;
    }
  }
</style>