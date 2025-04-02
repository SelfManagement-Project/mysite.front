// hooks/chat/useChatHistory.ts
import { useState, useEffect } from 'react';
import { ChatList } from '@/types/components';
import { useAppDispatch } from '@/redux/hooks';
import { fetchChatList } from '@/redux/actions/ai/aiChatActions';

export const useChatList = () => {
    const dispatch = useAppDispatch();
    const [chatList, setChatList] = useState<ChatList[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalChats, setTotalChats] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        handleFetchChatList();
    }, [token]);


    // 채팅 기록 불러오기
    const handleFetchChatList = async (searchText = '') => {
        if (!token) return;
        const data = await dispatch(fetchChatList({ searchText }));

        // console.log('data:::::',data.payload.apiData);

        setChatList(data.payload.apiData);
        setTotalChats(data.payload.apiData.length);
    };

    // 검색어 변경 핸들러
    const handleSearch = (searchText: string) => {
        setSearchTerm(searchText);
        handleFetchChatList(searchText);
    };

    

    return {
        chatList,
        totalChats,
        searchTerm,
        handleSearch,
        handleFetchChatList
    };
};
