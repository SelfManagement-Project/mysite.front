// redux/actions/chatActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '@/services/ai/aiServices';
import { 
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure 
} from '@/redux/reducers/ai/aiReducer';

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (data: { message: string, user_id: number, chat_id?: number }, { dispatch }) => {
        console.log('data::::1',data);
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