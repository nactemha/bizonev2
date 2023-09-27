import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/Test.vue') }]
  },
  {
    path: '/',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }]
  },
  {
    path: '/ldap',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/Ldap.vue') }]
  },
  {
    path: '/esign',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/Esign.vue') }]
  },
  {
    path: '/change-password',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/ChangePassword.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
