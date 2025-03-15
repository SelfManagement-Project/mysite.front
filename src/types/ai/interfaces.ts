export interface ChatMessage {
    type: 'user' | 'ai' | 'error';  // 'error' 추가
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

export interface RecentChat {
    chatId: number;
    message: string;
    response: string;
    created_at: string;
    // 필요한 다른 필드들 추가
}

export interface AiPageProps {
    selectedChatId?: number | null;
  }

export interface ChatListProps {
    onSelectChat: (chatId: number) => void;  // 채팅 선택시 호출될 콜백 함수
}