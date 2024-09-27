<template>
  <div id="home">
    <q-layout view="hHh lpR fFf">
      <q-header
        elevated
        class="bg-darkgreen text-white"
        style="background-color: green"
        height-hint="98"
      >
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

          <q-toolbar-title> REPFORA </q-toolbar-title>
          <q-btn to="/Login" icon="exit_to_app" label="Salir" @click="salir" />
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <div class="cuadroDespliegue">
          <div class="avatarFondo">
            <q-avatar size="140px" style="border-radius: 40%">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <h6>{{ useUsuario.usuario.Nombre }}</h6>
            <P>{{ useUsuario.usuario.Email }}</P>
          </div>

          <div class="Botones">
            <div class="Botones">
            <q-btn id="boton" to="/Home/InicioH" rounded color="green" icon="home" label="Inicio" align="left" /> <br>
            <q-btn id="boton" to="/Home/Bitacora" rounded color="green" icon="event" label="Bitacora" align="left" /> <br>
            <q-btn id="boton" to="/Home/Ficha" rounded color="green" icon="school" label="Ficha" align="left" /> <br>
            <q-btn id="boton" to="/Home/Aprendiz" rounded color="green" icon="book" label="Aprendiz" align="left" /> <br>
            <q-btn id="boton" to="/Home/Usuario" rounded color="green" icon="person" label="Usuario" align="left" /> <br>
            <q-btn id="boton" to="/Home/Informes" rounded color="green" icon="description" label="Informes" align="left" /> <br>
          </div>

          </div>

        </div>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UseUsuarioStore } from "../Stores/usuario";

import { useRoute } from "vue-router";

let router = useRoute();
const leftDrawerOpen = ref(false);
const nombreAdministrador = ref("");
const useUsuario = UseUsuarioStore();
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function salir() {
  router.push("/Login");
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.InicioSecion {
  display: flex;
  justify-content: center;
  width: 100%;
}

.cuadroDespliegue {
  display: grid;
  justify-items: center;
}

.Botones {
  display: grid;
  width: 100%;
  margin-top: 5%;
}

#boton {
  width: 80%;
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
}

.text-left {
  text-align: left;
}


.dialogRegistrar {
  margin-top: 0;
}

.avatarFondo {
  display: grid;
  background-image: url(https://cdn.quasar.dev/img/material.png);
  background-size: cover;
  width: 100%;
  background-repeat: no-repeat;
  color: white;
  justify-items: center;
}

.avatarFondo img {
  width: 50%;
  margin-bottom: 10px;
  /* height: 2}00px; */
  margin-top: 30px;
}

.avatarFondo h6 {
  font-weight: 900;
}

.avatarFondo p {
  width: 80%;
  word-wrap: break-word;
  /* Alternativamente usa overflow-wrap */
  text-align: center;
}
</style>