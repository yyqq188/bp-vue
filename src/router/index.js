import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        component: Login
    },
    {
        path: "/home",
        component: Home
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
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()

})

export default router