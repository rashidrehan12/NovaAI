import { useEffect } from 'react';

const useMessageHandler = (socket, setMessages, setIsTyping, updateChatHistory) => {
  useEffect(() => {
    if (!socket) return;

    const handleAiResponse = (data) => {
      const aiMessage = {
        id: Date.now(),
        text: data.content,
        sender: "nova",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      updateChatHistory(data.chat, data.content.substring(0, 50) + "...");
    };

    socket.on("ai-response", handleAiResponse);

    return () => {
      socket.off("ai-response", handleAiResponse);
    };
  }, [socket, setMessages, setIsTyping, updateChatHistory]);

  const sendMessage = (inputMessage, currentChatId, setInputMessage) => {
    if (!inputMessage.trim() || !socket) return;
    
    // Allow sending even without currentChatId (will be handled by Chat component)
    if (!currentChatId) {
      console.log("No chat ID available, message will be queued");
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    updateChatHistory(currentChatId, inputMessage);
    setInputMessage("");
    setIsTyping(true);

    socket.emit("ai-message", {
      content: inputMessage,
      chat: currentChatId,
    });
  };

  return { sendMessage };
};

export default useMessageHandler;