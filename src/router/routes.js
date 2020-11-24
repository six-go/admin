// 引入Home
import userList from "../pages/userList";
import Home from "../pages/Home/";

// 暴露routes
export default [
  {
    path: "/",
    component: () => import("../pages/Home"),
  },
  {
    path: "/userlist",
    component: userList,
  },
];
