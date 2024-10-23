import { HeaderLayout } from "../components/default";
import Home from "../pages/Home";
import Detail from "../pages/detail";
import Login from "../pages/login";
import Register from "../pages/register";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/detail/:id", component: Detail, layout: HeaderLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
