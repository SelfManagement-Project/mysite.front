import React from "react";
import { useFloatingMenu } from '@/hooks/common/useFloating';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/common/useHeader';
import EditProfileForm from "@/components/login/EditProfileForm";
import EditProfileModal from "@/components/common/EditProfileModal";


const FloatingMenu: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.apiData?.username || '사용자';  // 기본값 설정

  const { isEditProfileModalOpen, setIsEditProfileModalOpen } = useHeader();

  const { isOpen, toggleMenu } = useFloatingMenu();

  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Header 컴포넌트 내부
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="floating-menu">
      <button className="floating-button" onClick={toggleMenu}>
        ⚙️
      </button>
      {isOpen && (
        <div className="menu-content">

          <div>
            {isAuthenticated ? (
              <div className="login-info">환영합니다. {userName}님.</div>
            ) : (
              <>
                <div className="login-info">로그인 해주세요.</div>
              </>
            )}
          </div>

          <ul>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link to="/login">
                    로그인
                  </Link>
                </>
              )}
            </li>


            {isAuthenticated && (
              <li>
                <button
                  className="editprofile-link"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
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
