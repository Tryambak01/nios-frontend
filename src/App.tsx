import { useState, useRef, useEffect } from 'react'
import { FiSend, FiInfo, FiMessageSquare, FiUser } from 'react-icons/fi'
import axios from 'axios'
import './App.css'
import Markdown from 'react-markdown'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [generatingResponse, setGeneratingResponse] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setGeneratingResponse(true);

      try {
        const response = await axios.post<{ answer: string }>("http://localhost:3001/api/ask", { question: inputValue });
        
        const botResponse: Message = {
          id: messages.length + 2,
          text: response.data.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error("Error fetching response:", error);
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Error fetching response.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } finally {
        setGeneratingResponse(false);
      }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-chat-dark text-chat-text">

      <div className="w-1/4 bg-chat-darker p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-chat-accent mb-2">NIOS AI Assistant</h1>
          <p className="text-chat-text-secondary">Your intelligent conversation partner</p>
        </div>
        
        <div className="flex-grow">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FiMessageSquare className="mr-2 text-chat-accent" />
              <h2 className="text-lg font-semibold">Smart Conversations</h2>
            </div>
            <p className="text-chat-text-secondary text-sm">Ask any queries related to the nios website</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FiInfo className="mr-2 text-chat-accent" />
              <h2 className="text-lg font-semibold">24/7 Availability</h2>
            </div>
            <p className="text-chat-text-secondary text-sm">Get answers anytime, day or night</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FiUser className="mr-2 text-chat-accent" />
              <h2 className="text-lg font-semibold">Ask your Doubts</h2>
            </div>
            <p className="text-chat-text-secondary text-sm">Ask doubts regarding any subject for any class. For now in this mvp we support only class 10th science subject</p>
          </div>
        </div>
        
        <div className="mt-auto text-center text-chat-text-secondary text-xs">
          © 2025 NIOS x Exthalpy AI assistant
        </div>
      </div>
      
      {/* Right Column - Chat Interface */}
      <div className="w-3/4 flex flex-col">
        <div className="bg-chat-light p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">NIOS x Exthalpy</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex flex-col max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user' ? 'message-user' : 'message-bot'
                }`}
              >
                <div className="break-words">
                  <Markdown>{message.text}</Markdown>
                </div>
                <span className="text-xs opacity-70 mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            ))}
            {generatingResponse && (
              <div className="typing">
                <span className="typing__dot"></span>
                <span className="typing__dot"></span>
                <span className="typing__dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-700 bg-chat-light">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-grow p-3 rounded-l-lg bg-chat-dark border border-gray-700 focus:outline-none focus:border-chat-accent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-chat-accent hover:bg-indigo-600 text-white p-3 rounded-r-lg transition-colors"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App