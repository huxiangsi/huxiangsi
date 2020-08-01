<template>
  <div>
    <!-- 修改用户信息按钮 -->
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      slot="editUserInfo"
      @click="editUserInfoBtn"
    ></el-button>
    <!-- 修改用户信息对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="showEditDialogue" width="50%" 
        @close='editUserInfoClosed'>
      <!-- 修改用户信息 表单区 -->
      
      <el-form
        :model="userInfo"        
        :rules="editUserRules"
        ref="editUserInfoRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" :disabled="true"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditUserInfo">取 消</el-button>
        <el-button type="primary" @click="submitNewUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name: "editUserInfo",
	/* 接收父组件通过 属性绑定 传来的用户信息 */
	props: ["userInfo"],
	data() {
         /* 定义校验邮箱的验证规则 */
        var checkEmail = (rules, value, callback) => {
            // 使用正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            /* 如果合法，执行回掉函数 */
            if(regEmail.test(value)){ return callback()}
            /* 如果不合法，返回错误信息 */
            return callback(new Error('请输入合法的邮箱'))
        }
        /* 定义校验手机号的验证规则 */
        var checkMobile = (rules, value, callback) => {
            const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[687]|18[0-9]|14[57])[0-9]{8}$/
            if(regMobile.test(value)){
                return callback()
            }else{
                return callback(new Error('请输入正确的手机号'))
            }
        }
		return {
			/* 对话框显示与隐藏 */
			showEditDialogue: false,
			/* 表单验证规则 */
			editUserRules: {
                /* 邮箱规则 */
                email:[
                   { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                   {validator:checkEmail, trigger:'blur'}
                   // { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                /* 电话规则 */
                mobile:[
                    {required: true, message:'请输入电话', trigger: 'blur'},
                    // {type:'phone', message:'请输入正确的电话', trigger:'blur'}
                    {validator:checkMobile, trigger:'blur'}
                ]
            }
		}
	},
	methods: {
		/* 用户点击，开启对话框 */
		editUserInfoBtn() {			
			this.showEditDialogue = true
		},
        /* 监听 修改用户信息对话框关闭 事件 */
        editUserInfoClosed(){
            // 对话框关闭后，清空表格中的数据
            this.$refs.editUserInfoRef.resetFields()
        },
        /* 监听 取消按钮 事件 */
        cancelEditUserInfo(){
            /* 关闭对话框 */
            this.showEditDialogue = false
            /* 清空表格中的数据 */
            this.$refs.editUserInfoRef.resetFields()
        },
        /* 监听 确认按钮 事件 */
        submitNewUserInfo(){
            /* 提交之前，对表单进行预验证 */
            this.$refs.editUserInfoRef.validate((valid) => {
                /* 如果预验证不通过，直接中断，关闭窗口  并弹出失败消息*/
                if(!valid) {
                     /* 关闭对话框 */
                    this.showEditDialogue = false
                    // 对话框关闭后，清空表格中的数据
                    this.$refs.editUserInfoRef.resetFields()
                    return
                }else{
                    /* 如果通过了，则发起网络请求 */
                    this.$menu.put('users/' + this.userInfo.id,{email:this.userInfo.email, mobile:this.userInfo.mobile}).then(res => {
                        if(res.data.meta.status !== 200){
                            return this.$message.error(res.data.meta.msg)
                        }else{
                            /* 如果请求成功 */
                            //关闭对话框
                            this.showEditDialogue = false
                            //刷新数据列表
                            this.$emit('editUsersInfoEvent')
                            //提示用户更新成功
                            this.$message.success('用户信息更新成功')
                        }
                    })
                }
            })
        }
	}
}
</script>

<style>
</style>