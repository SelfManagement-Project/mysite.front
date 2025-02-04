src/
├── common/          
│   ├── components/
│   │   └── common/   
│   ├── constants/
│   ├── hooks/
│   ├── redux/
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.ts
│   ├── router/
│   ├── services/
│   └── utils/
│
├── mobile/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   └── common/
│   └── pages/
│
└── web/
    ├── assets/
    │   ├── fonts/
    │   ├── images/
    │   └── styles/
    ├── components/
    │   └── common/
    └── pages/


public/             # 정적 파일
├── assets/         # 이미지 등 자원
└── index.html      # 메인 HTML

# 설정 파일들
.gitignore
package.json
package-lock.json
README.md
tsconfig.json
vite.config.ts


1. .tsx

React 컴포넌트를 TypeScript로 작성할 때 사용
JSX 문법과 TypeScript를 함께 사용
예: 컴포넌트 파일, 페이지 파일

2. .ts


순수 TypeScript 파일
JSX를 포함하지 않는 로직
예: 유틸리티 함수, API 호출, 타입 정의








