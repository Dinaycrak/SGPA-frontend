<script>
  import ProjectsReport from '$lib/components/ProjectsReport.svelte';

  export let data;
</script>

<ProjectsReport
  {data}
  backHref="/teacher/myprojects"
  backLabel="Back to my projects"
/>