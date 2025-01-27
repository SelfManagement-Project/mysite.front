mysite.front/
├── public/
├── src/
│   ├── api/             // API 통신, HTTP 요청 처리
│   ├── assets/          // 정적 리소스 관리
│   │   ├── fonts/       // 폰트 파일
│   │   ├── images/      // 이미지 파일
│   │   └── styles/      // CSS, SCSS 파일
│   ├── components/      // 재사용 컴포넌트
│   ├── constants/       // 상수값 정의
│   ├── contexts/        // Context API
│   ├── hooks/           // 커스텀 훅
│   ├── pages/           // 페이지 컴포넌트
│   ├── redux/           // 리덕스 관련
│   │   ├── actions/     // 액션 생성자
│   │   ├── reducers/    // 리듀서
│   │   └── store.js     // 스토어 설정
│   ├── services/        // 비즈니스 로직
│   └── utils/           // 유틸리티 함수
├── .gitignore           // git 제외 설정
├── Dockerfile           // Docker 설정
├── eslint.config.js     // ESLint 설정
├── package.json         // 프로젝트 설정
└── vite.config.js       // Vite 설정


React Project
│
├── contexts
│   │   (전역 상태 및 데이터 관리 - api)
│   └── ↓ ↓ ↓ (제공)
│
├── hooks
│   │   (재사용 가능한 로직)
│   └── ↓ ↓ (사용)
│
├── components
│   │   (재사용 가능한 UI 요소)
│   └── ↓ (조합)
│
└── pages
    │   (라우트별 페이지 컴포넌트)
    └── (최종 렌더링)