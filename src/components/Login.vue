<template>
  <div id="login">
    <div class="InicioSecion">
      <div class="q-pa-md ">
        <q-card style="min-width: 350px">
        <q-card-section>
            <div class="iconoAprendiz">
              <img src="https://cdn-icons-png.flaticon.com/512/73/73199.png" alt="" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="email" placeholder="Email" autofocus color="green"
              @keyup.enter="inicioSecion = false" />
            <br />
            <q-input dense v-model="password" placeholder="Password" autofocus color="green"
              @keyup.enter="inicioSecion = false" />
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn :loading="useUsuario.loading" color="green" @click="secionIniciada()">
              Inicio de sesion
              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>



            <router-link to="/OlvidoContrasena">
              <a href="/OlvidoContrasena" class="contraseñaRecuperar">Olvidé mi contraseña</a></router-link>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
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

const useUsuario = UseUsuarioStore();


async function secionIniciada() {
  let res = await useUsuario.Login(email.value, password.value);
  if (res && res.status === 200) {
    Usuario.value = true;
    router.push("/Home");
  }
}
</script>


<style>
#login {
  display: flex;
  justify-content: center;
  width: 100%;
  background-image: url("https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/04/03/660d5b9fc3744.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.InicioSecion {
  display: flex;
  justify-content: center;
  align-items: center;
}

.registrar {
  width: 100%;
}

.contraseñaRecuperar {
  color: #008000;
}

.q-card {
  width: 350px;
}
</style>
