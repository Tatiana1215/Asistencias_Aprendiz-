<template>
  <div class="container">
    <div class="titleFirst">
      <h3>FICHAS</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Crear" icon="add_circle" color="green" @click="AbrirCrear()" p="false" />

      <div class="table-container">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn round color="white" :style="{ border: '2px solid green' }" @click="Abrir(props.row)" p="true">
                <q-icon name="edit" style="color: green" />
              </q-btn>
              <q-btn icon="close" round color="red" :loading="loading[props.row._id]" @click="Desactivar(props.row._id)"
                v-if="props.row.Estado == 1" />
              <q-btn icon="check" round color="green" :loading="loading[props.row._id]" @click="Activar(props.row._id)"
                v-else />
            </q-td>
          </template>

          <template v-slot:body-cell-Estado1="props">
            <q-td :props="props">
              <p v-if="props.row.Estado == 1" class="custom-font" style="color: green">
                Activo
              </p>
              <p v-else class="custom-font" style="color: red">Inactivo</p>
            </q-td>
          </template>

          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              <span class="custom-font">{{ props.pageIndex + 1 }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-Nombre1="props">
            <q-td :props="props">
              <span class="custom-font">{{ props.row.Nombre }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-Codigo1="props">
            <q-td :props="props">
              <span class="custom-font">{{ props.row.Codigo }}</span>
            </q-td>
          </template>
        </q-table>
      </div>

      <q-dialog v-model="AbrirModal" persistent>
        <q-card style="min-width: 400px; margin-top: 0">
          <div class="text">
            {{ p == true ? "Editar Ficha" : "Agregar Ficha" }}
          </div>
          <q-card-section class="q-pt-none">
            <q-input color="green-8" v-model="codigo" label="Código" :rules="[
              (val) => (val && val.length > 0) || 'El código es obligatorio']"/>
            <q-input color="green-8" v-model="nombre" label="Nombre"  :rules="[
              (val) => (val && val.length > 0) || 'El nombre es obligatorio']"/>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" @click="p = false" color="red" v-close-popup />
            <q-btn :loading="useFicha.loading" label="Enviar" color="green" @click="CrearFicha()">
              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { UseFichaStore } from "../Stores/fichas";
import { Notify } from "quasar";
import { UseUsuarioStore } from "../Stores/usuario";

let inf = ref("");
let AbrirModal = ref(false);
let codigo = ref("");
let nombre = ref("");
let p = ref(false);
let id = ref("");
let loading = ref({});

// Guardar valores originales para comparación
let originalCodigo = ref("");
let originalNombre = ref("");

const useFicha = UseFichaStore();
const UseUsuario = UseUsuarioStore()
const rows = ref([]);
// ficha
onBeforeMount(() => {
  traer();
});

async function traer() {
  let res = await useFicha.listarFicha();
  rows.value = res.data;
}



function limpiarCampos() {
  nombre.value = "";
  codigo.value = "";
  originalNombre.value = "";
  originalCodigo.value = "";
}

async function Abrir(row) {
  AbrirModal.value = true;
  p.value = true;
  codigo.value = row.Codigo;
  nombre.value = row.Nombre;
  id.value = row._id;

  originalCodigo.value = row.Codigo;
  originalNombre.value = row.Nombre;
}

function AbrirCrear() {
  limpiarCampos();   // Limpiar campos antes de abrir el modal
  AbrirModal.value = true;
  p.value = false;   // Indica que es un nuevo registro, no una edición
}


