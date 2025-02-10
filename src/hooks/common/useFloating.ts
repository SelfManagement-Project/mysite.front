import { useState } from 'react';

export const useFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggleMenu
  };
};