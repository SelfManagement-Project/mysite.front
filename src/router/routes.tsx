import { RouteObject } from 'react-router-dom';
import IndexPage from '@/pages/IndexPage';

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexPage />
  },
  // 다른 라우트 설정들...
];