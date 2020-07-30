<template>
  <div>
      <el-button type="info" @click="exitBtn">退出</el-button>
  </div>
</template>

<script>
export default {
    name:'Home',
    methods:{
        /* 退出按钮事件 */
        exitBtn(){
            /* 清空会话缓存 */
            window.sessionStorage.clear();
            /* 编程式导航，强制跳转到登录界面 */
            this.$router.push('/Login')
        }
    }
}
</script>

<style scoped>

</style>