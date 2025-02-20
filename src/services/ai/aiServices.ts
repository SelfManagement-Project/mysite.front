// services/chatService.ts
import axios from '@/services/api/instance';
import { ChatHistoryResponse, SendMessageRequest } from '@/types/ai/interfaces';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.PythonbaseUrl;

export const chatService = {
    getChatHistory: async (chatId: number): Promise<ChatHistoryResponse> => {
        const response = await axios({
            method: 'get',
            url: `${baseUrl}/api/chat-history/${chatId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },

    sendMessage: async (data: SendMessageRequest) => {
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