import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DashboardPage from "@/components/dashboard/DashboardPage";
import SchedulePage from "@/components/schedule/SchedulePage";
import HealthPage from "@/components/health/HealthPage";
import AiPage from "@/components/ai/AiPage";
import FinancePage from "@/components/finance/FinancePage";
import FloatingMenu from "@/components/common/FloatingMenu"; // 플로팅 메뉴 추가
import { useTabs } from "@/hooks/common/useTabs";
import "@/assets/styles/index.scss";
import "./App.css";
import Router from "@/router/Router";

const App: React.FC = () => {
  const {
    tabs,
    selectedTab,
    handleMenuClick,
    handleTabClick,
    handleTabClose,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useTabs();

  const renderTabContent = (tabName: string) => {
    switch (tabName) {
      case "Schedule":
        return <SchedulePage />;
      case "Health":
        return <HealthPage />;
      case "Finance":
        return <FinancePage />;
      case "AI":
        return <AiPage />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Header onMenuClick={handleMenuClick} />
      <div className="content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route
            path="/tab/:name"
            element={
              <div className="tab-container">
                <div className="tabs">
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      className={`tab ${selectedTab === tab.name ? "active" : ""}`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      onClick={() => handleTabClick(tab.name)}
                    >
                      <span>{tab.name}</span>
                      <button
                        className="close-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClose(tab.name);
                        }}
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
                <div className="tab-content">
                  {selectedTab && renderTabContent(selectedTab)}
                </div>
              </div>
            }
          />
        </Routes>
        {/* <Router /> */}
      </div>
      <Footer />
      <FloatingMenu /> {/* 플로팅 메뉴 추가 */}
    </div>
  );
};

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
