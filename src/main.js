import Vue from 'vue'
import App from './App'

import AntD, { FormModel, message } from 'ant-design-vue'
import ElementUi from 'element-ui'

// 声明使用
Vue.use(AntD)
Vue.use(FormModel)
Vue.use(ElementUi)

// ant-design的样式
import "ant-design-vue/dist/antd.css";

// element-ui样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入路由器对象
import router from "./router";
// 引入状态管理对象
import store from './store'


// 引入API函数
import { reqUserCityList, reqCity } from './api'

Vue.config.productionTip = false

Vue.prototype.$message = message

Vue.prototype.$userCityList = reqUserCityList

Vue.prototype.$getCity = reqCity


new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = new Vue()
  },
  router,
  store,
}).$mount("#app");
