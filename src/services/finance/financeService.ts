import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const financeService = {
    // 거래 내역 조회
    transactionsRes: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/finance/transactions`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // 예산 정보 조회
    categoryRes: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/finance/category-budgets`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // 카테고리별 예산 조회
    budgetRes: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/finance/budget-status`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // 저축 목표 조회
    savingsRes: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/finance/savings-status`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};