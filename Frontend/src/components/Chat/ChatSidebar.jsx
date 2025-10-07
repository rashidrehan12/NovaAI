import React from "react";
import ai from "/ai.svg";
import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const ChatSidebar = ({
  sidebarOpen,
  chatHistory,
  onNewChat,
  onSelectChat,
  onLogout,
  formatTime,
}) => {
  return (
    <div
      className={`${
        sidebarOpen ? "w-80" : "w-0"
      } transition-all duration-300 overflow-hidden backdrop-blur-2xl bg-black/20 border-r border-[#3c6e71]/30 fixed left-0 top-0 h-full z-20`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="!p-4 !pb-6 border-b border-[#3c6e71]/30">
          <div className="flex items-center justify-between !mb-4">
            <div className="flex items-center gap-2">
              <img src={ai} alt="Nova" className="w-6 h-6" />
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#3c6e71] via-white to-[#3c6e71] bg-clip-text text-transparent">
                Nova AI
              </h2>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="!mt-4 w-full flex justify-center">
            <AnimatedBtn className="!mt-12" onClick={onNewChat}>+ New Chat</AnimatedBtn>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto !p-4 !pt-4 !pb-2 sidebar-scrollbar">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center !p-4">
              <div className="text-4xl !mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white !mb-2">
                No chats yet
              </h3>
              <p className="text-sm text-gray-400 !mb-4">
                Create your first chat to start talking with Nova AI
              </p>
              <button
                onClick={onNewChat}
                className="text-sm text-[#3c6e71] hover:text-[#549295] transition-colors"
              >
                + Create your first chat
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`!p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                    chat.isActive
                      ? "bg-[#3c6e71]/50 border-2 border-[#3c6e71] shadow-lg shadow-[#3c6e71]/20"
                      : "hover:bg-black/30 border border-transparent"
                  }`}
                >
                  {chat.isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3c6e71] rounded-l-xl"></div>
                  )}
                  <div className="flex justify-between items-start !mb-1">
                    <h3 className={`text-sm font-semibold truncate ${
                      chat.isActive ? "text-[#3c6e71]" : "text-white"
                    }`}>
                      {chat.title}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(chat.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="!p-4 !pb-24 md:!pb-4 border-t border-[#3c6e71]/30">
          <div className="w-full flex justify-center">
            <AnimatedBtn onClick={onLogout}>Logout</AnimatedBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
