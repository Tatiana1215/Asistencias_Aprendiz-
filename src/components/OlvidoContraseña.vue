<template>
    <div id="contraseña">
        <q-layout view="hHh lpR fFf">
            <q-header elevated class="bg-darkgreen text-white" style="background-color: green;" height-hint="98">
                <q-toolbar>
                    <q-toolbar-title>
                        REPFORA
                    </q-toolbar-title>
                    <q-btn to="/Login" icon="exit_to_app" label="Salir" @click="salir" />
                </q-toolbar>

            </q-header>

            <q-page-container>
                <div class="VerificacionEmail" v-if="!codigoCorrecto">
                    <q-card style="min-width: 450px; margin-top:80px ;">
                        <q-card-section>
                            <div class="iconContraseñaOlvido">
                                <img src="https://cdn-icons-png.flaticon.com/512/6357/6357126.png" alt="">
                            </div>
                            <div class="text">
                                <p>Por favor digite el correo electrónico con el que se ha registrado anteriormente,
                                    allí le enviaremos todos los pasos para recuperar su contraseña.</p>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-input dense v-model="email" placeholder="Email" autofocus color="green"
                                @keyup.enter="solicitarCodigo()" v-if="!prompt" />
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-input dense v-model="email1" placeholder="Email" autofocus color="green"
                                @keyup.enter="verificarCodigo()" v-if="prompt" />
                            <q-input dense v-model="codigo" placeholder="Codigo de Verificación" autofocus color="green"
                                @keyup.enter="verificarCodigo()" v-if="prompt" />
                        </q-card-section>
                        <q-card-actions align="right" class="text-primary">
                            <q-btn unelevated color="green" label="Enviar" :loading="useOlvidoContrasena.loading"
                                @click="codigoEnvido ? verificarCodigo() : solicitarCodigo()">
                                <template v-if="useOlvidoContrasena.loading">
                                    <q-spinner color="white" size="1em" />
                                </template>
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                </div>




                <div class="cambiarContraseña" v-else>
                    <div class="q-pa-md ">
                    <q-card style="min-width: 450px; ">
                        <q-card-section>
                            <div class="text">
                                <h4>Restablecer Contraseña</h4>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-input dense v-model="contrasenaActual" placeholder="Contraseña Actual" autofocus filled
                                :type="isPwd1 ? 'password' : 'text'"  color="green">
                                <template v-slot:append>
                                    <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                        @click="isPwd1 = !isPwd1" />
                                </template>
                            </q-input>
                            <br>
                            <q-input dense v-model="contrasenaNueva" placeholder="Contraseña Nueva" autofocus filled
                                :type="isPwd2 ? 'password' : 'text'" color="green">
                                <template v-slot:append>
                                    <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                        @click="isPwd2 = !isPwd2" />
                                </template>
                            </q-input>
                        </q-card-section>
                        <q-card-actions align="right" class="text-primary">
                            <q-btn unelevated label="Enviar" :loading="useOlvidoContrasena.loading" @click="guardar()"
                                color="green" />
                        </q-card-actions>
                    </q-card>
                    </div>
                </div>
            </q-page-container>
        </q-layout>
    </div>


</template>


<script setup>

import { ref, resolveDirective } from 'vue'
import { UseOlvidoContraseñaStore } from '../Stores/olvidoContraseña';
import { useRouter } from 'vue-router';
import axios from 'axios';


const router = useRouter();  // Corrected
const prompt = ref(false)


// const address = ref('')
let email = ref('')
let email1 = ref('')
let codigo = ref('')
let contrasenaActual = ref('')
let contrasenaNueva = ref('')
let codigoEnvido = ref(false)
let codigoCorrecto = ref(false)
let isPwd1 = ref(true)
let isPwd2 = ref(true)
const useOlvidoContrasena = UseOlvidoContraseñaStore()



async function solicitarCodigo() {
    let res = await useOlvidoContrasena.CorreoMensaje(email.value)
    // useOlvidoContrasena.loading = true;
    if (res) {
        prompt.value = true
        codigoEnvido.value = true
    }


}

async function verificarCodigo() {
    let res = await useOlvidoContrasena.verificarCodigo(email1.value, codigo.value)
    if (res) {
        codigoEnvido.value = false
        codigoCorrecto.value = true

    }
}

async function guardar() {
    let res = await useOlvidoContrasena.nuevaContraseña(email1.value, contrasenaActual.value, contrasenaNueva.value)
    if (res && res.status == 200) {
        router.push('/Login')  // Corrección aquí
    }
}

function salir() {
    router.push("/Login")  // Corrección aquí
}

</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.VerificacionEmail {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    align-content: center;
    max-width: 600px; /* Restrict maximum width */
    margin: 0 auto; /* Center the element */
}

.cambiarContraseña {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px; /* Set a maximum width */
    margin: 0 auto; /* Center the element */
}


.text p {
    font-size: 20px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.iconContraseñaOlvido {
    width: 40%;
    margin: 0 auto;
}

.iconContraseñaOlvido img {
    width: 100%;
    /* display: flex; */
    /* margin: 0px auto; */


    /* padding: 4%; */

}


.cambiarContraseña {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ensure full viewport height */
}
/* .iconContraseñaOlvido {} */
</style>
