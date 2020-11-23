// 引入Home
import Home from '../pages/Home'
import Manage from '../pages/Manage'
import AddGoods from '../pages/AddGoods'
// 暴露routes
export default [
  {
    path: '/home',
    component: Home
  },
  {
    path:'/manage',
    component:Manage
  },
  {
    path:'/addgoods',
    component:AddGoods
  },
  {
    path: '/',
    redirect: '/manage'
  }
]