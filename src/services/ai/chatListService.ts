// services/ai/chatListService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const chatListService = {
    // 채팅 기록 조회
    fetchChatList: async (searchText = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/api/ai/chat/list/total`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { search: searchText }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch chat histories', error);
            return [];
        }
        
    }
};
