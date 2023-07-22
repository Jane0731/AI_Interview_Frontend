// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '/discussion/all',
        name: 'AllDiscussions',
        component: () => import('@/views/AllDiscussions.vue'),
      },
      {
        path: '/discussion/:id',
        name: 'Discussion',
        component: () => import('@/views/SingleDiscussion.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
