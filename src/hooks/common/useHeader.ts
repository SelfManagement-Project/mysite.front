import { useState } from 'react';

export const useHeader = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [showCustomerSupportDropdown, setShowCustomerSupportDropdown] = useState(false);


  const handleLogoClick = () => {
    localStorage.removeItem("tabs");
    localStorage.removeItem("selectedTab");
    window.location.href = "/";
  };

  return {
    isSignUpModalOpen,
    showScheduleDropdown,
    setShowScheduleDropdown,
    setIsSignUpModalOpen,
    handleLogoClick,
    isAiModalOpen,
    setIsAiModalOpen,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    showCustomerSupportDropdown,
    setShowCustomerSupportDropdown
  };
};