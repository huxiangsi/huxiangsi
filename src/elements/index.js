import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
//按需导入element组件
import {Button,
        Input,
        Form, 
        FormItem,
        Message 

        
        } from 'element-ui'
/* Vue原型上挂载弹框消息组件 */
Vue.prototype.$message = Message

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

