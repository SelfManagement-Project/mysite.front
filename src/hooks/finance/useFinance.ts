import { useState, useEffect } from 'react';
import { Transaction, CategoryBudget, BudgetStatus, SavingsStatus } from '@/types/finance/interfaces';
import { financeService } from '@/services/finance/financeService';

export const useFinance = () => {
    const token = localStorage.getItem('token');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([
        {
            category_name: '',
            amount: 0,
            percentage: 0
        }
    ]);
    const [budgetStatus, setBudgetStatus] = useState<BudgetStatus>({
        total_budget: 0,
        used_amount: 0,
        remaining: 0,
        usage_percentage: 0,
        total_income: 0,
        total_expense: 0
    });
    const [savingsStatus, setSavingsStatus] = useState<SavingsStatus>();
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            
            const [transactionsRes, categoryRes, budgetRes, savingsRes] = await Promise.all([
                financeService.transactionsRes(token!),
                financeService.categoryRes(token!),
                financeService.budgetRes(token!),
                financeService.savingsRes(token!)
            ]);
            setTransactions(transactionsRes.apiData || []);
            setCategoryBudgets(Array.isArray(categoryRes.apiData) ? categoryRes.apiData : []);
            setBudgetStatus(budgetRes.apiData || {
                total_budget: 0,
                used_amount: 0,
                remaining: 0,
                usage_percentage: 0,
                total_income: 0,
                total_expense: 0
            });
            setSavingsStatus(savingsRes.apiData || {
                target_amount: 0,
                current_amount: 0,
                achievement_rate: 0
            });
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
            // 에러 발생시 기본값 설정
            setTransactions([]);
            setCategoryBudgets([]);
            setBudgetStatus({
                total_budget: 0,
                used_amount: 0,
                remaining: 0,
                usage_percentage: 0,
                total_income: 0,
                total_expense: 0
            });
            setSavingsStatus({
                target_amount: 0,
                current_amount: 0,
                achievement_rate: 0
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        transactions,
        categoryBudgets,
        budgetStatus,
        savingsStatus,
        loading
    };
};
