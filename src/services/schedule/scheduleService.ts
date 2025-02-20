import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const scheduleService = {
    fetchTodos: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/todos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },

    updateTodo: async (token: string, todoId: number, isCompleted: boolean) => {
        const response = await axios.put(
            `${baseUrl}/api/schedule/todos/${todoId}`, 
            { isCompleted },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    },

    fetchUpcomingEvents: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/upcoming`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },

    fetchWeeklyProgress: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/weekly-progress`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
};