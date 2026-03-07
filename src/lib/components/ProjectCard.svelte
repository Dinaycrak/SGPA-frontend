<script>
  export let name;
  export let schedule;
</script>

<div class="card">
  <div class="icon"></div>
  <div class="info">
    <h3>{name}</h3>
    <p>{schedule}</p>
  </div>
</div>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: 15px;
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 15px;
  }

  .icon {
    font-size: 22px;
  }

  h3 {
    margin: 0;
    color: #ff5100;
  }

  p {
    margin: 0;
    color: gray;
  }
</style>