import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users.vue'
import JobList from '../components/jobs/JobList.vue'
import JobSet from '../components/jobs/JobSet.vue'
import Logs from '../components/logs/Logs.vue'
import SystemConfig from '../components/systemconf/SystemConfig.vue'
import Cate from '../components/goods/Cate.vue'
import Parmas from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'



Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login',component: Login},
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
                path: '/welcome',
                component: Welcome
            },
            {
                path: '/users',
                component: User                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

            },
            {
                path: '/jobs',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                component: JobList
            },
            {
                path: '/jobset',
                component: JobSet
            },
            {
                path: '/logs',
                component:Logs
            },
            {
                path: '/system_config',
                component: SystemConfig
            },
            {
                path: '/categories',
                component: Cate
            },
            { path: '/params', component: Parmas },
            { path: '/goods', component: GoodsList }
        ]
    }

]

const router = new VueRouter({
    routes
})

//添加导航守卫
router.beforeEach((to, from, next) => {
    //to要去的页面
    //from 从哪个页面来
    //next是个函数,表示放行
    //一定要是单引号
    if (to.path === '/login') return next()
    //把有关token的先去掉
    // const tokenStr = window.sessionStorage.getItem('token')
    // if (!tokenStr) return next('/login')
    next()

})

export default router