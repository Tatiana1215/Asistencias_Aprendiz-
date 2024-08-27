<template>
    <div class="main-container">
      <h1>Bienvenido</h1>
      <div class="button-group">
        <router-link to="/RegistroA">
          <button class="btn">Aprendiz</button>
        </router-link>
        <router-link to="/Login">
          <button class="btn">Instructor</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Main'
  }
  </script>
  
  <style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .button-group {
    margin-top: 20px;
  }
  
  .btn {
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  </style>
  