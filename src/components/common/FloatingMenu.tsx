// components/common/FloatingMenu.tsx
import { Link } from 'react-router-dom';
import { useFloating } from '@/hooks/common/useFloating';
import EditProfileForm from "@/components/login/modal/EditProfileForm";
import EditProfileModal from "@/components/common/EditProfileModal";

const FloatingMenu = () => {
  const {
    isOpen,
    toggleMenu,
    menuRef,
    buttonRef,
    userName,
    isAuthenticated,
    handleLogout,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    theme,
    toggleTheme
  } = useFloating();

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
            {/* <li><button>화면 스타일 설정</button></li> */}
            <li>
              <button onClick={toggleTheme}>
                {theme === 'light' ? '다크 모드 켜기' : '라이트 모드 켜기'}
              </button>
            </li>
            {/* <li><button>기타 설정</button></li> */}
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