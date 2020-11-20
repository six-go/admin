import Vue from 'vue'
import App from './App.vue'

// ant-design的样式
import 'ant-design-vue/dist/antd.css'

// ant-design按需引入
// 例如：import { Button } from 'ant-design-vue';

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
