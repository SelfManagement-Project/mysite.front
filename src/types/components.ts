export interface Categories {
    exercise: boolean;
    shopping: boolean;
    frequent: boolean;
}

export interface ChatMessage {
    type: 'user' | 'ai';
    content: string;
}

export interface ChatHistory {
    id: number;
    title: string;
    lastMessage: string;
    lastMessageTime: string;
}
