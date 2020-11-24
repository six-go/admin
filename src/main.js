import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/";

//手动配置elementUi
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 声明使用
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
