 import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
 import { UseUsuarioStore } from "./usuario.js"; 
 import { UseBitacoraStore } from "./bitacoras.js";



export const UseInformeStore = defineStore("informes", () => {


    const UseUsuario= UseUsuarioStore() 
    let bitacora = ref ("")

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


    const ListarFichaFecha = async (Ficha,FechaInicial) => {
        try {
               let res = await axios.get('https://aprendices-asistencia-bd-3.onrender.com/api/Bitacora/listaFechaFicha',{
            params:{
                fichaNumero:Ficha,
                fecha:new Date(FechaInicial).toISOString()
            }
        })
  
        console.log(res)
    return res
        } catch (error) {
            console.log(error)

            Notify.create({
                color:"negative",
                message: error.response.data.message
                ,
                icon:"error",
                timeout:2500
            })
        }
    }

    return {
     listarAprediz, ListarFichaFecha
    }

    



}) 