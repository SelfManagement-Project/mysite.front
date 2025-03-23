import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "@/assets/styles/index.scss";
import "@/App.css";
import Router from "@/router/Router";
import TabProvider from "@/hooks/common/useTabContext";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { loginSuccess } from '@/redux/reducers/login/authReducer';
import { ThemeProvider } from "@/contexts/ThemeContext";

// Redux 기능이 필요한 내부 컴포넌트로 분리
const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <TabProvider>
            <AppContent />
          </TabProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}