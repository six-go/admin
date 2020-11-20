// 引入axios
import axios from 'axios'
import NProgress from 'nprogress'

// 二次封装axios
const ajax = axios.create({
  baseURL: '/api',
  timeout: 20000
})

// 请求拦截器
ajax.interceptors.request.use((config) => {
  // 开启进度条
  NProgress.start()
  return config
})

// 响应拦截器
ajax.interceptors.response.use((res) => {
  // 结束进度条效果
  NProgress.done()
  return res.data
}, err => {
  return Promise.reject(err)
})

// 暴露ajax
export default ajax