import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'Login',
        meta:{title:'登录'}
    },
    {
        path:'/Login',
        component:() => import('../components/Login'),
        meta:{title:'登录'}
    },
    {
        path:'/Home',
        component:() => import('../components/Home'),
        meta:{title:'主页'},
        redirect:'/Welcome',
        children:[
            {
                path:'/Welcome',
                component: () => import('../components/Welcome'),
                meta:{title:'欢迎您'}
            },
            {
                path:'/users',
                component:() => import('../components/secMenu/users')
            },
            {
                path:'/roles',
                component:() => import('../components/secMenu/roles')
            },
            {
                path:'/rights',
                component:() => import('../components/secMenu/rights')
            },
            {
                path:'/goods',
                component:() => import('../components/secMenu/goods'),                
            },
            {
                path:'/addGoods',
                component: () => import('../components/secMenu/goods/goodsList/addGoods')
            },
            {
                path:'/params',
                component:() => import('../components/secMenu/params')
            },
            {
                path:'/categories',
                component:() => import('../components/secMenu/categories')
            },
            {
                path:'/orders',
                component:() => import('../components/secMenu/orders')
            },
            {
                path:'/reports',
                component:() => import('../components/secMenu/reports')
            }
        ]
    },
    // {
    //     path:'/users',
    //     component:() => import('../components/secMenu/users'),
    //     meta:{title:'用户列表'}
    // }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

router.beforeEach((to, from, next) => {
    if(to.path === '/Login') return next()
    
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr){
        /* 默认网页标题 */
        document.title = '登录';
        return next('/Login')
    } 
 //设置网页标题
    document.title = to.matched[0].meta.title;
    next();
})


export default router