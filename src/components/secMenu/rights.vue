<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 卡片区域 -->
    <el-card>
      <!-- 表单区 -->
      <el-table :data="rightsList" style="width: 100%" border stripe max-height="600">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <!--  -->
            <el-tag v-if="scope.row.level == 0">一级权限</el-tag>
            <el-tag v-else-if="scope.row.level == 1" type="success">二级权限</el-tag>
            <el-tag v-else type="warning">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
	name: "rights",
	data() {
		return {
			rightsList: [],
		}
	},
	methods: {
		/* 发起网络请求 获取权限列表数据 */
		getRightsList() {
			this.$menu.get("rights/" + "list").then((res) => {
				if (res.data.meta.status !== 200) {
					/* 如果权限列表数据请求失败，则弹出失败消息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 如果请求成功，把请求到的数据保存到data中 */
					this.rightsList = res.data.data
					// console.log(res.data.data)
				}
			})
		},
	},
	created() {
		this.getRightsList()
	},
}
</script>

<style>
.el-card {
	margin-top: 15px;
}
</style>