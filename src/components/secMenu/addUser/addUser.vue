<template>
  <div>
    <el-button type="primary" slot="addUserButton" @click="addUserBtn" >添加用户</el-button>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close='addUserFormClosed'>
      <!-- 添加用户主体区 -->
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserRef" label-width="100px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password" type="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 信息确认区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserVerify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name: "addUser",
	methods: {
		addUserBtn() {
            /* 添加用户对话框开关 */
			this.dialogVisible = true
        },
        /* 监听 添加用户对话框关闭 事件 */
        addUserFormClosed(){
            //对话框关闭后，清空表单中的数据
            /* 思路：1.监听对话框关闭事件，
                    2.通过ref引用获取到表单对象
                    3.调用element提供的清空表单的方法 */
            this.$refs.addUserRef.resetFields()
        },
        /* 监听 用户点击“确认按钮” 进行表单预验证 */
        addUserVerify(){
            /* 思路：
                    1.通过ref引用获取到表单对象
                    2.调用预验证方法     */
            this.$refs.addUserRef.validate((res) => {
                if(!res){
                    /* 如果表单预验证失败，则结束创建用户 */
                    return
                }else{
                    /* 如果预验证成功，可以发起网络请求 */
                    this.$menu.post('users', this.addUserForm).then(res => {
                        if(res.data.meta.status !== 201){
                            /* 弹出添加用户失败消息 */
                            this.$message.error(res.data.meta.msg)
                        }else{
                            /* 弹出添加用户成功消息 */
                            this.$message.success(res.data.meta.msg)   
                            /* 隐藏对话框 */
                            this.dialogVisible = !this.dialogVisible
                            /* 刷新用户列表 */
                            /* 思路：子组件调用父组件的方法updateUserList
                                    1.子组件在父组件模板中的标签上，注册自定义事件，
                                    监听父组件的事件
                                    2.子组件中，通过this.$emit('updateUserList')方法，调用父组件中自定义的事件名 */
                            this.$emit('updateUserList')
                        }
                    })
                }
            })        
        }
	},
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
            /* 控制添加用户对话框的显示与隐藏 */
            dialogVisible: false,
            /* 添加用户新的的对象 */
            addUserForm: {
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            /* 添加用的信息的规则 */
			addUserRules: {
                /* 用户名规则 */
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" },
                ],
                /* 密码规则 */
                password:[
                    { required: true, message: "请输入密码", trigger: "blur" },
					{ min: 8, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" },  
                ],
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
			},
		}
	},
}
</script>

<style>
</style>