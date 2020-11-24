import { reqGetCityList } from '../../api'

export default {
  state: {
    // 城市列表
    cityList: []
  },
  mutations: {
    // 用户登陆
    REQ_citylist(state, cityList) {
      state.cityList = cityList
    }
  },
  actions: {
    // 管理员登陆
    async req_citylist({ commit }, keyword) {
      const result = await reqGetCityList(keyword)
      console.log(result)

      // 判断
      if (result.status === 1) {
        // 登陆失败

      }
    }
  },
  getters: {}
}