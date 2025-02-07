import React from "react";
import { HeaderProps } from "@/types/common/header"; // 파일 경로에 맞게 수정

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  // 로고 클릭 핸들러: localStorage 데이터 초기화
  const handleLogoClick = () => {
    localStorage.removeItem("tabs"); // 탭 정보 삭제
    localStorage.removeItem("selectedTab"); // 선택된 탭 정보 삭제
    window.location.href = "/"; // 초기 페이지로 이동
  };

  return (
    <header>
      <div className="header-container">
        <div>
          <a href="/" onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>
            logo
          </a>
        </div>
        <div className="auth-buttons">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </div>
      <nav className="nav-container">
        <ul>
          <li>
            <button onClick={() => onMenuClick("Schedule")}>일정/습관 관리</button>
          </li>
          <li>
            <button onClick={() => onMenuClick("Health")}>건강 관리</button>
          </li>
          <li>
            <button onClick={() => onMenuClick("Finance")}>재무 관리</button>
          </li>
          <li>
            <button onClick={() => onMenuClick("AI")}>AI 챗봇 서비스</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
