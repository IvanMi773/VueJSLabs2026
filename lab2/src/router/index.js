import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { auth } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { public: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { public: true },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { public: true },
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/admin/UsersView.vue'),
        meta: { title: 'Користувачі' },
      },
      {
        path: 'user/:id',
        name: 'user-detail',
        component: () => import('@/views/admin/UserDetailView.vue'),
        props: true,
        meta: { title: 'Користувач' },
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/admin/ReportsView.vue'),
        meta: { title: 'Звіти' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated.value) {
    return { name: 'dashboard' }
  }
})

export default router
