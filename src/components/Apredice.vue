<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Aprendices</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md q-gutter-sm">
      <q-btn class="btnA" label="Crear" icon="add_circle" color="green" @click="AbrirModal = true" />


      <div class="q-pa-md ">
        <div class="table">
          <q-table :rows="rows" :columns="columns" row-key="name">
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props">
                <q-btn round color="white" :style="{ border: '2px solid green' }" @click="Abrir(props.row)">
                  <q-icon name="edit" style="color: green" />
                </q-btn>
                <q-btn icon="check" round color="green" :loading="loading[props.row._id]"
                  @click="Activar(props.row._id)" v-if="props.row.Estado == 0" />
                <q-btn icon="close" round color="red" :loading="loading[props.row._id]"
                  @click="Desactivar(props.row._id)" v-else />
                <!-- <q-btn icon="close" round color="red" @click="Activar(props.row._id)" v-if="props.row.Estado == 1" />
                <q-btn icon="check" round color="green" @click="Desactivar(props.row._id)" v-else /> -->
              </q-td>
            </template>
            <template v-slot:body-cell-Estado1="props">
              <q-td :props="props">
                <p style="color:green" v-if="props.row.Estado === 1">Activo</p>
                <p style="color:red" v-else>Inactivo</p>
              </q-td>
            </template>
            <template v-slot:body-cell-Numero="props">
              <q-td :props="props">
                {{ props.pageIndex + 1 }}
              </q-td>
            </template>

            <template v-slot:body-cell-Firma="props">
              <q-td :props="props">
                {{ console.log(props.row.Firma) }}
                <q-img v-if="props.row.Firma" :src="props.row.Firma" alt="Firma"
                  style="max-width: 100px; max-height: 100px;" />
                <p v-else>No disponible</p>
              </q-td>
            </template>

          </q-table>
        </div>
      </div>

      <q-dialog v-model="AbrirModal" persistent>
        <q-card style="min-width: 500px; margin: 0;">
          <div class="text">
            {{ p === true ? "Editar Aprendiz" : "Agregar Aprendiz" }}
          </div>
          <!-- </q-card-section> -->

          <q-card-section class="q-pt-none">

            <q-input color="green-8" v-model="nombre" label="Nombre" :rules="[
              (val) => (val && val.length > 0) || 'El nombre es obligatorio'
            ]" />

            <q-input color="green-8" v-model="telefono" label="Telefono" :rules="[
              (val) => (val && val.length > 0) || 'El teléfono es obligatorio'
            ]" />

            <br>
            <q-input color="green-8" v-model="documento" label="Documento" :rules="[
              (val) => (val && val.length > 0) || 'El Numero de Documento es obligatorio']" />

            <br>
            <q-input color="green-8" v-model="email" label="Email" :rules="[
              (val) => (val && val.length > 0) || 'El Email es obligatorio']" />

            <br>
            <q-select dense v-model="ficha" :options="filterOptions" label="Ficha" color="green" emit-value map-options
              option-label="Codigo" option-value="_id" use-input @filter="filterFunction" class="custom-select"
              use-chips :rules="[
                (val) => (val && val.length > 0) || 'El numero de Ficha es obligatorio'
              ]">

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.Codigo }} - {{ scope.opt.Nombre }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="file-upload">
              <q-file v-model="Firma" label="Firma Virtual (Opcional)" filled accept="image/*"
                @update:model-value="handleFileChange" :rules="[
                  (val) => !!val || 'La firma es obligatoria'  // Ensure a file is selected
                ]">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>

              <!-- Mostrar la foto existente si no se ha cargado una nueva -->
              <q-img v-if="!previewUrl && datosExistentesFirma" :src="datosExistentesFirma"
                style="max-width: 200px; max-height: 200px;" class="q-mt-md" />

              <!-- Mostrar la previsualización de la nueva foto si se ha seleccionado -->
              <q-img v-if="previewUrl" :src="previewUrl" style="max-width: 200px; max-height: 200px;" class="q-mt-md" />
            </div>
          </q-card-section>


          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" @click="cerrarModal(), p = false" color="red" v-close-popup />

            <q-btn :loading="useAprendiz.loading" color="green" @click="agregarAprendiz()">
              Guardar
              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { UseAprendizStore } from '../Stores/aprendices';
// import { UseUsuarioStore } from '../Stores/usuario';
import { Notify } from 'quasar';
import { UseUsuarioStore } from '../Stores/usuario';
// import Ficha from './Ficha.vue';

