<template>
  <div>
      <!-- 删除角色按钮 -->
      <el-button size="mini" type="danger" icon="el-icon-delete" slot="deleteRole" @click="deleteRoleClick">删除</el-button>
      <!-- 删除角色对话框 -->
    <el-dialog title="删除角色" :visible.sync="showDeleteRolesDialogue" width="50%">
      <!-- 添加角色主体区 -->
      <el-form :model="deleteRole" ref="editRoleForm" disabled>
        <!-- 角色名称 -->
        <el-form-item label="将被删除角色名称" >
          <el-input v-model="deleteRole.roleName">{{deleteRole.roleName}}</el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="将被删除角色描述" >
          <el-input v-model="deleteRole.roleDesc">{{deleteRole.roleDesc}}</el-input>
        </el-form-item>
      </el-form>
      <!-- 添加 角色 确 认 和 取消 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDeleteRole">取 消</el-button>
        <el-button type="primary" @click="sureDeleteRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'deleteRoles',
    props:['deleteRole'],
    data(){
      return{
        /* 控制 删除角色对话框显示 与隐藏 */
        showDeleteRolesDialogue:false,
        /* 删除角色 数据源 */
        // deleteRoleForm:{
        //   roleName:'',
        //   roleDesc:''
        // }
      }
    },
    methods:{
      /* 监听 删除角色按钮 事件 */
      deleteRoleClick(){
        /* 弹出警告框 */
        this.showDeleteRolesDialogue = true
      },
      /* 监听 取消删除角色 按钮 */
      cancelDeleteRole(){
        /* 用户点击取消按钮，关闭对话框 */
        this.showDeleteRolesDialogue = false
        /* 提示用户 取消删除角色 */
        this.$message.error('取消删除角色')
      },
      /* 监听确认删除角色按钮 */
      async sureDeleteRole(){
        /* 发起网络请求 ，删除用户角色 数据 */
        const {data} = await this.$menu.delete(`roles/${this.deleteRole.id}`)
        if(data.meta.status !== 200){
          /* 删除失败，弹出消息 */
          this.$message.error(data.meta.msg)
        }else{
          /* 删除成功 ,关闭对话框*/
          this.showDeleteRolesDialogue = false
          //刷新数据列表
          this.$emit('flushDeletedRolesList')
        }
      }
    }
}
</script>

<style scoped>

</style>