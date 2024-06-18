import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Removed for the Unplugin vue router
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     // Dynamic import -> used to make the page lazy loaded
  //     component: () => import('@/views/HomeView.vue'),
  //   },
  //   {
  //     path: '/projects',
  //     name: 'projects',
  //     // Dynamic import -> used to make the page lazy loaded
  //     component: () => import('@/views/ProjectsView.vue'),
  //   },
  //   {
  //     path: '/projects/:id',
  //     name: 'single-project',
  //     component: () => import('@/views/SingleProjectView.vue'),
  //   },
  //   {
  //     // Catch all unknown routes in Vue router and redirect to a not found page
  //     path: '/:catchAll(.*)*',
  //     name: 'notFound',
  //     component: h('p', { style: 'color:red;' }, '404 Not Found'),
  //   },
  // ],
})

export default router
