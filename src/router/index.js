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
        meta:{title:'主页'}
    }
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