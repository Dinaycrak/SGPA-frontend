<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
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

    <div>
        <h1 class="tittle">Iniciar sesión</h1>
    </div>
    <div class="login-container">

        <input type="text" placeholder="Usuario" />

        <input type="password" placeholder="Contraseña" />

        <button class="button" on:click={StudentLogin}>
            Ingresar como Estudiante
        </button>

        <button class="button" on:click={TeacherLogin}>
            Ingresar como Docente
        </button>

        <button class="button" on:click={CoordinatorLogin}>
            Ingresar como Coordinador
        </button>

    </div>
</div>


<style>
.tittle {
    color:blue;

}
.login-container{
	display:flex;
	flex-direction:column;
	width:300px;
	margin:auto;
	gap:10px;
}
.button{
    background-color: rgb(31, 94, 254);
    color: white;
    border-radius: 3px;
}
</style>