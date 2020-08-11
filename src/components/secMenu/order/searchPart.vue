<template>
  <div>
      <!-- 搜索框 -->
      <el-input placeholder="请输入内容" v-model="queryInfo" slot="searchPart" >
          
          <!-- search按钮 -->
          <el-button slot="append" icon="el-icon-search" @click="searchButtonClick"></el-button>
      </el-input>
  </div>
</template>

<script>
export default {
  data(){
    return{
      queryInfo:''
    }
  },
  methods:{
   searchButtonClick(){
     this.$emit('inputQuery', this.queryInfo)
   }
  }
}
</script>

<style scoped>
/* 设置搜索框的宽度 */
.el-input{
  width: 300px;
}
</style>