import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { Quasar, Notify} from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'
import { router } from './routes/routes'
import axios from 'axios'


axios.defaults.baseURL='https://aprendices-asistencia-bd-3.onrender.com'

const pinia = createPinia()
const myApp = createApp(App)


myApp.use(Quasar, {
  plugins: {
    Notify
  }, // import Quasar plugins and add here
})


myApp.use(pinia)
// Assumes you have a <div id="app"></div> in your index.html
myApp.use(router)
myApp.mount('#app')
