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
  data() {
    return {
      hoverIndex: null // Controla el índice de la tarjeta que está siendo "hovered"
    };
  },
  methods: {
    hoverCard(index, isHovering) {
      this.hoverIndex = isHovering ? index : null; // Cambia el índice solo cuando el mouse está encima
    },
    redireccionar() {
      // Funcionalidad de redirección
    }
  }
};
</script>

<style>
.Container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  justify-items: center;
  margin-top: 40px; 
}

@media (min-width: 1200px) {
  .Container {
    grid-template-columns: repeat(3, 1fr); 
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .Container {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 767px) {
  .Container {
    grid-template-columns: 1fr; 
  }
<style >
*{
  margin: 0;
  padding: 0;
  box-sizing: 0;
}

.my-card {
  width: 100%;
}

.my-card-image {
  width: 100%;
  max-height: 170px;
  object-fit: cover;
}

.my-card {
  max-width: 480px; 
  margin: 15px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.my-card:hover {
  transform: scale(1.05);
}

.text-center {
  text-align: center;
}
</style>
