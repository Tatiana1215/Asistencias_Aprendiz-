import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario";


export const UseBitacoraStore = defineStore("bitacora", () => {

    const UseUsuario = UseUsuarioStore()

    let loading =ref (false)

    const listarBitacora = async (fechaInicial, fechaFinal) => {
        loading.value=true
        try {
            let res = await axios.get('http://localhost:4000/api/Bitacora/ListarBitacoras', {
                params: {
                    FechaInicial: new Date(fechaInicial).toISOString(),
                    FechaFinal: new Date(fechaFinal).toISOString()
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
                message: "Error al listar bitácoras",
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
            let res = await axios.get('http://localhost:4000/api/Bitacora/listar', {
                headers: {
                    "x-token": UseUsuario.xtoken// Cambiar el header al estándar Authorization
                }
            });
            // bitacoras.value = res.data; // Update bitacoras state
            Notify.create({
                color: "positive",
                message: "Datos entre estas fechas",
                icon: "check_circle",
                timeout: 2500,
            });
            return res;
        } catch (error) {
            console.log('No hay bitácoras', error);
            Notify.create({
                color: "negative",
                message: "Error al listar bitácoras",
                icon: "error",
                timeout: 2500,
            });
            return error;
        }
    }
    const registrarAprendiz = async (Aprendiz) => {
        loading.value=true
        try {
            let res = await axios.post('http://localhost:4000/api/Bitacora/Insertar', {
                Id_Aprendiz: Aprendiz,
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


