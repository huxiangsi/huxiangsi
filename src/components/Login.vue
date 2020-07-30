<template>
  <div>
      <div class="login_container">
          <!-- 登录框 -->
          <div class="login_box">
              <!-- 头像框 -->
              <div class="avator_box">
                  <img src="../assets/logo.png" alt="">
              </div>
              <!-- 登录表单区 -->
              <el-form label-width="0px" class="login_form" :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
                  <!-- 用户名 -->
                <el-form-item prop="name">
                    <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item class="btnClass">
                     <el-button type="primary" @click="loginBtn">登录</el-button>
                     <el-button type="info" @click="resetLoginBtn">重置</el-button>
                </el-form-item>
              </el-form>  
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Login',
    data(){
       return{
           /* 登录表单数据绑定对象 */
            loginForm:{
                username:'admin',
                password:'123456'
            },
            /* 表单验证规则对象 */
            loginFormRules:{
                /* 用户名验证是否合法 */
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                /* 密码验证是否合法 */
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }        
    },
    methods:{
        /* 登录预验证 */
        loginBtn(){
            /* validate第一个参数是布尔值，进行判断是否发起网络请求 */
            this.$refs.loginFormRef.validate(valid => {
                if(!valid) return;
                this.$login.post('login',this.loginForm).then(res => {
                    if(res.data.meta.status !== 200) return this.$message.error('登录失败');;
                    this.$message.success('登录成功')
                    /*  1.登录成功后把token保存到sessionStorage 
                        2.项目中除了登录之外的其他API接口，必须在登录之后才能访问
                        3.通过编程式接口跳转到后台主页，路由地址是 /home
                    */
                    window.sessionStorage.setItem('token',res.data.data.token)
                    /* 通过编程式导航(对象)，跳转路由 */
                    this.$router.push('/Home')
                })
                
            })
        },
        /* 重置表单数据 */
        resetLoginBtn(){
            this.$refs.loginForm.resetFields();
        }
    }
}
</script>

<style>
    /* 登录界面 */
    .login_container{
       
        background-color: #2f4f6f;
        position: absolute;
        height: 100%;
        width: 100%;
    }
    /* 登录框 */
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    /* 头像框 */
    .avator_box{
        height: 130px;
        width: 130px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid rgb(233, 221, 221) ;
        border-radius: 50%;
        box-shadow: 0 0 20px #fff;
        overflow: hidden;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .avator_box img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
    .btnClass{
        /* text-align: center; */
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }
</style>