import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'

//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'

//导入nprogress的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//导入codemirror
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)



import axios from 'axios'
//设置请求的根路径
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.defaults.baseURL = "http://127.0.0.1:9992/bp/v1/"

//设置请求的拦截器 且 在request中展示进度条
axios.interceptors.request.use(config => {
    NProgress.start()
    // config.headers.Authorization = window.sessionStorage.getItem('token')
    config.headers.token = window.sessionStorage.getItem('token')
    return config
})

//在response中隐藏进度条
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})



Vue.prototype.$http = axios

Vue.config.productionTip = false

//声明第三方组件
Vue.component('tree-table', TreeTable)

//vue全局过滤器
//对日期进行过滤
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')