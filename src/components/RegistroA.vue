<template>
  <div id="main-container">
    <div class="container">
      <div class="ImageRegistro">
        <img src="https://cloudfront-us-east-1.images.arcpublishing.com/elheraldoco/336H4GDLCJCLLGC7GRE4DYS4KA.jpg"
          alt="">
      </div>

      <div class="box">
        <h2>Registro de Llegada</h2>
        <form @submit.prevent="registrarLlegada">
          <!-- <input v-model="Aprendiz" id="documento" placeholder="Numero de Documento" required /> -->

          <q-input color="green-8" v-model="Aprendiz" type="text" id="documento" label="Numero de Documento" :rules="[
              (val) => (val && val.length > 0) || 'Ingrese el numero de documento'
            ]" /> <br>
            
          <q-btn :loading="UseBitacora.loading" color="green" @click="registrarLlegada()">
            Registrar
            <template v-slot:loading>
              <q-spinner color="white" size="1em" />
            </template>
          </q-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UseBitacoraStore } from '../Stores/bitacoras';
import { Notify } from 'quasar';

const UseBitacora = UseBitacoraStore()
let Aprendiz = ref('')

async function registrarLlegada() {

  const trimmedDocumento = Aprendiz.value.trim();
  // const noExcessiveSpacesRegex = /^\S+(?: \S+)*$/;
  // const noExcessiveSpacesRegex = /^\S+(?: \S+)*$/;  // No permite espacios al principio o al final, y evita espacios excesivos entre palabras.

  // if(!trimmedDocumento){
  //   Notify.create({
  //     color:'negative',
  //     message:'El campo no puede estar vacio',
  //     icon:'error',
  //     timeout: 2500
  //   })
  //   return
  // }

  // if (!noExcessiveSpacesRegex.test(trimmedDocumento)) {
  //   Notify.create({
  //     color: "negative",
  //     message: "Los campos no pueden contener espacios en blanco excesivos",
  //     icon: "error",
  //     timeout: 2500,
  //   });
  //   return;
  // }


  const noSpacesRegex = /^[^\s]+$/; // Cambiado para asegurar que no haya espacios en ningún lugar

if (!trimmedDocumento
) {
  Notify.create({
    color: "negative",
    message: "Los campos no pueden estar vacíos",
    icon: "error",
    timeout: 2500,
  });
  return;
}

// Verificar que no haya espacios intermedios
if (!noSpacesRegex.test(Aprendiz.value) ) { Notify.create({
    color: "negative",
    message: "Los campos no pueden contener espacios en blanco",
    icon: "error",
    timeout: 2500,
  });
  return;
}

  let res = await UseBitacora.registrarAprendiz(
    Aprendiz.value
  );
  if (res && res.status === 200) {
    Aprendiz.value = ""
  }
}

</script>

<style scoped>
#main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  height: 100vh;
  /* background-color: #f5f5f5; */
}

.container {
  display: flex;
  align-items: center;
  width: 50%;
  /* height: 50%; */
  width: 80%;
  /* height: 60%; */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  overflow: hidden;
}

.box {
  flex: 1;
  /* Ocupa 50% del espacio */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}


h2 {
  font-size: 30px;
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

.ImageRegistro {
  flex: 1;
  /* Ocupa 50% del espacio */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0ffe0;
}

.ImageRegistro img {
  width: 100%;
  height: auto;
  object-fit: cover;
  /* height: 100vh; */

}
</style>