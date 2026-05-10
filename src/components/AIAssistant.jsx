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
      response: "Hello there! I'm doing great. How can I help you explore Aman's work and background today?"
    },
    {
      keywords: ['name', 'who are you', 'who is he'],
      response: "I'm the AI assistant for Aman Kumar. Aman is a Computer Science Engineer with a passion for building scalable systems, intelligent automation, and IoT solutions."
    },
    {
      keywords: ['skill', 'languages', 'tech', 'framework', 'database'],
      response: "Aman has a diverse skill set! He works with languages like Java, Python, C/C++, and JavaScript. For frameworks, he uses React, Node.js, and Tailwind CSS. He's also proficient with databases like SQL, MySQL, and tools like Docker, Git, and Linux. Plus, he's big into AI workflow automation!"
    },
    {
      keywords: ['ai automation', 'automation', 'workflow'],
      response: "AI Automation involves using artificial intelligence (like machine learning or rule-based systems) to automate complex business processes and workflows without human intervention. Aman is highly skilled in this area! He uses cutting-edge tools like Zapier and n8n to connect applications and create intelligent, self-running workflows. He's passionate about saving time and reducing errors through automation."
    },
    {
      keywords: ['iot', 'internet of things'],
      response: "IoT (Internet of Things) refers to connecting physical devices to the internet to collect and share data. Aman has a solid background in IoT, including a project on 'Automated Farming' where he used soil sensors and real-time cloud monitoring to optimize irrigation."
    },
    {
      keywords: ['project', 'work', 'build'],
      response: "Aman has built some really cool projects! 1. An AI-Augmented CPS for Supply Chain Optimization. 2. An Automated Farming system using IoT. 3. A Voice-Based Web Browsing App for disabled individuals. Which one would you like to hear more about?"
    },
    {
      keywords: ['education', 'college', 'university', 'study'],
      response: "Aman graduated with a Bachelor of Engineering (B.E.) in Computer Science and Engineering from Chandigarh University. He built a strong foundation there in software engineering and research."
    },
    {
      keywords: ['patent', 'research', 'publish'],
      response: "Aman is quite the innovator! He has filed over 8 patents, mostly in the field of industrial design, and 4 of them have already been published. He loves turning new ideas into protectable intellectual property."
    },
    {
      keywords: ['contact', 'email', 'reach', 'linkedin', 'github'],
      response: "You can reach out to Aman directly at itsamanarya@gmail.com. You can also connect with him on LinkedIn or check out his code on GitHub using the links on this page!"
    },
    {
      keywords: ['location', 'where', 'live'],
      response: "Aman is located in Madhubani, Bihar, India, but he's open to opportunities globally!"
    }
  ];

  const getResponse = (query) => {
    const lowercaseQuery = query.toLowerCase();
    
    for (const item of knowledgeBase) {
      if (item.keywords.some(keyword => lowercaseQuery.includes(keyword))) {
        return item.response;
      }
    }
    
    // Smart fallback simulating a real AI assistant
    const fallbacks = [
      "That's a great question! While I operate like a smart AI, I am specialized to answer questions about Aman's professional background, skills, and projects. Feel free to ask about his experience in AI Automation or his patents!",
      "I'm not sure I have the data for that specific topic in my knowledge base. I'm trained on Aman's resume and portfolio. Try asking about his skills, projects, or education!",
      "I'd love to chat about that, but my main job is to help you learn about Aman Kumar! Ask me about his work with IoT or his patents."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
