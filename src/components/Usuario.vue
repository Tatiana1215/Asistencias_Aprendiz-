<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Usuarios</h3>
    </div>
    <hr class="divider" />
    <div class="q-pa-md">
      <q-btn class="btnA" label="Crear" icon="add_circle" color="green" @click="AbrirModal2 = true" />
      <q-dialog v-model="AbrirModal2">
        <q-card class="dialogRegistrar" style="min-width: 400px; margin: 0;">
          <div class="text">
            {{ "Agregar Usuario" }}
          </div>
          <q-card-section>
            <q-input color="green-8" v-model="nombre1" label="Nombre" @keyup.enter="inicioSecion = false" :rules="[
              (val) => (val && val.length > 0) || 'El nombre es  obligatorio']" />

            <q-input color="green-8" v-model="email1" label="Email" @keyup.enter="inicioSecion = false" :rules="[
              (val) => (val && val.length > 0) || 'El email es obligatorio']" />

            <q-input color="green-8" v-model="password1" label="Password" @keyup.enter="inicioSecion = false" :rules="[
              (val) => (val && val.length > 0) || 'La contraseña es obligatoria']" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="red" v-close-popup />
            <q-btn :loading="UseUsuario.loading" label="Registrar" color="green" @click="registrar()">

              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="q-pa-md">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-Opciones="props">
            <q-td :props="props">
              <q-btn round color="white" :style="(border = '2px solid green')"
                @click="Abrir(props.row), (AbrirModal = true)">
                <q-icon name="edit" style="color: green" />
              </q-btn>
              <q-btn icon="close" round color="red" @click="Activar(props.row._id)" :loading="loading[props.row._id]"
                v-if="props.row.Estado == 1" />
              <q-btn icon="check" round color="green" @click="Desactivar(props.row._id)"
                :loading="loading[props.row._id]" v-else />
            </q-td>
          </template>

          <template v-slot:body-cell-Estado="props">
            <q-td :props="props">
              <p style="color: green" v-if="props.row.Estado == 1">Activo</p>
              <p style="color: red" v-else>Inactivo</p>
            </q-td>
          </template>

          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              {{ props.pageIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </div>


      <q-dialog v-model="AbrirModal" persistent>
        <q-card style="min-width: 400px; margin: 0;">
          <div class="text">
            {{ "Editar Usuario" }}
          </div>

          <q-card-section class="q-pt-none">
            <q-input color="green-8" v-model="nombre" placeholder=" Nombre" :rules="[
              (val) => (val && val.length > 0) || 'El nombre es obligatorio']" />
            <q-input color="green-8" v-model="email" label="Email" :rules="[
              (val) => (val && val.length > 0) || 'El email obligatorio']" />

          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" @click="p = false" color="red" v-close-popup />

            <q-btn label="Enviar" :loading="UseUsuario.loading" color="green"
              @click="EditarUsuario()">
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
import { UseUsuarioStore } from "../Stores/usuario";
import { Notify } from "quasar";

// Guardar valores originales para comparación
let originalNombre = ref("");
let originalEmail = ref("");

let res = ref("");
let id = ref("");
let nombre = ref("");
let email = ref("");
let AbrirModal = ref(false);
let AbrirModal2 = ref(false);
let nombre1 = ref("");
let email1 = ref("");
let password1 = ref("");
let loading = ref({})

const UseUsuario = UseUsuarioStore();

onBeforeMount(() => {
  traer();
});

async function traer() {
  res.value = await UseUsuario.listarUsuarios();
  rows.value = res.value.data;
}

async function Abrir(row) {
  AbrirModal.value = true;
  nombre.value = row.Nombre;
  email.value = row.Email;
  id.value = row._id;

  // Guardar valores originales
  originalNombre.value = row.Nombre;
  originalEmail.value = row.Email;
}
function limpiarCampos() {
  (nombre.value = ""), (email.value = ""), (originalNombre.value = "");
  originalEmail.value = "";
}



async function EditarUsuario() {
  // Verificar si se realizaron cambios
  if (
    nombre.value === originalNombre.value &&
    email.value === originalEmail.value
  ) {
    AbrirModal.value = true;
    Notify.create({
      color: "warning",
      message: "No se hicieron cambios",
      icon: "info",
      timeout: 2500,
    });

    return;
  }

  const trimNombre = nombre.value.trim();
  const trimEmail = email.value.trim();

  // Regex para evitar cualquier espacio dentro de los campos
  const noSpacesRegex = /^[^\s]+$/;

  // Verificar si los campos están vacíos
  if (!trimNombre || !trimEmail) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden estar vacíos",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  // Verificar si los campos contienen espacios
  if (
    !noSpacesRegex.test(trimEmail)) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden contener espacios en blanco",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  const res = await UseUsuario.actualizarUsuario(
    id.value,
    nombre.value,
    email.value
  );
  if (res && res.status === 200) {
    AbrirModal.value = false;
    limpiarCampos();
    await traer();
  } else {
    AbrirModal.value = true;
  }
}

function limpiarCampos2() {
  (nombre1.value = ""), (email1.value = "");
  password1.value = "";
}




