import Vue from 'vue'
// 引入vueRouter
import VueRouter from 'vue-router'

// 声明使用VueRouter
Vue.use(VueRouter)

// 引入所有路由
import routes from './routes'

// 暴露router对象
export default new VueRouter({
  mode: 'history',
  routes
})