<template>
  <div>
    <!-- 订单列表数据渲染 -->
    <el-table :data="ordersList" border stripe>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="订单编号" prop="order_number"></el-table-column>
      <el-table-column label="订单价格" prop="order_price"></el-table-column>
      <el-table-column label="是否付款">
        <template slot-scope="scope"><el-tag :type="scope.row.pay_status == 0 ? 'danger' : 'success'">{{scope.row.pay_status == 0 ? '未付款' : '已付款'}}</el-tag></template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send"></el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <div  class="buttonStyle">
          <!-- 编辑按钮 -->
          <slot name="editButton">              
            <el-tooltip class="item" effect="dark" content="修改地址" placement="left" :enterable='false'>
                <editButton></editButton>
            </el-tooltip>
          </slot>
          <!-- 定位按钮 -->
          <slot name="locationButton">
            <locationButton :ordersList='ordersList'></locationButton>
          </slot>
        </div>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
/* 按需导入 编辑按钮组件 */
const editButton = () => import("./dataRenderButton/editButton")
/* 按需导入 定位按钮组件 */
const locationButton = () => import("./dataRenderButton/locationButton")
export default {
	props: ["ordersList"],
	components: {
		editButton,
		locationButton,
	},
	data() {
		return {}
	},
}
</script>

<style scoped>
.el-table {
	height: 560px;
	overflow: scroll;
}
/* 操作列 按钮样式 */
.buttonStyle {
	display: flex;
	justify-content: space-around;
}
</style>