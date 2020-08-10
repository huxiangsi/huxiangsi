import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
//按需导入element组件
import {Button,
        Input,
        Form, 
        FormItem,
        Message,
        Container,
        Aside,
        Main,
        Header,
        Menu,
        Submenu,
        MenuItem,
        Breadcrumb,
        BreadcrumbItem,
        Table,
        TableColumn,
        Pagination,
        Card,
        Row,
        Col,
        Switch,
        Tooltip,
        Dialog,
        MessageBox,
        Tag,
        Tree,
        Option,
        Select,
        Cascader,
        Alert,
        Tabs,
        TabPane,
        Step,
        Steps,
        RadioGroup,
        Checkbox,
        CheckboxGroup,
        Upload

        
        } from 'element-ui'
/* Vue原型上挂载弹框消息组件 */
Vue.prototype.$message = Message
Vue.prototype.$confirm =  MessageBox.confirm

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Option)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Step)
Vue.use(Steps)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)


