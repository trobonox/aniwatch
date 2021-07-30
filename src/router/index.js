import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Theater from '@/views/Theater.vue'
import Error404 from '@/views/Error404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/theater/:mode', component: Theater },
  { path: '*', component: Error404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
