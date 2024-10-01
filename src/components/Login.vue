<template>
  <div id="login">
    <div class="contenedor">
      <!-- Sección izquierda con la imagen -->
      <div class="imagen-secure">
        <img src="imagenes/inicio.webp" alt="" />
      </div>

      <!-- Sección derecha con el formulario de login -->
      <div class="InicioSecion">
        <q-card class="custom-card">
          <!-- Título centrado -->
          <div class="titulo">
            {{ "Iniciar sesión" }}
          </div>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="email" placeholder="Correo electrónico" autofocus color="green" class="custom-input"
              @keyup.enter="secionIniciada" />
            <br />
            <q-input dense v-model="password" placeholder="Contraseña" autofocus color="green" :type="passwordFieldType"
              class="custom-input" @keyup.enter="secionIniciada">
              <template v-slot:append>
                <q-icon :name="passwordVisible ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility"
                  class="cursor-pointer" />
              </template>
            </q-input>
          </q-card-section>

          <!-- Botón de Iniciar Sesión centrado -->
          <q-card-actions align="center" class="text-primary">
            <q-btn :loading="useUsuario.loading" class="custom-btn" @click="secionIniciada">
              Iniciar sesión
            </q-btn>
          </q-card-actions>

          <!-- Olvidé mi contraseña centrado -->
          <div class="centrado">
            <router-link to="/OlvidoContrasena">
              <a href="/OlvidoContrasena" class="contraseñaRecuperar">
                Olvidé mi contraseña
              </a>
            </router-link>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UseUsuarioStore } from "../Stores/usuario";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const passwordVisible = ref(false);
const passwordFieldType = ref("password");

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
  passwordFieldType.value = passwordVisible.value ? "text" : "password";
}

const useUsuario = UseUsuarioStore();
const router = useRouter(); // Asegúrate de agregar esta línea

async function secionIniciada() {
  let res = await useUsuario.Login(email.value, password.value);
  if (res && res.status === 200) {
    router.push("/Home"); // Redirige a la ruta correcta
  } else {
    // Manejo de errores, puedes mostrar un mensaje al usuario aquí
    console.error("Error en el inicio de sesión:", res);
  }
}
</script>

<style>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}

.contenedor {
  display: flex;
  width: 80%;
  height: 60%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  overflow: hidden;
  /* Asegura que el contenido no sobresalga */
}

.imagen-secure {
  flex: 1;
  /* Ocupa 50% del espacio */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0ffe0;
}

.imagen-secure img {
  width: 100%;
  height: auto;
  /* Ajusta la altura automáticamente */
  object-fit: cover;
  /* Asegura que la imagen cubra el área sin deformarse */
}

.InicioSecion {
  flex: 1;
  /* Ocupa 50% del espacio */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
}


.custom-card {
  width: 100%;
  border-radius: 15px;
}

.titulo {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.custom-input input {
  border-radius: 10px;
  border: 1px solid #6fcc72;
}

.custom-btn {
  background-color: #6fcc72;
  color: white;
  width: 100%;
  height: 45px;
  border-radius: 10px;
}

.contraseñaRecuperar {
  color: #008000;
  margin-top: 15px;
  text-align: center;
}

.centrado {
  text-align: center;
  margin-top: 15px;
}
</style>
