import '@/assets/styles/components/ai/AiChat.scss';
import { useAiChat } from '@/hooks/ai/useAiChat';
import { RecentChat, AiPageProps } from '@/types/ai/interfaces';

import Lottie from 'lottie-react';
import loading from '@/assets/animations/loading.json'; // 애니메이션 JSON 파일 경로
import error1 from '@/assets/animations/error1.json'; // 애니메이션 JSON 파일 경로

const AiChat = ({ selectedChatId }: AiPageProps) => {


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
        recentChats,
        handleFetchChatHistory,
        sidebarVisible,
        toggleSidebar,
        hasError
    } = useAiChat(selectedChatId);



    return (
        <div className={`chatbot-container ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
            {/* 토글 버튼을 chat-main 밖으로 이동 - 항상 보이게 됨 */}
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                {sidebarVisible ? "←" : "→"}
            </button>

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
                                <li
                                    key={chat.chatId || `chat-${index}`}
                                    className="chat-history-item"
                                    onClick={() => handleFetchChatHistory(chat.chatId)}
                                >
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

                                <div className="loading-animation">
                                    <Lottie animationData={loading} loop={true} className="ai-mascot" />
                                </div>
                                <div className='typing-dots'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {hasError && (
                        <div className="ai-error-message">
                            <Lottie animationData={error1} loop={true} className="ai-mascot" />
                            <p className="speech-bubble">
                                죄송해요! 현재 답변을 드릴 수 없어요 😢 <br />
                                잠시 후 다시 시도해주세요.
                            </p>
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

export default AiChat;