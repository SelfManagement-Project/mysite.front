// useTransactionList.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionList, FilterOptions, DateRange, SortOptions } from '@/types/finance/interfaces';

export const useTransactionList = () => {
  const navigate = useNavigate();
  
  const [transactions, setTransactions] = useState<TransactionList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isTransactionDetailModalOpen, setIsTransactionDetailModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isTransactionInsertModalOpen, setIsTransactionInsertModalOpen] = useState(false);
  const [isTransactionsId, setIsTransactionsId] = useState('');
  
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

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출로 대체
      // const response = await fetch(
      //   `/api/transactions?page=${currentPage}&pageSize=${pageSize}&type=${filter.type}&category=${filter.category}&search=${filter.search}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&sortField=${sort.field}&sortDirection=${sort.direction}`
      // );
      
      // if (!response.ok) {
      //   throw new Error('거래 내역을 불러오는 중 오류가 발생했습니다.');
      // }
      
      // const data = await response.json();
      // setTransactions(data.items);
      // setTotalPages(data.totalPages);
      
      // 임시 데이터 생성
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 목업 데이터
      const mockTransactions = Array.from({ length: 100 }, (_, i) => {
        const isIncome = Math.random() > 0.7;
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 90));
        
        const categories = isIncome 
          ? ['급여', '부수입', '용돈', '상여금', '기타'] 
          : ['식비', '교통비', '주거/통신', '쇼핑', '여가', '의료/건강', '교육', '기타'];
        
        const category = categories[Math.floor(Math.random() * categories.length)];
        const amount = Math.floor(Math.random() * 500000) + 10000;
        
        const descriptions = isIncome 
          ? ['월급', '보너스', '이자수입', '부업수입', '용돈'] 
          : ['식당', '카페', '마트', '교통비', '쇼핑', '영화', '의료비', '교육비'];
        
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        return {
          id: `${i}`,
          amount,
          category,
          description,
          date: date.toISOString().split('T')[0],
          is_income: isIncome,
          created_at: new Date().toISOString()
        };
      });
      
      // 필터링
      let filteredTransactions = mockTransactions;
      
      if (filter.type !== 'all') {
        const isIncome = filter.type === 'income';
        filteredTransactions = filteredTransactions.filter(tr => tr.is_income === isIncome);
      }
      
      if (filter.category !== 'all') {
        filteredTransactions = filteredTransactions.filter(tr => tr.category === filter.category);
      }
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filteredTransactions = filteredTransactions.filter(tr => 
          tr.description.toLowerCase().includes(searchLower) || 
          tr.category.toLowerCase().includes(searchLower)
        );
      }
      
      // 날짜 범위
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // 종료일의 끝
      
      filteredTransactions = filteredTransactions.filter(tr => {
        const trDate = new Date(tr.date);
        return trDate >= startDate && trDate <= endDate;
      });
      
      // 정렬
      filteredTransactions.sort((a, b) => {
        if (sort.field === 'date') {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sort.field === 'amount') {
          return sort.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        return 0;
      });
      
      // 페이지네이션
      const totalItems = filteredTransactions.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      const paginatedTransactions = filteredTransactions.slice(start, end);
      
      setTransactions(paginatedTransactions);
      setTotalPages(Math.max(1, totalPages));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // 거래 내역 데이터 불러오기
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, pageSize, filter, dateRange, sort]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
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
    // 실제 구현에서는 전체 데이터를 가져와 CSV로 변환하는 로직 필요
    alert('거래 내역이 CSV 파일로 내보내기 되었습니다.');
  };

  // 뒤로가기 함수
  const goBack = () => {
    navigate(-1);
  };

  const handletransactionId = (transactionId: string) => {
    setIsTransactionInsertModalOpen(true);
    setIsTransactionsId(transactionId);
  };

  return {
    transactions,
    loading,
    error,
    totalPages,
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
    handletransactionId
  };
};