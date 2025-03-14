import { useState, useEffect, useRef, useCallback } from 'react';
import { store } from '@/redux/store';
import { ChatMessage, RecentChat } from '@/types/ai/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import { chatListRecent } from '@/redux/actions/ai/aiActions';

export const useAiPage = (chatId?: number) => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [canSendMessage, setCanSendMessage] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const typingInterval = useRef<NodeJS.Timeout | null>(null);
    const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션 전용
    const baseWsUrl = store.getState().url.PythonbaseUrl.replace('http', 'ws'); // WS 주소로 변경
    const userID = store.getState().auth.user?.apiData.userId;

    const [recentChats, setRecentChats] = useState<RecentChat[]>([]);

    const handleChatListRecent = async () => {
        const response = await dispatch(chatListRecent());
        if (response.payload && response.payload.apiData) {
            setRecentChats(response.payload.apiData);
        }
    };

    useEffect(() => {   
        handleChatListRecent();
    }, []);

    useEffect(() => {
        const chat_id = chatId ?? Date.now();
        const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userID}/${chat_id}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            setCanSendMessage(true);
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const aiContent = data.error || data.response;

            if (typingInterval.current) clearInterval(typingInterval.current);

            setIsLoading(false); // AI 답변 완료
            setIsTyping(true); // 타이핑 애니메이션 시작

            setChatMessages((prev) => [...prev, { type: 'ai', content: '' }]);

            let charIndex = 0;
            typingInterval.current = setInterval(() => {
                setChatMessages((prev) => {
                    const updatedMessages = [...prev];
                    const lastIndex = updatedMessages.length - 1;
                    updatedMessages[lastIndex].content = aiContent.slice(0, charIndex);
                    return updatedMessages;
                });
                charIndex += 1;

                if (charIndex > aiContent.length) {
                    if (typingInterval.current) clearInterval(typingInterval.current);
                    setIsTyping(false); // 타이핑 끝났을 때
                    
                    // 방법 3: 타이핑 효과가 끝난 후 대화 목록 갱신
                    // 약간의 지연을 주어 서버에 데이터가 완전히 저장될 시간을 확보
                    setTimeout(() => {
                        handleChatListRecent();
                    }, 500);
                }
            }, 20);
        };

        ws.current.onclose = () => {
            setCanSendMessage(false);
        };

        return () => {
            if (typingInterval.current) clearInterval(typingInterval.current);
            ws.current?.close();
        };
    }, [userID, chatId]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = useCallback(() => {
        if (!message.trim() || !canSendMessage || isLoading || isTyping || !ws.current) return;

        const userMessage: ChatMessage = { type: 'user', content: message };
        setChatMessages(prev => [...prev, userMessage]);
        setIsLoading(true); // AI 응답 기다리는 동안 true
        setMessage('');

        ws.current.send(JSON.stringify({ message }));
    }, [message, canSendMessage, isLoading, isTyping]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    const handleNewChat = () => {
        // 현재 대화 내용 초기화
        setChatMessages([]);
        setMessage('');

        // 기존 WebSocket 연결 닫기
        if (ws.current) {
            ws.current.close();
        }

        // 새로운 WebSocket 연결 생성
        const new_chat_id = Date.now();
        const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userID}/${new_chat_id}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            setCanSendMessage(true);
        };

        ws.current.onmessage = (event) => {
            // 기존 onmessage 핸들러 코드 복사
            const data = JSON.parse(event.data);
            const aiContent = data.error || data.response;

            if (typingInterval.current) clearInterval(typingInterval.current);

            setIsLoading(false);
            setIsTyping(true);

            setChatMessages((prev) => [...prev, { type: 'ai', content: '' }]);

            let charIndex = 0;
            typingInterval.current = setInterval(() => {
                setChatMessages((prev) => {
                    const updatedMessages = [...prev];
                    const lastIndex = updatedMessages.length - 1;
                    updatedMessages[lastIndex].content = aiContent.slice(0, charIndex);
                    return updatedMessages;
                });
                charIndex += 1;

                if (charIndex > aiContent.length) {
                    if (typingInterval.current) clearInterval(typingInterval.current);
                    setIsTyping(false);
                    
                    // 방법 3: 타이핑 효과가 끝난 후 대화 목록 갱신
                    // 약간의 지연을 주어 서버에 데이터가 완전히 저장될 시간을 확보
                    setTimeout(() => {
                        handleChatListRecent();
                    }, 500);
                }
            }, 20);
        };

        ws.current.onclose = () => {
            setCanSendMessage(false);
        };
    };
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    return {
        message,
        chatMessages,
        isLoading,
        handleMessageChange,
        handleSendMessage,
        handleKeyPress,
        handleNewChat,
        messagesEndRef,
        canSendMessage,
        recentChats,
    };
};