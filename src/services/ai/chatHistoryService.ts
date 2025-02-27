// services/ai/chatHistoryService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const chatHistoryService = {
    // 채팅 기록 조회
    fetchChatHistories: async (token: string, searchText = '') => {
        try {
            const response = await axios.get(`${baseUrl}/api/ai/chat_history/list`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { search: searchText }
            });
            return response.data.apiData;
        } catch (error) {
            console.error('Failed to fetch chat histories', error);
            return [];
        }
    }
};
