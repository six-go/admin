// 引入ajax
import ajax from "./ajax";

// 请求API

//获取食品列表
export const reqFoodList1 = () =>ajax.get(`/shopping/v2/foods`);
export const reqFoodList = (limit, offset, restaurant_id ) =>
  ajax.get(
    `/shopping/v2/foods?offset=${offset}&limit=${limit}&restaurant_id=${restaurant_id}`
  );
//获取评价分数
export const reqFoodScore = (restaurant_id) =>
  ajax.get(`/ugc/v2/restaurants/${restaurant_id}/ratings/scores`);

//更新食品
export const updateFoodList = (data) =>
  ajax.post("/shopping/v2/updatefood", data);

//登录
// export const toLogin = () =>ajax.post("/admin/login?user_name=zjm0610&password=111111");
export const toLogin = (data) => ajax.post("/admin/login", data);
