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


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径 
  // from代表从哪个路径跳转而来
  // next是一个函数表示放行
  // next()  next('/login')表示要强制跳转的路径
  if (to.path === '/adminLogin') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/adminLogin');
  next();
})


export default router