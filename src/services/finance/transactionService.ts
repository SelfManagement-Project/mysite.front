// src/services/finance/transactionService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const transactionService = {
  // 거래 내역 리스트 조회 (페이지네이션, 검색, 필터링 지원)
  getTransactionList: async (
    token: string, 
    page: number, 
    pageSize: number, 
    filter: any, 
    dateRange: any, 
    sort: any,
    searchTerm: string
  ) => {
    const response = await axios.get(`${baseUrl}/api/finance/info/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        pageSize,
        type: filter.type,
        category: filter.category,
        search: searchTerm,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        sortField: sort.field,
        sortDirection: sort.direction
      }
    });
    console.log('response.data:::::', response.data);
    return response.data;
  },
  
  // 거래 상세 조회
  getTransactionDetail: async (token: string, transactionId: number) => {
    const response = await axios.get(`${baseUrl}/api/finance/info/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 거래 추가
  addTransaction: async (token: string, transactionData: any) => {
    const response = await axios.post(`${baseUrl}/api/finance/info/transactions`, transactionData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 거래 수정
  updateTransaction: async (token: string, transactionId: number, transactionData: any) => {
    const response = await axios.put(`${baseUrl}/api/finance/info/transactions/${transactionId}`, transactionData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 거래 삭제
  deleteTransaction: async (token: string, transactionId: number) => {
    console.log('transactionId::::::',transactionId);
    const response = await axios.delete(`${baseUrl}/api/finance/info/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};