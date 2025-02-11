// components/ai/AiPage.tsx
import { useState, useEffect, useRef } from 'react';
import "@/assets/styles/components/ai/AiPage.scss";

interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
}

const AiPage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: 'user',
      content: '일정 알려줘'
    },
    {
      type: 'ai',
      content: '2/5 12:00 회의가 있습니다.'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        type: 'user',
        content: message
      }
    ]);

    setMessage('');
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]); // chatMessages가 변경될 때마다 실행

  return (
    <div className="chatbot-container">
      <div className="sidebar">
        <button className="new-chat-btn">
          <i className="fas fa-plus"></i>
          새 대화하기
        </button>

        <div className="chat-history">
          <h3>최근 대화 기록</h3>
          <ul>
            <li>• 일정 관리점</li>
            <li>• 운동 자동화</li>
            <li>• 다이어트 도움말</li>
          </ul>
          <button className="view-all-btn">전체 대화 목록 보기</button>
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
                  {msg.type === 'user' ? '사용자 질문' : 'AI 응답'}
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
          <div ref={messagesEndRef} /> {/* 스크롤 위치를 잡기 위한 요소 */}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Input(채팅입력창)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <div className="input-buttons">
            <button className="function-btn">파일첨부</button>
            <button className="function-btn">음성입력</button>
            <button className="send-btn" onClick={handleSendMessage}>
              보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPage;