<template>
  <div>
    <!-- 分配角色  按钮 -->
    <el-button
      size="mini"
      type="warning"
      icon="el-icon-setting"
      slot="allotRole"
      @click="allotRolesClick"
    ></el-button>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="showAllotRolesDialogue" width="50%">
      <!-- 分配角色 对话框 主体区 -->
      <p>用户名:{{userInfo.username}}</p>
      <p>已拥有角色： {{userInfo.role_name}}</p>
      <!-- {{rolesList}} -->
      <p>
        分配新角色：
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <!-- 分配角色对话框 取消与确认按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAllotRoles">取 消</el-button>
        <el-button type="primary" @click="sureAllotRoles(userInfo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name: "allotRoles",
	/* 当前角色数据源 */
	props: ["userInfo"],
	data() {
		return {
			/* 控制 分配橘色对话框的 显示与隐藏 */
			showAllotRolesDialogue: false,
			/* 角色列表 */
            rolesList: [],
            /* 被选中的 角色id */
            selectedRoleId:''
            
		}
	},
	methods: {
		/* 监听 点击分配角色按钮 事件 弹出对话框 */
		allotRolesClick() {
			/* 展示对话框之前，获取到所有角色的数据 */
			/* 发起分配角色 网络请求 */
			this.$menu.get(`roles`).then((res) => {
				if (res.data.meta.status !== 200) {
					/* 角色获取失败，弹出失败消息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 网络请求成功，把数据保存到data中 */
					this.rolesList = res.data.data
				}
			})
			this.showAllotRolesDialogue = true
		},
		/* 监听 取消分配角色按钮 事件 */
		cancelAllotRoles() {
			/* 弹出取消分配角色消息 */
			this.$message.error("取消分配角色")
			/* 关闭对话框 */
			this.showAllotRolesDialogue = false
		},
		/* 监听 分配角色按钮 事件 */
		sureAllotRoles(user) {
            /* 发起分配角色 的 网络请求 */
            this.$menu.put(`users/${user.id}/role`,{rid:this.selectedRoleId}).then(res => {
                if(res.data.meta.status !== 200){
                    /* 网络请求不成功 返回失败消息 */
                    this.$message.error(res.data.meta.msg)
                }else{
                    /* 网络请求成功 刷新列表， 关闭对话框 */
                    this.showAllotRolesDialogue = false 
                    this.$emit('flushAllotedList')
                    /* 重置对话框中已选的数据 */
                    this.selectedRoleId = ''
                }
            })
        },
	},
}
</script>

<style>
</style>