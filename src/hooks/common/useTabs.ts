import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@/types/common/interfaces";

export const useTabs = () => {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const savedTabs = localStorage.getItem("tabs");
    return savedTabs ? JSON.parse(savedTabs) : [];
  });
  const [selectedTab, setSelectedTab] = useState<string | null>(() => {
    return localStorage.getItem("selectedTab");
  });
  const [draggedTabIndex, setDraggedTabIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    if (selectedTab) {
      localStorage.setItem("selectedTab", selectedTab);
    } else {
      localStorage.removeItem("selectedTab");
    }
  }, [selectedTab]);

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
    const updatedTabs = tabs.filter((tab) => tab.name !== tabName);
    setTabs(updatedTabs);

    if (selectedTab === tabName) {
      if (updatedTabs.length > 0) {
        setSelectedTab(updatedTabs[0].name);
        navigate(`/tab/${updatedTabs[0].name.toLowerCase()}`);
      } else {
        setSelectedTab(null);
        navigate("/dashboard");
      }
    }
  };

  // 드래그 앤 드롭 함수
  const handleDragStart = (index: number) => {
    setDraggedTabIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedTabIndex === null || draggedTabIndex === index) return;

    const reorderedTabs = [...tabs];
    const [draggedTab] = reorderedTabs.splice(draggedTabIndex, 1);
    reorderedTabs.splice(index, 0, draggedTab);

    setTabs(reorderedTabs);
    setSelectedTab(reorderedTabs[index].name);
    setDraggedTabIndex(null);
  };

  return {
    tabs,
    selectedTab,
    handleMenuClick,
    handleTabClick,
    handleTabClose,
    handleDragStart, // 반환 추가
    handleDragOver,  // 반환 추가
    handleDrop,      // 반환 추가
  };
};
