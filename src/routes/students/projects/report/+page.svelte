<script>
  import ProjectsReport from '$lib/components/ProjectsReport.svelte';

  export let data;
</script>

<ProjectsReport
  {data}
  backHref="/students/projects"
  backLabel="Back to available projects"
/>