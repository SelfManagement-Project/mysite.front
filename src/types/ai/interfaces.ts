export interface ChatMessage {
    type: 'user' | 'ai';
    content: string;
}

export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

export interface ChatListResponse {
    messages: ChatMessage[];
}

export interface SendMessageRequest {
    message: string;
    chat_id?: number;
    user_id: number;
}

export interface ChatListProps {
    onSelectChat: (chatId: number) => void;  // 채팅 선택시 호출될 콜백 함수
}