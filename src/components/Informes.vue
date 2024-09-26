<template>

    <div class="titleFirst">
      <h3>INFORMES</h3>
      <hr class="divider" />
    </div>

    <div class="q-pa-md centered-row">
      <div class="q-gutter-md inline-flex">
        <q-select
          dense
          v-model="ficha"
          :options="filterOptions"
          label="Id_Ficha"
          color="green"
          emit-value
          map-options
            option-label="Codigo" option-value="_id" use-input @filter="filterONE" class="custom-select"
            use-chips />

      <input type="date" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />  
    </div>
  </div>

  <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Tabla'
        />
      </q-card-actions>

    <!-- Tabla de aprendices -->
    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table :rows="rows" :columns="columns" row-key="documentoAprendiz">
          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              {{ props.pageIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
</template>

<script setup >

import { ref, onBeforeMount } from 'vue';
import axios from 'axios'
import { UseAprendizStore } from '../Stores/aprendices';
import { UseUsuarioStore } from '../Stores/usuario';
import { UseFichaStore} from "../Stores/fichas"
import { UseInformeStore } from '../Stores/informes';

/*  const useAprendiz = UseAprendizStore() */
/* const useFicha = UseFichaStore()  */

 const UseUsuario = UseUsuarioStore() 

const options = ref(null)



async function fetchData() {
  try {
    const res = await axios.get(
      "https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo",
      {
        headers: {
          "x-token": UseUsuario.xtoken,
        },
      }
    );
    const data = res.data;
    const activeFichas = data.filter((ficha) => ficha.Estado === 1);
    options.value = activeFichas;
    filterOptions.value = activeFichas;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Filtrar las fichas según el input del usuario
async function filterONE(val, update) {
  if (val === "") {
    update(() => {
      filterOptions.value = options.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptions.value = options.value.filter(option => {
      return option._id.toLowerCase().includes(needle)
    })
  })
}


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
  gap: 20px;
}

.q-popup-proxy {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
