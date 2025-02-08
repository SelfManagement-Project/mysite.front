import React from "react";
import { HeaderProps } from "@/types/common/header"; // 파일 경로에 맞게 수정
import { Link } from 'react-router-dom';
import { useState } from 'react'
import Modal from "@/components/common/Modal"
import SignUpForm from "@/components/login/SignUpForm"


const Header: React.FC<HeaderProps> = ({ onMenuClick, showNav = true }) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const handleLogoClick = () => {
    localStorage.removeItem("tabs"); // 탭 정보 삭제
    localStorage.removeItem("selectedTab"); // 선택된 탭 정보 삭제
    window.location.href = "/"; // 초기 페이지로 이동
  };

  return (
    <header>
      <div className="header-container">
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>
            logo
          </a>
        </div>
        <div className="auth-buttons">
          <Link to="/login">
            로그인
          </Link>
          <button
            className="signup-link"
            onClick={() => setIsSignUpModalOpen(true)}
          >
            회원가입
          </button>
          <Modal
            isOpen={isSignUpModalOpen}
            onClose={() => setIsSignUpModalOpen(false)}
            title="회원가입"
          >
            <SignUpForm />
          </Modal>
        </div>

      </div>
      {showNav && (
        <nav className="nav-container">
          <ul>
            <li>
              <Link to="/dashboard">대시보드</Link>
            </li>
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
      )}
    </header>
  );
};

export default Header;
