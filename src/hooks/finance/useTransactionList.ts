// src/hooks/finance/useTransactionList.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilterOptions, DateRange, SortOptions } from '@/types/finance/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTransactionList, fetchTransactionDelete } from '@/redux/actions/finance/transactionActions';

export const useTransactionList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    transactions,
    totalPages: apiTotalPages,
    currentPage: apiCurrentPage,
    isLoading,
    error
  } = useAppSelector(state => state.transaction);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isTransactionDetailModalOpen, setIsTransactionDetailModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isTransactionInsertModalOpen, setIsTransactionInsertModalOpen] = useState(false);
  const [isTransactionsId, setIsTransactionsId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterOptions>({
    type: 'all',
    category: 'all',
    search: ''
  });

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: (() => {
      const date = new Date();
      date.setMonth(date.getMonth() - 3);
      return date.toISOString().split('T')[0];
    })(),
    endDate: new Date().toISOString().split('T')[0]
  });

  const [sort, setSort] = useState<SortOptions>({
    field: 'date',
    direction: 'desc'
  });

  // 거래 내역 데이터 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    dispatch(fetchTransactionList({
      page: currentPage,
      pageSize,
      filter,
      dateRange,
      sort,
      searchTerm
    }));
  }, [dispatch, currentPage, pageSize, filter, dateRange, sort, searchTerm, navigate]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    if (field === 'search') {
      value = searchTerm;
    }

    setFilter(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  // 정렬 변경 핸들러
  const handleSortChange = (field: string, direction: string) => {
    setSort({ field, direction });
  };

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = (field: keyof DateRange, value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // 날짜 범위 변경 시 첫 페이지로 이동
  };

  // CSV 내보내기 함수
  const exportToCSV = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // 백엔드 API로 CSV 다운로드 요청
    window.open(`${process.env.REACT_APP_API_URL}/api/finance/transactions/export-csv?token=${token}&type=${filter.type}&category=${filter.category}&search=${filter.search}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`, '_blank');
  };

  // 뒤로가기 함수
  const goBack = () => {
    navigate(-1);
  };

  const handletransactionUpdateId = (transactionId: number) => {
    setIsTransactionsId(transactionId);
    setIsTransactionInsertModalOpen(true);
  };

  const handletransactionDetailId = (transactionId: number) => {
    setIsTransactionsId(transactionId);
    setIsTransactionDetailModalOpen(true);
  };

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const visiblePages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const handleDelete = async (transactionId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;


    try {
      
      dispatch(fetchTransactionDelete({
        token: token,
        transactionId: transactionId
      }));
      
      alert("삭제가 완료되었습니다.");



      // 삭제 후 현재 페이지 거래 내역 다시 불러오기
      dispatch(fetchTransactionList({
        page: currentPage,
        pageSize,
        filter,
        dateRange,
        sort,
        searchTerm
      }));
    } catch (error: any) {
      alert(`삭제 중 오류 발생: ${error.response?.data?.message || error.message}`);
    }
  };

  return {
    transactions,
    loading: isLoading,
    error,
    totalPages: apiTotalPages || 1,
    currentPage,
    filter,
    sort,
    dateRange,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    handleDateRangeChange,
    exportToCSV,
    goBack,
    isTransactionDetailModalOpen, setIsTransactionDetailModalOpen,
    isAddTransactionModalOpen, setIsAddTransactionModalOpen,
    isTransactionInsertModalOpen,
    setIsTransactionInsertModalOpen,
    isTransactionsId,
    handletransactionUpdateId,
    searchTerm, setSearchTerm,
    getVisiblePages,
    handleDelete,
    handletransactionDetailId
  };
};