// 引入ajax
import ajax from './ajax'

// 请求API
export const getUserList = data => fetch('/v1/users/list',data)