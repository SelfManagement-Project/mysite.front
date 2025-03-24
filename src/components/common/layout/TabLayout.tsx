import { useTabContext } from "@/hooks/common/useTabContext"; // named export로 가져옴
import SchedulePage from "@/components/schedule/SchedulePage";
import HabitHub from "@/components/schedule/HabitHub";
import Notifications from "@/components/schedule/Notifications";
import LocationServices from "@/components/location/LocationServices";
import HealthPage from "@/components/health/HealthPage";
import AiPage from "@/components/ai/AiPage";
import FinancePage from "@/components/finance/FinancePage";
import Footer from "../Footer";

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
          <Footer />
    </div>
  );
};

export default TabLayout;
