<template>
  <div>
    <!-- 添加角色按钮 -->
    <el-button type="primary" class="addRolesButton" slot="addRole" @click="addRoleClick">添加角色</el-button>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="showAddRolesDialogue" width="50%">
      <!-- 添加角色主体区 -->
      <el-form
        :model="addRoleForm"
        :rules="addRoleRules"
        ref="addRoleForm"
      ><!-- 角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加 角色 确 认 和 取消 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddRole">取 消</el-button>
        <el-button type="primary" @click="sureAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name: "addRoles",
	data() {
		return {
      showAddRolesDialogue: false,
      /* 添加角色 数据对象 */
      addRoleForm:{
        roleName:'',
        roleDesc:''
      },
      /* 添加角色 预验证规则 */
      addRoleRules:{
        roleName:[
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
		}
	},
	methods: {
		/* 监听 添加角色按钮 点击事件 ， 弹出对话框*/
		addRoleClick() {
			this.showAddRolesDialogue = true
    },
    /* 监听取消添加角色按钮 事件 */
    cancelAddRole(){
      /* 关闭对话框 */
      this.showAddRolesDialogue = false
      /* 提示用户取消 添加用户 成功 */
      this.$message.error('取消添加用户')
      /* 清空 添加用户 临时对象, 清空表格 */
      this.addRoleForm = {}
    },
    /* 监听 确认添加角色按钮 事件 */
    async sureAddRole(){
      /* 发起网络请求 */
      const {data} = await this.$menu.post('roles',{roleName:this.addRoleForm.roleName,roleDesc:this.addRoleForm.roleDesc})
      // console.log(data)
      /* 刷新列表 */
      this.$emit('updateRolesList')
      /* 关闭窗口 */
      this.showAddRolesDialogue = false
      /* 提示用户，添加角色成功 */
    }
	},
}
</script>

<style scoped>
.addRolesButton {
	margin-bottom: 15px;
}

</style>