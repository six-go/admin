import ajax from "./ajax";

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = (restaurant_id) =>
  ajax.get("/shopping/restaurant/" + restaurant_id);

/**
 * 获取食品列表
 */

export const getFoods = (data) => ajax.get("/shopping/v2/foods", data);

/**
 * 获取食品数量
 */

export const getFoodsCount = (data) =>
  ajax.get("/shopping/v2/foods/count", data);

/**
 * 获取menu列表
 */

export const getMenu = (data) => ajax.get("/shopping/v2/menu", data);

/**
 * 获取menu详情
 */

export const getMenuById = (category_id) =>
  ajax.get("/shopping/v2/menu/" + category_id);

/**
 * 更新食品信息
 */

export const updateFood = (data) => ajax.post("/shopping/v2/updatefood", data);

/**
 * 删除食品
 */

export const deleteFood = (food_id) =>
  ajax.delete("/shopping/v2/food/" + food_id, {});
