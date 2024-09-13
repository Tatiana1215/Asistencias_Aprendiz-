<template>
    <div class="table-container">
      <table>
        <tr>
          <th colspan="11" class="title-row">REGISTRO DE ASISTENCIA Y APROBACIÓN DEL ACTA No-</th>
        </tr>
        <tr>
          <th colspan="11" class="subtitle-row">DEL DÍA _____ DEL MES DE _____ DEL AÑO 2024</th>
        </tr>
        <tr>
          <th colspan="11" class="objective-row">OBJETIVO (S)</th>
        </tr>
        <tr>
          <th>No.</th>
          <th>NOMBRES Y APELLIDOS</th>
          <th>No. DOCUMENTO</th>
          <th>CORREO ELECTRÓNICO</th>
          <th>TELÉFONO/EXT. SENA</th>
       
        </tr>
        <!-- Filas de datos dinámicas -->
        <tr v-for="(fila, index) in filas" :key="index">
          <td>{{ index + 1 }}</td>
          <td><input v-model="fila.nombres" type="text" /></td>
          <td><input v-model="fila.documento" type="text" /></td>
          <td><input v-model="fila.correo" type="text" /></td>
          <td><input v-model="fila.telefono" type="text" /></td>
         
        </tr>
      </table>
  
     
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filas: [
          {
            nombres: "",
            documento: "",
            planta: "",
            contratista: "",
            otro: "",
            dependencia: "",
            correo: "",
            telefono: "",
            autoriza: false,
            firma: ""
          }
        ]
      };
    },
    
  };
  </script>
  
  <style scoped>
  .table-container {
    width: 100%;
    margin: 0 auto;
  }
  .table-container{
    display: grid;
    place-items: center;
  }
  
  table {
    width: 80%;
    border-collapse: collapse;
    margin-top: 20px;
   
  }
  
  th, td {
    border: 1px solid black;
    padding: 10px;
    text-align: center;
    font-size: 15px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .title-row {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  
  .subtitle-row {
    font-size: 14px;
    text-align: center;
  }
  
  .objective-row {
    font-size: 14px;
    text-align: left;
  }
  
  input[type="text"] {
    width: 100%;
    border: none;
    text-align: center;
  }
  
  @media print {
    body {
      margin: 0;
    }
  }
  </style>
  