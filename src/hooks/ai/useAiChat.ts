import { useState, useEffect, useRef, useCallback } from 'react';
import { store } from '@/redux/store';
import { ChatMessage, RecentChat } from '@/types/ai/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import { chatListRecent, fetchChatHistory } from '@/redux/actions/ai/aiChatActions';
import { v4 as uuidv4 } from 'uuid'; // uuid 라이브러리 설치 필요: npm install uuid @types/uuid

export const useAiChat = (chatId?: number | null) => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [canSendMessage, setCanSendMessage] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    const typingInterval = useRef<NodeJS.Timeout | null>(null);
    const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션 전용
    const baseWsUrl = store.getState().url.PythonbaseUrl.replace('http', 'ws'); // WS 주소로 변경
    const userID = store.getState().auth.user?.apiData.userId;

    const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
    const [sidebarVisible, setSidebarVisible] = useState(false); // 사이드바 상태 추가

    const [hasError, setHasError] = useState(false); // 상태 추가

    // 디바이스 ID 생성 또는 가져오기
    const getDeviceId = useCallback(() => {
        // 로컬 스토리지에서 디바이스 ID 확인
        let storedDeviceId = localStorage.getItem('device_id');
        
        // 없으면 새로 생성
        if (!storedDeviceId) {
            storedDeviceId = `web_${uuidv4()}`;
            localStorage.setItem('device_id', storedDeviceId);
        }
        
        console.log('디바이스 ID:', storedDeviceId);
        setDeviceId(storedDeviceId);
        return storedDeviceId;
    }, []);

    // 컴포넌트 마운트 시 디바이스 ID 초기화
    useEffect(() => {
        getDeviceId();
    }, [getDeviceId]);

    const handleChatListRecent = async () => {
        const response = await dispatch(chatListRecent());
        if (response.payload && response.payload.apiData) {
            setRecentChats(response.payload.apiData);
        }
    };

    useEffect(() => {
        handleChatListRecent();
    }, []);

    // 💡 chatId 변경 시 대화 기록 불러오기 추가
    useEffect(() => {
        if (chatId) {
            handleFetchChatHistory(chatId);
        }
    }, [chatId]);

    const handleFetchChatHistory = async (chatId: number) => {
        setIsLoading(true);

        // 기존 WebSocket 연결 닫기
        if (ws.current) {
            ws.current.close();
        }

        try {
            const response = await dispatch(fetchChatHistory(chatId));

            if (response.payload && response.payload.apiData) {
                const historyData = responseToChatMessages(response.payload.apiData);
                setChatMessages(historyData);

                // 디바이스 ID 가져오기
                const currentDeviceId = deviceId || getDeviceId();

                // 선택한 채팅 ID로 새 WebSocket 연결 생성 (디바이스 ID 포함)
                const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userID}/${chatId}/${currentDeviceId}`;
                console.log('웹소켓 연결 시도:', wsUrl);
                
                ws.current = new WebSocket(wsUrl);

                // WebSocket 이벤트 핸들러 설정
                ws.current.onopen = () => {
                    console.log('웹소켓 연결 성공');
                    setCanSendMessage(true);
                };

                ws.current.onmessage = (event) => {
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

                            setTimeout(() => {
                                handleChatListRecent();
                            }, 500);
                        }
                    }, 20);
                };

                ws.current.onclose = () => {
                    console.log('웹소켓 연결 종료');
                    setCanSendMessage(false);
                };

                ws.current.onerror = (error) => {
                    console.error('웹소켓 오류:', error);
                    setCanSendMessage(false);
                };
            }
        } catch (e) {
            console.error(e);
            setHasError(true);  // 에러 발생 상태 저장

            setChatMessages(prev => [
                ...prev,
                {
                    type: 'ai',
                    content: '죄송해요! 현재 답변을 드릴 수 없어요 😢 잠시 후 다시 시도해주세요.',
                    timestamp: new Date().toISOString(),
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const responseToChatMessages = (data: any[]): ChatMessage[] => {
        return data.map(item => ({
            type: item.messageType === 'user' ? 'user' : 'ai',
            content: item.content
        }));
    };

    // 사이드바 토글 함수
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        const chat_id = chatId ?? Date.now();
        // 디바이스 ID 가져오기
        const currentDeviceId = deviceId || getDeviceId();
        
        // 웹소켓 URL에 디바이스 ID 추가
        const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userID}/${chat_id}/${currentDeviceId}`;
        console.log('웹소켓 연결 시도:', wsUrl);
        
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('웹소켓 연결 성공');
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

                    // 타이핑 효과가 끝난 후 대화 목록 갱신
                    setTimeout(() => {
                        handleChatListRecent();
                    }, 500);
                }
            }, 20);
        };

        ws.current.onclose = () => {
            console.log('웹소켓 연결 종료');
            setCanSendMessage(false);
        };

        ws.current.onerror = (error) => {
            console.error('웹소켓 오류:', error);
            setCanSendMessage(false);
        };

        return () => {
            if (typingInterval.current) clearInterval(typingInterval.current);
            ws.current?.close();
        };
    }, [userID, chatId, deviceId]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = useCallback(() => {
        if (!message.trim() || !canSendMessage || isLoading || isTyping || !ws.current) return;
        
        const userMessage: ChatMessage = { type: 'user', content: message };
        setChatMessages(prev => [...prev, userMessage]);
        setIsLoading(true); // AI 응답 기다리는 동안 true
        setMessage('');

        // 메시지 전송 시 디바이스 ID 포함
        ws.current.send(JSON.stringify({ 
            message,
            device_id: deviceId
        }));
    }, [message, canSendMessage, isLoading, isTyping, deviceId]);

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
        // 디바이스 ID 가져오기
        const currentDeviceId = deviceId || getDeviceId();
        
        // 웹소켓 URL에 디바이스 ID 추가
        const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userID}/${new_chat_id}/${currentDeviceId}`;
        console.log('새 채팅 웹소켓 연결 시도:', wsUrl);
        
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('웹소켓 연결 성공');
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

                    setTimeout(() => {
                        handleChatListRecent();
                    }, 500);
                }
            }, 20);
        };

        ws.current.onclose = () => {
            console.log('웹소켓 연결 종료');
            setCanSendMessage(false);
        };

        ws.current.onerror = (error) => {
            console.error('웹소켓 오류:', error);
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
        handleFetchChatHistory,
        sidebarVisible, 
        setSidebarVisible,
        toggleSidebar,
        hasError, 
        setHasError
    };
};