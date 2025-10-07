import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const NewChatModal = ({
  showModal,
  chatTitle,
  setChatTitle,
  onCreateChat,
  onClose,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 rounded-2xl !p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold text-white !mb-4 text-center">
          Create New Chat
        </h3>
        <input
          type="text"
          value={chatTitle}
          onChange={(e) => setChatTitle(e.target.value)}
          placeholder="Enter chat title..."
          className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all !mb-4"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && onCreateChat()}
        />
        <div className="flex gap-3 justify-center sm:justify-end">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none !px-4 sm:!px-6 !py-2 sm:!py-3 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded-xl transition-all text-sm sm:text-base font-medium min-w-[100px]"
          >
            Cancel
          </button>
          <button
            onClick={onCreateChat}
            disabled={!chatTitle.trim()}
            className="flex-1 sm:flex-none !px-4 sm:!px-6 !py-2 sm:!py-3 border-2 border-[#549295] bg-transparent text-white hover:bg-[#549295] rounded-xl transition-all text-sm sm:text-base font-medium min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
