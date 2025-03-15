// redux/actions/chatActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '@/services/ai/aiServices';
import { 
    chatListRecentRequest,
    chatListRecentSuccess,
    chatListRecentFailure,
    chatHistoryRequest,
    chatHistorySuccess,
    chatHistoryFailure
} from '@/redux/reducers/ai/aiReducer';
import { chatListService } from '@/services/ai/chatListService';

export const chatListRecent = createAsyncThunk(
    'chat/chatListRecent',
    async (_, { dispatch }) => {
        try {
            dispatch(chatListRecentRequest());
            const response = await chatService.chatListRecent();
            dispatch(chatListRecentSuccess(response));
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '메시지 전송 실패';
            dispatch(chatListRecentFailure(message));
            throw error;
        }
    }
);

export const fetchChatHistory = createAsyncThunk(
    'chat/fetchChatHistory',
    async (chatId: number, { dispatch }) => {
        try {
            dispatch(chatHistoryRequest());
            const response = await chatService.getChatHistory(chatId);
            dispatch(chatHistorySuccess(response));
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '대화 기록을 불러오는데 실패했습니다.';
            dispatch(chatHistoryFailure(message));
            throw error;
        }
    }
);

export const fetchChatList = createAsyncThunk(
    'chat/fetchChatList',
    async ({ searchText }: { searchText: string }, { dispatch }) => {
        try {
            dispatch(chatHistoryRequest());
            const response = await chatListService.fetchChatList(searchText);
            dispatch(chatHistorySuccess(response));
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '대화 기록을 불러오는데 실패했습니다.';
            dispatch(chatHistoryFailure(message));
            throw error;
        }
    }
);