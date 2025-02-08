import { useOutlet } from 'react-router-dom';
import { useTabs } from "@/hooks/common/useTabs";

const TabLayout = () => {
  const outlet = useOutlet();
  const {
    tabs,
    selectedTab,
    handleTabClick,
    handleTabClose,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useTabs();

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
        {outlet}
      </div>
    </div>
  );
};

export default TabLayout;