// hooks/ai/useAiPage.ts
import { useState, useEffect, useRef } from 'react';
import { sendMessage } from '@/redux/actions/ai/aiActions';
import { useAppDispatch } from '@/redux/hooks';
import { ChatMessage } from '@/types/ai/interfaces';
import { store } from '@/redux/store';

const userID = store.getState().auth.user?.apiData.userId;

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
    const [chatId, setChatId] = useState<number | undefined>(undefined);

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
            setCanSendMessage(false);
            setIsLoading(true);

            const userMessage: ChatMessage = {
                type: 'user',
                content: message
            };
            setChatMessages(prev => [...prev, userMessage]);


            const user_id = userID; // 로그인된 사용자 ID
            console.log('user_id::::',user_id);
            if (user_id) {
                const response = await dispatch(sendMessage({ message, user_id: user_id as number, chat_id: chatId ?? undefined })).unwrap();

                const aiMessage: ChatMessage = {
                    type: 'ai',
                    content: response.response
                };
                setChatMessages(prev => [...prev, aiMessage]);
            } else {
                // 사용자가 로그인하지 않은 경우 처리
                setChatMessages(prev => [...prev, { type: 'ai', content: '로그인이 필요한 서비스입니다.' }]);
            }
        } catch (error) {
            setChatMessages(prev => [...prev, { type: 'ai', content: '죄송합니다. 메시지 처리 중 오류가 발생했습니다.' }]);
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
            setMessage('');
            setCanSendMessage(true);
        }
    };

    // 🔹 "새 대화하기" 버튼 기능
    const handleNewChat = () => {
        setChatMessages([]); // 기존 메시지 초기화
        setMessage('');
        setChatId(Date.now()); // 새로운 채팅 ID 생성 (임시)
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
        canSendMessage,
        handleNewChat
    };
};