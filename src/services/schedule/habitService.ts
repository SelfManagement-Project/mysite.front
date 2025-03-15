import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const habitService = {
    // 습관 데이터 조회
    fetchHabits: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/habits`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },
    
    updateHabitProgress: async (token: string, habitId: number) => {
        const response = await axios.put(`${baseUrl}/api/schedule/habits/${habitId}/progress`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
};

