import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/auth/Login.vue'
import UsersList from './pages/users/List.vue'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: ['admin', 'user']
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersList,
      meta: {
        auth: ['admin']
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
});

export default router 