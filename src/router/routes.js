
// 登录页面
import Login from '../pages/Login'

// 用户分布echarts图
import Visitor from '../pages/Visitor'
// 添加商铺
import AddShop from '../pages/AddShop'
import Manage from '../pages/Manage'
import AddGoods from '../pages/AddGoods'
// 暴露routes
export default [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/visitor',
    component: Visitor
  },
  {
    path: '/addShop',
    component: AddShop
  },
  {
    path: '/manage',
    component: Manage
  },
  {
    path: '/addgoods',
    component: AddGoods
  },
]