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
            <div className="login-info">로그인 해주세요.</div>
            <div className="login-info">환영합니다. 유영수님.</div>
          <ul>
            <li><button>로그인</button></li>
            <li><button>로그아웃</button></li>
            <li><button>회원정보수정</button></li>
            <li><button>화면 스타일 설정</button></li>
            <li><button>다크 모드</button></li>
            <li><button>기타 설정</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;
