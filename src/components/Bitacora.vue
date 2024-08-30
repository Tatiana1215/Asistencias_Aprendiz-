<template>
  <div>

    <div class="title">
      <h3>ASISTENCIA</h3>
    </div>

    <hr class="divider" />

    <div class="date">
      <input type="date" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />
      <input type="date" v-model="fechaFinal" name="fechaFinal" id="fechaFinal" />

      <q-btn :loading="UseBitacora.loading" color="green" @click="Buscar(), (p = false)">
        Buscar
        <template v-slot:loading>
          <q-spinner color="white" size="1em" />
        </template>
      </q-btn>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table
          title="Asistencia"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-Estado="props">
            <q-select
              v-model="props.row.estado"
              :options="estadoOptions"
              label="Seleccione estado"
              dense
              outlined
              @update:model-value="actualizarEstado(props.row)"
            />
          </template>
        </q-table>
      </div>
    </div>

    <!-- <div class="date">
      <input type="text" v-model="Aprendiz" name="" id="aprendiz" /> -->
      <!-- <input type="datetime-local" v-model="FechaHora" name="" id="fecha" /> -->

      <q-btn :loading="UseBitacora.loading" color="green" @click="guardar(), (p = false)">
        Registrar
        <template v-slot:loading>
          <q-spinner color="white" size="1em" />
        </template>
      </q-btn>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseBitacoraStore } from "../Stores/bitacoras";

let fechaInicial = ref("");
let fechaFinal = ref("");

// Registrar la hora de llegada
let Aprendiz = ref();
let FechaHora = ref();
const estadoOptions = [
  { label: "Asistió", value: "asistio" },
  { label: "No asistió", value: "no_asistio" },
  { label: "Excusa", value: "excusa" },
  { label: "Pendiente", value: "pendiente" }
];

const UseBitacora = UseBitacoraStore();
onBeforeMount(() => {
  traer();
});



async function traer() {
  let res = await UseBitacora.listar();
  rows.value = res.data;
}

const rows = ref([]);

async function Buscar() {
    let res = await UseBitacora.listarBitacora(fechaInicial.value,fechaFinal.value);
    console.log(res);
    rows.value = res.data.map((item, index) => ({
      ...item,
      numero: index + 1,
      estado: item.estado || "pendiente"  // Valor por defecto
    }));
 
  }

async function guardar() {
  let res = await UseBitacora.registrarAprendiz(
    Aprendiz.value,
    FechaHora.value
  );
  await Buscar();
}

function actualizarEstado(row) {
  // Aquí podrías agregar lógica para actualizar el estado en el backend
  console.log(`Estado actualizado para el aprendiz ${row.nombreAprendiz}: ${row.estado}`);
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
  {
    name: "Estado",
    align: "center",
    label: "Estado",
    field: "estado",
    sortable: true,
  }
]);
</script>

<style>
* {
  font-family: "New Amsterdam", sans-serif;
  font-size: 1.1rem;
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
</style>
