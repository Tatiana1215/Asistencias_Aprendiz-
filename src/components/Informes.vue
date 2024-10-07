<template>
  <div>
    <div class="titleFirst">
      <h3>INFORMES</h3>
      <hr class="divider" />
    </div>

    <div class="q-pa-md centered-row">
      <div class="q-gutter-md inline-flex">

     

        <q-select dense v-model="ficha" :options="filterOptions" label="Ficha" color="green" emit-value map-options
          option-label="formattedLabel" option-value="Codigo" use-input @filter="filterONE" class="custom-select"
          use-chips  :rules="[
                  (val) => !!val || 'La ficha es obligatoria'  //Asegúrese de que haya un archivo seleccionado
                ]"  />

        <input type="date" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />

        <q-btn v-for="size in sizes" :key="`btn_size_rd_${size}`" rounded color="green" :size="size" :label="`${size}`"
          icon="print" to="/Tabla" />
      </div>
    </div>
    <q-card-actions align="center">
      <q-btn :loading="UseStore.loading" color="green" @click="buscarAprendices()">
        Buscar
        <template v-slot:loading>
          <q-spinner color="white" size="1em" />
        </template>
      </q-btn>
    </q-card-actions>


    <!-- Tabla de aprendices -->
    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table :rows="rows" :columns="columns" row-key="documento">
    <template v-slot:body-cell-Numero="props">
      <q-td :props="props">
        {{ props.rowIndex + 1 }}
      </q-td>
    </template> 

    <template v-slot:body-cell-firma="props">
            <q-td :props="props">
              {{ console.log(props.row.firma) }}
              <q-img
                v-if="props.row.firma"
                :src="props.row.firma"
                alt="firma"
                style="max-width: 100px; max-height: 100px;"
              />
              <p v-else>No disponible</p>
            </q-td>
          </template>
  </q-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseUsuarioStore } from "../Stores/usuario";
import { UseInformeStore } from "../Stores/informes";
import { useRouter } from "vue-router";
import axios from "axios";
import { Notify } from "quasar";
import dayjs from "dayjs";

const options = ref([]); // Opciones de fichas cargadas desde la API
const filterOptions = ref([]); // Opciones filtradas para mostrar en el select
const ficha = ref(""); // Ficha seleccionada
const fechaInicial = ref(""); // Fecha seleccionada
const rows = ref([]); // Datos para la tabla

const UseStore = UseInformeStore(); // Usamos el store que gestionará las solicitudes
const UseUsuario = UseUsuarioStore();
const router = useRouter();
// Cargar datos al montar el componente
onBeforeMount(() => {
  fetchData();
});

const sizes = ref([""]); // Puedes ajustar los tamaños según sea necesario

// Función para obtener las fichas al montar el componente
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

    activeFichas.forEach((ficha) => {
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

async function buscarAprendices() {
  // Validación inicial de ficha y fecha

  if (!ficha.value) {
    Notify.create({
      color: "negative",
      message: "Por favor, selecciona una ficha.",
      icon: "warning",
      timeout: 2500,
    });
    return;
  }

  if (!fechaInicial.value) {
    Notify.create({
      color: "negative",
      message: "Por favor, selecciona una fecha.",
      icon: "warning",
      timeout: 2500,
    });
    return;
  }
  // Validar que la fecha no sea futura
  if (dayjs(fechaInicial.value).isAfter(dayjs())) {
    Notify.create({
      color: "warning",
      message: "La fecha no puede ser en el futuro.",
      icon: "warning",
      timeout: 2500,
    });
    return;
  }

  console.log("Ficha seleccionada:", ficha.value);
  console.log("Fecha seleccionada:", fechaInicial.value);
  console.log(rows.value);

  // Guardar en el store
  UseStore.setFichaSeleccionada(ficha.value);
  UseStore.setFechaSeleccionada(fechaInicial.value);

  // Continuar con la lógica de búsqueda de aprendices si la validación pasa
  // try {
    // Llamada a la función que devuelve directamente los datos (no res.data)
    const res = await UseStore.obtenerBitacorasPorFichaYFecha(
      ficha.value,
      fechaInicial.value
    );
    rows.value = res.data;
}
const columns = ref([
  {
    name: "Numero",
    required: true,
    label: "N°",
    align: 'center',
    field: "Numero",
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: 'center',
    field: "nombre",
    sortable: true,
  },
  {
    name: "documento",
    required: true,
    label: "Documento",
    align: "center",
    field: "documento",
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
    name: "telefonoAprendiz",
    required: true,
    label: "Número de Teléfono",
    align: "center",
    field: "telefonoAprendiz",
    sortable: true,
  },  {
    name: "nombreFicha",
    required: true,
    label: "Ficha",
    align: "center",
    field: "nombreFicha",
    sortable: true,
  },  {
    name: "numeroFicha",
    required: true,
    label: "Numero",
    align: "center",
    field: "numeroFicha",
    sortable: true,
  },
  {
    name:"firma",
    required: true,
    label:"Firma",
    align:"center",
    field:"firma",
    sortable: true,
  },
]);

</script>

<style scoped>
.titleFirst {
  margin: 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Roboto", Arial, sans-serif;
}

.divider {
  width: 80%;
  border: 2px solid rgb(53, 164, 81);
}

.centered-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inline-flex {
  display: inline-flex;
  gap: 20px;
}

.q-popup-proxy {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
