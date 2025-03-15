import "@/assets/styles/components/common/AiModal.scss";
import { AiModalProps } from "@/types/common/interfaces";
import { useState } from 'react';
import ChatList from '@/components/ai/ChatList';
import AiPage from '@/components/ai/AiPage';  // AiPage 임포트 추가

const AiModal = ({ isOpen, onClose, title }: AiModalProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  // 모달 닫기 핸들러
  const handleClose = () => {
    setSelectedChatId(null); // 선택된 채팅 ID 초기화
    setActiveTab(0); // 탭도 초기 상태로 복원 (선택 사항)
    onClose(); // 원래의 onClose 함수 호출
  };

  // 채팅 선택 핸들러
  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
    setActiveTab(0);
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 0, title: '챗봇', content: <AiPage selectedChatId={selectedChatId} /> },
    { id: 1, title: '전체 대화 목록', content: <ChatList onSelectChat={handleSelectChat} /> }
  ];
  
  return (
    <div className="ai-modal-overlay">
      <div className="ai-modal-content">
        <div className="ai-modal-header">
          {title && <h2>{title}</h2>}
          <button className="ai-modal-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="ai-modal-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`ai-modal-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        
        <div className="ai-modal-body">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default AiModal;