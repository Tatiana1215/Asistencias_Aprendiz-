<template>
  <div class="table-container">
    <table>
      <tr>
        <th colspan="11" class="title-row">
          REGISTRO DE ASISTENCIA Y APROBACIÓN DEL ACTA No- 002 DEL DÍA {{ fechaDia }} DEL MES DE {{ fechaMes }} DEL AÑO {{ fechaAnio }}
        </th>
      </tr>
      <tr>
        <th colspan="11" class="objective-row">
          OBJETIVO (S) Registro de asistencia de la ficha {{ ficha }}
        </th>
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
      <tr v-for="(fila, index) in fillRows()" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ fila.nombre || '' }}</td>
        <td>{{ fila.documento || '' }}</td>
        <td>{{ fila.planta || '' }}</td>
        <td>{{ fila.contratista || '' }}</td>
        <!-- <td>{{ fila.otro ? 'Aprendiz' : '' }}</td> -->
        <td>{{ fila.nombre? 'Aprendiz' : '' }}</td>
        <td>{{ fila.nombre? 'SENA-CAT' :'' }}</td>
        <td>{{ fila.emailAprendiz || '' }}</td>
        <td>{{ fila.telefonoAprendiz || '' }}</td>
        <td>{{ fila.autoriza || '' }}</td>
        <td>
          <div v-if="fila.firma">
            <img :src="fila.firma" alt="Firma" style="max-width: 100px; max-height: 100px;" />
          </div>
          <span v-else></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted, computed} from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { UseInformeStore } from "../Stores/informes";


const UseStore = UseInformeStore();
const Bitacoras = ref([]);

// Llama a limpiarDatos cuando salgas de la ruta
onBeforeRouteLeave(() => {
  UseStore.limpiarDatos();
});

const ficha = computed(() => UseStore.fichaSeleccionada);
const fechaSeleccionada = computed(() => {
  return new Date(UseStore.fechaSeleccionada + 'T00:00:00'); // Asegúrate de que esté en el formato ISO
});
console.log(UseStore.fichaSeleccionada)
// Computar los componentes de la fecha
const fechaDia = computed(() => {
  const fecha = new Date(fechaSeleccionada.value);
  return fecha.getDate();
});

const fechaMes = computed(() => {
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const fecha = new Date(fechaSeleccionada.value);
  return meses[fecha.getMonth()];
});

const fechaAnio = computed(() => {
  const fecha = new Date(fechaSeleccionada.value);
  return fecha.getFullYear();
});

onBeforeMount(() => {
  Bitacoras.value = UseStore.Bitacora;
});

// Limpiar datos cuando el componente se desmonte
onUnmounted(() => {
  Bitacoras.value = [];
});

const fillRows = () => {
  const totalRows = 27;
  const emptyRow = {
    nombre: '',
    documento: '',
    planta: '',
    contratista: '',
    otro: '', 
    dependencia: '',
    emailAprendiz: '',
    telefonoAprendiz: '',
    autoriza: '',
    firma: ''
  };
  return [...Bitacoras.value, ...Array(totalRows - Bitacoras.value.length).fill(emptyRow)];
  }
</script>

<style scoped>
.table-container {
  width: 100%;
  margin: 0 auto;
  display: grid;
  place-items: center;
}

table {
  width: 90%; /* Ajusta el ancho para mejor presentación */
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
  font-size: 18px;
  font-weight: bold;
}

.objective-row {
  font-size: 16px;
  text-align: left;
}
</style>