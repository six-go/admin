import Vue from 'vue'
import App from './App.vue'

import AntD from 'ant-design-vue'

// 声明使用
Vue.use(AntD)

// ant-design的样式
import 'ant-design-vue/dist/antd.css'

// 引入路由器对象
import router from './router'
// 引入状态管理对象
import store from './store'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
