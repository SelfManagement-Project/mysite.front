import '@/assets/styles/components/ai/AiPage.scss';
import { useAiPage } from '@/hooks/ai/useAiPage';

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
        messagesEndRef
    } = useAiPage();

    return (
        <div className="chatbot-container">
            <div className="sidebar">
                <button className="new-chat-btn" onClick={handleNewChat}>
                    <i className="fas fa-plus"></i>
                    새 대화하기
                </button>

                {/* 생략된 코드: 히스토리 등 */}
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
