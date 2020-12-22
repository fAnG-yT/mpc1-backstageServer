import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '@/views/AdminHome'
import AdminLogin from '@/views/AdminLogin'
import LineChart from '@/views/LineChart'
import UserManage from '@/views/UserManage'

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
    redirect:'LineChart',
    children: [{
        path: '/LineChart',
        component: LineChart
      },
      {
        path: '/UserManage',
        component: UserManage
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router