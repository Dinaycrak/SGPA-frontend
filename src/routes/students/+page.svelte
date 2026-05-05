<script>
  import Header from '../../lib/components/Header_St.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import SideBar from '../../lib/components/StudentSideBar.svelte';
  import Dashboard from '../../lib/components/Dashboard.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<Header />
<SideBar />

<Dashboard
  roleName="Student"
  eyebrow="Student Module"
  title="Academic Project Overview"
  description="Explore available projects, review your enrollments and consult your personal information inside SGPA."
/>

<Footer />