<template>
  <div>
    <!-- 添加动态参数 表单区 -->
    <el-table :data="staticAttrs" border stripe>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <el-tag
          class="expandTagsStyle"
          v-for="(item, index) in expandTagsList"
          :key="index"
        >{{item}}</el-tag>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>
      <!-- 属性名列 -->
      <el-table-column label="属性名称" prop="attr_name"></el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="editButtonClick(scope.row)"
          >修改</el-button>
          <!-- 删除按钮 -->
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteButtonClick(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改参数对话框 -->
    <el-dialog title="修改动态参数" :visible.sync="showEditParamsDialog" width="50%">
      <!-- 添加参数表单 -->
      <el-form :model="editParamsForm" :rules="editParamsRules" ref="awatiParamsRef">
        <el-form-item label="修改动态参数" prop="attr_name">
          <el-input v-model="editParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加参数 取消 与 确认 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditParams">取 消</el-button>
        <el-button type="primary" @click="sureEditParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	props: ["goodsCategoryId"],
	data() {
		return {
			staticAttrs: [],
			/* 修改参数 对话框 数据源 */
			editParamsForm: {
				attr_name: "",
				attr_id: 0,
			},
			/* 修改参数对话框的 显示与隐藏 */
			showEditParamsDialog: false,
			/* 修改参数 对话框 数据名字的 规则 */
			editParamsRules: {
				attr_name: [
					{ required: true, message: "请输入参数名称", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
			},
			/* 展开行渲染数据源 */
			expandTagsList: [],
		}
	},
	methods: {
		/* 发起网络请求 ,获取静态属性数据 */
		getStaticAttrs() {
			this.$menu
				.get(`categories/${this.goodsCategoryId}/attributes`, {
					params: { sel: "only" },
				})
				.then((res) => {
					if (res.data.meta.status !== 200) {
						/* 网络请求失败, 弹出失败消息 */
						this.$message.error(res.data.meta.msg)
					} else {
						// console.log(res.data.data)
						res.data.data.forEach((item) => {
							/* 三元表达式 判断数组是不是为空 */
							this.expandTagsList = item.attr_vals
								? item.attr_vals.split(",")
								: []
						})
						/* 发起网络请求成功 , 把数据保存到data中 */
						this.staticAttrs = res.data.data
						// console.log(res.data.data)
					}
				})
		},
		/* 监听 修改参数按钮 事件 */
		editButtonClick(currentAttrName) {
			/* 把当前参数的名称 保存到 data中 供页面输入框显示 */
			this.editParamsForm.attr_name = currentAttrName.attr_name
			this.editParamsForm.attr_id = currentAttrName.attr_id
			/* 弹出对话框 */
			this.showEditParamsDialog = true
		},
		/* 监听 取消修改参数 事件 */
		cancelEditParams() {
			/* 关闭对话框 */
			this.showEditParamsDialog = false
			/* 清空表单中未提交的数据 */
		},
		/* 监听 确认修改参数 事件 */
		sureEditParams() {
			/* 发起 修改参数 的网络 请求 */
			this.$menu
				.put(
					`categories/${this.goodsCategoryId}/attributes/${this.editParamsForm.attr_id}`,
					{ attr_name: this.editParamsForm.attr_name, attr_sel: "only" }
				)
				.then((res) => {
					if (res.data.meta.status !== 200) {
						/* 网络请求失败, 弹出失败消息 */
						this.$message.error(res.data.meta.msg)
					} else {
						/* 刷新列表 */
						this.getStaticAttrs()
						/* 网络请求成功 关闭对话框 */
						this.showEditParamsDialog = false
						/* 弹出更新成功 消息 */
						this.$message.success(res.data.meta.msg)
					}
				})
		},
		/* 监听 删除按钮 事件 */
		deleteButtonClick(currentAttr) {
			/* 弹出 确认弹框 */
			this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					/* 确认删除, 发起删除参数的网络请求 */
					this.$menu
						.delete(
							`categories/${this.goodsCategoryId}/attributes/${currentAttr.attr_id}`
						)
						.then((res) => {
							if (res.data.meta.status !== 200) {
								/* 删除 参数 网络请求失败, 弹出失败消息 */
								this.$message.error(res.data.meta.msg)
							} else {
								/* 删除 参数成功 弹出成功消息 */
								this.$message.success(res.data.meta.msg)
								/* 刷新 列表 */
								this.getStaticAttrs()
							}
						})
				})
				.catch(() => {
					/* 取消删除参数, 弹出 取消删除的消息 */
					this.$message.error("取消删除参数")
				})
		},
	},
}
</script>

<style scoped>
.el-table {
	height: 500px;
	overflow: scroll;
}
</style>