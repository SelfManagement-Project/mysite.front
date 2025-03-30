import { useState, useEffect } from 'react';

// 공지사항 타입 정의
export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

export const useAnnouncements = () => {
  // 공지사항 상태 관리
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);

  // 공지사항 데이터 불러오기 (실제로는 API 호출로 대체)
  useEffect(() => {
    // 임시 데이터
    const dummyAnnouncements: Announcement[] = [
      {
        id: 1,
        title: '공공정보 검색을 소개합니다.',
        content: '공공정보 검색 기능이 추가되었습니다. 이제 다양한 공공 데이터를 검색하고 활용할 수 있습니다.\n\n이 기능을 통해 사용자는 정부 및 공공기관에서 제공하는 데이터에 쉽게 접근할 수 있으며, 검색 결과를 다양한 형태로 활용할 수 있습니다.\n\n주요 기능:\n• 키워드 기반 공공데이터 검색\n• 카테고리별 데이터 필터링\n• 검색 결과 저장 및 공유\n• 데이터 시각화 도구 제공\n\n더 자세한 내용은 도움말 페이지를 참고해 주세요.',
        date: '2025.03.27',
        isImportant: true
      },
      {
        id: 2,
        title: '\'공통/플로\' 지식베이스 내 지식 인터랙티브 기능 종료 안내',
        content: '안녕하세요. \'공통/플로\' 지식베이스 내 지식 인터랙티브 기능이 2025년 4월부터 종료됩니다.\n\n변경 사항:\n• 2025년 3월 31일까지: 기존과 동일하게 서비스 이용 가능\n• 2025년 4월 1일부터: 인터랙티브 기능 종료, 읽기 전용으로 전환\n• 2025년 5월 1일부터: 기존 데이터 열람 불가\n\n대체 서비스로 신규 지식 라이브러리 서비스를 이용해 주시기 바랍니다.\n\n불편을 드려 죄송합니다. 더 나은 서비스로 찾아뵙겠습니다.',
        date: '2025.03.20'
      },
      {
        id: 3,
        title: 'Internet Explorer 브라우저 지원 종료 안내',
        content: '안녕하세요. 더 나은 서비스 제공을 위해 Internet Explorer 브라우저 지원이 2025년 3월부로 종료됩니다. 최신 브라우저를 이용해 주세요.',
        date: '2025.02.27'
      },
      {
        id: 4,
        title: '\'가상인물/캐릭터\' 등 일부 지식베이스 서비스 일시 중단 안내',
        content: '안녕하세요. 시스템 개선 작업으로 인해 \'가상인물/캐릭터\' 등 일부 지식베이스 서비스가 일시적으로 중단됩니다.',
        date: '2025.02.20'
      },
      {
        id: 5,
        title: '네이버연동서 네이버앱 버전 11.23.0미만 발금제한 안내',
        content: '안녕하세요. 보안 강화를 위해 네이버앱 버전 11.23.0 미만에서는 서비스 이용이 제한됩니다.',
        date: '2025.02.18'
      },
      {
        id: 6,
        title: '시리즈온 컨텐츠 판매 종료에 따른 영화/방송 결제 내 정보 변경에 대해 안내드립니다.',
        content: '시리즈온 컨텐츠 판매 종료에 따른 영화/방송 결제 내 정보 변경 사항을 안내드립니다.',
        date: '2024.12.17'
      },
      {
        id: 7,
        title: '네이버 개인정보 처리방침 변경에 대한 안내 말씀드립니다.',
        content: '네이버 개인정보 처리방침이 2025년 1월 1일부로 변경됩니다. 주요 변경사항을 안내드립니다.',
        date: '2024.11.28'
      },
      {
        id: 8,
        title: '소핏트레이 내 \'오늘의 팝업픽\'이 출시됩니다!',
        content: '안녕하세요. 소핏트레이 내 \'오늘의 팝업픽\' 기능이 새롭게 출시되었습니다.',
        date: '2024.09.20'
      },
      {
        id: 9,
        title: '[안내] 데시파만의 명장 변경 안내',
        content: '데시파만의 명장 제도가 변경되었습니다. 변경된 내용을 확인해주세요.',
        date: '2024.08.27'
      },
      {
        id: 10,
        title: '방송 회차 정보의 \'다시보기\' 변경에 대해 안내드립니다.',
        content: '방송 회차 정보의 \'다시보기\' 서비스가 개선되었습니다. 자세한 변경 사항을 확인해주세요.',
        date: '2024.08.21'
      },
    ];

    // API 호출 시뮬레이션
    setTimeout(() => {
      setAllAnnouncements(dummyAnnouncements);
      setFilteredAnnouncements(dummyAnnouncements); // 초기에는 모든 공지사항 표시
      setLoading(false);
    }, 500);
  }, []);

  // 공지사항 선택 처리
  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };

  // 상세보기 닫기
  const handleCloseDetail = () => {
    setSelectedAnnouncement(null);
  };

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchKeyword.trim()) {
      // 검색어가 없으면 모든 공지사항 표시
      setFilteredAnnouncements(allAnnouncements);
    } else {
      // 검색어가 있으면 제목과 내용에서 검색
      const filtered = allAnnouncements.filter(announcement => 
        announcement.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredAnnouncements(filtered);
    }
    
    // 검색 후 첫 페이지로 이동
    setCurrentPage(1);
    // 상세보기 상태 초기화
    setSelectedAnnouncement(null);
  };

  // 검색어 입력 필드 변경 처리
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // 검색어 초기화
  const clearSearch = () => {
    setSearchKeyword('');
    setFilteredAnnouncements(allAnnouncements);
    setCurrentPage(1);
  };

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 상세보기 닫기
    setSelectedAnnouncement(null);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 현재 페이지에 표시할 공지사항 목록
  const currentAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  

  return {
    allAnnouncements,
    filteredAnnouncements,
    loading,
    selectedAnnouncement,
    currentPage,
    searchKeyword,
    itemsPerPage,
    totalPages,
    currentAnnouncements,
    handleAnnouncementClick,
    handleCloseDetail,
    handleSearch,
    handleSearchInputChange,
    clearSearch,
    handlePageChange,
  };
};