// Footer.jsx
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <div className="footer-section">
              <h4>서비스</h4>
              <ul>
                <li>대시보드</li>
                <li>일정 관리</li>
                <li>건강 관리</li>
                <li>재무 관리</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>고객 지원</h4>
              <ul>
                <li>고객센터</li>
                <li>공지사항</li>
                {/* <li>자주 묻는 질문</li>
                <li>문의하기</li> */}
              </ul>
            </div>
            <div className="footer-section">
              <h4>법적 고지</h4>
              <ul>
                <li>이용약관</li>
                <li>개인정보 처리방침</li>
                <li>마케팅 정보 수신 동의</li>
              </ul>
            </div>
          </div>
          <div className="footer-contact">
            <p>고객 지원 이메일: support@oneflow.com</p>
            <p>고객 센터: 1234-5678</p>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 OneFlow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;