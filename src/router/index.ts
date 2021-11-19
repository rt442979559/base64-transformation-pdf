import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { beforeEach, afterEach } from './permission'
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "login" */ '@/views/default/login/index.vue')
  // },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/default/errpage/404.vue')
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/default/errpage/401.vue')
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "portal" */ '@/views/main/index.vue'),
        meta: { title: '首页' }
      }
    ]
  }
]

/**
 * createWebHistory 不带#号
 * createWebHashHistory
 */
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
