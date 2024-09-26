<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Usuarios</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md">
      <q-btn class="btnA" label="Crear" icon="add_circle" color="green" @click="AbrirModal2 = true" />
      <q-dialog v-model="AbrirModal2" >
        <q-card class="dialogRegistrar">
          <div class="text">
            {{  "Agregar Ficha" }}
          </div>
          <q-card-section>
            <q-input dense v-model="nombre1" placeholder="Nombre" autofocus color="green"
              @keyup.enter="inicioSecion = false" />
            <br />
            <q-input dense v-model="email1" placeholder="Email" autofocus color="green"
              @keyup.enter="inicioSecion = false" />
            <br />
            <q-input dense v-model="password1" placeholder="Password" autofocus color="green"
              @keyup.enter="inicioSecion = false" />
            <br />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn :loading="UseUsuario.loading" color="green" @click="registrar()">
              Registar
              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>
            <q-btn flat label="Close" color="red" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
 


      <div class="q-pa-md">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-Opciones="props">
            <q-td :props="props">
              <q-btn round color="white" :style=" border = '2px solid green' "
                @click="Abrir(props.row), AbrirModal = true">
                <q-icon name="edit" style="color: green" />
              </q-btn>
              <q-btn icon="close" round color="red"  :loading="loading[props.row._id]" @click="Desactivar(props.row._id)" v-if="props.row.Estado == 1" />
              <q-btn icon="check" round color="green" :loading="loading[props.row._id]" @click="Activar(props.row._id)" v-else />
              <q-btn icon="delete" round color="red" @click="Eliminar(props.row._id)" />
            </q-td>
          </template>

          <template v-slot:body-cell-Estado="props">
            <q-td :props="props">
              <p style="color: green;" v-if="props.row.Estado == 1">Activo</p>
              <p style="color: red;" v-else>Inactivo</p>
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
        <q-card style="min-width: 350px; margin-top: 0">
          <div class="text">
            {{ "Editar Ficha"  }}
          </div>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="email" placeholder="Editar" autofocus color="green" @keyup.enter="prompt = false" />
            <br />

            <q-input dense v-model="nombre" placeholder=" Nombre" autofocus color="green"
              @keyup.enter="prompt = false" />
            <br />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" @click="p = false" color="red" v-close-popup />

            <q-btn label="Enviar" :loading="UseUsuario.loading"  color="green" @click="EditarUsuario()">
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { UseUsuarioStore } from '../Stores/usuario';
import { Notify } from 'quasar';

// Guardar valores originales para comparación
let originalNombre = ref('');
let originalEmail = ref('');


let res = ref('')
let id = ref('')
let nombre = ref('')
let email = ref('')
let AbrirModal = ref(false)
let AbrirModal2 = ref(false)
let nombre1 = ref("");
let email1 = ref("");
let password1 = ref("");
let loading = ref({})
const UseUsuario = UseUsuarioStore()


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
  nombre.value = "",
  email.value = "",
  originalNombre.value = '';
  originalEmail.value = '';
}
async function EditarUsuario() {
  // Verificar si se realizaron cambios
  if (nombre.value === originalNombre.value && email.value === originalEmail.value) {
    alert('No se hizo ningún cambio.');
    AbrirModal.value = false;
    return;
  }

  const res = await UseUsuario.actualizarUsuario(id.value, nombre.value, email.value);
  if (res) {
    AbrirModal.value = false;
    limpiarCampos();
    await traer();
  } else {
    AbrirModal.value = true;
  }
}





// async function Abrir(row) {
//   console.log("Abrir:", row);
//   AbrirModal.value = true
//   nombre.value = row.Nombre
//   email.value = row.Email
//   id.value = row._id;
// }


function limpiarCampos2() {
  (nombre1.value = ""), (email1.value = "");
  password1.value = "";
}

//Registro de usuario
async function registrar() {
  let registroUsuario = await UseUsuario.registrar(
    nombre1.value,
    email1.value,
    password1.value
  );
  if (registroUsuario && registroUsuario.status == 200) {
    AbrirModal2.value = false
    limpiarCampos2()
    await traer()
  } else {
    AbrirModal2.value = true
  }
}


const rows = ref([]);
const columns = ref([
  { name: 'Numero', align: 'center', label: 'N°', field: 'Numero', sortable: true },
  { name: 'Nombre', align: 'center', label: 'Usuario', field: 'Nombre', sortable: true },
  { name: 'Email', label: 'Email', field: 'Email', sortable: true },
  { name: 'Estado', label: 'Estado', field: 'Estado', sortable: true },
  { name: 'Opciones', label: 'Opciones' },
]);

async function Activar(id) {
  loading.value[id] = true
  try {
    await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Usuario/Activar/${id}`, {
      headers: {
        'x-token': UseUsuario.xtoken,
      },
    });
    Notify.create({
      color: 'positive',
      message: 'El usuario ha sido activado exitosamente',
      icon: 'check_circle',
      timeout: 2500
    })
    await traer();
  } catch (error) {
    console.log(error.message);
    Notify.create({
      color: 'negative',
      message: 'Error al activar usuario',
      icon: 'error',
      timeout: 2500
    })
}finally{
  loading.value[id] = false
}
}

async function Desactivar(id) {
  loading.value[id] = true
  try {
    await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Usuario/Desactivar/${id}`, {
      headers: {
        'x-token': UseUsuario.xtoken,
      },
    });
    Notify.create({
      color: 'positive',
      message: 'El usuario ha sido inactivado exitosamente',
      icon: 'check_circle',
      timeout: 2500
    })
    await traer();

}catch (error) {
    console.log(error);
    Notify.create({
      color: 'negative',
      message: 'Error al inactivar usuario',
      icon: 'error',
      timeout: 2500
    })
  }finally{
    loading.value[id] = false
  }
}



async function Eliminar(id) {
  try {

    await axios.delete(`https://aprendices-asistencia-bd-3.onrender.com/api/Usuario/Eliminar/${id}`, {
      headers: {
        'x-token': UseUsuario.xtoken,
      },
    });
    await traer();
  } catch (error) {
    console.log(error);

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

