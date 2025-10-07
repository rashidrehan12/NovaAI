import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const ChatInput = ({
  sidebarOpen,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
}) => {
  return (
    <div
      className={`!p-2 sm:!p-4 fixed bottom-0 z-30 transition-all duration-300 ${
        sidebarOpen 
          ? "left-0 right-0 w-full md:left-80 md:right-0 md:w-[calc(100%-320px)]" 
          : "left-0 right-0 w-full"
      }`}
    >
      <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 shadow-2xl shadow-[#549295]/20 rounded-2xl !p-2 sm:!p-4">
        <form onSubmit={onSendMessage} className="flex gap-2 sm:gap-3 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message to Nova..."
            className="flex-1 min-w-0 !px-3 sm:!px-4 !py-2 sm:!py-2 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all text-sm sm:text-base h-10 sm:h-12"
            disabled={isTyping}
          />
          <div className="flex-shrink-0">
            <AnimatedBtn
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="!mt-0"
            >
              {isTyping ? "..." : "Send"}
            </AnimatedBtn>
          </div>
        </form>
        <div className="flex justify-center items-center !mt-2 sm:!mt-3">
          <p className="text-xs text-gray-500 text-center">
            Nova AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
