<template>
  <div>
    <!-- 编辑按钮 -->
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      slot="editButton"
      @click="buttonClick"
    ></el-button>
    <!-- 编辑地址对话框 -->
    <el-dialog title="修改地址" :visible.sync="showEditDialog" width="50%" @close='editLocationDialogClosed'>
      <el-form
        :model="editLocationForm"
        :rules="editLocationRules"
        ref="editLocationRef"
      >
      <!-- 编辑地址 省市区/县 级联 -->
      <el-form-item label='省市区/县 ' prop='downTown'>
        <!-- 级联选择器 -->
        <el-cascader :options='cityData' v-model="editLocationForm.downTown"></el-cascader>
      </el-form-item>
      <!-- 编辑地址对话框 详细地址 -->
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="editLocationForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑地址对话框 取消与确认按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditLocation">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* 导入中国省份 */
import cityData from '../cityData/city_data2017_element'
export default {
	data() {
		return {
			/* 编辑地址对话框的显示与隐藏 */
            showEditDialog: false,
            /* 编辑地址数据表 */
            editLocationForm:{
                downTown:[],
                address:''
            },
            /* 编辑地址 验证规则 */
            editLocationRules:{
                downTown: [
                    { required: true, message: '请选择省市区/县', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                ]
            },
            /* 中国省份城市数据源头 */
             cityData
		}
	},
	methods: {
		/* 监听 编辑地址按钮 点击事件 */
		buttonClick() {
			/* 弹出 编辑地址对话框 */
			this.showEditDialog = true
		},
		/* 监听 取消编辑地址按钮 点击事件 */
		cancelEditLocation() {
			/* 关闭 编辑地址对话框 */
			this.showEditDialog = false
			/* 弹出 取消编辑的消息 */
			this.$message.error("取消编辑地址")
        },
        /* 监听 编辑地址对话框 关闭事件 */
        editLocationDialogClosed(){
            /* 清空表单 */
            this.$refs.editLocationRef.resetFields()
        }
	},
}
</script>

<style scoped>
/* 级联选择器样式 */
.el-cascader {
    width:100%;
}
</style>