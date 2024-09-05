<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg q-mb-md justify-center">
      <div class="col-xs-12 col-sm-6">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">
            BITACORA
          </q-card-section>
          <q-card-section class="text-center">
            <img src="imagenes/Bitacora.jpeg" alt="Bitacora" class="my-card-image">
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="VER" to="/Home/Bitacora" color="green" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">
            FICHA
          </q-card-section>
          <q-card-section class="text-center">
            <img src="imagenes/fichas.jpeg" alt="Fichas" class="my-card-image">
          </q-card-section>
          <q-card-actions align="center">
            <router-link to="/Home/Ficha"><q-btn flat label="VER" color="green" /></router-link>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">
            APRENDIZ
          </q-card-section>
          <q-card-section class="text-center">
            <img src="imagenes/Aprendiz.jpeg" alt="Aprendiz" class="my-card-image">
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="VER" to="/Home/Aprendiz" color="green" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">
            USUARIO
          </q-card-section>
          <q-card-section class="text-center">
            <img src="imagenes/Usuario.jpeg" alt="Usuario" class="my-card-image">
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="VER" to="/Home/Usuario" color="green" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">
            INFORMES
          </q-card-section>
          <q-card-section class="text-center">
            <img src="imagenes/Usuario.jpeg" alt="Usuario" class="my-card-image">
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="VER" to="/Home/Informes" color="green" />
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
.my-card {
  width: 100%;
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

.row {
  margin: 0;
}
</style>
