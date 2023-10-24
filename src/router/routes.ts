import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('layouts/GreenSpace.vue'),
    children: [{ path: '', component: () => import('pages/Test.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
    meta: { requiresAuth: true }

  },
  {
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
  {
    path: '/select-company',
    component: () => import('layouts/GreenSpaceToolbar.vue'),
    children: [{ path: '', component: () => import('pages/SelectCompany.vue') }]
  },
  {
    path: '/medicine',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Medicine.vue') }]
  },
  {
    path: '/subcontractors',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Subcontractors.vue') }]
  },
  {
    path: '/employee-list',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/EmployeeList.vue') }]
  },
  {
    path: '/employee-health-info',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/EmployeeHealthInfo.vue') }]
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Profile.vue') }]
  },
  {
    path: '/workplace',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/Workplace.vue') }]
  },
  {
    path: '/educational-planning',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/EducationalPlanning.vue') }]
  },
  {
    path: '/employee-agreements',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/EmployeeAgreements.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
