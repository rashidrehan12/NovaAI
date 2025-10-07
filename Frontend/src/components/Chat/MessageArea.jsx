import React from 'react';
import ai from '/ai.svg';
import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';
import FormattedMessage from './FormattedMessage';
import LottieAnimation from '../LottieAnimation/LottieAnimation';
import robotAnimation from '../../assets/lottie.json';

const MessageArea = ({ 
  sidebarOpen, 
  currentChatId, 
  messages, 
  isTyping, 
  messagesEndRef, 
  onNewChat 
}) => {
  return (
    <div
      className={`fixed overflow-y-auto !p-4 !space-y-4 custom-scrollbar transition-all duration-300 ${
        sidebarOpen 
          ? "left-0 right-0 w-full md:left-80 md:right-0 md:w-[calc(100%-320px)]" 
          : "left-0 right-0 w-full"
      }`}
      style={{
        top: "80px",
        bottom: "160px",
      }}
    >
      {!currentChatId ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="!mb-6">
            <LottieAnimation 
              animationData={robotAnimation}
              width={150}
              height={150}
              className="drop-shadow-2xl"
            />
          </div>
          <h2 className="text-3xl font-bold text-white !mb-4">
            Welcome to Nova AI
          </h2>
          <p className="text-lg text-gray-400 !mb-6 max-w-md">
            Your intelligent AI companion is ready to help. Create a new
            chat to get started!
          </p>
          <AnimatedBtn onClick={onNewChat}>
            Start Your First Chat
          </AnimatedBtn>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl !p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-[#3c6e71] to-[#549295] text-white shadow-[#3c6e71]/30"
                    : "backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 text-white shadow-[#549295]/20"
                }`}
              >
                {message.sender === "nova" && (
                  <div className="flex items-center gap-2 !mb-2">
                    <img src={ai} alt="Nova" className="w-4 h-4" />
                    <span className="text-xs text-[#3c6e71] font-semibold">
                      Nova AI
                    </span>
                  </div>
                )}
                <FormattedMessage message={message} />
                <span className="text-xs opacity-70 !mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 !p-4 rounded-2xl shadow-lg shadow-[#549295]/20">
                <div className="flex items-center gap-2 !mb-2">
                  <img src={ai} alt="Nova" className="w-4 h-4" />
                  <span className="text-xs text-[#3c6e71] font-semibold">
                    Nova AI
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#3c6e71] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#3c6e71] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#3c6e71] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageArea;