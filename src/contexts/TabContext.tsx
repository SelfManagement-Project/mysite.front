import React, { createContext, useContext } from "react";
import { useTabs } from "@/hooks/common/useTabs";

const TabContext = createContext<ReturnType<typeof useTabs> | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};

// TabContext.tsx
export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tabsState = useTabs();
  return <TabContext.Provider value={tabsState}>{children}</TabContext.Provider>;
};

// 아래와 같이 default export 추가
export default TabProvider;