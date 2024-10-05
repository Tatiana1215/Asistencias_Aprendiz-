<template>
  <div>
    <div class="title">
      <h3>ASISTENCIA</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md centered-row">
      <div class="q-gutter-md inline-flex align-center">

        <q-select dense v-model="ficha" :options="filterOptions" label="Ficha" color="green" emit-value map-options
          option-label="formattedLabel" option-value="Codigo" use-input @filter="filterONE" class="custom-select"
          use-chips />

        <div class="Fecha">
          <input type="date" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />
          <input type="date" v-model="fechaFinal" name="fechaFinal" id="fechaFinal" />

          <q-btn :loading="UseBitacora.loading" color="green" @click="Buscar()">
            Buscar
            <template v-slot:loading>
              <q-spinner color="white" size="1em" />
            </template>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <!-- <template v-slot:body-cell-Estado="props">
            <q-select v-model="props.row.Estado" :options="estadoOptions" :class="{
              'estado-asistio': props.row.Estado === 'Asistio',
              'estado-no-asistio': props.row.Estado === 'No Asistio',
              'estado-excusa': props.row.Estado === 'Excusa',
              'estado-pendiente': props.row.Estado === 'Pendiente',
            }" label="Seleccione Estado" dense outlined @update:model-value="actualizarEstado(props.row)" emit-value
              map-options></q-select>
          </template> -->

          <template v-slot:body-cell-Estado="props">
  <q-select
    v-model="props.row.Estado"
    :options="estadoOptions"
    :class="{
      'estado-asistio': props.row.Estado === 'Asistio',
      'estado-no-asistio': props.row.Estado === 'No Asistio',
      'estado-excusa': props.row.Estado === 'Excusa',
      'estado-pendiente': props.row.Estado === 'Pendiente',
    }"
    label="Seleccione Estado"
    dense
    outlined

    @update:model-value="() => actualizarEstado(props.row)"
    emit-value
    map-options
  ></q-select>
</template>
          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              {{ props.pageIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseBitacoraStore } from "../Stores/bitacoras";
import { UseUsuarioStore } from "../Stores/usuario";
import { Notify } from "quasar";
import axios from "axios";

let fechaInicial = ref("");
let fechaFinal = ref("");
let Estado = ref("");
let ficha = ref("")

// Registrar la hora de llegada
// let Aprendiz = ref();
// let createdAt = ref();

const estadoOptions = [
  { label: "Asistio", value: "Asistio" },
  { label: "No asistio", value: "No Asistio" },
  { label: "Excusa", value: "Excusa" },
  { label: "Pendiente", value: "Pendiente" },
];

const UseBitacora = UseBitacoraStore();
const UseUsuario = UseUsuarioStore()

onBeforeMount(() => {
  traer();
  fetchData()
});


const rows = ref([]);
const options = ref([]); // Opciones de fichas cargadas desde la API
const filterOptions = ref([]);

async function fetchData() {
  try {
    const res = await axios.get(
      "https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo",
      {
        headers: {
          "x-token": UseUsuario.xtoken,
        },
      }
    );
    const data = res.data;
    const activeFichas = data.filter((ficha) => ficha.Estado === 1);

    activeFichas.forEach(ficha => {
      ficha.formattedLabel = `${ficha.Codigo} - ${ficha.Nombre}`; // Aquí concatenas el código con el nombre
    });

    options.value = activeFichas;
    filterOptions.value = activeFichas;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Filtrar las fichas según el input del usuario
async function filterONE(val, update) {
  if (val === "") {
    update(() => {
      filterOptions.value = options.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptions.value = options.value.filter((option) =>
    option.Codigo.toLowerCase().includes(needle) ||
    option.Nombre.toLowerCase().includes(needle)
    );
  });
}


async function traer() {
  let res = await UseBitacora.listar();
  rows.value = res.data;
}

async function Buscar() {
  // Verificar si la ficha está vacía
  const today = new Date().toISOString().split("T")[0]

  if (!ficha.value) {
    Notify.create({
      type: "negative",
      message: "El campo Ficha está vacío.",

    });
    return; // Detener la ejecución
  }

  // Verificar si la fecha inicial está vacía
  if (!fechaInicial.value) {
    Notify.create({
      type: "negative",
      message: "El campo Fecha está vacío.",
    });
    return; // Detener la ejecución
  }

  // Verificar si la fecha final está vacía
  if (!fechaFinal.value) {
    Notify.create({
      type: "negative",
      message: "El campo Fecha está vacío.",
    });
    return; // Detener la ejecución
  }
  // Verificar si la fecha inicial es mayor que la fecha final
  if (fechaInicial.value > fechaFinal.value) {
    Notify.create({
      type: "negative",
      message: "La Fecha Inicial no puede ser mayor que la Fecha Final.",
    });
    return; // Detener la ejecución
  }

  // Verificar si alguna de las fechas es futura
  if (fechaInicial.value > today || fechaFinal.value > today) {
    Notify.create({
      type: "negative",
      message: "Las fechas no pueden ser futuras.",
    });
    return; // Detener la ejecución
  }

  try {
    console.log("Ficha seleccionada:", ficha.value);
    console.log("Fecha inicial:", fechaInicial.value);
    console.log("Fecha final:", fechaFinal.value);

    let res = await UseBitacora.listarBitacora(
      ficha.value,
      fechaInicial.value,
      fechaFinal.value
    );
    console.log("Datos recibidos:", res.data);
    rows.value = res.data;
  } catch (error) {
    console.error("Error al buscar las bitácoras:", error);
    Notify.create({
      type: "negative",
      message: "Hubo un error al buscar las bitácoras.",
    });
  }
}

async function actualizarEstado(row) {
  try {
    console.log("Estado enviado:", row.Estado); // Verifica el valor que estás enviando
    let res = await axios.put(
      `https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/actualizarEstado/${row._id}`,
      {
        Estado: row.Estado,
      }
    );
    // rows.value = res.data;
    // Actualiza el estado localmente
    const index = rows.value.findIndex(r => r._id === row._id);
    if (index !== -1) {
      rows.value[index].Estado = row.Estado; // Actualiza solo el estado de la fila modificada
    }
    console.log("Estado actualizado:", res.data);
    // traer();
    // await Buscar()
    // await traer()
    
  } catch (error) {
    console.log("Error al actualizar el estado:", error);
  }
}

const columns = ref([
  {
    name: "Numero",
    required: true,
    label: "N°",
    align: "center",
    field: "Numero",
    sortable: true,
  },
  {
    name: "nombreAprendiz",
    required: true,
    label: "Aprendiz",
    align: "center",
    field: "nombreAprendiz",
    sortable: true,
  },
  {
    name: "documentoAprendiz",
    required: true,
    label: "Número de Documento",
    align: "center",
    field: "documentoAprendiz",
    sortable: true,
  },
  {
    name: "telefonoAprendiz",
    required: true,
    label: "Número de Teléfono",
    align: "center",
    field: "telefonoAprendiz",
    sortable: true,
  },
  {
    name: "emailAprendiz",
    required: true,
    label: "Email",
    align: "center",
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
    label: "Estados",
    field: "Estado",
    sortable: true,
  },
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

.centered-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inline-flex {
  display: flex;
  gap: 15px;
  /* Espacio entre los elementos */
  align-items: center;
}

.q-mx-sm {
  margin-left: 10px;
  margin-right: 10px;
}

.Fecha {
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
