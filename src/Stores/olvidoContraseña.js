import { defineStore } from "pinia";
import axios from "axios";
import { ref, warn } from "vue";
import { Notify } from "quasar";
import { UseUsuarioStore } from "./usuario";


export const UseOlvidoContraseñaStore = defineStore("usuario", () => {
// const UseUsuario = UseUsuarioStore()
let id = ref('')

    const CorreoMensaje = async (email) => {

        try {
            let res = await axios.post('http://localhost:4000/api/Usuario/solicitar-recuperacion',{
                Email:email
            })
        Notify.create({
            color:"positive",
            message:"Correo enviado con éxito",
            icon:"check_circle",
            timeout:2500
        })
          return res
        } catch (error) {
            console.log(error);
            
            Notify.create({
                color:"negative",
                message: error.response.data.mensaje || error.response.data.errors[0].msg,
                icon:"error",
                timeout:2500
            }) 
        }
        // console.log(`${error.response.data.msg}`)

     
    }



    const verificarCodigo = async ( email1 , codigo) => {
        try {
            let res = await axios.post('http://localhost:4000/api/Usuario/Verificacion',{
                Email : email1,
                Codigo: codigo
            })

            Notify.create({
                color:"positive",
                message:"El codigo de verificación es correcto",
                icon:"check_circle",
                timeout:2500
            })
            return res

        } catch (error) {
            Notify.create({
                color:"negative",
                message: error.response.data.mensaje || error.response.data.errors[0].msg,
                timeout:2500
            })
        }
    }

    const nuevaContraseña = async (email1, contrasenaActual, contrasenaNueva) =>{
        try {
            // Obtener la lista de usuarios
            let list = await axios.get('http://localhost:4000/api/Usuario/listarTodos');
            
            // Buscar el usuario con el correo proporcionado
            let usuario = list.data.find(user => user.Email === email1);
    
            if (!usuario) {
                console.log('Usuario no encontrado');
                return;
            }
    
            // Asignar el id del usuario
            id.value = usuario._id;
    
            // Hacer la solicitud POST para cambiar la contraseña
            let res = await axios.post(`http://localhost:4000/api/Usuario/reset/${id.value}`, {
                oldpassword: contrasenaActual,
                Password: contrasenaNueva
            });
    
            console.log('Se actualizó la contraseña con éxito');

            Notify.create({
                color:"positive",
                message:"Se actualizó la contraseña con éxito",
                icon:"check_circle",
                timeout:2500
            })
            return res
        } catch (error) {
            console.log('Error al actualizar la contraseña:', error);
            Notify.create({
                color:"negative",
                message: error.response.data.mensaje || error.response.data.errors[0].msg,
                icon:"error",
                timeout:2500
            })
        }
    }

return {
    CorreoMensaje, verificarCodigo, nuevaContraseña
}
})