let nombre = ref('')
let telefono = ref('')
let documento = ref('')
let email = ref('')
let ficha = ref('')
let inf = ref('')
let AbrirModal = ref(false)
let p = ref(false)
let id = ref('')
let Firma = ref(null);
let previewUrl = ref('');
let loading = ref({})
let datosExistentesFirma = ref('')

// para hacer la comparacion de los datos 
let originalNombre = ref('');
let originalTelefono = ref('');
let originalDocumento = ref('');
let originalEmail = ref('')
let originalId_Ficha = ref('')
let originalFirma = ref('')


// tara el infomacion de los stores
const useAprendiz = UseAprendizStore()
const UseUsuario = UseUsuarioStore()
const rows = ref([]);


// Actualiza los datos en tiempo real
onBeforeMount(() => {
  traer();
});

async function traer() {
  let res = await useAprendiz.listarAprediz()
  rows.value = res.data
}


function limpiarCampos() {
  nombre.value = '';
  telefono.value = '';
  documento.value = '';
  email.value = '';
  ficha.value = '';
  Firma.value = '';
  previewUrl.value = false

}

function Abrir(row) {
  AbrirModal.value = true;
  p.value = true;


  //guarda los datos del formulario
  nombre.value = row.Nombre;
  telefono.value = row.Telefono;
  documento.value = row.Documento;
  email.value = row.Email;
  ficha.value = row.Id_Ficha;
  id.value = row._id;
  Firma.value = null; // Resetear firma seleccionada
  previewUrl.value = ''; // Resetear vista previa
  // Si el aprendiz tiene una firma existente, la mostramos

  // Guardar los datos originales para comparación
  originalNombre = row.Nombre,
    originalTelefono = row.Telefono
  originalDocumento = row.Documento
  originalEmail = row.Email
  originalId_Ficha = row.Id_Ficha
  originalFirma = row.Firma
  // Si el aprendiz tiene una firma existente, la mostramos
  if (row.Firma) {
    previewUrl.value = row.Firma;
  }

}


function cerrarModal() {
  limpiarCampos()
}

async function agregarAprendiz() {

  if (!nombre.value || !telefono.value || !documento.value || !email.value || !ficha.value) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden estar vacíos",
      icon: "error",
      timeout: 2500,
    })
  }

  const trimmedTelefono = telefono.value.trim();
  const trimmedDocumento = documento.value.trim();
  const trimmedEmail = email.value.trim();


  // // Expresión regular para garantizar que no haya espacios múltiples dentro de los campos
  const noExcessiveSpacesRegex = /^[^\s]+$/

  // //  Validar que ningún campo esté vacío después del recorte
  if (!trimmedTelefono || !trimmedDocumento || !trimmedEmail
  ) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden estar vacíos",
      icon: "error",
      timeout: 2500,
    });
    return;
  }
  if (p.value === false) {
    if (!Firma.value) {
      Notify.create({
        color: "negative",
        message: "Los campos no pueden estar vacíos",
        icon: "error",
        timeout: 2500,
      });
      return;
    }
  }
  // // Validate that there are no internal excessive spaces
  if (!noExcessiveSpacesRegex.test(trimmedTelefono) ||
    !noExcessiveSpacesRegex.test(trimmedDocumento) || !noExcessiveSpacesRegex.test(trimmedEmail)) {
    Notify.create({
      color: "negative",
      message: "Los campos no pueden contener espacios en blanco excesivos",
      icon: "error",
      timeout: 2500,
    });
    return;
  }

  if (p.value === true && nombre.value == originalNombre && documento.value == originalDocumento
    && email.value == originalEmail && telefono.value == originalTelefono && ficha.value == originalId_Ficha
    // && Firma.value == originalFirma
  ) {
    Notify.create({
      color: "warning",
      message: "No se hicieron cambios",
      icon: "info",
      timeout: 2500
    });
    return;
  }
  let res;

  if (p.value === true) {
    if (Firma.value) { // Primero, subimos la firma si hay alguna seleccionada
      await cargarCloud();  // Aquí llamamos la función para subir la firma
    }
    res = await useAprendiz.editarAprendiz(id.value, nombre.value, telefono.value, documento.value, email.value, ficha.value, Firma.value)
  } else {

    if (!Firma.value) {
      console.log("No hay archivo para subir");
      return;
    }
    // Agregamos los datos  fromdata para guarda la información que se va guardando en la base de datos
    const formData = new FormData();
    formData.append('Nombre', nombre.value);
    formData.append('Telefono', telefono.value);
    formData.append('Documento', documento.value);
    formData.append('Email', email.value);
    formData.append('Id_Ficha', ficha.value);

    if (Firma.value) { // estamos validando la firma  para que la guarde en la nube de cloudinary
      formData.append('archivo', Firma.value);
    }
    res = await useAprendiz.registrarAprendiz(formData) //aca ponemos formdata donde anterior mente estamos guardando los datos de cada campo
  }





  if (res && res.status === 200) {
    AbrirModal.value = false;
    p.value = false
    limpiarCampos()
  } else {
    AbrirModal.value = true;
  }
  await traer()
}
const handleFileChange = (file) => {
  if (file) {
    Firma.value = file;
    previewUrl.value = URL.createObjectURL(file);
    datosExistentesFirma.value = ''; // Ocultar la firma existente al seleccionar una nueva
  } else {
    Firma.value = null;
    previewUrl.value = '';
  }
};

