import ajax from "./ajax";

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
// https://elm.cangdu.org/shopping/v2/updatefood
// item_id    	Y      	int  	食品id
// name    	Y      	string  	食品名称
// description    	N     	string  	食品介绍
// image_path    	Y      	string  	店铺图片地址
// restaurant_id    	Y      	int  	餐馆id
// category_id    	Y      	int  	食品分类id

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

const req_login = () =>
  ajax.post("/admin/login", {
    user_name: "_login",
    password: "_login",
  });
console.log(req_login());
