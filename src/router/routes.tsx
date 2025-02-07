import { RouteObject, Routes, Route } from "react-router-dom";
import DashboardPage from "@/components/dashboard/DashboardPage"; // 대시보드 페이지
import IndexPage from "@/pages/IndexPage"; // 대시보드 페이지
import LoginPage from "@/pages/LoginPage"; // 대시보드 페이지
import HealthPage from "@/components/health/HealthPage"; // 대시보드 페이지
// import HabitManagement from "@/pages/HabitManagement"; // 일정/습관 관리 페이지
// import HealthManagement from "@/pages/HealthManagement"; // 건강 관리 페이지



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


export const Router = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      ))}
    </Routes>
  );
}
