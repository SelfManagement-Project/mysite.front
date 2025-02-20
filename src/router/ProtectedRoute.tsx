// components/common/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const location = useLocation();
  
  if (!isAuthenticated) {
    // 현재 위치 정보를 state로 전달하여 로그인 후 원래 페이지로 돌아올 수 있게 함
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;