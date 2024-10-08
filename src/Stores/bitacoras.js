import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario";


export const UseBitacoraStore = defineStore("bitacora", () => {

    const UseUsuario = UseUsuarioStore()
    let loading = ref(false)


    const listarBitacora = async (ficha, fechaInicial, fechaFinal) => {
        loading.value = true
        try {
            console.log(fechaInicial)
            console.log(fechaFinal);
            console.log(ficha);
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/ListarBitacoras', {
                params: {

                    fichaNumero: ficha, // Este parámetro debe coincidir con lo que el backend espera
                    FechaInicial: new Date(fechaInicial).toISOString(), // Formato ISO
                    FechaFinal: new Date(fechaFinal).toISOString(), // Formato ISO
                },
                headers: {
                    "x-token": UseUsuario.xtoken// Cambiar el header al estándar Authorization
                }
            });
            Notify.create({
                color: "positive",
                message: "Busqueda Exitosa",
                icon: "check_circle",
                timeout: 2500,
            });
            return res;
        } catch (error) {
            console.log('No hay bitácoras', error);
            Notify.create({
                color: "negative",
                message: error.response.data.mensaje,
                icon: "error",
                timeout: 2500,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }

    const listar = async () => {

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
        loading.value = true
        try {
            let res = await axios.post('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/Insertar', {
                Documento: Aprendiz
            },
            )
            Notify.create({
                color: "positive",
                message: "Registro Exitoso",
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
            loading.value = false
        }
    }


    return {
        listarBitacora, listar, registrarAprendiz, loading
    }
},{
        persist: true,
    },
)


