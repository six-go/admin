import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'

// 声明使用vuex
Vue.use(Vuex)

// 引入store中的其他对象
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

// 暴露Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})