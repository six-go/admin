import { reqAdminInfo } from '../../api'
export default {
  state: {
    // 管理员信息
    adminInfo: {},
  },
  mutations: {
    // 更新管理员信息
    REQ_adminInfo(state, adminInfo) {
      state.adminInfo = adminInfo
    }
  },
  actions: {
    // 获取管理员信息
    async req_adminInfo({ commit }) {
      const result = await reqAdminInfo()
      // 判断
      if (result.status === 1) {
        commit('REQ_adminInfo', result.data)
      } else {
        return Promise.reject(result.message)
      }
    }
  }
}