<template>
  <div id="login">
    <div class="InicioSecion">
      <!-- <div class="q-pa-md "> -->
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="iconoAprendiz">
            <img
              src="https://cdn-icons-png.flaticon.com/512/73/73199.png"
              alt=""
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="email"
            placeholder="Email"
            autofocus
            color="green"
            @keyup.enter="inicioSecion = false"
          />
          <br />
          <q-input
            dense
            v-model="password"
            placeholder="Password"
            autofocus
            color="green"
            @keyup.enter="inicioSecion = false"
          />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn unelevated :loading="useUsuario.loading" label="Iniciar Seción" color="green" @click="secionIniciada" />
        
            <template v-slot:loading>
              <q-spinner color="white" size="1em" />
            </template>

          <div id="registro">
            <div class="q-pa-md">
              <q-btn class="registrar" label="Registrar" color="green" @click="AbrirModal = true" />

              <q-dialog v-model="AbrirModal" :backdrop-filter="backdropFilter">
                <q-card class="dialogRegistrar">
                  <q-card-section>
                    <div class="iconoAprendiz">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/72/72648.png"
                        alt=""
                      />
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-input
                      dense
                      v-model="nombre1"
                      placeholder="Nombre"
                      autofocus
                      color="green"
                      @keyup.enter="inicioSecion = false"
                    />
                    <br />
                    <q-input
                      dense
                      v-model="email1"
                      placeholder="Email"
                      autofocus
                      color="green"
                      @keyup.enter="inicioSecion = false"
                    />
                    <br />
                    <q-input
                      dense
                      v-model="password1"
                      placeholder="Password"
                      autofocus
                      color="green"
                      @keyup.enter="inicioSecion = false"
                    />
                    <br />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      :loading="useUsuario.loading"
                      color="green"
                      @click="registrar()"
                    >
                      Registar
                      <template v-slot:loading>
                        <q-spinner color="white" size="1em" />
                      </template>
                    </q-btn>
                    <q-btn flat label="Close" color="red" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>

          <router-link to="/OlvidoContrasena">
            <a href="/OlvidoContrasena" class="contraseñaRecuperar"
              >Olvidé mi contraseña</a
            ></router-link
          >
        </q-card-actions>
      </q-card>
    </div>
  </div>

  <!-- </div> -->
</template>


<script setup>
import { ref } from "vue";
import { UseUsuarioStore } from "../Stores/usuario";
import { useRouter } from "vue-router";

let inicioSecion = ref(false);
let respuesta = ref("");
let Usuario = ref(false);
let router = useRouter();

// Usuario
let email = ref("");
let password = ref("");
let inicio = ref(true);

// Rrgistro
let nombre1 = ref("");
let email1 = ref("");
let password1 = ref("");

const useUsuario = UseUsuarioStore();

const list = ["REGISTRAR"];

const dialog = ref(false);
const backdropFilter = ref(null);

const backdropFilterList = list.map((filter) => ({
  label: filter,
  onClick: () => {
    backdropFilter.value = filter;
    dialog.value = true;
  },
}));

/* //Registro de usuario
async function registrar() {
  let registroUsuario = await useUsuario.registrar(
    nombre1.value,
    email1.value,
    password1.value
  );
  if (registroUsuario) {
    (nombre1.value = ""), (email1.value = "");
    password1.value = "";
  } */

const AbrirModal = ref(false);

function limpiarCampos() {
  (nombre1.value = ""), (email1.value = "");
  password1.value = "";
}

//Registro de usuario
async function registrar() {
  let registroUsuario = await useUsuario.registrar(
    nombre1.value,
    email1.value,
    password1.value
  );
  // Si la respuesta indica un error de validación
  if (!registroUsuario) {
    // Aquí podrías manejar los errores específicos si es necesario
    AbrirModal.value = true; // Mantiene el modal abierto
    return;
  }
  AbrirModal.value = false; // Cierra el modal si el registro es exitoso
  limpiarCampos();
}

/*  respuesta = await useUsuario.Login(email.value, password.value);
  if (respuesta) {
    Usuario.value = true;
    inicio.value = false;
    router.push("/Home"); */

async function secionIniciada() {
  let res = await useUsuario.Login(email.value, password.value);
  if (res) {
    Usuario.value = true;
    router.push("/Home");
  }
}
</script>


<style>
#login {
  justify-content: center;
  width: 100%;
  background-image: url("https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/04/03/660d5b9fc3744.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.InicioSecion {
  display: grid;
  width: 100%;
  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
}

.registrar {
  width: 100%;
}

.contraseñaRecuperar {
  color: #008000;
}
</style>