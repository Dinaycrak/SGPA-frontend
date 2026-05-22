<script>
  import ProjectsReport from '$lib/components/ProjectsReport.svelte';

  export let data;
</script>

<ProjectsReport
  {data}
  backHref="/students/myprojects"
  backLabel="Back to my projects"
/>