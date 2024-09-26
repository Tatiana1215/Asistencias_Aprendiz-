import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario.js"; 





export const UseInformeStore = defineStore("informes", () => {


    const UseUsuario= UseUsuarioStore()
    let Bitacora = ref("")
 

    const aprendices = ref([]);

    const listarAprediz = async () => {

        try {
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo', {
                headers:{
                    "x-token": UseUsuario.xtoken
                }
        })
            console.log(res);
            return res
        } catch (error) {
            console.log(error);
            return error
        }

   }


    const obtenerBitacorasPorFichaYFecha = async (ficha, fechaInicial) => {
     
        try {

            let res = await axios.get(`https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/listaFechaFicha`, {
                params: {
                    fecha: fechaInicial,  
                    fichaNumero: ficha  
                },
                
                headers: {
                    "x-token": UseUsuario.xtoken
                }
                
            });
            
            Bitacora.value = res.data
            console.log('bitacora:', res.data);
            console.log(Bitacora);
            
            console.log("Respuesta completa del servidor:", res);
            return res; // Devuelve las bitácoras para mostrarlas en la tabla
        } catch (error) {
            console.log('Error al obtener bitácoras', error);
            if (!UseUsuario.xtoken) {
                Notify.create({
                    color: "warning",
                    message: "Token no encontrado. Por favor inicia sesión.",
                    icon: "warning",
                    timeout: 2500,
                });
                return;
            }
            
        }
    }
   

return {
 listarAprediz, obtenerBitacorasPorFichaYFecha, Bitacora

}

}) 