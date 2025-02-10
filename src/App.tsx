import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@/assets/styles/index.scss";
import "./App.css";
import Router from "@/router/Router";
import TabProvider from "@/hooks/common/useTabContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <TabProvider>
        <App />
      </TabProvider>
    </BrowserRouter>
  );
}