const subir = (e) => {
  if (e.target.files.length > 0) {
    Firma.value = e.target.files[0];
    console.log("Archivo seleccionado:", Firma.value);
  }
};

async function cargarCloud() {
  if (!Firma.value) {
    console.log("No hay archivo para subir");
    return;
  }

  const formData = new FormData();
  formData.append("archivo", Firma.value); // Cambia "firmaVirtual" a "archivo"

  try {
    let ris = await useAprendiz.cargarcould(id.value, formData);
    console.log("Archivo subido correctamente", ris);
    Notify.create({
      color: 'positive',
      message: 'Firma virtual subida correctamente',
      icon: 'cloud_done'
    });
  } catch (error) {
    console.error("Error subiendo archivo:", error);
    Notify.create({
      color: 'negative',
      message: 'Error al subir la firma virtual',
      icon: 'error'
    });
  }
}


const options = ref([])
const filterOptions = ref([])

async function fetchData() {
  try {
    const response = await fetch('https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo', {
      headers: {
        "x-token": UseUsuario.xtoken
      }
    })
    const allOptions = await response.json()
    options.value = allOptions.filter(option => option.Estado === 1)
    filterOptions.value = options.value
  } catch (error) {
    console.error('Error fetching fichas:', error)
  }
}
fetchData()
async function filterFunction(val, update) {
  if (val === '') {
    update(() => {
      filterOptions.value = options.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptions.value = options.value.filter(option =>
      option.Codigo.toLowerCase().includes(needle) ||
      option.Nombre.toLowerCase().includes(needle)
    )
  })
}


async function Activar(id) {
  console.log(id);
  loading.value[id] = true;
  try {
    inf = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Aprendiz/Activar/${id}`, {}, {
      headers: {
        "x-token": UseUsuario.xtoken // Token correcto en los headers
      }
    });
    Notify.create({
      color: 'positive',
      message: 'El aprendiz ha sido activado exitosamente',
      icon: 'check_circle',
      timeout: 2500
    });
    traer();
    return;
  } catch (error) {
    console.log(error);
    Notify.create({
      color: 'negative',
      message: 'Error al activar el aprendiz',
      icon: 'error',
      timeout: 2500
    });
    return;
  } finally {
    loading.value[id] = false;
  }
}

async function Desactivar(id) {
  console.log(id);
  loading.value[id] = true;
  try {
    inf = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Aprendiz/Desactivar/${id}`, {}, {
      headers: {
        "x-token": UseUsuario.xtoken // Colocar el token correctamente
      }
    });
    Notify.create({
      color: 'positive',
      message: 'El aprendiz ha sido inactivado exitosamente',
      icon: 'check_circle',
      timeout: 2500
    });
    traer();
    return;
  } catch (error) {
    console.log(error);
    Notify.create({
      color: 'negative',
      message: 'Error al inactivar el aprendiz',
      icon: 'error',
      timeout: 2500
    });
    return;
  } finally {
    loading.value[id] = false;
  }
}

const columns = ref([
  { name: 'Numero', align: 'center', label: 'N°', field: 'Numero', sortable: true },
  { name: 'Nombre', required: true, label: 'Aprendiz', align: 'center', field: "Nombre", sortable: true },
  { name: 'Documento1', align: 'center', label: 'Documento', field: 'Documento', sortable: true },
  { name: 'Telefono', align: 'center', label: 'Teléfono', field: 'Telefono', sortable: true },
  { name: 'Email', align: 'center', label: 'Email', field: 'Email', sortable: true },
  { name: 'Firma', label: 'Firma', field: 'Firma', sortable: true },
  { name: 'Estado1', label: 'Estado', field: 'Estado1', sortable: true },
  { name: 'opciones', label: 'Opciones' },
]);
</script>



<style>
.iconoAprendiz img {
  width: 100%;
}

.tituloAprendiz,
.text {
  background-color: green;
  color: white;
  padding: 2%;
  margin-bottom: 4%;
  font-weight: 900;
  font-size: 25px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
}
</style>