import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";
import IndexPage from "@/pages/IndexPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];