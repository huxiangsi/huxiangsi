<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card -->
    <el-card>
      <!-- 2. echarts 区域 宽600 高 400 -->
      <div id="main" style="width:750px; height:400px"></div>
    </el-card>
  </div>
</template>

<script>
/* 1. 按需导入Echarts */
import echarts from "echarts"
/* 导入lodash 使用lodash合并数据 */
import _ from "lodash"
export default {
	name: "reports",
	data() {
		return {
			/* 折线图需要合并的数据 */
			options: {
				title: {
					text: "用户来源",
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#E9EEF3",
						},
					},
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: [
					{
						boundaryGap: false,
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
			},
		}
	},
	/* 执行到mounted钩子时，证明DOM 元素已经被渲染完毕 */
	async mounted() {
		/* 3. 基于准备好的dom  初始化echarts实例 */
		var myEcharts = echarts.init(document.querySelector("#main"))

		/* 发起网络请求 获取折线图数据 */
		const { data: res } = await this.$menu.get(`reports/type/1`)
		if (res.meta.status !== 200) {
			/* 网络请求失败，返回失败信息 */
			this.$message.error(res.meta.msg)
		} else {
			/* 数据请求成功 */
			// console.log(res.data)
		}
		/* 4.准备数据配置项 */
		const result = _.merge(res.data, this.options)
		/* 5.展示数据 */
		myEcharts.setOption(result)
	},
}
</script>

<style scoped>
/* 设置面包屑导航下外边距 */
.el-breadcrumb {
	margin-bottom: 15px;
}
</style>