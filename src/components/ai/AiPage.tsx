import '@/assets/styles/components/ai/AiPage.scss';
import { useAiPage } from '@/hooks/ai/useAiPage';
import { RecentChat } from '@/types/ai/interfaces';

const AiPage = () => {
    const {
        message,
        chatMessages,
        isLoading,
        handleSendMessage,
        handleMessageChange,
        handleKeyPress,
        canSendMessage,
        handleNewChat,
        messagesEndRef,
        recentChats  // 추가된 부분
    } = useAiPage();

    return (
        <div className="chatbot-container">
            <div className="sidebar">
                <button className="new-chat-btn" onClick={handleNewChat}>
                    <i className="fas fa-plus"></i>
                    새 대화하기
                </button>

                <div className="chat-history">
                    <h3>최근 대화 기록</h3>
                    <ul>
                        {recentChats && recentChats.length > 0 ? (
                            recentChats.map((chat: RecentChat, index: number) => (
                                <li key={chat.chat_id || `chat-${index}`} className="chat-history-item">
                                    • {chat.message && chat.message.length > 12
                                        ? chat.message.substring(0, 12) + '...'
                                        : chat.message || '메시지 없음'}
                                </li>
                            ))
                        ) : (
                            <li key="no-chats">• 최근 대화 기록이 없습니다</li>
                        )}
                    </ul>
                </div>

                <div className="suggested-topics">
                    <h3>추천 질문</h3>
                    <ul>
                        <li>• 지출 패턴 분석</li>
                        <li>• 운동 루틴 추천</li>
                        <li>• 식단 조언</li>
                    </ul>
                </div>
            </div>

            <div className="chat-main">
                <h2>채팅 메시지 영역</h2>

                <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`message-group ${msg.type}`}>
                            <div className="message-content">
                                <div className="message-header">
                                    {msg.type === 'user' ? '사용자 질문' : (msg.type === 'ai' ? 'AI 응답' : '오류')}
                                </div>
                                <div className="message-text">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="loading-message">
                            <div className="typing-indicator">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={handleKeyPress}
                        disabled={!canSendMessage}
                    />
                    <div className="input-buttons">
                        <button className="function-btn">파일첨부</button>
                        <button className="function-btn">음성입력</button>
                        <button
                            className="send-btn"
                            onClick={handleSendMessage}
                            disabled={!canSendMessage || !message.trim()}
                        >
                            보내기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiPage;