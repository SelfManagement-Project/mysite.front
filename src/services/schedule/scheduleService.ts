import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const scheduleService = {
    // 오늘 할일 조회
    fetchTodos: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/todos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },

    // 오늘 할일 수정
    updateTodo: async (token: string, todoId: number, isCompleted: boolean) => {
        const response = await axios.put(
            `${baseUrl}/api/schedule/todos/${todoId}`, 
            { isCompleted },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    },

    // 다가오는 일정 조회
    fetchUpcomingEvents: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/upcoming`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },

    // 주간 할일 완료율 조회
    fetchWeeklyProgress: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/weekly-progress`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
};