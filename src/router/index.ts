import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomPage from '@/views/CustomPage/CustomPage.vue'
import WorkFlow from '@/views/workFlow/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/custom',
      name: 'custom',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/CustomPage/CustomPage.vue')
    },
    {
      path: '/workFlow',
      name: 'workFlow',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/workFlow/index.vue')
    }
  ]
})

export default router
