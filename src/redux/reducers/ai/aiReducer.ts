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
        fetchHistoryRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchHistorySuccess: (state, action: PayloadAction<ChatMessage[]>) => {
            state.isLoading = false;
            state.messages = action.payload;
            state.error = null;
        },
        fetchHistoryFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        sendMessageRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        sendMessageSuccess: (state, action: PayloadAction<ChatMessage>) => {
            state.isLoading = false;
            state.messages = [...state.messages, action.payload];
            state.error = null;
        },
        sendMessageFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchHistoryRequest,
    fetchHistorySuccess,
    fetchHistoryFailure,
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure
} = chatSlice.actions;

export default chatSlice.reducer;