// hooks/useTabs.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@/types/common/tabs';

export const useTabs = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuClick = (menuName: string) => {
    if (!tabs.find((tab) => tab.name === menuName)) {
      setTabs((prevTabs) => [
        ...prevTabs,
        { name: menuName, content: menuName },
      ]);
    }
    setSelectedTab(menuName);
    navigate(`/tab/${menuName.toLowerCase()}`);
  };

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
    navigate(`/tab/${tabName.toLowerCase()}`);
  };

  const handleTabClose = (tabName: string) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.name !== tabName));
    if (selectedTab === tabName) {
      const remainingTabs = tabs.filter((tab) => tab.name !== tabName);
      if (remainingTabs.length > 0) {
        setSelectedTab(remainingTabs[0].name);
        navigate(`/tab/${remainingTabs[0].name.toLowerCase()}`);
      } else {
        setSelectedTab(null);
        navigate('/');
      }
    }
  };

  return {
    tabs,
    selectedTab,
    handleMenuClick,
    handleTabClick,
    handleTabClose,
  };
};