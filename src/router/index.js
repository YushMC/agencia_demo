import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/inicioView.vue'
import masDestinosView from '../views/masDestinosView.vue'
import Detalles from '../views/detallesView.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: InicioView
    }, 
    {
        path: '/Destinos',
        name: 'Otros',
        component: masDestinosView,
        props: (route) => ({url: route.query.url})        
    },
    {
        path:'/Detalles',
        name: 'Detalles',
        component: Detalles,
        props: (route) => ({ciudad: route.query.ciudad})
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router