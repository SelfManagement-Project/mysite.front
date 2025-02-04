// Header.jsx
const Header = () => {
    return (
      <header>
        <div className="header-container">
          <nav>
            <ul>
              <li><a href="/">홈</a></li>
              <li><a href="/chat">채팅</a></li>
              <li><a href="/board">게시판</a></li>
              <li><a href="/study">학습</a></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </header>
    );
   };
   
   export default Header;