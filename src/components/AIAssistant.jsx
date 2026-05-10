import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Aman's smart AI assistant. Ask me anything — skills, projects, patents, contact info, you name it!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // ── Smart Rule-Based Logic based on User's Profile ──────────────────────────
  const getResponse = (query) => {
    const q = query.toLowerCase();
    
    // Abbreviated or keyword matches
    if (q.includes('proj') || q.includes('work')) {
      return "Aman has worked on some great projects:\n1. AI-Augmented CPS for Supply Chain Optimization\n2. Automated Farming using IoT\n3. Voice-Based Web Browsing App for disabled people.\nWhich one interests you?";
    }
    
    if (q.includes('skills') || q.includes('sk') || q.includes('tech') || q.includes('languages')) {
      return "Aman is skilled in Java, Python, C/C++, and JavaScript. He uses frameworks like React, Node.js, and Tailwind CSS. He's also specialized in AI workflow automation (Zapier, n8n) and IoT systems!";
    }
    
    if (q.includes('edu') || q.includes('college') || q.includes('university')) {
      return "Aman holds a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Chandigarh University.";
    }
    
    if (q.includes('pat') || q.includes('patent') || q.includes('publish')) {
      return "Aman has a strong research background with over 8 patents filed in industrial design, and 4 of them have already been published!";
    }
    
    if (q.includes('loc') || q.includes('where') || q.includes('live')) {
      return "Aman is based in Madhubani, Bihar, India, but he is open to global opportunities!";
    }
    
    if (q.includes('contact') || q.includes('mail') || q.includes('email')) {
      return "You can reach Aman at itsamanarya@gmail.com. You can also find his LinkedIn and GitHub links in the header and footer of this site.";
    }

    if (q.includes('ai automation') || q.includes('automation')) {
      return "Aman specializes in AI workflow automation! He uses tools like Zapier and n8n to build intelligent, self-running workflows that connect apps and save time.";
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return "Hey there! How can I help you explore Aman's background today?";
    }

    // Fallback simulating a smart AI
    const fallbacks = [
      "I'm specialized to answer questions about Aman's professional background, skills, and projects. Ask me about his projects or patents!",
      "I'm not sure about that specific topic. I'm trained on Aman's resume. Try asking about his skills or projects!",
      "I'd love to chat about that, but my main job is to help you learn about Aman Kumar! Ask me about his work with IoT or AI Automation."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // ── Send handler ─────────────────────────────────────────────────────────────
  const handleSend = async (e) => {
    e?.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    // Simulate thinking delay
    setTimeout(() => {
      const reply = getResponse(userText);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsLoading(false);
    }, 1200); // 1.2 seconds to look like it's thinking
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Cloud in the head (Tooltip) */}
      {!isOpen && (
        <div className="relative mb-2">
          <div className="bg-white text-slate-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-slate-100 whitespace-nowrap animate-pulse">
            Ask me anything about Aman 💭
            <div className="absolute bottom-[-5px] right-6 w-3 h-3 bg-white border-r border-b border-slate-100 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-all hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-[350px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

          {/* Header */}
          <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="font-bold text-sm">Aman's AI Assistant</h3>
                <p className="text-xs text-primary-100 flex items-center gap-1">
                  <Sparkles size={10} /> Smart Simulation · Always ready
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
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
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator (Thinking effect) */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none shadow-sm p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bot size={12} />
                    <span className="text-xs font-medium opacity-75">AI Assistant</span>
                  </div>
                  <div className="flex gap-1 items-center h-4">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-slate-100 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything… 'skills?' 'proj?' 'contact?'"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-primary-500 text-slate-800 placeholder-slate-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
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
