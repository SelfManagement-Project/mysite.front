// hooks/chat/useChatHistory.ts
import { useState, useEffect } from 'react';
import { ChatList } from '@/types/components';
import { chatListService } from '@/services/ai/chatListService';

export const useChatList = () => {
    const [chatList, setChatList] = useState<ChatList[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalChats, setTotalChats] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchChatHistories();
    }, [token]);

    // 채팅 기록 불러오기
    const fetchChatHistories = async (searchText = '') => {
        if (!token) return;
        const data = await chatListService.fetchChatHistories(token, searchText);

        // console.log('data:::::',data);

        setChatList(data);
        setTotalChats(data.length);
    };

    // 검색어 변경 핸들러
    const handleSearch = (searchText: string) => {
        setSearchTerm(searchText);
        fetchChatHistories(searchText);
    };

    

    return {
        chatList,
        totalChats,
        searchTerm,
        handleSearch,
        fetchChatHistories
    };
};
