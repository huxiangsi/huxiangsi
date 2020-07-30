<template>
  <div id="app">
    <!-- <router-link to="/Login">登录</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
// const Login = () => import('./components/Login')
export default {
  name: 'App',
  components: {
    // Login
  }
}
</script>

<style>
  @import url('./assets/css/global.css');
</style>
