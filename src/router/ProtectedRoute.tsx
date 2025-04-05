// components/common/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  const isAuthenticated = token && !isTokenExpired(token);

  if (!isAuthenticated) {
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
