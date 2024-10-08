import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"
import { Notify } from "quasar"
import { UseUsuarioStore } from "./usuario"
import Usuario from "../components/Usuario.vue"

export const UseFichaStore = defineStore("ficha", () => {

    const UseUsuario = UseUsuarioStore()
    let loading =ref (false)

    const listarFicha = async () => {
        try {
            let inf = await axios.get("https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/ListarTodo",{
                headers:{
                "x-token": UseUsuario.xtoken,
                }
            })
            console.log(inf)
            return inf
        } catch (error) {
            console.log(error);
            return error
        }
    }
    const crearFicha = async (codigo, nombre) => {
        loading.value=true
        try {
            let inf = await axios.post('https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/crear',{
                Codigo: codigo,
                Nombre: nombre
            },{
                headers:{
                    "x-token": UseUsuario.xtoken
                }
            })
            Notify.create({
                color: "positive",
                message: "Registro exitoso",
                icon: "check_circle",
                timeout: 2500,
            });
            console.log(inf)
            return inf
        } catch (error) {
            console.log(error);
            Notify.create({
                color: "negative",
            message: error?.response?.data?.errors[0]?.msg,
                icon: "error",
                timeout: 2500,
            });

            return error
        }finally{
            loading.value=false
        }
    }
    const EditarFicha = async (id,codigo,nombre) => {
        loading.value=true
        try {
            let inf = await axios.put(`https://aprendices-asistencia-bd-3.onrender.com/api/Ficha/Actualizar/${id}`,{
                Codigo:codigo,
                Nombre:nombre
            },{
                headers:{
                    "x-token": UseUsuario.xtoken
                }
            })
            Notify.create({
                color: "positive",
                message: "Actualizacón Exitosa",
                icon: "check_circle",
                timeout: 2500,
            });
            return inf
        } catch (error) {
            console.log(error)
            Notify.create({
                color:"negative",
                message: error.response.data.errors[0].msg,
                icon:"error",
                timeout: 2500
            })
        }finally{
            loading.value=false
        }

    }

    return {
    listarFicha, crearFicha, EditarFicha,loading
    }
},
{
  persist: true,
},)
