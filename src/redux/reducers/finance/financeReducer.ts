// src/redux/reducers/finance/financeReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FinanceState, Transaction, CategoryBudget, BudgetStatus, SavingsStatus } from '@/types/finance/interfaces';

const initialState: FinanceState = {
  transactions: [],
  categoryBudgets: [],
  budgetStatus: {
    total_budget: 0,
    used_amount: 0,
    remaining: 0,
    usage_percentage: 0,
    total_income: 0,
    total_expense: 0
  },
  savingsStatus: {
    target_amount: 0,
    current_amount: 0,
    achievement_rate: 0
  },
  isLoading: false,
  error: null
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    // 재무 데이터 요청
    fetchFinanceDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchFinanceDataSuccess: (state, action: PayloadAction<{
      transactions: Transaction[];
      categoryBudgets: CategoryBudget[];
      budgetStatus: BudgetStatus;
      savingsStatus: SavingsStatus;
    }>) => {
      state.isLoading = false;
      state.transactions = action.payload.transactions;
      state.categoryBudgets = action.payload.categoryBudgets;
      state.budgetStatus = action.payload.budgetStatus;
      state.savingsStatus = action.payload.savingsStatus;
      state.error = null;
    },
    fetchFinanceDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchFinanceDataRequest,
  fetchFinanceDataSuccess,
  fetchFinanceDataFailure
} = financeSlice.actions;

export default financeSlice.reducer;