// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由配置
import router from './router'

// 引入 elemtui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 index.css
import '@/assets/css/index.css'

//  优化 axios
import axios from 'axios'

// 引入 element-tree 组件
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)

// 1. 将 axios 添加到 vue 原型上 这样全局都能使用
Vue.prototype.$http = axios
// 2. 设置基准路由
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 3 利用请求拦截器，同一添加 token
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

// 安装 elementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 将 路由router 与 vue 实例 关联在一起
  router,
  components: { App },
  template: '<App/>'

})
