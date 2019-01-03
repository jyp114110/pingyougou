// 配置路由
// 1.导入 vue 和 vue-router 包
import Vue from 'vue'
import VueRouter from 'vue-router'

// // 2. 导入 需要 成为路由的 组件
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'

// // 3.安装路由插件
Vue.use(VueRouter)

// // 4. 创建路由实例,并导出
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home }
  ]
})
// // 5. 设置 导航守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return false
  }
  // 判断是否登录过，登录过 放行，没有回到登录页
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
// 6. 导出路由
export default router
