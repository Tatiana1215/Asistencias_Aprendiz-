import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { router } from './routes/routes'
import axios from 'axios'


// axios.defaults.baseURL='https://aprendices-asistencia-bd-3.onrender.com/api'
const myApp = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
myApp.use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
})



// Assumes you have a <div id="app"></div> in your index.htm
myApp.use(pinia)
myApp.use(router)
myApp.mount('#app')
