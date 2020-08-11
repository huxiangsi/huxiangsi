<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:['total', 'queryInfo'],
    methods:{
        /* 监听 每页显示数据条数变化 事件 */
        handleSizeChange(newpageSize){
            this.$emit('updateOrdersList', newpageSize,'newpageSize')
        },
        /* 监听 当前页变化 事件 */
        handleCurrentChange(newPage){
            this.$emit('updateOrdersList', newPage,'newPage')
        }
    }
}
</script>

<style>

</style>