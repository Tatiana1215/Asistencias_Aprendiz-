<template>
    <q-page class="q-pa-md">
      <div class="row q-col-gutter-xs q-mb-md">
  
        <div class="col-xs-6">
          <q-card class="my-card">
            <q-card-section class="text-center bg-green text-white">
              BITACORA
            </q-card-section>
            <q-card-section class="text-center">
              <img src="imagenes/Bitacora.jpeg" alt="Bitacora" class="my-card-image">
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat label="VER" to="/Bitacora" color="green" />
            </q-card-actions>
          </q-card>
        </div>
  
        <div class="col-xs-6">
          <q-card class="my-card">
            <q-card-section class="text-center bg-green text-white">
              FICHA
            </q-card-section>
            <q-card-section class="text-center">
              <img src="imagenes/fichas.jpeg" alt="Fichas" class="my-card-image">
            </q-card-section>
            <q-card-actions align="center">
              <router-link to="/Home/Ficha" ><q-btn flat label="VER"  color="green" /></router-link>
              
            </q-card-actions>
          </q-card>
        </div>
  
        <div class="col-xs-6">
          <q-card class="my-card">
            <q-card-section class="text-center bg-green text-white">
              APRENDIZ
            </q-card-section>
            <q-card-section class="text-center">
              <img src="imagenes/Aprendiz.jpeg" alt="Aprendiz" class="my-card-image">
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat label="VER" to="/Aprendiz" color="green" />
            </q-card-actions>
          </q-card>
        </div>
  
        <div class="col-xs-6">
          <q-card class="my-card">
            <q-card-section class="text-center bg-green text-white">
              USUARIO
            </q-card-section>
            <q-card-section class="text-center">
              <img src="imagenes/Usuario.jpeg" alt="Usuario" class="my-card-image">
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat label="VER" to="/Usuario" color="green" />
            </q-card-actions>
          </q-card>
        </div>
  
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'MyCards'
  }
  </script>
  
  <style scoped>
  *{
      margin: 0%;
  }
  .col-xs-6{
  display: grid;
  place-items: center;
  }
  
  .my-card {
    width: 60%;
    
  }
  
  .my-card-image {
    width: 100%;
    max-height: 170px;
    object-fit: cover;
  }
  
  .bg-green {
    background-color: #4caf50; /* Color verde */
  }
  
  .text-white {
    color: white;
  }
  </style>
  