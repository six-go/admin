import Vue from "vue";
// 引入vueRouter
import VueRouter from "vue-router";
// const userList = r => require.ensure([],
//   () => r(require('@/page/userList/index')), 'index');
// 声明使用VueRouter
Vue.use(VueRouter);

// 引入所有路由
import routes from "./routes";

// 暴露router对象
export default new VueRouter({
  mode: "history",
  routes,
});
