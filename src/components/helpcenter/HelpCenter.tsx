// components/helpcenter/HelpCenter.tsx
import { useState } from "react";
import "@/assets/styles/components/helpcenter/HelpCenter.scss";
import { FaSearch, FaPlus } from "react-icons/fa";

const HelpCenter = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // 자주 찾는 도움말 데이터
  const frequentQuestions = [
    { id: 1, title: "넷플릭스 멤버십 사용 방법", category: "넷플릭스/OTT 서비스", tag: "#스트리밍 서비스" },
    { id: 2, title: "포스트 종료 일정 안내", category: "포스트", tag: "#포스트" },
    { id: 3, title: "Internet Explorer 브라우저 지원 종료 안내", category: "네이버 정책", tag: "#네이버 정책" },
    { id: 4, title: "진짜 유심 개시 관련 방법", category: "시리즈", tag: "#시리즈" },
    { id: 5, title: "modoo! 서비스 종료 안내", category: "서비스 종료", tag: "#modoo!" },
    { id: 6, title: "지지직 정산 실지급액 개선 안내", category: "지지직", tag: "#네이버 정책" },
    { id: 7, title: "iOS 백그라운드에서 올리기/내리받기", category: "앱 기능", tag: "#MYBOX" },
    { id: 8, title: "사진 페이지 설정 방법(Chrome)", category: "브라우저", tag: "#네이버 정책" }
  ];

  // 추천 서비스 아이콘 데이터
  const serviceIcons = [
    { id: 1, name: "회원정보", icon: "👤", link: "#" },
    { id: 2, name: "메일", icon: "✉️", link: "#" },
    { id: 3, name: "블로그", icon: "📝", link: "#" },
    { id: 4, name: "카페", icon: "☕", link: "#" },
    { id: 5, name: "지식iN", icon: "🎓", link: "#" },
    { id: 6, name: "네이버 게임", icon: "🎮", link: "#" },
    { id: 7, name: "Papago", icon: "🌐", link: "#" },
    { id: 8, name: "Papago Plus", icon: "🌍", link: "#" },
    { id: 9, name: "네이버 검색", icon: "🔍", link: "#" },
    { id: 10, name: "MYBOX", icon: "📦", link: "#" },
    { id: 11, name: "VIBE", icon: "🎵", link: "#" },
    { id: 12, name: "네이버플러스 멤버십", icon: "🎭", link: "#" },
    { id: 13, name: "시리즈", icon: "📚", link: "#" },
    { id: 14, name: "CLOVA X", icon: "🤖", link: "#" },
    { id: 15, name: "웹툰", icon: "🖼️", link: "#" },
    { id: 16, name: "스마트플레이스 사업주", icon: "🏪", link: "#" },
    { id: 17, name: "지도", icon: "🗺️", link: "#" },
    { id: 18, name: "사전", icon: "📔", link: "#" }
  ];

  // 추가 도움 옵션
  const helpOptions = [
    { 
      id: 1, 
      title: "스마트봇 문의하기", 
      icon: "🤖", 
      description: "24시간 언제든지 궁금하신 것을 스마트봇이 알려드립니다."
    },
    { 
      id: 2, 
      title: "톡톡 문의하기", 
      icon: "💬", 
      description: "1:1 채팅을 통해 문의사항을 빠르게 안내드립니다."
    },
    { 
      id: 3, 
      title: "문의/요청사항 찾기", 
      icon: "📧", 
      description: "궁금한 사항을 문의주시면 성심껏 답변드립니다."
    }
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색 기능 구현
    console.log("검색어:", searchKeyword);
  };

  return (
    <div className="help-center-container">
      {/* 헤더 섹션 */}
      <div className="help-header">
        <h1>네이버 고객센터</h1>
        <p>궁금한 점은 검색으로 쉽고 빠르게 확인하세요.</p>
        
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="궁금한 점을 검색해 보세요" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* 메뉴 네비게이션 */}
      <div className="help-navigation">
        <ul className="main-menu">
          <li className="active"><a href="#">주요 질의어</a></li>
          <li><a href="#">넷플릭스</a></li>
          <li><a href="#">최근검색어 상세/복구 방법</a></li>
          <li><a href="#">라푼</a></li>
          <li><a href="#">회원가입</a></li>
          <li><a href="#">네이버 비밀번호 찾기</a></li>
          <li><a href="#">QR코드/바코드 검색 기능</a></li>
        </ul>
        <div className="notice-banner">
          <span className="notice-tag">공지</span>
          <span className="notice-text">[안내] 블로그랩 + 동영상 오픈도 및 편집시 따로 이미지/파일/그래프 기능이 정상 작동 (a.4 픽)</span>
          <a href="#" className="more-link">공지 전체보기 &gt;</a>
        </div>
      </div>

      {/* 자주 찾는 도움말 */}
      <div className="frequent-questions">
        <div className="section-header">
          <h2>자주 찾는 도움말</h2>
          <div className="category-tabs">
            <button className="active">전체</button>
            <button>계정 관리</button>
            <button>도움 보기</button>
            <button>이용정지</button>
            <button>개인보호</button>
            <button>결제정보</button>
            <button>예약주문</button>
            <button>이벤트혜택</button>
            <button>프로필 설정</button>
            <button>환경 설정</button>
          </div>
        </div>

        <div className="questions-grid">
          {frequentQuestions.map(question => (
            <div key={question.id} className="question-card">
              <h3>
                <span className="q-icon">Q</span>
                {question.title}
              </h3>
              <div className="question-tag">
                <span className={question.tag.includes("네이버") ? "tag-naver" : "tag-service"}>
                  {question.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="more-questions-btn">
          <FaPlus /> 도움말 더보기
        </button>
      </div>

      {/* 고객센터 서비스 */}
      <div className="service-section">
        <h2>고객센터를 통해 궁금증을 해결하세요.</h2>
        <div className="service-icons-grid">
          {serviceIcons.map(service => (
            <a key={service.id} href={service.link} className="service-icon">
              <div className="icon-circle">
                <span className="icon">{service.icon}</span>
              </div>
              <span className="service-name">{service.name}</span>
            </a>
          ))}
        </div>
        <button className="more-services-btn">
          <FaPlus /> 서비스 더보기
        </button>
      </div>

      {/* 추가 도움 옵션 */}
      <div className="help-options">
        <h2>다른 도움이 필요하신가요?</h2>
        <div className="options-grid">
          {helpOptions.map(option => (
            <div key={option.id} className="help-option-card">
              <div className="option-icon">{option.icon}</div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;