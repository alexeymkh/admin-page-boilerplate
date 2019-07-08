<template>
  <div id="app" v-if="$auth.check()">
        <template v-if="this.$auth.watch.data.status != 'stopped'">
            <b-nav pills align="center" style="margin: 20px;">

              <b-nav-item :active="$route.name=='users'" :to="{ name: 'users' }" v-if="this.$auth.watch.data.role == 'admin'">
                Users
              </b-nav-item>

              <b-nav-item>
                <a @click="appLogout" style="color: grey;">
                  Logout
                </a>
              </b-nav-item>

            </b-nav>
            <router-view :key="$route.name"></router-view>
        </template>

        <stopped v-else />
    </div>
    <router-view v-else></router-view>
</template>

<script>
  import Stopped from './pages/Stopped.vue';
  export default {
    name: 'app',
    components: {
        Stopped
    },
    methods: {      
      appLogout: function (e) {
        this.$auth.logout({
            makeRequest: false,
            data: {},
            success: function () {},
            error: function () {},
            redirect: '/login',
        });
      }
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
