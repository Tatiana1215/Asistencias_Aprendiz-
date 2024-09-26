<template>
  <div class="Container">
    <q-card 
      class="my-card" 
      flat 
      bordered 
      @mouseover="hoverCard(0, true)" 
      @mouseleave="hoverCard(0, false)"
      :style="{ backgroundColor: hoverIndex === 0 ?  '#edffed' : '#ffffff' }"
    >
      <q-img 
        src="imagenes/Bitacora.jpeg" 
        alt="Imagen" 
        style="height: 180px;" 
      />
      <q-card-section class="text-center">
        <div class="text-h6">BITACORA</div>
        <div class="text-subtitle2"></div> <!-- Descripción agregada -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Bitacora'
        />
      </q-card-actions>
    </q-card>

    <q-card 
      class="my-card" 
      flat 
      bordered 
      @mouseover="hoverCard(1, true)" 
      @mouseleave="hoverCard(1, false)"
      :style="{ backgroundColor: hoverIndex === 1 ? '#edffed' : '#ffffff'}"
    >
      <q-img 
        src="imagenes/fichas.jpeg" 
        alt="Imagen" 
        style="height: 180px;" 
      />
      <q-card-section class="text-center">
        <div class="text-h6">FICHA</div>
        <div class="text-subtitle2"></div> <!-- Descripción agregada -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Ficha'
        />
      </q-card-actions>
    </q-card>

    <q-card 
      class="my-card" 
      flat 
      bordered 
      @mouseover="hoverCard(2, true)" 
      @mouseleave="hoverCard(2, false)"
      :style="{ backgroundColor: hoverIndex === 2 ? '#edffed' : '#ffffff'}"
    >
      <q-img 
        src="imagenes/Aprendiz.jpeg" 
        alt="Imagen" 
        style="height: 180px;" 
      />
      <q-card-section class="text-center">
        <div class="text-h6">APRENDIZ</div>
        <div class="text-subtitle2"></div> <!-- Descripción agregada -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Apredice'
        />
      </q-card-actions>
    </q-card>

    <q-card 
      class="my-card" 
      flat 
      bordered 
      @mouseover="hoverCard(3, true)" 
      @mouseleave="hoverCard(3, false)"
      :style="{ backgroundColor: hoverIndex === 3 ?  '#edffed' : '#ffffff' }"
    >
      <q-img 
        src="imagenes/Usuario.jpeg" 
        alt="Imagen" 
        style="height: 180px;" 
      />
      <q-card-section class="text-center">
        <div class="text-h6">USUARIO</div>
        <div class="text-subtitle2"></div> <!-- Descripción agregada -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Usuario'
        />
      </q-card-actions>
    </q-card>

    <q-card 
      class="my-card" 
      flat 
      bordered 
      @mouseover="hoverCard(4, true)" 
      @mouseleave="hoverCard(4, false)"
      :style="{ backgroundColor: hoverIndex === 4 ? '#edffed' : '#ffffff' }"
    >
      <q-img 
        src="imagenes/Informes.webp" 
        alt="Imagen" 
        style="height: 180px;" 
      />
      <q-card-section class="text-center">
        <div class="text-h6">INFORMES</div>
        <div class="text-subtitle2"></div> <!-- Descripción agregada -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Informes'
        />
      </q-card-actions>
    </q-card>
  </div>
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
