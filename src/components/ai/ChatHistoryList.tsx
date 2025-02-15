// components/ai/ChatHistoryList.tsx
import { useChatHistory } from '@/hooks/ai/useChatHistory';
import "@/assets/styles/components/ai/ChatHistoryList.scss";

interface ChatHistoryListProps {
  onSelectChat: (chatId: number) => void;  // 채팅 선택시 호출될 콜백 함수
}

const ChatHistoryList = ({ onSelectChat }: ChatHistoryListProps) => {
    const { chatHistories, totalChats, searchTerm, handleSearch } = useChatHistory();

    const handleChatSelect = (id: number, title: string) => {
        onSelectChat(id);  // 선택된 채팅 ID를 부모 컴포넌트로 전달
    };

    return (
        <div className="chat-history-container">
            <div className="search-section">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search your chats..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                      <i className="search-icon">🔍</i>
                </div>
                <div className="total-chats">
                    You have {totalChats} previous chats with Claude <span className="select-text">Select</span>
                </div>
            </div>

            <div className="chat-list">
                {chatHistories.map((chat) => (
                    <div
                        key={chat.id}
                        className="chat-item"
                        onClick={() => handleChatSelect(chat.id, chat.title)}
                    >
                        <div className="chat-title">{chat.title}</div>
                        <div className="last-message">{chat.lastMessageTime}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatHistoryList;