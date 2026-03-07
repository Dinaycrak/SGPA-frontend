<script>
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
    <h1>Iniciar sesión</h1>
</div>


<div class="login-container">

	<input type="text" placeholder="Usuario" />

	<input type="password" placeholder="Contraseña" />

	<button on:click={StudentLogin}>
		Ingresar como Estudiante
	</button>

	<button on:click={TeacherLogin}>
		Ingresar como Docente
	</button>

	<button on:click={CoordinatorLogin}>
		Ingresar como Coordinador
	</button>

</div>

<style>
.login-container{
	display:flex;
	flex-direction:column;
	width:300px;
	margin:auto;
	gap:10px;
}
</style>