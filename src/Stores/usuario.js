import { defineStore } from "pinia"
import axios from "axios"
import { normalizeClass, ref, registerRuntimeCompiler } from "vue"
import { useQuasar, Notify } from "quasar"

export const UseUsuarioStore = defineStore("Usuario", () => {

    let xtoken = ref('')
    let usuario = ref('')
    let loading = ref(false)

    const Login = async (email, password) => {
        loading.value = true;
        try {
            const r = await axios.post('http://localhost:4000/api/Usuario/login', {
                Email: email,
                Password: password
            });
    
            xtoken.value = r.data.token;
            usuario.value = r.data;
            console.log(xtoken.value);
    
            Notify.create({
                color: "positive",
                message: "Inicio de sesión exitoso",
                icon: "check_circle",
                timeout: 2500,
            });
    
            return r;
        } catch (error) {

            Notify.create({
                color: "negative",
                message: error.response.data.mensaje || error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            });
          return error  
        }finally{
            loading.value=false
    }
    }
    const registrar = async (nombre1, email1, password1) => {
        try {

            const usuarioRegistro = await axios.post('http://localhost:4000/api/Usuario/insertar', {
                Nombre: nombre1,
                Email: email1,
                Password: password1
            },{
                headers:{
                    "x-token": xtoken.value
                }
            })

            Notify.create({
                color: "positive",
                message: "Registro Exitoso",
                icon: "check_circle",
                timeout: 2500,
            })

            console.log(usuarioRegistro)
            return usuarioRegistro

        } catch (error) {
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            })
          return error  
        }finally{
            loading.value=false
    }
    }

    const listarUsuarios = async () => {
        try {
            const listar = await axios.get('http://localhost:4000/api/Usuario/listarTodos', {
                headers: {
                    "x-token": xtoken.value
                }
            }
            )
            console.log(listar)
            // Notify.create({
            //     color: "positive",
            //     message: "listado de Usuarios",
            //     icon: "check_circle",
            //     timeout: 2500
            // })
            return listar
        } catch (error) {
            console.log(error);

            Notify.create({
                color: "positive",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500
            })
            return error
        }
    }

    const actualizarUsuario = async (id, nombre, email) => {
        // console.log('Request received:', req.params.id, req.body);
        try {
            const actualizar = await axios.put(`http://localhost:4000/api/Usuario/Actualizar/${id}`,{
                Email:email,
                Nombre:nombre,
            },{
                headers: {
                    "x-token": xtoken.value
                }
            })
            Notify.create({
                color: "positive",
                message: "Actualización correcta",
                icon: "check_circle",
                timeout: 2500
            })
            console.log(actualizar)
            return actualizar
        } catch (error) {
            // console.log(error);
            console.log("Error:", error.response.data);
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout:2500
            })
          return error
        }
    }

    return {
            
            xtoken, Login, registrar, listarUsuarios, actualizarUsuario,loading
    }
});

