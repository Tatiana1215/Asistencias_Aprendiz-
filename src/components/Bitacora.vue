<template>
  <div>

    <div class="title">
      <h3>ASISTENCIA</h3>
    </div>

    <hr class="divider" />

    <div class="date">
      <input type="date" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />
      <input type="date" v-model="fechaFinal" name="fechaFinal" id="fechaFinal" />

      <q-btn :loading="UseBitacora.loading" color="green" @click="Buscar()">
        Buscar
        <template v-slot:loading>
          <q-spinner color="white" size="1em" />
        </template>
      </q-btn>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table :rows="rows" :columns="columns" row-key="name" >

          <template v-slot:body-cell-Estado="props">
            <q-select v-model="props.row.Estado" :options="estadoOptions" :class="{
              'estado-asistio': props.row.Estado === 'Asistio',
              'estado-no-asistio': props.row.Estado === 'No Asistio',
              'estado-excusa': props.row.Estado === 'Excusa',
              'estado-pendiente': props.row.Estado === 'Pendiente'
            }" label="Seleccione Estado" dense outlined @update:model-value="actualizarEstado(props.row)" emit-value
              map-options></q-select>
            <!-- <div>{{props.row.Estado}}</div>  -->
            <!-- <div>Estado actual: {{ props.row.Estado }}</div> -->
            <!-- Estado actual en select: {{ estadoOptions.find(option => option.value === props.row.Estado)?.label }} -->
          </template>


        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseBitacoraStore } from "../Stores/bitacoras";
import axios from "axios";

let fechaInicial = ref("");
let fechaFinal = ref("");
let Estado = ref("")

// Registrar la hora de llegada
// let Aprendiz = ref();
// let createdAt = ref();

const estadoOptions = [
  { label: "Asistio", value: "Asistio" },
  { label: "No asistio", value: "No Asistio" },
  { label: "Excusa", value: "Excusa" },
  { label: "Pendiente", value: "Pendiente" }
];

const UseBitacora = UseBitacoraStore();
onBeforeMount(() => {
  traer()
  // actualizarEstado()
});



async function traer() {
  let res = await UseBitacora.listar();
  rows.value = res.data;
  // rows.value = res.Estado;

}

const rows = ref([]);

async function Buscar() {
  let res = await UseBitacora.listarBitacora(fechaInicial.value, fechaFinal.value);
  console.log('Datos recibidos:', res.data);
  rows.value = res.data;
}


async function actualizarEstado(row) {
  try {
    console.log("Estado enviado:", row.Estado); // Verifica el valor que estás enviando
    let res = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/actualizarEstado/${row._id}`, {
      Estado: row.Estado
    });
    rows.value = res.data;
    console.log('Estado actualizado:', res.data);
    traer()
  } catch (error) {
    console.log('Error al actualizar el estado:', error);
  }
}



const columns = ref([
  {
    name: "Numero",
    required: true,
    label: "N°",
    align: "left",
    field: "numero",
    sortable: true,
  },
  {
    name: "nombreAprendiz",
    required: true,
    label: "Aprendiz",
    align: "left",
    field: "nombreAprendiz",
    sortable: true,
  },
  {
    name: "telefonoAprendiz",
    required: true,
    label: "Número de Teléfono",
    align: "left",
    field: "telefonoAprendiz",
    sortable: true,
  },
  {
    name: "emailAprendiz",
    required: true,
    label: "Email",
    align: "left",
    field: "emailAprendiz",
    sortable: true,
  },
  {
    name: "nombreFicha",
    align: "center",
    label: "Programa de formación",
    field: "nombreFicha",
    sortable: true,
  },
  {
    name: "createdAt",
    align: "center",
    label: "Fecha y Hora",
    field: "createdAt",
    sortable: true,
  },
  // {
  //   name: "Estado",
  //   align: "center",
  //   label: "Estado",
  //   field: "Estado",
  //   sortable: true,
  // },
  {
    name: "Estado",
    align: "center",
    label: "Estados",
    field: "Estado",
    sortable: true,
  }
]);
</script>

<style>
* {
  font-family: "New Amsterdam", sans-serif;
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
}

.title {
  display: flex;
  justify-content: center;
  padding: 15px;
}

.divider {
  width: 100%;
  border: 2px solid rgb(53, 164, 81);
}

#fechaInicial,
#fechaFinal,
#aprendiz,
#fecha {
  border-radius: 10px;
}

.date {
  margin: 15px 10px 15px;
  justify-content: center;
  display: flex;
  gap: 10px;
}

.table .q-table__title {
  font-size: 1.5rem !important;
  text-align: center;
  font-weight: bold;
}

.table .q-table__cell,
.table .q-table__row {
  font-size: 1.2rem !important;
}

.btn {
  background-color: green;
  color: white;
  border: green;
}

.estado-asistio {
  background-color: lightgreen;
}

.estado-no-asistio {
  background-color: rgb(254, 166, 166);
}

.estado-excusa {
  background-color: rgb(133, 230, 230);
}

.estado-pendiente {
  background-color: rgb(253, 230, 83);
}
</style>
