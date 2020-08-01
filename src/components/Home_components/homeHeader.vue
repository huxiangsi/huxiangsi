<template>
    <el-header>
      <div>
        <!-- <img src="../assets/logo.png" alt="logo" /> -->
        <span>胡相思后台管理系统</span>
      </div>
      <el-button type="info" @click="exitBtn">退出</el-button>
      
    </el-header>

</template>

<script>
export default {
    name:'homeHeader',
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

<style>
    .el-header{
        height: 100px;
        width: 100%;
        background-color: rgb(44, 43, 43);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: seashell;
        font-size: 24px;
    }
</style>