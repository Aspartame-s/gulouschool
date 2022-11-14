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
        path: '/address-management',
        name: 'address-management',
        meta: {
          title: '通讯录'
        },
        children: [
          {
            path: 'education-department',
            name: 'education-department',
            meta: {
              title: '教育主管部门'
            },
            component: () => import('../views/pages/tongxunlu-guanli/educationDepartment/educationDepartment.vue')
          },
          {
            path: 'import',
            name: 'import',
            meta: {
              title: '教育主管部门'
            },
            component: () => import('../views/pages/tongxunlu-guanli/educationDepartment/test.vue')
          },
          {
            path: 'school',
            name: 'school',
            meta: {
              title: '学校'
            },
            component: () => import('../views/pages/tongxunlu-guanli/school/school.vue')
          },
        ]
      },
      {
        path: '/permissions',
        name: 'permissions',
        meta: {
          title: '权限与日志'
        },
        children: [
          {
            path: 'permissions-management',
            name: 'permissions-management',
            meta: {
              title: '权限管理'
            },
            component: () => import('../views/pages/quanxian-rizhi/permissionsManagement/permissionsManagement.vue')
          },
          {
            path: 'maintenance-note',
            name: 'maintenance-note',
            meta: {
              title: '维护日志'
            },
            component: () => import('../views/pages/quanxian-rizhi/maintenanceNote/maintenanceNote.vue')
          }
        ]
      },
      {
        path: '/api',
        name: 'api',
        meta: {
          title: 'API接入管理'
        },
        children: [
          {
            path: 'api-audit',
            name: 'api-audit',
            meta: {
              title: 'API接入审核'
            },
            component: () => import('../views/pages/api-guanli/apiAudit/apiAudit.vue')
          },
          {
            path: 'api-statistical',
            name: 'api-statistical',
            meta: {
              title: 'API接入统计'
            },
            component: () => import('../views/pages/api-guanli/apiStatistical/apiStatistical.vue')
          },
        ]
      },
      // {
      //   path: '/test',
      //   name: 'test',
      //   meta: {
      //     title: '测试'
      //   },
      //   component: () => import('../views/pages/test.vue')
      // }
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
