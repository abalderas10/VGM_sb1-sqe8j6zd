import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  content: "¡Hola! I'm Marina, your virtual concierge. How can I assist you with your reservation today?",
  sender: 'assistant',
  timestamp: new Date(),
};

const BOOKING_RESPONSES = [
  "I'd be happy to help you with your reservation. When would you like to stay with us?",
  "Our luxury villa features 5 bedrooms and can accommodate up to 10 guests. Would you like to know more about our amenities?",
  "We also offer exclusive yacht experiences with La Donostiarra. Would you be interested in adding a sunset cruise to your stay?",
  "I can help you customize your stay with special experiences and activities. What interests you the most?"
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = BOOKING_RESPONSES[responseIndex];
      setResponseIndex((prev) => (prev + 1) % BOOKING_RESPONSES.length);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  }, [responseIndex]);

  return (
    <ChatContext.Provider value={{ messages, isOpen, toggleChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}