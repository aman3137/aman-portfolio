import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Aman's AI Assistant. Ask me anything about his skills, projects, education, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const knowledgeBase = [
    {
      keywords: ['hi', 'hello', 'hey', 'greetings'],
      response: "Hello! How can I help you learn more about Aman today?"
    },
    {
      keywords: ['name', 'who are you', 'who is he'],
      response: "This is the portfolio of Aman Kumar, a Computer Science Engineer passionate about AI, IoT, and full-stack development."
    },
    {
      keywords: ['skill', 'languages', 'tech', 'framework', 'database'],
      response: "Aman is skilled in Java, Python, C/C++, JavaScript, React, Node.js, Tailwind CSS, Docker, Git, SQL, and AI workflow automation tools like Zapier and n8n."
    },
    {
      keywords: ['project', 'work', 'build'],
      response: "Aman has worked on several impressive projects: 1. AI-Augmented CPS for Supply Chain Optimization. 2. Automated Farming Using IoT. 3. Voice-Based Web Browsing App for Disabled People."
    },
    {
      keywords: ['education', 'college', 'university', 'study'],
      response: "Aman holds a Bachelor of Engineering (B.E.) in Computer Science and Engineering from Chandigarh University."
    },
    {
      keywords: ['patent', 'research', 'publish'],
      response: "Aman has a strong research background with over 8 patents filed in the field of industrial design, and 4 of them have been published!"
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github'],
      response: "You can reach Aman via email at itsamanarya@gmail.com. You can also find his LinkedIn and GitHub profiles in the header and footer of this site."
    },
    {
      keywords: ['location', 'where', 'live'],
      response: "Aman is based in Madhubani, Bihar, India."
    }
  ];

  const getResponse = (query) => {
    const lowercaseQuery = query.toLowerCase();
    
    for (const item of knowledgeBase) {
      if (item.keywords.some(keyword => lowercaseQuery.includes(keyword))) {
        return item.response;
      }
    }
    
    return "I'm not sure about that specific detail. You can check the relevant section on the website or contact Aman directly at itsamanarya@gmail.com!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI thinking
    setTimeout(() => {
      const assistantMessage = { role: 'assistant', content: getResponse(input) };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-all hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-[350px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="font-bold text-sm">Aman's AI Assistant</h3>
                <p className="text-xs text-primary-100">Online | Ready to help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    <span className="text-xs font-medium opacity-75">
                      {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-primary-500 text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
