<script>
  import Header from "../../lib/components/Header.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import TeacherProjectCard from "../../lib/components/ProjectCardTeacher.svelte";

  let projects = [
    { name: "SGPA", schedule: "Mar - 2:00 PM - 4:00 PM" },
    { name: "Sistema de Inventario", schedule: "Jue - 8:00 AM - 10:00 AM" },
    { name: "Plataforma Educativa", schedule: "Vie - 3:00 PM - 5:00 PM" }
  ];
</script>

<Header />

<main>

  <h1>Proyectos Asignados</h1>

  <div class="projects">

    {#each projects as project}
      <TeacherProjectCard
        name={project.name}
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
  margin-bottom:20px;
  color:#0b2d69;
}

.projects{
  max-width:600px;
  display:flex;
  flex-direction:column;
  gap:15px;
}
</style>