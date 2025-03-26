// src/redux/actions/finance/financeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { financeService } from '@/services/finance/financeService';
import {
  fetchFinanceDataRequest,
  fetchFinanceDataSuccess,
  fetchFinanceDataFailure
} from '@/redux/reducers/finance/financeReducer';

// 모든 재무 데이터 조회
export const fetchFinanceData = createAsyncThunk(
  'finance/fetchData',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다.');
      
      dispatch(fetchFinanceDataRequest());
      
      const [transactionsRes, categoryRes, budgetRes, savingsRes] = await Promise.all([
        financeService.transactionsRes(token),
        financeService.categoryRes(token),
        financeService.budgetRes(token),
        financeService.savingsRes(token)
      ]);
      
      const payload = {
        transactions: transactionsRes.apiData || [],
        categoryBudgets: categoryRes.apiData || [],
        budgetStatus: budgetRes.apiData || {
          total_budget: 0,
          used_amount: 0,
          remaining: 0,
          usage_percentage: 0,
          total_income: 0,
          total_expense: 0
        },
        savingsStatus: savingsRes.apiData || {
          target_amount: 0,
          current_amount: 0,
          achievement_rate: 0
        }
      };
      
      dispatch(fetchFinanceDataSuccess(payload));
      return payload;
    } catch (error: any) {
      const message = error.response?.data?.message || '재무 데이터를 불러오는데 실패했습니다.';
      dispatch(fetchFinanceDataFailure(message));
      throw error;
    }
  }
);