<template>
  <el-main>
      <!-- <router-link to="/users">用户列表</router-link> -->
      <router-view></router-view>
  </el-main>
  
</template>

<script>
export default {
    name:'homeMain'
}
</script>

<style>
  .el-main{
    background-color: #eee;
  }
</style>