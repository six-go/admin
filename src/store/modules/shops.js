import { reqAdminCurrentCity, reqCategoryInfo } from '../../api'
export default {
  state: {
    // 管理员所在城市信息
    adminCurrentInfo: {},
    // 获取店铺分类列表
    shopCategoryList: [],
  },
  mutations: {
    REQ_admincurrentinfo(state, userCityInfo) {
      state.userCityInfo = userCityInfo
    },
    // 获取店铺分类列表
    REQ_shopcategorylist(state, shopCategoryList) {
      state.shopCategoryList = shopCategoryList
    }
  },
  actions: {
    // 获取当前地址列表
    async req_admincurrentinfo({ commit }) {
      // 发送请求
      const result = await reqAdminCurrentCity()
      // 判断
      if (result.status === 1) {
        commit('REQ_usercityList', result)
      }
    },
    // 获取店铺分类列表
    async req_shopcategorylist({ commit }) {
      // 发送请求
      const result = await reqCategoryInfo()
      commit('REQ_shopcategorylist', result)
    }
  },
  getters: {
    // 过滤店铺分类数据
    categoryList(state) {
      return state.shopCategoryList.map(item => {
        const children = item.sub_categories.map(v => {
          return {
            value: v.name,
            label: v.name
          }
        })
        return {
          value: item.name,
          label: item.name,
          children,
        }
      }) || []
    },
    // 一级分类数组
    oneCategoryList(state) {
      return state.shopCategoryList.map(item => {
        return {
          value: item.name,
          label: item.name,
        }
      }) || []
    }
  },
}