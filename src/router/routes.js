// 引入Home
import Home from '../pages/Home'

// 暴露routes
export default [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/',
    redirect: '/home'
  }
]