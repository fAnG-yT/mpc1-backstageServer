import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
