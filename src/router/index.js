import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '@/views/AdminHome'
import AdminLogin from '@/views/AdminLogin'
import Publish from '@/views/Publish'
import DAU from '@/views/DAU'
import Menu from '@/views/Menu'

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
        path: '/lineChart',
        component: Publish,
        },{
        path: '/dau',
        component: DAU,
        },{
        path: '/menu',
        component: Menu,
        },
    ]
  },
]


const router = new VueRouter({
  routes
})




export default router