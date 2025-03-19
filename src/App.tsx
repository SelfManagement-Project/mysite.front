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

const App = () => {
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
};

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <TabProvider>
          <App />
        </TabProvider>
      </Provider>
    </BrowserRouter>
  );
}