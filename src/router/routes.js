// 引入Home
// import Home from '../pages/Home'
// 登录页面
import Login from '../pages/Login'
// 首页
import Manage from '../pages/Manage'
// 用户分布echarts图
import Visitor from '../pages/Visitor'
// 添加商铺
import AddShop from '../pages/AddShop'

// 暴露routes
export default [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/manage',
    component: Manage,
  },
  {
    path: '/visitor',
    component: Visitor
  },
  {
    path: '/addShop',
    component: AddShop
  }
]