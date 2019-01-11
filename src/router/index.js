// 配置路由
// 1.导入 vue 和 vue-router 包
import Vue from 'vue'
import VueRouter from 'vue-router'

// // 2. 导入 需要 成为路由的 组件
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import NotFound from '@/components/404/NotFound'

// import Users from '@/components/users/Users'
// import Roles from '@/components/roles/Roles'
// import Rights from '@/components/rights/Rights'
// import Category from '@/components/category/Category'
// import Goods from '@/components/goods/Goods'
// import GoodsAdd from '@/components/goods-add/GoodsAdd'
// import NotFound from '@/components/404/NotFound'

//  将路由修改为按需加载
const Users = () => import('@/components/users/Users')
const Roles = () => import('@/components/roles/Roles')
const Rights = () => import('@/components/rights/Rights')
const Category = () => import('@/components/category/Category')

// 通过特殊语法 /* webpackChunkName: "goods" */
// 可以将多个组件合并为一个js文件输出
// 只要保证 webpackChunkName 的值相同即可

const Goods = () => import(/* webpackName:'goods' */ '@/components/goods/Goods')
const GoodsAdd = () => import(/* webpackName */ '@/components/goods-add/GoodsAdd')

// // 3.安装路由插件
Vue.use(VueRouter)

// // 4. 创建路由实例,并导出
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/users', component: Users},
        {path: '/roles', component: Roles},
        { path: '/rights', component: Rights },
        {path: '/categories', component: Category},
        /*
          '/goods/:pagenum?' 路由模糊匹配
        */
        {path: '/goods/:pagenum?', component: Goods},
        { path: '/goods-add', component: GoodsAdd }

      ]
    },
    /*
         // 通配符，可以匹配所有的路径，因此，这个路由规则应该出现在最后！！！
        // 优先匹配上述所有的路由规则，如果上面这些规则无法匹配，再匹配该路由
      */
    { path: '*', component: NotFound }
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
