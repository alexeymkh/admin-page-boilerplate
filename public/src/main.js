import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios';
import config from '../../config/config.js';

// set up axios as http requests tool (this.$http)
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = config.apiVersion;

Vue.config.productionTip = false;
Vue.router = router;

// auth with jwt module
Vue.use(require('@websanova/vue-auth'), {
  auth: require('./auth/authDriver.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'role',
  authRedirect: {path: '/login'},
  forbiddenRedirect: {path: '/'},
  notFoundRedirect: {path: '/'},
  registerData: {url: 'user/register', method: 'POST', redirect: '/', fetchUser: false},
  loginData: {url: 'admin/login', method: 'POST', redirect: '', fetchUser: true},
  logoutData: {url: 'user/logout', method: 'POST', redirect: '/', makeRequest: false},
  fetchData: {url: 'admin/user/myself', method: 'GET', enabled: true},
  refreshData: {url: 'user', method: 'GET', enabled: false, interval: 30},
  parseUserData:  data => data,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
