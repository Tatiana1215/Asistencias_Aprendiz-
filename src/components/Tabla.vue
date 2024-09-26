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
      <tr v-for="(fila, index) in completarFilas" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ fila.nombre || '' }}</td>
        <td>{{ fila.documento || '' }}</td>
        <td>{{ fila.planta || '' }}</td>
        <td>{{ fila.contratista || '' }}</td>
        <td>{{ fila.otro || 'Aprendiz' }}</td>
        <td>{{ fila.dependencia || '' }}</td>
        <td>{{ fila.emailAprendiz || '' }}</td>
        <td>{{ fila.telefonoAprendiz || '' }}</td>
        <td>{{ fila.autoriza || ''}} </td>
        <td>{{ fila.firma || '' }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseInformeStore } from "../Stores/informes"; // Importa el store correctamente

// Inicializa el store
const UseStore = UseInformeStore();
const aprendices = ref([]);

// Función para obtener los datos
const guardarDatosEImprimir = async () => {
  try {
    await UseStore.listarAprediz(); // Llama a la función para listar aprendices
    aprendices.value = UseStore.obtenerAprendicesGuardados(); // Guarda los aprendices en el ref
  } catch (error) {
    console.error('Error al guardar los datos e imprimir:', error);
  }
};

// Hook para ejecutar cuando el componente se monta
onBeforeMount(() => {
  guardarDatosEImprimir(); // Cargar datos cuando el componente se monte
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
