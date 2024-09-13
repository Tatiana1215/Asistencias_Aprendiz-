<template>
  <!-- Sección de INFORMES -->
  <div class="titleFirst">
    <h3>INFORMES</h3>
    <hr class="divider" />
  </div>

  <!-- Controles de selección y búsqueda uno al lado del otro -->
  <div class="q-pa-md centered-row">
    <div class="q-gutter-md inline-flex">
      <!-- Selector de Ficha -->
      <q-select
        rounded
        filled
        v-model="model"
        :options="options"
        label="Selecciona la Ficha"
      />

      <!-- Cuadro de búsqueda de fecha única -->
      <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              anchor="center middle"
              position="top"
            >
              <q-date v-model="date" color="green">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Cerrar" color="green" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      date: ref('2019/02/01')
    };
  }
};
</script>

<style scoped>
.titleFirst {
  margin: 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Roboto", Arial, sans-serif;
}

.divider {
  width: 80%;
  border: 2px solid rgb(53, 164, 81);
}

.centered-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inline-flex {
  display: inline-flex;
  gap: 20px; /* Espacio entre los seleccionadores */
}

.q-popup-proxy {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
