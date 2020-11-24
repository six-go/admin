// 引入ajax
import ajax from './ajax'
// 引入mapAjax
import mapAjax from './mapAjax'

// 高德申请的key
const key = '56baab2d3889a6a577a96865e0d00dce'

// 请求API
// 登陆
export const reqLogin = (user_name, password) => ajax.post('/admin/login', {
  user_name,
  password
})
// 获取管理员信息
export const reqAdminInfo = () => ajax.get('/admin/info')

// 用户所在城市统计
export const reqUserCityList = () => ajax.get('/v1/user/city/count')

// 获取当前用户所在的城市
export const reqAdminCurrentCity = () => ajax.get('/v1/cities?type=guess')

// 根据ip获取当前城市
export const reqCity = () => mapAjax.get(`/ip?key=${key}`)

// 获取店铺分类信息
export const reqCategoryInfo = () => ajax.get('/shopping/v2/restaurant/category')