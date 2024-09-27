<template>
  <div class="main-container">
    <div class="box">
      <h2>Registro de Llegada</h2>
      <form @submit.prevent="registrarLlegada">
        <label for="Aprendiz">Número de Documento:</label>
        <input v-model="Aprendiz" type="text" id="documento" required />

        <q-btn :loading="UseBitacora.loading" color="green" @click="registrarLlegada()">
        Registrar
        <template v-slot:loading>
          <q-spinner color="white" size="1em" />
        </template>
        </q-btn>

        <!-- <button type="submit" class="btn">Registrar Llegada</button> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar';
// import { UseBitacoraStore } from '../Stores/bitacoras';
import { UseBitacoraStore } from '../Stores/bitacoras';
import { useRoute } from 'vue-router';


const UseBitacora = UseBitacoraStore()
let Aprendiz = ref('')



async function registrarLlegada() {
  let res = await UseBitacora.registrarAprendiz(
    Aprendiz.value
  );
  if ( res && res.status == 200){
    Aprendiz.value = ""
  }
  // traer()
}

</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.btn:hover {
  background-color: #45a049;
}
</style>