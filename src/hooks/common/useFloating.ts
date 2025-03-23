// hooks/common/useFloating.ts
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/reducers/login/authReducer';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/common/useHeader';
import { useTheme } from '@/contexts/ThemeContext'; // 추가

export const useFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isEditProfileModalOpen, setIsEditProfileModalOpen } = useHeader();
  const { theme, toggleTheme } = useTheme(); // 추가
  
  // 사용자 정보 가져오기
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.apiData?.username || '사용자';
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
    setIsOpen(false); // 로그아웃 후 메뉴 닫기
  };
  
  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && 
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  return {
    isOpen,
    setIsOpen,
    toggleMenu,
    menuRef,
    buttonRef,
    userName,
    isAuthenticated,
    handleLogout,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    theme, // 추가
    toggleTheme // 추가
  };
};