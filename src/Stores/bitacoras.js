import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario";


export const UseBitacoraStore = defineStore("bitacora", () => {

    const UseUsuario = UseUsuarioStore()

    let loading =ref (false)
   

    const listarBitacora = async (ficha,fechaInicial, fechaFinal) => {
        loading.value=true
        try {

            console.log(fechaInicial)
            console.log(fechaFinal);
            console.log(ficha);
            
            
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/ListarBitacoras', {
                params: {

                    fichaNumero: ficha, // Este parámetro debe coincidir con lo que el backend espera
                    FechaInicial: new Date(fechaInicial).toISOString(), // Formato ISO
                    FechaFinal: new Date(fechaFinal).toISOString(), // Formato ISO

                  /*   fichaNumero: ficha,
                    FechaInicial: new Date(fechaInicial).toISOString(),
                    FechaFinal: new Date(fechaFinal).toISOString(),
                    */
                },
                headers: {
                    "x-token": UseUsuario.xtoken// Cambiar el header al estándar Authorization
                }
            });
            // bitacoras.value = res.data; // Update bitacoras state
            Notify.create({
                color: "positive",
                message: "Datos entre estas fechas1",
                icon: "check_circle",
                timeout: 2500,
            });
            // bitacoras.value = res.data; // Update bitacoras state
            return res;
        } catch (error) {
            console.log('No hay bitácoras', error);
            Notify.create({
                color: "negative",
                message:error.response.data.message,
                icon: "error",
                timeout: 2500,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }

    const listar= async () => {
       
        try {
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/listar', {
                headers: {
                    "x-token": UseUsuario.xtoken// Cambiar el header al estándar Authorization
                }
            });
     
            return res;
        } catch (error) {
            console.log('No hay bitácoras', error);
        }
    }
    const registrarAprendiz = async (Aprendiz) => {
        loading.value=true
        try {
            let res = await axios.post('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/Insertar', {
                Documento: Aprendiz
            },
            )
            Notify.create({
                color: "positive",
                message:"Registro Exitoso",
                icon: "error",
                timeout: 2500,
            });
            console.log(res)
            return res
        } catch (error) {
            console.log(error);
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            });

            return error
        } finally {
            loading.value=false
        }
    }


    return {
        listarBitacora,listar, registrarAprendiz,loading
    }
})


