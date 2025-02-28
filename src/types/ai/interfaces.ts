export interface ChatMessage {
    type: 'user' | 'ai';
    content: string;
}

export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

export interface ChatHistoryResponse {
    messages: ChatMessage[];
}

export interface SendMessageRequest {
    message: string;
    chat_id?: number;
    user_id: number;
}