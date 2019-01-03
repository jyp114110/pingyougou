// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由配置
import router from './router'

// 引入 elemtui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

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
