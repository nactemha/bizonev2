import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/Test.vue') }],
    meta: { requiresAuth: true }
  },
  {
    name: 'login',
    path: '/auth/login',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }]
  },
  {
    path: '/auth/ldap',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/auth/Ldap.vue') }]
  },
  {
    path: '/auth/esign',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/auth/Esign.vue') }]
  },
  {
    path: '/auth/change-password',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/auth/ChangePassword.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
