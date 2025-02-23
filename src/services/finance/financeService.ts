import axios from '@/services/api/instance';

const token = localStorage.getItem('token');

export const financeService = {
    // 거래 내역 조회
    getTransactions: async () => {
        const response = await axios.get('/api/finance/transactions', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // 예산 정보 조회
    getBudget: async () => {
        const response = await axios.get('/api/finance/budget', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // 카테고리별 예산 조회
    getCategoryBudgets: async () => {
        const response = await axios.get('/api/finance/category-budgets', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // 저축 목표 조회
    getSavingsGoal: async () => {
        const response = await axios.get('/api/finance/savings-goal', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};