// 引入Home
import Home from "../pages/Home";
import FoodList from "../pages/FoodList";

// 暴露routes
export default [
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "/home/foodlist",
        component: FoodList,
      },
    ],
  },
  {
    path: "/",
    redirect: "/home",
  },
];
