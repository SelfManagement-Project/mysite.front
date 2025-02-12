import React from "react";
import { HeaderProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정
import { Link } from 'react-router-dom';
import { useHeader } from '@/hooks/common/useHeader';
import Modal from "@/components/common/Modal"
import AiModal from "@/components/common/AiModal"
import SignUpForm from "@/components/login/SignUpForm"
import AiPage from "@/components/ai/AiPage"
import logoImage from '@/assets/images/OneFlowLogo.webp';

const Header: React.FC<HeaderProps> = ({ onMenuClick, showNav = true }) => {
  const { isSignUpModalOpen, setIsSignUpModalOpen, handleLogoClick, showScheduleDropdown, setShowScheduleDropdown, setIsAiModalOpen, isAiModalOpen } = useHeader();


  return (
    <header>
      <div className="header-container">
        <div className="logo-link">
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>
            <img
              src={logoImage}
              alt="OneFlow Logo"
              className="logo-image"
            />
          </a>
        </div>
        <div className="auth-buttons">
          <Link className="login-btn" to="/login">
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


            <li
              className="dropdown"
              onMouseEnter={() => setShowScheduleDropdown(true)}
              onMouseLeave={() => setShowScheduleDropdown(false)}
            >
              <button onClick={() => onMenuClick("Schedule")}>일정/습관 관리</button>
              {showScheduleDropdown && (
                <div className="dropdown-content">
                  <button onClick={() => onMenuClick("Schedule")}>
                    캘린더 기반 일정 관리
                  </button>
                  <button onClick={() => onMenuClick("HabitHub")}>
                    습관 트래킹 및 목표 관리
                  </button>
                  <button onClick={() => onMenuClick("Notification")}>
                    알림 서비스
                  </button>
                </div>
              )}
            </li>


            <li>
              <button onClick={() => onMenuClick("Health")}>건강 관리</button>
            </li>
            <li>
              <button onClick={() => onMenuClick("Finance")}>재무 관리</button>
            </li>
            <li>
              <button onClick={() => onMenuClick("LocationServices")}>위치 기반 서비스</button>
            </li>
            <li>
              <button
                onClick={() => setIsAiModalOpen(true)}
              >
                AI 챗봇 서비스
              </button>
              <AiModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                title="AI 챗봇 서비스"
              >
                <AiPage />
              </AiModal>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;