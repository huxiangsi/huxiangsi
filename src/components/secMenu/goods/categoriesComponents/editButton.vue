<template>
  <div>
    <!-- 编辑按钮 -->
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      slot="editCategorie"
      @click="editCategorieButtonClick"
    >编辑</el-button>
    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="showEditCategoryDialog" width="50%">
      <!-- 编辑分分类 对话框 主体区 -->
      <el-form
        :model="editCategorieForm"
        :rules="editCategorieRules"
        ref="editCategorieRef"
      >
        <el-form-item label="新的分类名称" prop="name">
          <el-input v-model="editCategorieForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑分类对话框 取消 与 确认 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditCategorieButton">取 消</el-button>
        <el-button type="primary" @click="sureEditCategorieButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:['categorieInfo'],
	data() {
		return {
			/* 对话框的显示与隐藏 */
			showEditCategoryDialog: false,
			/* 新的分类名称 */
			editCategorieForm: {
				name: "",
			},
			/* 新的分类 名称 规则 */
			editCategorieRules: {
				name: [
					{ required: true, message: "请输入分类名称", trigger: "blur" },
					{ min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" },
				]
			},
		}
	},
	methods: {
		/* 监听 编辑分类 按钮 事件 */
		editCategorieButtonClick() {
			/* 弹出对话框 */
			this.showEditCategoryDialog = true
    },
    /* 监听 取消编辑分类 按钮 */
    cancelEditCategorieButton(){
      /* 关闭页面 */
      this.showEditCategoryDialog = false
      /* 清空 表单中 未提交的数据 */
      this.editCategorieForm = {}
      /* 弹出取消编辑 分类名称消息*/
      this.$message.error('取消编辑分类')
    },
    /* 监听确认编辑分类按钮事件 */
    sureEditCategorieButton(){
      /* 表单预验证 */
      this.$refs.editCategorieRef.validate(valid => {
        if(!valid){
          /* 预验证失败，弹出失败消息 */
          this.$message.error('分类名称不合法')
        }else{
          /* 预验证成功， 发起网络请求 */
          this.$menu.put(`categories/${this.categorieInfo.cat_id}`, {cat_name:this.editCategorieForm.name}).then(res => {
            if(res.data.meta.status !== 200){
              /* 网络请求失败 返回失败信息 */
              this.$message.error(res.data.meta.msg)
            }else{
              /* 关闭对话框 */
              this.showEditCategoryDialog = false
              /* 网络请求成功 ， 刷新列表*/
              this.$emit('flushEditedCategory')
            }
          })
        }
      })
    }
	},
}
</script>

<style>
</style>