// src/redux/reducers/finance/transactionReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionList } from '@/types/finance/interfaces';

interface TransactionState {
  transactions: TransactionList[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  totalPages: 1,
  currentPage: 1,
  isLoading: false,
  error: null
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    fetchTransactionListRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTransactionListSuccess: (state, action: PayloadAction<{
      transactions: TransactionList[];
      totalPages: number;
      currentPage: number;
    }>) => {
      state.isLoading = false;
      state.transactions = action.payload.transactions;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.error = null;
    },
    fetchTransactionListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 리포트 조회 관련
    transactionDeleteRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    transactionDeleteSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    transactionDeleteFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchTransactionListRequest,
  fetchTransactionListSuccess,
  fetchTransactionListFailure,
  transactionDeleteRequest,
  transactionDeleteSuccess,
  transactionDeleteFailure
} = transactionSlice.actions;

export default transactionSlice.reducer;