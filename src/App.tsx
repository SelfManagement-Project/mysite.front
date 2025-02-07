import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DashboardPage from "@/components/dashboard/DashboardPage";
import SchedulePage from "@/components/schedule/SchedulePage";
import HealthPage from "@/components/health/HealthPage";
import AiPage from "@/components/ai/AiPage";
import FinancePage from "@/components/finance/FinancePage";
import { useTabs } from "@/hooks/common/useTabs";
import "@/assets/styles/index.scss";
import "./App.css";

const App: React.FC = () => {
  const {
    tabs,
    selectedTab,
    handleMenuClick,
    handleTabClick,
    handleTabClose,
  } = useTabs();

  const [draggedTabIndex, setDraggedTabIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedTabIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 동작 방지 (드롭 불가능 방지)
  };

  const handleDrop = (index: number) => {
    if (draggedTabIndex === null || draggedTabIndex === index) return;

    const reorderedTabs = [...tabs];
    const [draggedTab] = reorderedTabs.splice(draggedTabIndex, 1);
    reorderedTabs.splice(index, 0, draggedTab);

    handleTabClick(reorderedTabs[index].name); // 드롭된 탭 활성화
    setDraggedTabIndex(null);
  };

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
              <div>
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
      </div>
      <Footer />
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
