import { useTabContext } from "@/hooks/common/useTabContext"; 
import SchedulePage from "@/components/schedule/SchedulePage";
import HabitHub from "@/components/schedule/HabitHub";
import Notifications from "@/components/schedule/Notifications";
import LocationServices from "@/components/location/LocationServices";
import HealthPage from "@/components/health/HealthPage";
import AiPage from "@/components/ai/AiPage";
import FinancePage from "@/components/finance/FinancePage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TabLayout = () => {
  const {
    tabs,
    selectedTab,
    handleTabClick,
    handleTabClose,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useTabContext();

  const navigate = useNavigate();
  // 탭이 활성화되었는지 여부를 확인
  const isActive = tabs.length > 0 && selectedTab;

  useEffect(() => {
    // 탭이 활성화되지 않았으면 대시보드로 리디렉션
    if (!isActive) {
      navigate('/dashboard');
    }
  }, [isActive, navigate]);

  // useEffect 이후에 조건부 반환
  if (!isActive) {
    return null; // 리디렉션 중에는 아무것도 렌더링하지 않음
  }

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
      case "HabitHub":
        return <HabitHub />;
      case "Notification":
        return <Notifications />;
      case "LocationServices":
        return <LocationServices />;
      default:
        return null;
    }
  };

  return (
    <div className="tab-box">
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
    </div>
  );
};

export default TabLayout;