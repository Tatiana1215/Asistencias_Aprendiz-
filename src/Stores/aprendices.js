import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario.js";


export const UseAprendizStore = defineStore("aprendiz", () => {
    let aprendiz = ref(false)
    let loading = ref(false)
    const UseUsuario = UseUsuarioStore()

    const listarAprediz = async () => {
        try {
            let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Aprendiz/ListarTodo', {
                headers: {
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

    const registrarAprendiz = async (formData) => {
        loading.value = true;
        try {
            let inf = await axios.post('https://aprendices-asistencia-bd-3.onrender.com/api/Aprendiz/Insertar', formData,
                {
                    headers: {
                        'x-token': UseUsuario.xtoken,
                        'Content-Type': 'multipart/form-data'
                    }
                });

            Notify.create({
                color: "positive",
                message: "Registro Exitoso",
                icon: "check_circle",
                timeout: 2500,
            });
            return inf;

        } catch (error) {
            console.log(error);
            Notify.create({
                color: "negative",
                message: error.response.data.message || error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            });
        } finally {
            aprendiz.value = false;
            loading.value = false;
        }
    }

    const editarAprendiz = async (id, nombre, telefono, documento, email, ficha, Firma) => {
        loading.value = true
        try {
            let inf = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Aprendiz/Actualizar/${id}`, {
                Nombre: nombre,
                Telefono: telefono,
                Documento: documento,
                Email: email,
                Id_Ficha: ficha,
                Firma: Firma

            }, {
                headers: {
                    "xtoken": UseUsuario.xtoken
                }
            })
            Notify.create({
                color: "positive",
                message: "Datos Actualizados",
                icon: "check_circle",
                timeout: 2500,
            })
            console.log(inf);
            return inf
        } catch (error) {

            // return error
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            })
            return error
        } finally {
            loading.value = false
        }
    }


    const mostrarMensajeSinCambios = () => {
        Notify.create({
            color: "warning",
            message: "No se hicieron cambios",
            icon: "info",
            timeout: 2500,
        });
    };


    const cargarcould = async (id, formData) => {
        try {
            let r = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Aprendiz/cargarCloud/${id}`, formData, {
                headers: {
                    "x-token": UseUsuario.xtoken,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updatecoul = async (id) => {
        try {
            let r = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Aprendices/uploadClou/${id}`, {
                headers: {
                    "x-token": UseUsuario.xtoken,
                },
            }
            );
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    return {
        registrarAprendiz, listarAprediz, editarAprendiz, cargarcould, updatecoul, loading,mostrarMensajeSinCambios
    }
}
)