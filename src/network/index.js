import Vue from 'vue'
import axios from 'axios'

/* 封装登录页面网络请求实例 */
 const instanceLoginRequest = axios.create({
     baseURL:'http://127.0.0.1:8888/api/private/v1/',
 })
/* 配置网络请求拦截器 */
// instanceLoginRequest.interceptors.request.use(config => {
//     console.log(config)
// })
 /* 在Vue实例原型上挂载登录请求实例 */
 Vue.prototype.$login = instanceLoginRequest
 