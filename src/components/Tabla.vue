<template>
  <div class="table-container">
    <table>
      <!-- Encabezado del Acta -->
      <tr>
        <td colspan="11" class="title-row">
          REGISTRO DE ASISTENCIA Y APROBACIÓN DEL ACTA No- ______ DEL DÍA {{ fechaDia }} DEL MES DE {{ fechaMes }} DEL AÑO {{ fechaAnio }}
        </td>
      </tr>
      <!-- Fila para Objetivo y contenido -->
      <tr>
        <td colspan="2" class="objective-title">
          OBJETIVO (S)
        </td>
        <td colspan="9" class="objective-content">
          Registro de asistencia de la ficha {{ fichaSeleccionada }}
        </td>
      </tr>
      <!-- Encabezados de la tabla -->
      <tr>
        <th class="small-column">No.</th>
        <th class="nombre">NOMBRES Y APELLIDOS</th>
        <th class="documento">No. DOCUMENTO</th>
        <th>PLANTA</th>
        <th>CONTRATISTA</th>
        <th>OTRO ¿CUAL?</th>
        <th class="dependencia">DEPENDENCIA/ EMPRESA</th>
        <th class="correo">CORREO ELECTRÓNICO</th>
        <th class="telefono">TELÉFONO/EXT. SENA</th>
        <th class="autoriza">AUTORIZA GRABACIÓN</th>
        <th>FIRMA O PARTICIPACIÓN VIRTUAL</th>
      </tr>
      <!-- Filas de datos dinámicas -->
      <tr v-for="(fila, index) in fillRows()" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ fila.nombre || '' }}</td>
        <td>{{ fila.documento || '' }}</td>
        <td>{{ fila.planta || '' }}</td>
        <td>{{ fila.contratista || '' }}</td>
        <td>{{ fila.otro ? 'Aprendiz' : '' }}</td>
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
  width: 1200px; /* Tamaño fijo del contenedor */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  padding-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
  font-size: 12px;
}

th {
  font-size: 12px;
  white-space: pre-line; /* Permite múltiples líneas en encabezados */
  word-wrap: break-word; /* Permite que se ajusten palabras largas */
}

.title-row {
  height: 80px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.objective-title {
  height: 50px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding-left: 10px;
}

.objective-content {
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
}

.small-column {
  width: 40px; /* Ancho fijo para la columna No. */
}

.nombre {
  width: 150px; /* Ancho fijo para nombres y apellidos */
}

.documento {
  width: 120px; /* Ancho fijo para documento */
}

.planta,
.contratista,
.dependencia {
  width: 90px; /* Ancho fijo para estas columnas */
}

.correo {
  width: 150px; /* Ancho fijo para el correo */
}

.telefono {
  width: 140px; /* Ancho fijo para el teléfono */
}

.autoriza{
  width: 100px;
}

.firma {
  max-width: 80px; /* Tamaño máximo para la firma */
  max-height: 80px;
}
</style>
