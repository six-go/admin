import Vue from 'vue'
// 引入vueRouter
import VueRouter from 'vue-router'

// 声明使用VueRouter
Vue.use(VueRouter)

// 引入所有路由
import routes from './routes'

// // 引入获取管理员信息
import { reqAdminInfo } from '../api'

// 引入store对象
import store from '../store'
// // 弹框
import { message } from 'ant-design-vue'

// 重写VueRouter原型方法
const routerPush = VueRouter.prototype.push
const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (path) {
  return routerPush.call(this, path).catch(err => err)
}
VueRouter.prototype.replace = function (path) {
  return routerReplace.call(this, path).catch(err => err)
}

// 暴露router对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const result = await reqAdminInfo()
  if (result.status === 1) {
    // 登陆过
    if (to.path === '/') {
      // 直接跳首页
      next('/manage')
      message.success('经检查，您登陆过!')
    } else {
      next()
    }
    // 更新状态数据
    store.commit('REQ_adminInfo', result.data)
  } else {
    // 没有登陆
    if (to.path === '/') {
      next()
    } else {
      next('/')
      message.error(result.message)
    }
  }
})

export default router