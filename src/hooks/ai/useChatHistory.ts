// hooks/ai/useChatHistory.ts
import { useState, useEffect } from 'react';
import { ChatHistory } from '@/types/components';

export const useChatHistory = () => {

    

    const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalChats, setTotalChats] = useState(0);

    // 임시 데이터
    const fetchChatHistories = async () => {
        const histories: ChatHistory[] = [
            {
                id: 1,
                title: "Resolving Foreign Key Constraint Error in Database Schema",
                lastMessage: "Last message 2 minutes ago",
                lastMessageTime: "2 minutes ago"
            },
            {
                id: 2,
                title: "Designing PostgreSQL ERD from UI Mockup",
                lastMessage: "Last message 1 hour ago",
                lastMessageTime: "1 hour ago"
            },
            // ... 더 많은 대화 기록
        ];
        setChatHistories(histories);
        setTotalChats(145); // 임시 총 대화 수
    };

    const handleSearch = (searchText: string) => {
        setSearchTerm(searchText);
        // 실제 구현 시 검색 로직 추가
    };

    useEffect(() => {
        fetchChatHistories();
    }, []);

    return {
        chatHistories,
        totalChats,
        searchTerm,
        handleSearch
    };
};
