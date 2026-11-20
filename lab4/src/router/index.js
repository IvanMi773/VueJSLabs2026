import { createRouter, createWebHistory } from 'vue-router'

import Cart from '@/pages/Cart.vue'
import Catalog from '@/pages/Catalog.vue'
import Profile from '@/pages/Profile.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: Catalog },
    { path: '/cart', name: 'cart', component: Cart },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
