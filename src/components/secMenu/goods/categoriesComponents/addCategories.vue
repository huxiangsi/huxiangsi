<template>
  <div>
    <!-- 添加分类按钮 -->
    <el-button type="primary" slot="addCategorie" @click="addButtonClick">添加分类</el-button>
    <!-- 添加分类 对话框 区域 -->
    <el-dialog
      title="添加分类"
      :visible.sync="showAddCategoriesDialogue"
      width="50%"
      @close="addCategoriesDialogueClosed"
    >
      <!-- 要添加的分类名称 -->
      <el-form :model="awaitCategorie" :rules="awaitCategorieRules" ref="editNameRef">
        <!-- 将要 修改的 名称 -->
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="awaitCategorie.cat_name"></el-input>
        </el-form-item>
        <!-- 父级分类 -->
        <el-form-item label="父级分类">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCategories"
            :props="cascaderProps"
            @change="parentCategorieChange"
            clearable
            change-on-select
            expand-trigger="hover"
          ></el-cascader>
        </el-form-item>
        {{awaitCategorie.cat_name}}
        {{awaitCategorie.cat_pid}}
        {{awaitCategorie.cat_level}}
      </el-form>
      <!-- 对话框 取消 与 确认 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddButton">取 消</el-button>
        <el-button type="primary" @click="sureEditButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	data() {
		return {
			/* 父级分类 数据源 */
			parentCategories: [],
			/* 将要被添加分类的对象 */
			awaitCategorie: {
				/* 将要添加分类的父级分类 id */
				cat_pid: 0,
				/* 将要添加分类的名字 */
				cat_name: "",
				/* 将要添加分类的等级 */
				cat_level: 0,
			},
			/* 将要被添加分类对象 名称 规则 */
			awaitCategorieRules: {
				cat_name: [
					{ required: true, message: "请输入分类名称", trigger: "blur" },
					{ min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
				],
			},
			/* 控制 添加分类 对话框 隐藏于显示 */
			showAddCategoriesDialogue: false,
			/* 被选中的父级分类 数组 */
			selectedKeys: [],
			/* 级联选择器  指定配置对象 */
			cascaderProps: {
				value: "cat_id",
				label: "cat_name",
				children: "children",
			},
		}
	},
	methods: {
		/* 监听 添加分类 按钮 事件 */
		addButtonClick() {
			/* 对话框弹出之前， 发起网络数据请求 */
			this.getParentCategories()
			/* 弹出对话框 */
			this.showAddCategoriesDialogue = true
		},
		/* 定义 获取 父级分类的数据 */
		getParentCategories() {
			this.$menu.get("categories", { params: { type: 2 } }).then((res) => {
				if (res.data.meta.status !== 200) {
					/* 网络请求失败， 弹出失败消息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 网络请求成功, 将数据保存到data中 */
					this.parentCategories = res.data.data
				}
			})
		},
		/* 监听 级联选择器 中 父级分类选定 事件 */
		parentCategorieChange(valArr) {
			/* 如果 分类被选中 的 数组长度 大于 0 说明，有分类被选中， 如果数组长度 = 0  说明没有选中任何父级分类 */
			if (valArr.length > 0) {
				/* 取 级联选择器 数组中 最后一位 作为当前要编辑的 分类的 父分类 */
				this.awaitCategorie.cat_pid = this.selectedKeys[valArr.length - 1]
				/* 当前要编辑的 分类 的 等级 */
				this.awaitCategorie.cat_level = valArr.length
			} else {
				/* 如果 级联选择器数组 长度为0  说明 没有选择父级分类 把当前要编辑的分类 设置为0 */
				this.awaitCategorie.cat_pid = 0
				/* 当前要编辑的 分类 的 等级 */
				this.awaitCategorie.cat_level = 0
			}
		},
		/* 监听 添加分类 取消按钮 事件 */
		cancelAddButton() {
			/* 关闭页面 */
			this.showAddCategoriesDialogue = false
		},
		/* 监听 确认添加分类 按钮 事件 */
		sureEditButton() {
			this.$refs.editNameRef.validate((valid) => {
				if (!valid) {
					/* 表单预验证，弹出预验证失败消息 */
					return this.$message.error("请输入正确的分类名称")
				} else {
					/* 预验证成功， 发起 添加分类 的网络请求 */
					this.$menu.post('categories', this.awaitCategorie).then(res => {
					    if(res.data.meta.status !== 201){
                            /* 网络请求失败，弹出失败消息 */
                            this.$message.error(res.data.meta.msg)
                        }else{
                            /* 网络请求成功， 刷新 数据列表 */
                            this.$emit('flushAddedCategories')
                            /* 关闭对话框 */
                            this.showAddCategoriesDialogue = false
                        }
					})
				}
			})
		},
		/* 监听对话框 关闭 事件 */
		addCategoriesDialogueClosed() {
			/* 清空页面中 未提交的数据 */
			this.awaitCategorie = {}
			/* 清空 未提交 已选中的父级分类 */
			this.selectedKeys = []
		},
	},
}
</script>

<style scoped>
/* 定义级联选择器的宽度 */
.el-cascader {
	width: 100%;
}
</style>