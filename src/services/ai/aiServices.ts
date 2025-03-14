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
        return response.data;
    }
};