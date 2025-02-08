import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";
import IndexPage from "@/pages/IndexPage";
import DashboardPage from "@/components/dashboard/DashboardPage";
import TabLayout from "@/components/common/layout/TabLayout";
import DefaultLayout from "@/components/common/layout/DefaultLayout";
import BlankLayout from "@/components/common/layout/BlankLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout showNav={false}><IndexPage /></DefaultLayout>,
  },
  {
    path: "/login",
    element: <BlankLayout><LoginPage /></BlankLayout>,
  },
  {
    path: "/dashboard",
    element: <DefaultLayout><DashboardPage /></DefaultLayout>,
  },
  {
    path: "/tab/:name",
    element: <DefaultLayout><TabLayout /></DefaultLayout>,
  },
];