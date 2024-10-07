import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import AOS from 'aos'
import 'aos/dist/aos.css'

import router from './router'

const app = createApp(App)

app.use(router)  // Usa el router en la aplicación
app.mount('#app')

AOS.init()
