<template>
  <div>
    <!-- 编辑 按钮 -->
    <!-- 确认消息 弹框 -->
    <el-button
      size="mini"
      type="danger"
      icon="el-icon-delete"
      slot="deleteCategorie"
      @click="deleteCategorie"
    >删除</el-button>
  </div>
</template>

<script>
export default {
	props: ["categorieInfo"],
	methods: {
		/* 监听 删除分类 按钮 事件 */
		deleteCategorie() {
			this.$confirm("此操作将永久删除该分类, 是否继续?", "删除分类", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					/* 确认删除分类， 发起删除分类的 网络请求 */
					this.$menu
						.delete(`categories/${this.categorieInfo.cat_id}`)
						.then((res) => {
							if (res.data.meta.status !== 200) {
								/* 删除失败，弹出删除失败消息 */
								this.$message.error(res.data.meta.msg)
							} else {
								/* 删除成功 ， 刷新列表 */
								this.$emit("flushEditedCategory")
							}
						})
				})
				.catch(() => {
					/* 用户取消 ，弹出取消删除分类消息 */
					this.$message.success("取消删除分类")
				})
		},
	},
}
</script>

<style>
</style>