async function CrearFicha() {
  const trimmedNombre = nombre.value.trim();
  const trimmedCodigo = codigo.value.trim();

  // Validar que no haya solo espacios
  const noSpacesRegex = /^\S+$/;

  if (!trimmedNombre || !trimmedCodigo) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden estar vacíos",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  // Verificar que no haya espacios intermedios
  if (/\s/.test(codigo.value)) {
    Notify.create({
      color: "negative",
      message: "El código no puede contener espacios en blanco",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  if (
    p.value &&
    nombre.value === originalNombre.value &&
    codigo.value === originalCodigo.value
  ) {
    Notify.create({
      color: "warning",
      message: "No se hicieron cambios",
      icon: "info",
      timeout: 2500,
    });
    return; // No cerramos el modal y mostramos el mensaje
  }

  let res;
  if (p.value === true) {
    // Editar ficha
    res = await useFicha.EditarFicha(id.value, trimmedNombre, trimmedCodigo);
  } else {
    // Crear nueva ficha
    res = await useFicha.crearFicha(trimmedNombre, trimmedCodigo);
  }

  // Verificar el estado de la respuesta
  if (res && res.status === 200) {
    await traer(); // Refrescar los datos
    AbrirModal.value = false; // Cerrar modal en caso de éxito
    p.value = false;
    limpiarCampos(); // Limpiar campos
  } else {
    AbrirModal.value = true; // Mantener modal abierto en caso de error
  }
}

async function Activar(id) {
  console.log(id);
  loading.value[id] = true;
  try {
    inf = await axios.put(
      `https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/Activar/${id}`, {}, {
            headers: {
                "x-token": UseUsuario.xtoken // Colocar el token correctamente
            }
        }
    );
    Notify.create({
      color: "positive",
      message: "La ficha ha sido activada exitosamente",
      icon: "check_circle",
      timeout: 2500,
    });
    traer();
  } catch (error) {
    console.log(error);
    Notify.create({
      color: "negative",
      message: "Error al activar la ficha",
      icon: "error",
      timeout: 2500,
    });
  } finally {
    loading.value[id] = false;
  }
}

async function Desactivar(id) {
  console.log(id);
  loading.value[id] = true;
  try {
    inf = await axios.put(
      `https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/Desactivar/${id}`, {}, {
            headers: {
                "x-token": UseUsuario.xtoken // Colocar el token correctamente
            }
        }
    );
    Notify.create({
      color: "positive",
      message: "La ficha ha sido inactivada exitosamente",
      icon: "check_circle",
      timeout: 2500,
    });
    traer();
  } catch (error) {
    console.log(error);
    Notify.create({
      color: "negative",
      message: "Error al inactivar la ficha",
      icon: "error",
      timeout: 2500,
    });
  } finally {
    loading.value[id] = false;
  }
}

const columns = ref([
  { name: "Numero", align: "center", label: "N°", field: "Numero" },
  {
    name: "Nombre1",
    required: true,
    label: "Ficha",
    align: "center",
    field: "Nombre",
    sortable: true,
  },
  {
    name: "Codigo1",
    align: "center",
    label: "Numero",
    field: "Codigo",
    sortable: true,
  },
  { name: "Estado1", label: "Estado", field: "Estado", sortable: true },
  { name: "opciones", label: "Opciones", align: "center" },
]);
</script>

<style>
* {
  margin: 0%;
  font-family: "Roboto", Arial, sans-serif;
}

.container {
  width: 90%;
  margin: 0 auto;
}

.titleFirst {
  /* margin: 15px ; */
  display: flex;
  justify-content: center;
  font-family: "Roboto", Arial, sans-serif;
}

.divider {
  width: 100%;
  border: 2px solid rgb(53, 164, 81);
}

.table-container {
  width: 100%;
  margin-top: 20px;
}

.q-table {
  width: 100%;
}

/* Define una clase para el estilo de la fuente y tamaño de la letra */
.custom-font {
  font-family: "Arial", sans-serif;
  /* Cambia "Arial" por la fuente que prefieras */
  font-size: 16px;
  /* Cambia a tu tamaño de letra preferido */
}

/* Estilos para los encabezados de la tabla */
.q-table th {
  background-color: rgb(81, 204, 81);
  /* Cambia esto por el color de fondo que prefieras */
  color: #333;
  /* Cambia esto por el color de texto que prefieras */
  font-size: 15px;
  /* Ajusta el tamaño de la letra */
  font-family: "Roboto", Arial, sans-serif;
  /* Cambia "Arial" por la fuente que prefieras */
  font-weight: bold;
  padding: 10px;
  /* Ajusta el padding si es necesario */
}

.q-btn {
  margin: 0 5px;
}

.q-dialog__backdrop {
  backdrop-filter: blur(5px);
  /* Ajusta el nivel de desenfoque */
  background-color: rgba(0, 0, 0, 0.5);
  /* Opcional: Ajusta la opacidad del fondo */
}
</style>
