<script>
	import Header from "$lib/components/Header_St.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import SideBar from "../../../lib/components/CoordinatorSideBar.svelte";

	export let form;

	$: savedValues = form?.values || {};

	function getValue(name) {
		return savedValues[name] ?? "";
	}
</script>

<Header />

<SideBar />

<main>
	<div class="content-wrapper">
		<header class="main-header">
			<div class="header-top">
				<div>
					<h1>MÓDULO COORDINADOR</h1>
					<p>Registro de usuarios del sistema para estudiantes y profesores.</p>
				</div>

				<div class="header-badge">
					<span>Crear Usuario</span>
				</div>
			</div>
		</header>

		{#if form?.success}
			<div class="success-msg">✅ {form.message}</div>
		{/if}

		{#if form?.error}
			<div class="error-msg">⚠️ {form.error}</div>
		{/if}

		<section class="form-section">
			<div class="section-title">
				<h2>Formulario de Registro</h2>
				<span class="badge">Coordinador</span>
			</div>

			<div class="form-card">
				<form method="POST" class="user-form">
					<div class="form-grid">
						<div class="field">
							<label for="first_name">Nombres</label>
							<input
								id="first_name"
								name="first_name"
								type="text"
								placeholder="Ej: Alejandro"
								value={getValue('first_name')}
								required
							/>
						</div>

						<div class="field">
							<label for="last_name">Apellidos</label>
							<input
								id="last_name"
								name="last_name"
								type="text"
								placeholder="Ej: Gómez"
								value={getValue('last_name')}
								required
							/>
						</div>

						<div class="field">
							<label for="email">Correo electrónico</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Ej: usuario@correo.com"
								value={getValue('email')}
								required
							/>
						</div>

						<div class="field">
							<label for="phone">Teléfono</label>
							<input
								id="phone"
								name="phone"
								type="text"
								placeholder="Ej: 3001234567"
								value={getValue('phone')}
								required
							/>
						</div>

						<div class="field">
							<label for="password">Contraseña</label>
							<input
								id="password"
								name="password"
								type="password"
								placeholder="Ingresa una contraseña"
								required
							/>
						</div>

                        <div class="field">
                            <label for="id_role">Tipo de usuario</label>
                            <select id="id_role" name="id_role" required>
                                <option value="">Selecciona un rol</option>
                                <option value="3" selected={String(getValue('id_role')) === '3'}>
                                    Profesor
                                </option>
                                <option value="1" selected={String(getValue('id_role')) === '1'}>
                                    Estudiante
                                </option>
                            </select>
                        </div>
					</div>

					<div class="extra-options">
						<label class="checkbox-label" for="is_active">
							<input
								id="is_active"
								name="is_active"
								type="checkbox"
								checked={savedValues.is_active ?? true}
							/>
							<span>Usuario activo</span>
						</label>
					</div>


					<div class="form-actions">
						<button type="submit" class="save-btn">+ Crear Usuario</button>
						<button type="reset" class="clear-btn">Limpiar</button>
					</div>
				</form>
			</div>
		</section>
	</div>
</main>

<Footer />

<style>
	main {
		background-color: #f1f5f9;
		min-height: 80vh;
		padding: 2rem 1rem;
	}

	.content-wrapper {
		max-width: 1100px;
		margin: 0 auto;
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	h1 {
		color: #0b2d69;
		margin: 0;
		font-size: 1.8rem;
		font-weight: 800;
	}

	p {
		color: #64748b;
		margin-top: 5px;
	}

	.header-badge {
		color: rgb(0, 132, 255);
		padding: 10px 20px;
		font-weight: 700;
		font-size: 30px; 
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.section-title h2 {
		margin: 0;
		color: #0b2d69;
		font-size: 1.4rem;
	}

	.badge {
		background: #ff9500;
		color: white;
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.form-card {
		background: white;
		border-radius: 14px;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border-left: 6px solid #ff9500;
	}

	.user-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.2rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.field label {
		font-weight: 700;
		color: #0f172a;
		font-size: 0.95rem;
	}

	.field input,
	.field select {
		padding: 12px 14px;
		border: 1px solid #cbd5e1;
		border-radius: 10px;
		font-size: 0.95rem;
		outline: none;
		transition: 0.2s;
		background: #fff;
	}

	.field input:focus,
	.field select:focus {
		border-color: #0b2d69;
		box-shadow: 0 0 0 3px rgba(11, 45, 105, 0.12);
	}


	.extra-options {
		display: flex;
		align-items: center;
		padding: 0.6rem 0 0.2rem 0;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 600;
		color: #334155;
		cursor: pointer;
	}


	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		border-top: 1px solid #e2e8f0;
		padding-top: 1.3rem;
		flex-wrap: wrap;
	}

	.save-btn {
		background: #0b2d69;
		color: white;
		border: none;
		padding: 12px 22px;
		border-radius: 10px;
		cursor: pointer;
		font-weight: 700;
		transition: 0.2s;
	}

	.save-btn:hover {
		background: #1540a5;
		transform: translateY(-1px);
	}

	.clear-btn {
		background: white;
		color: #dc2626;
		border: 1.5px solid #dc2626;
		padding: 12px 22px;
		border-radius: 10px;
		cursor: pointer;
		font-weight: 700;
		transition: 0.2s;
	}

	.clear-btn:hover {
		background: #fee2e2;
	}

	.error-msg {
		background: #fee2e2;
		color: #b91c1c;
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		font-weight: 600;
	}

	.success-msg {
		background: #dcfce7;
		color: #166534;
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-card {
			padding: 1.25rem;
		}

		.form-actions {
			justify-content: stretch;
		}

		.save-btn,
		.clear-btn {
			width: 100%;
		}
	}
</style>