//Registro de usuario


async function registrar() {
  const trimEmail = email1.value.trim();
  const trimPassword = password1.value.trim();

  // Regex para evitar cualquier espacio dentro de los campos
  const noSpacesRegex = /^[^\s]+$/;

  // Verificar si los campos están vacíos
  if (!trimEmail || !trimPassword) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden estar vacíos",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  // Verificar si los campos contienen espacios
  if (
    !noSpacesRegex.test(trimEmail) ||
    !noSpacesRegex.test(trimPassword)
  ) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden contener espacios en blanco",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  // Proceder con el registro del usuario
  let registroUsuario = await UseUsuario.registrar(
    nombre1.value, // Usar los valores ya recortados
    email1.value,
    password1.value
  );

  if (registroUsuario && registroUsuario.status === 200) {
    console.log("Registro exitoso"); // Mensaje de depuración
    AbrirModal2.value = false; // Cerrar el modal
    limpiarCampos2(); // Limpiar campos tras un registro exitoso
    await traer(); // Actualizar la lista de usuarios
  } else {
    console.log("Error en el registro"); // Mensaje de depuración
    Notify.create({
      color: "negative",
      message: "Error al registrar usuario",
      icon: "error",
      timeout: 2500,
    });
    AbrirModal2.value = true;
  }
}
// async function registrar() {
//   const trimEmail = email1.value.trim();
//   const trimPassword = password1.value.trim();

//   // Regex para evitar cualquier espacio dentro de los campos
//   const noSpacesRegex = /^[^\s]+$/;

//   // Verificar si los campos están vacíos
//   if (!trimEmail || !trimPassword) {
//     Notify.create({
//       color: "negative",
//       message: "Los campos no pueden estar vacíos",
//       icon: "error",
//       timeout: 2500,
//     });
//     return;
//   }

//   // Verificar si los campos contienen espacios
//   if (
//     !noSpacesRegex.test(trimEmail) ||
//     !noSpacesRegex.test(trimPassword)
//   ) {
//     Notify.create({
//       color: "negative",
//       message: "Los campos no pueden contener espacios en blanco",
//       icon: "error",
//       timeout: 2500,
//     });
//     return;
//   }

//   // Proceder con el registro del usuario
//   let registroUsuario = await UseUsuario.registrar(
//     nombre1.value, // Usar los valores ya recortados
//     email1.value,
//     password1.value
//   );

//   if (registroUsuario && registroUsuario.status === 200) {
//     AbrirModal2.value = false;
//     limpiarCampos2(); // Limpiar campos tras un registro exitoso
//     await traer(); // Actualizar la lista de usuarios
//   } else {
//     AbrirModal2.value = true;
//   }
// }

//Registro de usuario
// async function registrar() {
//   let registroUsuario = await UseUsuario.registrar(
//     nombre1.value,
//     email1.value,
//     password1.value
//   );
//   if (registroUsuario && registroUsuario.status === 200) {
//     AbrirModal2.value = false
//     limpiarCampos2()
//     await traer()
//   } else {
//     AbrirModal2.value = true
//   }
// }


const rows = ref([]);
const columns = ref([
  {
    name: "Numero",
    align: "center",
    label: "N°",
    field: "Numero",
    sortable: true,
  },
  {
    name: "Nombre",
    align: "center",
    label: "Usuario",
    field: "Nombre",
    sortable: true,
  },
  {
    name: "Email",
    label: "Email",
    align: "center",
    field: "Email",
    sortable: true,
  },
  {
    name: "Estado",
    label: "Estado",
    align: "center",
    field: "Estado",
    sortable: true,
  },
  { name: "Opciones", label: "Opciones", align: "center" },
]);

async function Activar(id) {
  loading.value[id] = true
  try {
    await axios.put(`
      https://aprendices-asistencia-bd-3.onrender.com/api/Usuario/Desactivar/${id}`, {},
      {
        headers: {
          "x-token": UseUsuario.xtoken,
        },
      }
    );
    Notify.create({
      color: 'positive',
      message: 'El Usuario ha sido inactivo exitosamente',
      icon: 'check_circle',
      timeout: 2500
    })
    await traer();
  } catch (error) {
    console.log(error.message);
    Notify.create({
      color: 'negative',
      message: 'Error al inactivo usuario',
      icon: 'error',
      timeout: 2500
    })
  } finally {
    loading.value[id] = false
  }
}

async function Desactivar(id) {
  loading.value[id] = true
  try {
    await axios.put(
      ` https://aprendices-asistencia-bd-3.onrender.com/api/Usuario/Activar/${id}`, {},
      {
        headers: {
          "x-token": UseUsuario.xtoken,
        },
      }
    );
    Notify.create({
      color: 'positive',
      message: 'El Usuario ha sido Activo exitosamente',
      icon: 'check_circle',
      timeout: 2500
    })
    await traer();
  } catch (error) {
    console.log(error);
    Notify.create({
      color: 'negative',
      message: 'Error al Activo usuario',
      icon: 'error',
      timeout: 2500
    })
  } finally {
    loading.value[id] = false
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style> 
