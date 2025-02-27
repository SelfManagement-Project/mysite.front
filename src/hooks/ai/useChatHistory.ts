// hooks/chat/useChatHistory.ts
import { useState, useEffect } from 'react';
import { ChatHistory } from '@/types/components';
import { chatHistoryService } from '@/services/ai/chatHistoryService';

export const useChatHistory = () => {
    const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalChats, setTotalChats] = useState(0);
    const token = localStorage.getItem('token');

    // 채팅 기록 불러오기
    const fetchChatHistories = async (searchText = '') => {
        if (!token) return;
        const data = await chatHistoryService.fetchChatHistories(token, searchText);
        setChatHistories(data);
        setTotalChats(data.length);
    };

    // 검색어 변경 핸들러
    const handleSearch = (searchText: string) => {
        setSearchTerm(searchText);
        fetchChatHistories(searchText);
    };

    useEffect(() => {
        fetchChatHistories();
    }, [token]);

    return {
        chatHistories,
        totalChats,
        searchTerm,
        handleSearch
    };
};
