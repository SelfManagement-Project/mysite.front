export interface Categories {
    exercise: boolean;
    shopping: boolean;
    frequent: boolean;
}

export interface ChatMessage {
    type: 'user' | 'ai';
    content: string;
}

export interface ChatList {
    chatId: number;        // ✅ id → chatId (백엔드 데이터와 일치)
    message: string;       // ✅ title → message (사용자가 보낸 마지막 메시지)
    response: string;      // ✅ 챗봇 응답 내용 추가 (백엔드 응답 포함)
    createdAt: string;     // ✅ lastMessageTime → createdAt (채팅 생성 시간)
    isCompleted: boolean;  // ✅ 대화 완료 여부 추가
}

