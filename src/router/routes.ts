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
    path: '/education-type',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/EducationType.vue') }]
  },
  {
    path: '/employee-agreements',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/EmployeeAgreements.vue') }]
  },
  {
    path: '/definitions-document',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/FileDefinition.vue') }]
  },
  {
    path: '/definitions-department',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/SectionDescription.vue') }]
  },
  {
    path: '/section-directory',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/SectionDirectory.vue') }]
  },
  {
    path: '/definitions-shift',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/ShiftDefinition.vue') }]
  },
  {
    path: '/task-directory',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/TaskDirectory.vue') }]
  },
  {
    path: '/task',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/Task.vue') }]
  },
  {
    path: '/team-guide',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/TeamGuide.vue') }]
  },
  {
    path: '/visitor-definition',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/VisitorDefinition.vue') }]
  },
  {
    path: '/workplace-service-agreements',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/WorkplaceServiceAgreements.vue') }]
  },
  {
    path: '/visitor-tracking',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/VisitorTracking.vue') }]
  },
  {
    path: '/employee-personnel',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/EmployeePersonnel.vue') }]
  },
  {
    path: '/employees',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: "", component: () => import('pages/Employees.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
