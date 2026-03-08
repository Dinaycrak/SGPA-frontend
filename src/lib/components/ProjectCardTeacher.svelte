<script>
  export let name;
  export let schedule;

  function viewStudents() {
    alert("Aquí verías los estudiantes del proyecto: " + name);
  }
</script>

<div class="card">
  
  <div class="left">
    <div class="icon"></div>

    <div class="info">
      <h3>{name}</h3>
      <p>{schedule}</p>
    </div>
  </div>

  <button class="students-btn" on:click={viewStudents}>
    Ver estudiantes
  </button>

</div>

<style>
.card{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:white;
  padding:15px;
  border-radius:10px;
  box-shadow:0 2px 6px rgba(0,0,0,0.1);
}

.left{
  display:flex;
  align-items:center;
  gap:15px;
}

.icon{
  font-size:22px;
}

h3{
  margin:0;
  color:#ff5100;
}

p{
  margin:0;
  color:gray;
}

.students-btn{
  background:#0b2d69;
  color:white;
  border:none;
  padding:8px 14px;
  border-radius:6px;
  cursor:pointer;
}

.students-btn:hover{
  background:#1540a5;
}
</style>