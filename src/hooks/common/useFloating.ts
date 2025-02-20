import { useState } from 'react';

export const useFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    toggleMenu,
    setIsOpen, // 👈 바깥에서 직접 닫을 수 있도록 추가
  };
};
