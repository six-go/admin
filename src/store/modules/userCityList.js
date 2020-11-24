import { reqUserCityList } from '../../api'
export default {
  state: {
    // 所有用户所在城市信息
    userCityInfo: {},
  },
  mutations: {
    REQ_usercityList(state, userCityInfo) {
      state.userCityInfo = userCityInfo
    }
  },
  actions: {
    async req_usercityList({ commit }) {
      // 发送请求
      const result = await reqUserCityList()
      // 判断
      if (result.status === 1) {
        commit('REQ_usercityList', result.user_city)
      }
    }
  },
  getters: {},
}