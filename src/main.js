import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import axios from 'axios'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


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


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
