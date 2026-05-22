<script>
  import ProjectsReport from '$lib/components/ProjectsReport.svelte';

  export let data;
</script>

<ProjectsReport
  {data}
  backHref="/teacher/projects"
  backLabel="Back to available projects"
/>