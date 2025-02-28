// services/chatService.ts
import axios from '@/services/api/instance';
import { SendMessageRequest } from '@/types/ai/interfaces';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.PythonbaseUrl;

export const chatService = {
    sendMessage: async (data: SendMessageRequest) => {
        console.log('data:::', data);
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/api/chat/send`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data
        });
        return response.data;
    }
};