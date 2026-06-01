import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Home/Home.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/pages/Products/Products.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: () => import('@/pages/ProductDetails/ProductDetails.vue'),
    }
  ],
})

export default router
