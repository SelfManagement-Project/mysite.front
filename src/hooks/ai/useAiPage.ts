// hooks/ai/useAiPage.ts
import { useState, useEffect, useRef } from 'react';
import { fetchChatHistory, sendMessage } from '@/redux/actions/ai/aiActions';
import { useAppDispatch } from '@/redux/hooks';
import { ChatMessage } from '@/types/ai/interfaces';

// const INITIAL_MESSAGES: ChatMessage[] = [
//     {
//         type: 'user',
//         content: '일정 알려줘'
//     },
//     {
//         type: 'ai',
//         content: '2/5 12:00 회의가 있습니다.'
//     }
// ];

export const useAiPage = () => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [canSendMessage, setCanSendMessage] = useState(true); // 메시지 전송 가능 여부

    const loadChatHistory = async (chatId: number) => {
        try {
            // 채팅 히스토리를 가져오는 API 호출
            // const response = await fetch(`/api/chat-history/${chatId}`);
            await dispatch(fetchChatHistory( chatId ));
            // console.log(response);
        } catch (error) {
            console.error('채팅 히스토리 로딩 오류:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim() || !canSendMessage || isLoading) return;
        
        try {
            setCanSendMessage(false); // 메시지 전송 비활성화
            setIsLoading(true);

            const userMessage: ChatMessage = {
                type: 'user',
                content: message
            };
            setChatMessages(prev => [...prev, userMessage]);
            
            const response = await dispatch(sendMessage({ message })).unwrap();
            
            const aiMessage: ChatMessage = {
                type: 'ai',
                content: response.content
            };
            setChatMessages(prev => [...prev, aiMessage]);
            
        } catch (error) {
            const errorMessage: ChatMessage = {
                type: 'ai',
                content: '죄송합니다. 메시지 처리 중 오류가 발생했습니다.'
            };
            setChatMessages(prev => [...prev, errorMessage]);
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
            setMessage('');
            setCanSendMessage(true); // 메시지 전송 다시 활성화
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    return {
        message,
        setMessage,
        isLoading,
        setIsLoading,
        messagesEndRef,
        scrollToBottom,
        chatMessages,
        setChatMessages,
        handleSendMessage,
        handleMessageChange,
        handleKeyPress,
        loadChatHistory,
        canSendMessage
    };
};