import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario.js"; 





export const UseInformeStore = defineStore("informes", () => {


    const UseUsuario= UseUsuarioStore()
 

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
    return {
     listarAprediz
    }

    



}) 