import React from "react";
import { useTabContext } from "@/contexts/TabContext"; // named export로 가져옴
import SchedulePage from "@/components/schedule/SchedulePage";
import HealthPage from "@/components/health/HealthPage";
import AiPage from "@/components/ai/AiPage";
import FinancePage from "@/components/finance/FinancePage";

const TabLayout: React.FC = () => {
  const {
    tabs,
    selectedTab,
    handleTabClick,
    handleTabClose,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useTabContext();

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
  );
};

export default TabLayout;
