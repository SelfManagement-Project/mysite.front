import React from "react";
import { useFloatingMenu } from '@/hooks/common/useFloating';

const FloatingMenu: React.FC = () => {
  const { isOpen, toggleMenu } = useFloatingMenu();

  return (
    <div className="floating-menu">
      <button className="floating-button" onClick={toggleMenu}>
        ⚙️
      </button>
      {isOpen && (
        <div className="menu-content">
          <ul>
            <li>화면 스타일 설정</li>
            <li>다크 모드</li>
            <li>기타 설정</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;
