import { useState, useEffect } from "react";

// FAQ 타입 정의
export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// 카테고리 타입 정의
export interface Category {
  id: string;
  name: string;
}

export const useHelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // 자주 묻는 질문 데이터
  const faqData: FAQ[] = [
    {
      id: 1,
      category: "account",
      question: "계정은 어떻게 만들 수 있나요?",
      answer: "회원가입 페이지에서 이메일, 비밀번호, 기본 정보를 입력하여 계정을 생성할 수 있습니다."
    },
    {
      id: 2,
      category: "payment",
      question: "결제 방법은 어떤 것이 있나요?",
      answer: "신용카드, 체크카드, 계좌이체, 페이팔 등 다양한 결제 방법을 지원합니다."
    },
    {
      id: 3,
      category: "shipping",
      question: "배송은 얼마나 걸리나요?",
      answer: "국내 배송은 2-3일, 해외 배송은 지역에 따라 7-14일 정도 소요됩니다."
    },
    {
      id: 4,
      category: "refund",
      question: "환불 정책은 어떻게 되나요?",
      answer: "구매일로부터 14일 이내에 제품 상태가 양호한 경우 전액 환불이 가능합니다."
    },
    {
      id: 5,
      category: "account",
      question: "비밀번호를 잊어버렸어요.",
      answer: "로그인 페이지에서 '비밀번호 찾기'를 클릭하여 이메일을 통해 재설정할 수 있습니다."
    },
    {
      id: 6,
      category: "shipping",
      question: "해외 배송도 가능한가요?",
      answer: "네, 대부분의 국가로 해외 배송이 가능합니다. 국가별 배송비와 소요시간은 다를 수 있습니다."
    },
    {
      id: 7,
      category: "payment",
      question: "분할 결제가 가능한가요?",
      answer: "네, 특정 금액 이상 구매 시 3개월, 6개월, 12개월 무이자 할부 결제가 가능합니다."
    },
    {
      id: 8,
      category: "refund",
      question: "교환/반품 배송비는 어떻게 되나요?",
      answer: "제품 불량의 경우 왕복 배송비는 회사가 부담합니다. 고객 변심의 경우 왕복 배송비는 고객 부담입니다."
    },
    {
      id: 9,
      category: "account",
      question: "회원 탈퇴는 어떻게 하나요?",
      answer: "마이페이지 > 개인정보 설정 > 회원 탈퇴 메뉴에서 진행할 수 있습니다."
    },
    {
      id: 10,
      category: "shipping",
      question: "배송 조회는 어디서 할 수 있나요?",
      answer: "마이페이지 > 주문 내역에서 배송 조회 버튼을 클릭하시면 현재 배송 상태를 확인할 수 있습니다."
    },
    {
      id: 11,
      category: "payment",
      question: "결제 후 영수증은 어디서 확인할 수 있나요?",
      answer: "마이페이지 > 주문 내역 > 해당 주문 상세 페이지에서 영수증 출력이 가능합니다."
    },
    {
      id: 12,
      category: "refund",
      question: "부분 환불도 가능한가요?",
      answer: "네, 여러 상품을 함께 구매하신 경우 특정 상품만 선택하여 환불 신청이 가능합니다."
    }
  ];

  // 카테고리 데이터
  const categories: Category[] = [
    { id: "all", name: "전체" },
    { id: "account", name: "계정" },
    { id: "payment", name: "결제" },
    { id: "shipping", name: "배송" },
    { id: "refund", name: "환불" }
  ];

  // 검색 필터링
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 페이지네이션 계산
  useEffect(() => {
    setTotalPages(Math.ceil(filteredFaqs.length / itemsPerPage));
    // 필터링 변경 시 첫 페이지로 이동하되, 현재 페이지가 유효하면 유지
    if (currentPage > Math.ceil(filteredFaqs.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [filteredFaqs, itemsPerPage, currentPage]);

  // 현재 페이지 데이터
  const currentFaqs = filteredFaqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // FAQ 토글 함수
  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // 검색어 변경 함수
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // 검색어 초기화 함수
  const clearSearch = () => {
    setSearchQuery("");
  };

  // 카테고리 선택 함수
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // 페이지 변경 함수
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 이전 페이지 함수
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  // 다음 페이지 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxPageNumbersShown = 5;
    
    let startPage: number;
    let endPage: number;
    
    if (totalPages <= maxPageNumbersShown) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbersShown / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbersShown / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageNumbersShown;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageNumbersShown + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return {
    searchQuery,
    selectedCategory,
    expandedFaq,
    currentPage,
    totalPages,
    categories,
    currentFaqs,
    filteredFaqs,
    handleSearchChange,
    clearSearch,
    handleCategoryChange,
    toggleFaq,
    changePage,
    goToPreviousPage,
    goToNextPage,
    getPageNumbers
  };
};