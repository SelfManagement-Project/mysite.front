import { HeaderProps } from "@/types/common/interfaces";
import { Link, useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/common/useHeader';
import { useAppSelector } from '@/redux/hooks';
import Modal from "@/components/common/Modal";
import EditProfileModal from "@/components/common/EditProfileModal";
import SignUpForm from "@/components/login/SignUpForm";
import logoImage from '@/assets/images/OneFlowLogo.webp';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/reducers/login/authReducer';
import EditProfileForm from "@/components/login/modal/EditProfileForm";
// import { useChatList } from '@/hooks/ai/useChatList';
import { useSearch } from "@/hooks/common/useSearch";

const Header = ({ onMenuClick, showNav = true }: HeaderProps) => {

  const navigate = useNavigate();
  const { query, setQuery, handleSearch } = useSearch();
  const handleSearchSubmit = async () => {
    await handleSearch();
    navigate('/total_search'); // 검색 결과 페이지로 이동
  };

  // const {
  //   handleFetchChatList  // useAiPage에서 새로 추가할 함수
  // } = useChatList();

  // const handleChatSelect = async () => {
  //   await handleFetchChatList();
  //   // 필요한 경우 채팅 탭으로 다시 전환
  // };



  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.apiData?.username || '사용자';  // 기본값 설정

  const { isSignUpModalOpen, setIsSignUpModalOpen,
    handleLogoClick, showScheduleDropdown,
    setShowScheduleDropdown,
    isEditProfileModalOpen, setIsEditProfileModalOpen,
    showCustomerSupportDropdown, setShowCustomerSupportDropdown
  } = useHeader();


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

        {isAuthenticated && (
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="검색어 입력..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleSearchSubmit}>검색</button>
          </div>
        )}
        {/* <div className="search-container">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="search-input"
          />
          <button className="search-button">
            검색
          </button>
        </div> */}

        <div className="auth-buttons">
          {isAuthenticated ? (
            <div>
              <span>{userName}님 환영합니다.</span>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                로그아웃
              </button>

              <button
                className="editprofile-link"
                onClick={() => setIsEditProfileModalOpen(true)}
              >
                회원정보수정
              </button>

            </div>
          ) : (
            <>
              <div>
                <span>로그인을 해주세요.</span>
                <Link className="login-btn" to="/login">
                  로그인
                </Link>
                <button
                  className="signup-link"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  회원가입
                </button>
              </div>
            </>
          )}
          <Modal
            isOpen={isSignUpModalOpen}
            onClose={() => setIsSignUpModalOpen(false)}
            title="회원가입"
          >
            <SignUpForm />
          </Modal>

          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            title="회원정보수정"
          >
            <EditProfileForm />
          </EditProfileModal>
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
                onClick={() => {
                  const width = 1280;
                  const height = 960;
                  const left = (window.screen.width / 2) - (width / 2);
                  const top = (window.screen.height / 2) - (height / 2);

                  window.open(
                    '/ai-service',
                    'AIChatWindow',
                    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
                  );
                }}
              >
                AI 챗봇 서비스
              </button>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => setShowCustomerSupportDropdown(true)}
              onMouseLeave={() => setShowCustomerSupportDropdown(false)}
            >
              <Link to='#'>고객지원</Link>
              {showCustomerSupportDropdown && (
                <div className="dropdown-content">
                  <button
                    onClick={() => navigate('/help')}
                  >
                    고객센터
                  </button>
                  <button
                    onClick={() => navigate('/announcements')}
                  >
                    공지사항
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;