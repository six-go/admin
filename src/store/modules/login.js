// 引入API函数
import { reqLogin } from '../../api'
export default {
  state: {
    // 用户信息对象
    userInfo: {

    }
  },
  mutations: {
    // 用户登陆
    REQ_login(state) {

    }
  },
  actions: {
    // 管理员登陆
    async req_login({ commit }, { user_name, password }) {
      const result = await reqLogin(user_name, password)
      // 判断
      if (result.status !== 1) {
        // 登陆失败
        return Promise.reject(result.message)
      }
    }
  },
  getters: {}
}