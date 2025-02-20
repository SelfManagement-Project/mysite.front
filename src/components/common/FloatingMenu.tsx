import React, { useEffect, useRef } from "react";
import { useFloatingMenu } from '@/hooks/common/useFloating';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/reducers/login/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/common/useHeader';
import EditProfileForm from "@/components/login/EditProfileForm";
import EditProfileModal from "@/components/common/EditProfileModal";

const FloatingMenu: React.FC = () => {
  const menuRef = useRef<HTMLDivElement | null>(null); // 플로팅 메뉴 감지용 ref
  const buttonRef = useRef<HTMLButtonElement | null>(null); // 버튼 감지용 ref

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.apiData?.username || '사용자';  // 기본값 설정

  const { isEditProfileModalOpen, setIsEditProfileModalOpen } = useHeader();
  const { isOpen, toggleMenu, setIsOpen } = useFloatingMenu(); // 메뉴 상태 변경 함수 추가

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  // 👇 바깥 클릭 감지하여 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && 
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // 메뉴 닫기
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="floating-menu" ref={menuRef}>
      <button className="floating-button" onClick={toggleMenu} ref={buttonRef}>
        ⚙️
      </button>
      {isOpen && (
        <div className="menu-content">
          <div>
            {isAuthenticated ? (
              <div className="login-info">환영합니다. {userName}님.</div>
            ) : (
              <div className="login-info">로그인 해주세요.</div>
            )}
          </div>
          <ul>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout}>로그아웃</button>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </li>
            {isAuthenticated && (
              <li>
                <button className="editprofile-link" onClick={() => setIsEditProfileModalOpen(true)}>
                  회원정보수정
                </button>
              </li>
            )}
            <li><button>화면 스타일 설정</button></li>
            <li><button>다크 모드</button></li>
            <li><button>기타 설정</button></li>
          </ul>
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            title="회원정보수정"
          >
            <EditProfileForm />
          </EditProfileModal>
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;
