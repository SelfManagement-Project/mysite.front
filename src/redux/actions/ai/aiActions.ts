// redux/actions/chatActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '@/services/ai/aiServices';
import { 
    fetchHistoryRequest, 
    fetchHistorySuccess, 
    fetchHistoryFailure,
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure 
} from '@/redux/reducers/ai/aiReducer';

export const fetchChatHistory = createAsyncThunk(
    'chat/fetchHistory',
    async (chatId: number, { dispatch }) => {
        try {
            dispatch(fetchHistoryRequest());
            const response = await chatService.getChatHistory(chatId);
            dispatch(fetchHistorySuccess(response.messages));
            return response.messages;
        } catch (error: any) {
            const message = error.response?.data?.message || '채팅 히스토리 로딩 실패';
            dispatch(fetchHistoryFailure(message));
            throw error;
        }
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (data: { message: string, chatId?: number }, { dispatch }) => {
        try {
            dispatch(sendMessageRequest());
            const response = await chatService.sendMessage(data);
            dispatch(sendMessageSuccess(response));
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '메시지 전송 실패';
            dispatch(sendMessageFailure(message));
            throw error;
        }
    }
);