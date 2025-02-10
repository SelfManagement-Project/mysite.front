import { useState } from 'react';

export const useHeader = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleLogoClick = () => {
    localStorage.removeItem("tabs");
    localStorage.removeItem("selectedTab");
    window.location.href = "/";
  };

  return {
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    handleLogoClick,
  };
};