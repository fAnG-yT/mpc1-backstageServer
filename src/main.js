import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';
import './assets/css/reset.css'
import axios from 'axios'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$axios = axios
Vue.config.productionTip = false

//axios请求拦截器
axios.interceptors.request.use(config=>{
  // config.headers.token = localStorage.getItem("token")||""
  
  var token = sessionStorage.getItem("token")
  console.log(token)
  config.headers.token = token||""  
  return config
},err=>{
  console.log(err)
  return err
})




var vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径 
  // from代表从哪个路径跳转而来
  // next是一个函数表示放行
  // next()  next('/login')表示要强制跳转的路径
  if (to.path === '/adminLogin') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    vm.$message.error('登录失败,请重新登录')
    // setTimeout(()=>{
      next('/adminLogin');
    // },00)
  }
  else next();
})