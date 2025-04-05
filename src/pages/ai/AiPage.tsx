import "@/assets/styles/pages/ai/AiChat.scss";
import { useState } from 'react';
import ChatList from '@/components/ai/ChatList';
import AiChat from '@/components/ai/AiChat';  // AiPage 임포트 추가
import Lottie from 'lottie-react';
import answer from '@/assets/animations/answer.json'; // 애니메이션 JSON 파일 경로

const AiPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  // 채팅 선택 핸들러
  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
    setActiveTab(0);
  };

  const tabs = [
    { id: 0, title: '챗봇', content: <AiChat selectedChatId={selectedChatId} /> },
    { id: 1, title: '전체 대화 목록', content: <ChatList onSelectChat={handleSelectChat} /> }
  ];

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-content">
        <div className="ai-chat-header">
          <h3 className="ai-chat-title">AI 서비스</h3>
          <div className="ai-mascot-box">
            <Lottie animationData={answer} loop={true} className="ai-mascot" />
          </div>
        </div>
        <div className="ai-chat-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`ai-chat-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="ai-chat-body">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default AiPage;