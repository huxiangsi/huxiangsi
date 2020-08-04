<template>
  <div>
    <!-- 编辑角色按钮 -->
    <el-button size="mini" type="primary" icon="el-icon-edit" slot="editRole" @click="editRoleClick">编辑</el-button>
    <!-- 编辑角色 对话框 -->
    <el-dialog title="编辑角色" :visible.sync="showEditRolesDialogue" width="50%">
      <!-- 添加角色主体区 -->
      <el-form :model="editRoleForm" :rules="editRoleRules" ref="editRoleForm">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName">{{roleInfo}}</el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
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
  name: "editRoles",
  props:['roleInfo'],
  data(){
    return{
      /* 编辑角色 对话框 显示与隐藏 */
      showEditRolesDialogue:false,
      /* 编辑角色 数据源 对象 */
      editRoleForm:{
        roleName:'',
        roleDesc:''
      },
      /* 编辑角色 规则 */
      editRoleRules:{
        roleName:[
          /* 角色id */
          /* 角色名 */
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    /* 监听 编辑角色按钮 事件 */
    editRoleClick(){
      /* 弹出编辑角色对话框 */
      this.showEditRolesDialogue = true
    },
    /* 监听 取消编辑角色 按钮 事件 */
    cancelAddRole(){
      /* 关闭对话框 */
      this.showEditRolesDialogue = false 
      /* 清空 表格中 未提交的数据 */
      this.editRoleForm = {}
      /* 弹出取消编辑消息 */
      this.$message.error('取消编辑角色信息')
    },
    /* 监听 确认按钮 事件 */
    async sureAddRole(){
      /* 发起网络请求 */
      const {data} = await this.$menu.put(`roles/${this.roleInfo.id}`, {roleName:this.editRoleForm.roleName, roleDesc:this.editRoleForm.roleDesc})
      if(data.meta.status !== 200){
        /* 请求失败，弹出失败消息 */
        this.$message.error(data.meta.msg)
      }else{
        /* 数据请求成功 */
       // 刷新列表
       this.$emit('updateRoleEdited')
       // 关闭对话框
       this.showEditRolesDialogue = false 
      }
    }
  }
}
</script>

<style scoped>
</style>