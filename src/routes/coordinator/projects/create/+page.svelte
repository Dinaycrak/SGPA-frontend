<script>
  import Header from '$lib/components/Header_St.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SideBar from '$lib/components/CoordinatorSideBar.svelte';

  export let data;
  export let form;

  let submitting = false;

  $: teachers = data?.teachers || [];
  $: statuses = data?.statuses || [];
  $: defaultTeacherId = data?.defaultTeacherId || 39;
  $: error = form?.error || data?.error || '';
  $: values = form?.values || {};

  $: selectedTeacherId =
    values.teacher_id != null && values.teacher_id !== ''
      ? String(values.teacher_id)
      : String(defaultTeacherId);

  function handleSubmit() {
    if (submitting) return;
    submitting = true;
  }
</script>

<Header />
<SideBar />

<main>
  <div class="content-wrapper">
    <header class="main-header">
      <h1>Crear Proyecto</h1>
      <p>Registro de nuevos proyectos académicos y asignación inicial del profesor.</p>
    </header>

    {#if error}
      <div class="error-msg">⚠️ {error}</div>
    {/if}

    <section class="form-card">
      <form method="POST" class="project-form" on:submit={handleSubmit}>
        <div class="grid">
          <div class="field full">
            <label for="project_name">Nombre del proyecto *</label>
            <input
              id="project_name"
              name="project_name"
              type="text"
              placeholder="Ej: Sistema de seguimiento académico"
              value={values.project_name || ''}
              required
            />
          </div>

          <div class="field full">
            <label for="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe brevemente el proyecto"
            >{values.description || ''}</textarea>
          </div>

          <div class="field">
            <label for="start_date">Fecha de inicio *</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              value={values.start_date || ''}
              required
            />
          </div>

          <div class="field">
            <label for="end_date">Fecha de finalización</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              value={values.end_date || ''}
            />
          </div>

          <div class="field">
            <label for="id_status">Estado</label>
            <select id="id_status" name="id_status">
              {#each statuses as status}
                <option value={status.id} selected={String(values.id_status || '1') === String(status.id)}>
                  {status.name}
                </option>
              {/each}
            </select>
          </div>

          <div class="field">
            <label for="id_research_group">Grupo de investigación</label>
            <input
              id="id_research_group"
              name="id_research_group"
              type="number"
              min="1"
              placeholder="Opcional"
              value={values.id_research_group || ''}
            />
          </div>

          <div class="field full">
            <label for="teacher_id">Profesor asignado *</label>
            <select id="teacher_id" name="teacher_id" required>
              {#each teachers as teacher}
                <option
                  value={teacher.id_user}
                  selected={selectedTeacherId === String(teacher.id_user)}
                >
                  {teacher.first_name} {teacher.last_name} - {teacher.email}
                </option>
              {/each}
            </select>
            <small class="hint">
              Se asignará por defecto el profesor del módulo docente actual.
            </small>
          </div>
        </div>

        <div class="actions">
          <a href="/coordinator/projects" class="secondary-btn">Volver</a>

          <button type="submit" class="primary-btn" disabled={submitting}>
            {#if submitting}
              Creando...
            {:else}
              Crear Proyecto
            {/if}
          </button>
        </div>
      </form>
    </section>
  </div>
</main>

<Footer />

<style>
  main {
    background: #f1f5f9;
    min-height: 80vh;
    padding: 2rem 1rem;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
  }

  .main-header {
    margin-bottom: 1.5rem;
  }

  .main-header h1 {
    color: #0b2d69;
    margin: 0 0 0.4rem;
    font-size: 1.9rem;
    font-weight: 800;
  }

  .main-header p {
    color: #64748b;
    margin: 0;
  }

  .form-card {
    background: white;
    border-radius: 14px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  label {
    color: #0f172a;
    font-weight: 700;
    font-size: 1rem;
  }

  input,
  textarea,
  select {
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 0.85rem 0.95rem;
    font-size: 0.98rem;
    outline: none;
    background: white;
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }

  .hint {
    color: #64748b;
    font-size: 0.9rem;
  }

  .actions {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .primary-btn,
  .secondary-btn {
    padding: 0.95rem 1.25rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .primary-btn {
    background: #0b2d69;
    color: white;
  }

  .primary-btn:hover {
    background: #1540a5;
  }

  .primary-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .secondary-btn {
    background: white;
    color: #0b2d69;
    border: 1px solid #0b2d69;
  }

  .error-msg {
    background: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>