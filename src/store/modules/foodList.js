import { getFoodList, deleteFood, updatefood } from "../../api";
export default {
  state: {
    foods: [],
  },

  mutations: {
    // 获取食品列表
    GETFOODLIST(data, result) {
      this.state.foods = result;
    },
    // 删除食品
    DELETEFOOD(data, result) {
      this.state.foods = result;
    },

    //编辑
    UPDATEDFOOD(data, result) {
      this.state.foods = result;
    },
  },

  actions: {
    // 获取食品列表
    async reqgetFoodList({ commit }) {
      const result = await getFoodList();
      commit("GETFOODLIST", result);
    },
    // 删除食品
    async reqdeleteFood({ commit }, id) {
      const result = await deleteFood(id);

      commit("DELETEFOOD", result);
    },

    // 编辑
    async requpdatefood(
      { commit },
      { item_id, name, description, image_path, restaurant_id, id, specfoods }
    ) {
      console.log({ name });
      const result = await updatefood({
        item_id,
        name,
        description,
        image_path,
        restaurant_id,
        id,
        specfoods,
      });
      console.log(result);
      commit("UPDATEDFOOD", result);
    },
  },

  getters: {},
};
