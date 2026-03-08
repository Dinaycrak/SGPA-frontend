<script>
  export let name;
  export let teacher;
  export let schedule;

  function viewTeacher(){
    alert("Profesor asignado: " + teacher);
  }
</script>

<div class="card">

<div class="info">
  <h3>{name}</h3>
  <p>Profesor: {teacher}</p>
  <p>{schedule}</p>
</div>

<button class="teacher-btn" on:click={viewTeacher}>
Ver profesor
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

h3{
margin:0;
color:#ff5100;
}

p{
margin:2px 0;
color:gray;
}

.teacher-btn{
background:#ff5100;
color:white;
border:none;
padding:8px 12px;
border-radius:6px;
cursor:pointer;
}
</style>