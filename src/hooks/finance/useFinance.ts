// src/hooks/finance/useFinance.ts
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchFinanceData } from '@/redux/actions/finance/financeActions.ts';

export const useFinance = () => {
  const dispatch = useAppDispatch();
  const [isDateSelectionModalOpen, setIsDateSelectionModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isBudgetSettingModalOpen, setIsBudgetSettingModalOpen] = useState(false);
  const [isSavingsGoalModalOpen, setIsSavingsGoalModalOpen] = useState(false);
  const [isTransactionDetailModalOpen, setIsTransactionDetailModalOpen] = useState(false);
  const [isCategoryManagementModalOpen, setIsCategoryManagementModalOpen] = useState(false);
  
  const { 
    transactions,
    categoryBudgets,
    budgetStatus,
    savingsStatus,
    isLoading,
    error 
  } = useAppSelector(state => state.finance);

  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  return {
    transactions,
    categoryBudgets,
    budgetStatus,
    savingsStatus,
    loading: isLoading,
    error,
    isDateSelectionModalOpen, setIsDateSelectionModalOpen,
    isSettingsModalOpen, setIsSettingsModalOpen,
    isAddTransactionModalOpen, setIsAddTransactionModalOpen,
    isBudgetSettingModalOpen, setIsBudgetSettingModalOpen,
    isSavingsGoalModalOpen, setIsSavingsGoalModalOpen,
    isTransactionDetailModalOpen, setIsTransactionDetailModalOpen,
    isCategoryManagementModalOpen, setIsCategoryManagementModalOpen,
  };
};