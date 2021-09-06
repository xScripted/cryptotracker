import Vue from 'vue'
import VueRouter from 'vue-router'
import Cryptos from '../views/Cryptos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cryptos',
    component: Cryptos
  },
  {
    path: '/currencies/:id/:symbol',
    name: 'Currencies',
    component: () => import('../views/Crypto.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
