<script>
  import ProjectsReport from '$lib/components/ProjectsReport.svelte';

  export let data;
</script>

<ProjectsReport
  {data}
  backHref="/coordinator/projects"
  backLabel="Back to projects"
/>