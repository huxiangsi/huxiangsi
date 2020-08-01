import Vue from 'vue'
import axios from 'axios'

/* 封装登录页面网络请求实例 */
 const instanceLoginRequest = axios.create({
     baseURL:'http://127.0.0.1:8888/api/private/v1/'
 })
/* 在Vue实例原型上挂载登录请求实例 */
 Vue.prototype.$login = instanceLoginRequest


// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
const instanceMenuRequest = axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1/'
})
/* 配置axios拦截器，验证token字段 Authorization授权请求头 */
instanceMenuRequest.interceptors.request.use(config => {
    // console.log(config)
    /* 为请求头添加Authorization字段（token） */
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
/* Vue实例原型挂载instanceMenuRequest */
Vue.prototype.$menu = instanceMenuRequest
