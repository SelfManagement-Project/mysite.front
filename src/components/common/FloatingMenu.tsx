import React, { useState } from "react";

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-menu">
      <button className="floating-button" onClick={toggleMenu}>
        ⚙️ {/* 메뉴 버튼 아이콘 */}
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
