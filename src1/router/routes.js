// 引入Home
import Home from "../pages/Home";
import FoodList from "../components/FoodList";

// 暴露routes
export default [
  {
    path: "/home",
    component: Home,
  },
  { path: "/foodlist", component: FoodList },
  {
    path: "/",
    redirect: "/home",
  },
];
