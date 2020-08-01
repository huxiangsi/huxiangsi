<template>
  <div>
    <!-- 删除用户按钮 -->
    <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUserBtn" ></el-button>
  </div>
</template>

<script>
export default {
    name: "deleteUser",
    props:['sureDeleteUser'],
	data() {
		return {
			
		}
	},
	methods: {
		deleteUserBtn() {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            /* 如果操作确定删除用户，则发起删除用户的网络请求 */
              this.$menu.delete('users/' + this.sureDeleteUser.id).then((res) => {
                  if(res.data.meta.status !== 200){
                    /* 如果网络请求删除 数据失败，提示用户失败信息 */
                    return this.$message.error(res.data.meta.msg);
                  }else{
                      /* 如果删除用户网络请求成功 
                            1. 刷新用户列表*/
                      this.$emit('sureDeleteUserEvetn')
                  }
              })
          this.$message({
              
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
            
		},
	},
}
</script>

<style>
</style>