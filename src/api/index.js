// 引入ajax
import ajax from './ajax'

// 请求API

//所有api请求
export const getAllApi=()=>ajax.get('/statis/api/count')
//请求当日api
export const getNowApi=(date)=>ajax.get(`statis/api/${date}/count`)
//所有用户量
export const getAllUser=()=>ajax.get('/v1/users/count')
//获取当日用户
export const getNowUser=(date)=>ajax.get(`/statis/user/${date}/count`)
//获取所有订单
export const getAllIndent=()=>ajax.get('/bos/orders/count')
//获取当日订单
export const getNowIndent=(date)=>ajax.get(`/statis/order/${date}/count`)
//获取所有管理员
export const getAllAdmin=()=>ajax.get('/admin/count')
//获取当日管理员
export const getNowAdmin=(date)=>ajax.get(`/statis/admin/${date}/count`)
//添加食品种类
export const addshoptype=(data)=>ajax.post('/shopping/addcategory',data)
//获取当前店铺的食品种类
export const getShoptype=(id)=>ajax.get(`/shopping/v2/menu?restaurant_id=${id}`)
//添加食品
export const addshop=(data)=>ajax.post('/shopping/addfood',data)

const req_Login = () => ajax.post('/admin/login' ,{
    user_name: '_login',
    password: '_login'
})
console.log(req_Login())