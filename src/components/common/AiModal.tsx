import "@/assets/styles/components/common/AiModal.scss";
import { AiModalProps } from "@/types/common/interfaces";
import { useState } from 'react';
import ChatList from '@/components/ai/ChatList';

const AiModal = ({ isOpen, onClose, title, children }: AiModalProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) return null;

  const tabs = [
    { id: 0, title: '챗봇', content: children },
    { id: 1, title: '전체 대화 목록', content: <ChatList /> }
  ];

  return (
    <div className="ai-modal-overlay">
      <div className="ai-modal-content">
        <div className="ai-modal-header">
          {title && <h2>{title}</h2>}
          <button className="ai-modal-close" onClick={onClose}>&times;</button>
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