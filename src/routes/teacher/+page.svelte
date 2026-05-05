<script>
  import Header from '../../lib/components/Header_St.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import SideBar from '../../lib/components/TeacherSideBar.svelte';
  import Dashboard from '../../lib/components/Dashboard.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<Header />
<SideBar />

<Dashboard
  roleName="Teacher"
  eyebrow="Teacher Module"
  title="Assigned Project Tracking"
  description="Review academic information, available projects and your assigned project activity."
/>

<Footer />