<script>
  import Header from "../../lib/components/Header_St.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import CoordinatorProjectCard from "../../lib/components/ProjectCardCoordinator.svelte";

  let projects = [
    { name: "SGPA", teacher: "Carlos Pérez", schedule: "Mar - 2:00 PM - 4:00 PM" },
    { name: "Sistema de Inventario", teacher: "Ana López", schedule: "Jue - 8:00 AM - 10:00 AM" }
  ];

  function createProject() {
    alert("Aquí abriría el formulario para crear proyecto");
  }
</script>

<Header />

<main>

<h1>Gestión de Proyectos</h1>

<button class="add-btn" on:click={createProject}>
  + Crear nuevo proyecto
</button>

<div class="projects">

{#each projects as project}
  <CoordinatorProjectCard
    name={project.name}
    teacher={project.teacher}
    schedule={project.schedule}
  />
{/each}

</div>

</main>

<Footer />

<style>
main{
  min-height:70vh;
  padding:30px;
  background:#f1f5f9;
}

h1{
  margin-bottom:15px;
  color:#0b2d69;
}

.add-btn{
  background:#0b2d69;
  color:white;
  border:none;
  padding:10px 16px;
  border-radius:6px;
  cursor:pointer;
  margin-bottom:20px;
}

.projects{
  max-width:650px;
  display:flex;
  flex-direction:column;
  gap:15px;
}
</style>