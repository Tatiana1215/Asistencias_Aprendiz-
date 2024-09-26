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
        <th>PLANTA</th>
        <th>CONTRATISTA</th>
        <th>OTRO ¿CUAL?</th>
        <th>DEPENDENCIA/EMPRESA</th>
        <th>CORREO ELECTRÓNICO</th>
        <th>TELÉFONO/EXT. SENA</th>
        <th>AUTORIZA GRABACIÓN</th>
        <th>FIRMA O PARTICIPACIÓN VIRTUAL</th>
      </tr>
      <!-- Filas de datos dinámicas -->
      <tr v-for="(fila, index) in Bitacoras" :key="index">
        <td>{{ index + 1 }}</td> <!-- Número de fila -->
        <td>{{ fila.nombre || '' }}</td> <!-- Nombres y Apellidos -->
        <td>{{ fila.documento || '' }}</td> <!-- Documento -->
        <td>{{ fila.planta ||  '' }}</td> <!-- Planta -->
        <td>{{ fila.contratista || '' }}</td> <!-- Contratista -->
        <td>{{ fila.otro || 'Aprendiz' }}</td> <!-- Otro -->
        <td>{{ fila.dependencia || '' }}</td> <!-- Dependencia -->
        <td>{{ fila.emailAprendiz || '' }}</td> <!-- Correo Electrónico -->
        <td>{{ fila.telefonoAprendiz || '' }}</td> <!-- Teléfono -->
        <td>{{ fila.autoriza || ''}}</td> <!-- Autoriza Grabación -->
        <td>{{ fila.firma || '' }}</td> <!-- Firma -->
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseInformeStore } from "../Stores/informes"; // Importa el store correctamente

// Inicializa el store
const UseStore = UseInformeStore();

// Ref para guardar los datos de Bitacoras
const Bitacoras = ref([]); 

// Cargar los datos de Bitacoras antes de montar el componente
onBeforeMount(() => {
  Bitacoras.value = UseStore.Bitacora; // Obtener los datos desde el store
  console.log(Bitacoras.value); // Verificar los datos
}); 
</script>

<style scoped>
.table-container {
  width: 100%;
  margin: 0 auto;
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
</style>
