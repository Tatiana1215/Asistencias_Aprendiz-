<template>
    <div class="main-container">
      <div class="box">
        <h2>Registro de Llegada</h2>
        <form @submit.prevent="registrarLlegada">
          <label for="documento">Número de Documento:</label>
          <input v-model="documento" type="text" id="documento" required />
  
          <button type="submit" class="btn">Registrar Llegada</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const documento = ref('')
  
  const registrarLlegada = async () => {
    const fechaHoraActual = new Date().toISOString()
  
    try {
      const response = await axios.post('http://localhost:5000/api/registro-llegada', {
        documento: documento.value,
        horaLlegada: fechaHoraActual
      })
  
      if (response.status === 200) {
        alert('Llegada registrada exitosamente')
      }
    } catch (error) {
      console.error('Error al registrar la llegada:', error)
      alert('Hubo un problema al registrar la llegada. Inténtalo de nuevo.')
    }
  }
  </script>
  
  <style scoped>
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 30px;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  </style>
  