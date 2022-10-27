import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index/Index.vue'),
    children: [
      {
        path: '/education-department',
        name: 'education-department',
        component: () => import('../views/pages/tongxunlu-guanli/educationDepartment/educationDepartment.vue')
      },
      {
        path: '/school',
        name: 'school',
        component: () => import('../views/pages/tongxunlu-guanli/school/school.vue')
      },
      {
        path: '/permissions-management',
        name: 'permissions-management',
        component: () => import('../views/pages/quanxian-rizhi/permissionsManagement/permissionsManagement.vue')
      },
      {
        path: '/maintenance-note',
        name: 'maintenance-note',
        component: () => import('../views/pages/quanxian-rizhi/maintenanceNote/maintenanceNote.vue')
      },
      {
        path: '/api-audit',
        name: 'api-audit',
        component: () => import('../views/pages/api-guanli/apiAudit/apiAudit.vue')
      },
      {
        path: '/api-statistical',
        name: 'api-statistical',
        component: () => import('../views/pages/api-guanli/apiStatistical/apiStatistical.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/pages/test.vue')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
