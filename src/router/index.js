import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '@/views/AdminHome'
import AdminLogin from '@/views/AdminLogin'
import hour from '@/views/hour'
import managementGroup from '@/views/managementGroup'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/adminLogin'
  },
  // 管理员登录页
  {
    path: '/adminLogin',
    name: '管理员登录',
    component: AdminLogin,
  },
  // 管理员首页
  {
    path: '/AdminHome',
    name: '管理员首页',
    component: AdminHome,
    children: [{
        path: '/hour',
        component: hour
      },
      {
        path: '/day',
        component: managementGroup
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router