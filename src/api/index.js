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

export const getFoodList = () => {
  return ajax({
    url: `shopping/v2/foods`,
    method: "GET",
  });
};

export const deleteFood = (id) => {
  return ajax({
    url: `shopping/v2/food/:${id}`,
    method: "DELETE",
  });
};

export const updatefood = ({
  item_id,
  name,
  description,
  image_path,
  restaurant_id,
  category_id = 2,
  specfoods,
}) =>
  ajax.post("/shopping/v2/updatefood", {
    item_id: 7176,
    name: "0000",
    description: "3",
    image_path: "175f3c2617583058.jpg",
    restaurant_id: 1,
    category_id: 9253,

    specfoods: [{ specs: "默认", packing_fee: 0, price: 20 }],
  });
// https://elm.cangdu.org/shopping/v2/food/:food_id
// // 食品列表
// export const reqGetFoodList = () => ajax.get("shopping/v2/foods");
// // 食品数量
// export const reqGetFoodCount = () => ajax.get("/shopping/v2/foods/count");

// export const reqGetFoodListID = (id) =>
//   ajax.get(`shopping/v2/foods?offset=0&limit=20&restaurant_id=${id}`);

// export const delectGetFoodCount = (foodId) =>
//   ajax.delete(`shopping/v2/food/:${foodId}`);

