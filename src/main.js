import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './elements/index'
/* 导入 vue-table-with-tree-grid 依赖 */
import './treeGrid/index'
// import ZkTable from 'vue-table-with-tree-grid'
// Vue.component('tree-table', ZkTable)
/* 导入登录组件的网络请求 */
import './network/index'
/* 导入时间过滤器 */
import './timeFilter/index'
/* 导入富文本编辑器 */
import './quillEditor/index'
/* 配置请求的根路径 */
// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  // App,
  router,
  render: h => h(App),
}).$mount('#app')
