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
// 请求API

//所有api请求
export const getAllApi = () => ajax.get('/statis/api/count')
//请求当日api
export const getNowApi = (date) => ajax.get(`statis/api/${date}/count`)
//所有用户量
export const getAllUser = () => ajax.get('/v1/users/count')
//获取当日用户
export const getNowUser = (date) => ajax.get(`/statis/user/${date}/count`)
//获取所有订单
export const getAllIndent = () => ajax.get('/bos/orders/count')
//获取当日订单
export const getNowIndent = (date) => ajax.get(`/statis/order/${date}/count`)
//获取所有管理员
export const getAllAdmin = () => ajax.get('/admin/count')
//获取当日管理员
export const getNowAdmin = (date) => ajax.get(`/statis/admin/${date}/count`)
//添加食品种类
export const addshoptype = (data) => ajax.post('/shopping/addcategory', data)
//获取当前店铺的食品种类
export const getShoptype = (id) => ajax.get(`/shopping/v2/menu?restaurant_id=${id}`)
//添加食品
export const addshop = (data) => ajax.post('/shopping/addfood', data)

//获取食品列表
export const reqFoodList1 = () => ajax.get(`/shopping/v2/foods`);
export const reqFoodList = (limit, offset, restaurant_id) =>
  ajax.get(
    `/shopping/v2/foods?offset=${offset}&limit=${limit}&restaurant_id=${restaurant_id}`
  );
//获取评价分数
export const reqFoodScore = (restaurant_id) =>
  ajax.get(`/ugc/v2/restaurants/${restaurant_id}/ratings/scores`);

//更新食品
export const updateFoodList = (data) =>
  ajax.post("/shopping/v2/updatefood", data);
