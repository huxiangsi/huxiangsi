<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card -->
    <el-card>
      <!-- search part -->
      <slot name="searchPart">
        <searchPart @inputQuery='inputQueryUpdate'></searchPart>
      </slot>
      <div class="dataRender">
        <!-- data Render -->
        <slot name="dataRender">
          <dataRender :ordersList='ordersList'></dataRender>
        </slot>
      </div>
      <!-- 分页 -->
      <div class="paginationStyle">
        <slot name="pagination"><pagination :total='total' :queryInfo='queryInfo' @updateOrdersList='updateOrderComp'></pagination></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
/* 按需导入搜索框区 */
const searchPart = () => import("./order/searchPart")
/* 按需导入数据渲染 */
const dataRender = () => import("./order/dataRender")
/* 按需导入 分页组件 */
const pagination = () => import('./order/pagination')
export default {
	name: "orders",
	components: {
		searchPart,
    dataRender,
    pagination
  },
  data(){
    return{
      /* 订单数据列表 */
      ordersList:[],
      /* 订单列表中数据总数 */
      total:0,
      /* 网络请求参数 */
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:5
      }
    }
  },
  methods:{
    /* 获取订单数据列表 */
    async getOrdersList(){
      const res = await this.$menu.get(`orders`, {params:this.queryInfo})
      if(res.data.meta.status !== 200){
        /* 网络请求失败， 返回失败信息 */
        this.$message.error(res.data.meta.msg)
      }else{
        /* 网络请求成功, 把数据保存到data中 */
        this.ordersList = res.data.data.goods
        /* 订单列表数据总条数，保存到data中 */
        this.total = res.data.data.total
      }
    },
    /* 监听 搜索框 输入 事件 */
    inputQueryUpdate(inputInfo){
      this.queryInfo.query = inputInfo
      /* 刷新订单列表 */
      this.getOrdersList()
    },
    /* 监听 分页组件 事件 */
    updateOrderComp(e,p){
      if(p == 'newPage'){
        this.queryInfo.pagenum = e
        /* 刷新订单列表 */
        this.getOrdersList()
      }else if(p == 'newpageSize'){
        this.queryInfo.pagesize = e
        /* 刷新订单列表 */
        this.getOrdersList()
      }
    }
  },
  created(){
    /* 页面创建之前 加载订单数据列表 */
    this.getOrdersList()
  }
}
</script>

<style scoped>
/* 面包屑导航下外边距 */
.el-breadcrumb {
	margin-bottom: 15px;
}
/* 数据渲染区 的上外边距 */
.dataRender{
  margin-top: 15px;
}
/* 分页 上外边距 样式 */
.paginationStyle{
  margin-top: 15px;
}
</style>