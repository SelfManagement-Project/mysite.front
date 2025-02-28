// components/ai/ChatList.tsx
import { useChatList } from '@/hooks/ai/useChatList';
import "@/assets/styles/components/ai/ChatList.scss";
import { ChatListProps } from '@/types/ai/interfaces';


const ChatList = ({ onSelectChat }: ChatListProps) => {
    const { chatList, totalChats, searchTerm, handleSearch } = useChatList();

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
                    {/* <i className="search-icon">🔍</i> */}
                </div>
                <div className="total-chats">
                    You have {totalChats} previous chats with Claude <span className="select-text">Select</span>
                </div>
            </div>

            <div className="chat-list">
                {chatList.map((chat) => (
                    <div
                        key={chat.chatId}  // ✅ chatId로 변경 (고유한 값)
                        className="chat-item"
                        onClick={() => handleChatSelect(chat.chatId, chat.message)}
                    >
                        
                        <div className="chat-id">{chat.chatId}</div>  {/* ✅ chatId 사용 */}
                        <div className="chat-title">{chat.message}</div>  {/* ✅ message 사용 */}
                        <div className="last-message">{chat.createdAt}</div>  {/* ✅ createdAt 사용 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;