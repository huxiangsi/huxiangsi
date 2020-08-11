<template>
  <div>
    <!-- 查看物流信息按钮 -->
    <el-button
      size="mini"
      type="success"
      icon="el-icon-location"
      slot="locationButton"
      @click="btnClick"
    ></el-button>
    <!-- 查看物流信息对话框 -->
    <el-dialog title="查看物流信息" :visible.sync="showProgressDialog" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in deliveryInfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
export default {
	props: ["ordersList"],
	data() {
		return {
			/* 控制查看物流信息对话框 显示与隐藏 */
			showProgressDialog: false,
			/* 物流信息 */
			deliveryInfo: [],
		}
	},
	methods: {
		/* 监听 查看物流信息 按钮 点击事件 */
		btnClick() {
			/* 加载物流信息数据 */
			this.getDeliveryInfo()
			/* 弹出对话框 */
			this.showProgressDialog = true
		},

		/* 获取物流信息 */
		async getDeliveryInfo() {
			const { data: res } = await this.$menu.get(`/kuaidi/${1106975712662}`)
			if (res.meta.status !== 200) {
				/* 网络请求失败， 弹出失败信息 */
				this.$message.error(res.meta.msg)
			} else {
				/* 网络请求成功, 将数据保存到data中 */
				this.deliveryInfo = res.data
			}
		},
	},
}
</script>

<style>
</style>