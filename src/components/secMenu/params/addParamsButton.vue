<template>
  <div>
    <!-- 添加参数按钮 -->
    <el-button type="primary" size="mini" slot="addParamsBtn" @click="addParamsBtnClick" :disabled='this.currentCategoryId == 0 ? true : false '>添加参数</el-button>
    <!-- 添加参数表单 对话框 -->
    <el-dialog :title="'添加'+ addParamsLabelTitle" :visible.sync="showAddParamsDialog" width="50%" @close='addParamsDialogClosed'>
      <!-- 添加参数表单 -->
      <el-form :model="awatiParamsForm" :rules="awatiParamsRules" ref="awatiParamsRef">
        <el-form-item :label="addParamsLabelTitle" prop="attr_name">
          <el-input v-model="awatiParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加参数 取消 与 确认 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddParams">取 消</el-button>
        <el-button type="primary" @click="sureAddParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	/* 从父组件获取当前活跃的tag */
	props: ["activeTag", "currentCategoryId"],
	data() {
		return {
			/* 控制添加参数 对话框的显示与隐藏 */
			showAddParamsDialog: false,
			/* 添加参数 数据源 */
			awatiParamsForm: {
				attr_name: "",
			},
			/* 添加参数规则 */
			awatiParamsRules: {
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
		}
	},
	methods: {
		/* 监听添加参数 按钮点击 事件 */
		addParamsBtnClick() {
			/* 弹出添加参数对话框 */
			this.showAddParamsDialog = true
		},
		/* 监听取消添加动态参数按钮 事件 */
		cancelAddParams() {
			/* 关闭对话框 */
			this.showAddParamsDialog = false
			/* 清空 已填写 未提交的数据 */
			this.awatiParamsForm = {}
			/* 弹出 取消添加参数消息 */
			this.$message.error(`取消添加${this.addParamsLabelTitle}`)
        },
        /* 监听 添加参数 对话框 关闭 事件 */
        addParamsDialogClosed(){
            /* 清空 已填写 未提交的数据 */
			this.awatiParamsForm = {}
        },
		/* 监听 确定添加 动态参数按钮 事件 */
		sureAddParams() {
			/* 表单预验证 */
			this.$refs.awatiParamsRef.validate((valid) => {
				if (!valid) {
					/* 预验证失败 , 弹出错误消息 */
					return this.$message.error("请输入合法的动态参数名称")
				} else {
					if (this.currentCategoryId == 0) {
						/* 如果当前 分类id 为默认值 0  说明 没有选定三级分类 */
						return this.$message.error("您还没有选择对应的三级分类")
					} else {
						/* 预验证成功 并且 选定了 三级分类 发起 网络请求 */
						/* 如果当前活跃的tag 是 动态参数 ,则发起动态网络请求 */
						if (this.activeTag == "dynamic") {
							this.$menu
								.post(`categories/${this.currentCategoryId}/attributes`, {
									attr_name: this.awatiParamsForm.attr_name,
									attr_sel: "many",
								})
								.then((res) => {
									/* 关闭对话框 */
									this.showAddParamsDialog = false
									/* 重置数据表单 */
									// this.awatiParamsForm = {}
									/* 弹出 添加参数成功的消息 */
                                    this.$message.success(res.data.meta.msg)                                    
                                    /* 刷新 动态参数 列 表 */
                                    this.$emit('invokeFlushPramasListFn')
								})
						} else {
							/* 如果当前活跃的tag是 静态属性 , 则发起 静态属性 网络请求 */
							this.$menu
								.post(`categories/${this.currentCategoryId}/attributes`, {
									attr_name: this.awatiParamsForm.attr_name,
									attr_sel: "only",
								})
								.then((res) => {
                                    /* 刷新 静态属性 列表 */
                                    this.$emit('invokeFlushPramasListFn')
									/* 关闭对话框 */
									this.showAddParamsDialog = false
									/* 重置数据表单 */
									// this.awatiParamsForm = {}
									/* 弹出 添加参数成功的消息 */
                                    this.$message.success(res.data.meta.msg)
                                    
								})
						}
					}
				}
			})
		},
	},
	computed: {
		addParamsLabelTitle() {
			if (this.activeTag == "dynamic") {
				return "动态参数"
			} else {
				return "静态属性"
			}
		},
	},
}
</script>

<style>
</style>