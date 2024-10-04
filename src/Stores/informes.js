import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario.js"; 





export const UseInformeStore = defineStore("informes", () => {
    const UseUsuario = UseUsuarioStore();
    let Bitacora = ref("");
    let loading = ref(false); 
    let fichaSeleccionada = ref(""); // Nueva referencia para la ficha seleccionada
    let fechaSeleccionada = ref("");

    const listarAprediz = async () => {
        loading.value = true; 
        try {
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo', {
                headers: {
                    "x-token": UseUsuario.xtoken
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            loading.value = false; 
        }
    };

    const obtenerBitacorasPorFichaYFecha = async (ficha, fechaInicial) => {
        loading.value = true; // Activar loading antes de la petición
        try {
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/listaFechaFicha', {
                params: {
                    fecha: fechaInicial,
                    fichaNumero: ficha
                },
                headers: {
                    "x-token": UseUsuario.xtoken
                }
            });



            Bitacora.value = res.data;

            // Bitacora.value = res.data;

            console.log('bitacora:', res.data);
            // console.log(Bitacora);
            console.log("Respuesta completa del servidor:", res);
            Notify.create({
                color: "positive",
                message: "Búsqueda exitosa",
                icon: "check_circle",
                timeout: 2500,
              });
            return res; // Devuelve las bitácoras para mostrarlas en la tabla
        } catch (error) {
            console.log('Error al obtener bitácoras', error);
            if (!UseUsuario.xtoken) {
                Notify.create({
                    color: "warning",
                    message: error.response.data.errors[0].message,
                    icon: "warning",
                    timeout: 2500,
                });
            }
            return error;
        } finally {
            loading.value = false; 
        }
    };

    const setFichaSeleccionada = (ficha) => {
        fichaSeleccionada.value = ficha;
    };

    const setFechaSeleccionada = (fecha) => {
        fechaSeleccionada.value = fecha;
    };


    return {
        listarAprediz,
        obtenerBitacorasPorFichaYFecha,
        Bitacora,
        loading,
        fichaSeleccionada,
        fechaSeleccionada,
        setFichaSeleccionada,
        setFechaSeleccionada
    };
},
{
  persist: true,
},);