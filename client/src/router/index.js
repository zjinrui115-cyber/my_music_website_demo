// client/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 如果以后有“关于我们”页面，可以在这里加
    // { path: '/about', component: () => import('../views/AboutView.vue') }
  ]
})

export default router