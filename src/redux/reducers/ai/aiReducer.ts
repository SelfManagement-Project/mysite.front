// redux/reducers/chatReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, ChatState } from '@/types/ai/interfaces';

const initialState: ChatState = {
    messages: [],
    isLoading: false,
    error: null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chatListRecentRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        chatListRecentSuccess: (state, action: PayloadAction<ChatMessage>) => {
            state.isLoading = false;
            state.messages = [...state.messages, action.payload];
            state.error = null;
        },
        chatListRecentFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    chatListRecentRequest,
    chatListRecentSuccess,
    chatListRecentFailure
} = chatSlice.actions;

export default chatSlice.reducer;