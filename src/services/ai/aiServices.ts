// services/chatService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const chatService = {
    chatListRecent: async () => {
        // console.log('data::::',data);
        const token = localStorage.getItem('token');
        const response = await axios({
            method: 'get',
            url: `${baseUrl}/api/ai/chat/list/recent`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // data
        });
        // console.log('response::::',response);
        return response.data;
    },
    getChatHistory: async (chatId: number) => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/ai/chat/history/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    },
};