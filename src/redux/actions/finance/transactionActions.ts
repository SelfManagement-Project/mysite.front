// src/redux/actions/finance/transactionActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { transactionService } from '@/services/finance/transactionService';
import {
  fetchTransactionListRequest,
  fetchTransactionListSuccess,
  fetchTransactionListFailure,
  transactionDeleteRequest,
  transactionDeleteSuccess,
  transactionDeleteFailure
} from '@/redux/reducers/finance/transactionReducer';

export const fetchTransactionList = createAsyncThunk(
  'transaction/fetchList',
  async (params: {
    page: number;
    pageSize: number;
    filter: any;
    dateRange: any;
    sort: any;
    searchTerm: string;
  }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다.');
      
      dispatch(fetchTransactionListRequest());
      
      const response = await transactionService.getTransactionList(
        token,
        params.page,
        params.pageSize,
        params.filter,
        params.dateRange,
        params.sort,
        params.searchTerm
      );
      
      const payload = {
        transactions: response.apiData.items || [],
        totalPages: response.apiData.totalPages || 1,
        currentPage: params.page
      };
      
      dispatch(fetchTransactionListSuccess(payload));
      return payload;
    } catch (error: any) {
      const message = error.response?.data?.message || '거래 내역을 불러오는데 실패했습니다.';
      dispatch(fetchTransactionListFailure(message));
      throw error;
    }
  }
);

export const fetchTransactionDelete = createAsyncThunk(
  'transaction/fetchDelete',
  async ({ token , transactionId}: { token: string; transactionId: number; }, { dispatch }) => {
    try {
      dispatch(transactionDeleteRequest());
      const response = await transactionService.deleteTransaction(token, transactionId);
      dispatch(transactionDeleteSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '삭제 실패';
      dispatch(transactionDeleteFailure(message));
      throw error;
    }
  },

);