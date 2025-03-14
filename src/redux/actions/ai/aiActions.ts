// redux/actions/chatActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '@/services/ai/aiServices';
import { 
    chatListRecentRequest,
    chatListRecentSuccess,
    chatListRecentFailure 
} from '@/redux/reducers/ai/aiReducer';

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