<template>
    <el-container class="home-container">    
        <homeHeader>
            <slot></slot>
        </homeHeader>
        <el-container class="home-inner">    
          <homeAside><slot></slot></homeAside>
          <homeMain><slot></slot></homeMain>
        </el-container>
    </el-container>
</template>

<script>
/* 按需导入 */
const homeHeader = () => import('./Home_components/homeHeader')
const homeAside= () => import('./Home_components/homeAside')
const homeMain = () => import('./Home_components/homeMain')
// import homeHeader from './Home_components/homeHeader'
// import homeAside from './Home_components/homeAside'
// import homeMain from './Home_components/homeMain'
export default {
    name:'Home',
    components:{
        homeHeader,
        homeAside,
        homeMain
    }
}
</script>

<style scoped>
    .home-container{
        height: 100%;
        width: 100%;
        position: relative;
        background-color: rgb(80, 78, 78);
        display: flex;
        justify-content: flex-end;
        flex-direction: column;      
    }
    
   
</style>