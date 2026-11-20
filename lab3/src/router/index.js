import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Головна' },
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
      meta: { title: 'Новина' },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { title: 'Про нас' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Сторінку не знайдено' },
    },
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
  scrollBehavior(to, from, savedPosition) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reducedMotion ? 'auto' : 'smooth'

    // With mode="out-in" the new view mounts only after the old one leaves,
    // so restoring scroll immediately would clamp to the short empty page.
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ ...savedPosition, behavior }), 300)
      })
    }

    if (to.hash) return { el: to.hash, behavior }
    return { top: 0, behavior }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Вісник` : 'Вісник — новини про веб'
})

export default router
