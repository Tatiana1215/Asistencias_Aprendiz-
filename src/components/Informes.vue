 <template>
<div>
  <div class="titleFirst">
    <h3>INFORMES</h3>
    <hr class="divider" />
  </div>


  <div class="q-pa-md centered-row">
    <div class="q-gutter-md inline-flex">
  
      <q-select dense v-model="ficha" :options="filterOptions" label="Id_Ficha" color="green" emit-value 
          map-options
            option-label="Codigo" option-value="Codigo" use-input @filter="filterONE" class="custom-select"
            use-chips />

      <input type="date" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />  
    </div>

    <q-btn @click="informes()"></q-btn>
  </div>
  <q-table :rows="rows" :columns="columns" row-key="name"/>
  <q-card-actions align="center">
        <q-btn 
          label="Ver" 
          color="green" 
          to = './Tabla'
        />
      </q-card-actions>


  </div>

</template>

<script setup >

import { ref, onBeforeMount } from 'vue';
import axios from 'axios'
import { UseAprendizStore } from '../Stores/aprendices';
import { UseUsuarioStore } from '../Stores/usuario';
import { UseFichaStore} from "../Stores/fichas"
import { UseInformeStore } from '../Stores/informes';
import { UseBitacoraStore } from '../Stores/bitacoras';

/*  const useAprendiz = UseAprendizStore() */
/* const useFicha = UseFichaStore()  */

 const UseUsuario = UseUsuarioStore() 
 const UseInformes = UseInformeStore()

const options = ref(null)

const rows = ref([]);

let ficha = ref('')
let fechaInicial = ref()

async function fetchData() {
  const response = await fetch('https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo', {
    headers: {
      "x-token": UseUsuario.xtoken
    }
  }
  )
  options.value = await response.json()
}

fetchData()

const filterOptions = ref([])

async function filterONE(val, update) {
  if (val === '') {
    console.log(val);

    update(() => {
      filterOptions.value = options.value;

    });
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptions.value = options.value.filter(option => {
      return option._id.toLowerCase().includes(needle)
    })
  })
}

async function informes() {
  let res = await UseInformes.ListarFichaFecha(ficha.value, fechaInicial.value)
  console.log(res); // Inspecciona la estructura de la respuesta
  if (res && res.data) {
    rows.value = res.data;
  }
  // rows.value = res.data
}



const columns = ref([
  {
    name: "documento",
    required: true,
    label: "documento",
    align: "left",
    field: "documento",
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre ",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "Estado",
    required: true,
    label: "Estado",
    align: "left",
    field: "documentoAprendiz",
    sortable: true,
  }
]);


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
