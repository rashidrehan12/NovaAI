import { useState, useRef, useEffect } from "react";
import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatHeader from "../components/Chat/ChatHeader";
import MessageArea from "../components/Chat/MessageArea";
import ChatInput from "../components/Chat/ChatInput";
import NewChatModal from "../components/Chat/NewChatModal";
import useSocket from "../hooks/useSocket";
import useChat from "../hooks/useChat";
import useMessageHandler from "../hooks/useMessageHandler";
import { formatTime, handleLogout } from "../utils/chatUtils";
import "./Chat.css";

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [modalState, setModalState] = useState({ show: false, title: "" });
  const messagesEndRef = useRef(null);

  const socket = useSocket();
  const {
    chatHistory,
    messages,
    currentChatId,
    setMessages,
    loadChatHistory,
    createNewChat,
    selectChat,
    updateChatHistory,
  } = useChat();

  const { sendMessage } = useMessageHandler(socket, setMessages, setIsTyping, updateChatHistory);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket && chatHistory.length === 0) {
      loadChatHistory();
    }
  }, [socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    let chatId = currentChatId;
    
    // If no chat exists, create one automatically
    if (!chatId) {
      try {
        // Generate a title from the first few words of the message
        const title = inputMessage.length > 30 
          ? inputMessage.substring(0, 30) + "..." 
          : inputMessage;
        
        chatId = await createNewChat(title);
      } catch (error) {
        alert("Failed to create chat. Please try again.");
        return;
      }
    }
    
    // Send the message
    sendMessage(inputMessage, chatId, setInputMessage);
  };

  const handleCreateNewChat = async () => {
    if (!modalState.title.trim()) return;

    try {
      await createNewChat(modalState.title);
      setModalState({ show: false, title: "" });
    } catch (error) {
      alert("Failed to create new chat. Please try again.");
    }
  };

  const toggleModal = (show = false, title = "") => {
    setModalState({ show, title });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <NewChatModal
        showModal={modalState.show}
        chatTitle={modalState.title}
        setChatTitle={(title) => setModalState(prev => ({ ...prev, title }))}
        onCreateChat={handleCreateNewChat}
        onClose={() => toggleModal()}
      />

      <ChatSidebar
        sidebarOpen={sidebarOpen}
        chatHistory={chatHistory}
        onNewChat={() => toggleModal(true)}
        onSelectChat={selectChat}
        onLogout={handleLogout}
        formatTime={formatTime}
      />

      <ChatHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <MessageArea
        sidebarOpen={sidebarOpen}
        currentChatId={currentChatId}
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        onNewChat={() => toggleModal(true)}
      />

      {/* Always show ChatInput, even without a chat */}
      <ChatInput
        sidebarOpen={sidebarOpen}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
    </div>
  );
};

export default Chat;
