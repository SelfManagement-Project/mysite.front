import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";
import IndexPage from "@/pages/IndexPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import TabLayout from "@/components/common/layout/TabLayout";
import DefaultLayout from "@/components/common/layout/DefaultLayout";
import BlankLayout from "@/components/common/layout/BlankLayout";
import NotFound from "@/components/error/NotFound";
import SearchComponent from "@/components/common/SearchComponent";
import ProtectedRoute from "@/router/ProtectedRoute";
import KakaoCallback from "@/components/login/KakaoCallback";
import NaverCallback from "@/components/login/NaverCallback";
import GoogleCallback from "@/components/login/GoogleCallback";
import TransactionList from "@/components/finance/TransactionList";
import TabPage from "@/pages/tab/TabPage";

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
    path: "/oauth/kakao/callback", 
    element: <BlankLayout><KakaoCallback /></BlankLayout>
  },
  {
    path: "/oauth/naver/callback",
    element: <BlankLayout><NaverCallback /></BlankLayout>
  },
  {
    path: "/oauth/google/callback",
    element: <BlankLayout><GoogleCallback /></BlankLayout>
  },
  {
    path: "/total_search",
    element: (
      <ProtectedRoute>
        <DefaultLayout><SearchComponent /></DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DefaultLayout><DashboardPage /></DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/finance/transactionlist",
    element: (
      <ProtectedRoute>
        <DefaultLayout><TransactionList /></DefaultLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/tab-page",
    element: (
      <ProtectedRoute>
        <DefaultLayout><TabPage /></DefaultLayout>
      </ProtectedRoute>
    ),
  },

  // {
  //   path: "/tab/:name",
  //   element: (
  //     <ProtectedRoute>
  //       <DefaultLayout><TabLayout /></DefaultLayout>
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "*",
    element: <BlankLayout><NotFound /></BlankLayout>,
  }
];