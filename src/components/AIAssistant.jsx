import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

// ─── Aman's full profile injected as system context ───────────────────────────
const SYSTEM_PROMPT = `You are a smart AI assistant embedded on Aman Kumar's personal portfolio website.
Your ONLY job is to answer questions about Aman Kumar based on his profile below.

You must:
- Understand short/abbreviated queries like "proj" (projects), "edu" (education),
  "sk" or "skills", "pat" (patents), "loc" (location), "exp" (experience), "contact" or "mail"
- Understand typos, slang, and informal phrasing
- Give concise, friendly, helpful answers (2-5 sentences max)
- Stay strictly on-topic about Aman's profile
- If asked something unrelated, politely redirect to Aman's work

AMAN'S PROFILE:
Name: Aman Kumar
Email: itsamanarya@gmail.com
Location: Madhubani, Bihar, India (open to global opportunities)
Education: B.E. in Computer Science & Engineering, Chandigarh University

Skills:
- Languages: Java, Python, C/C++, JavaScript
- Frameworks: React, Node.js, Tailwind CSS
- Databases: SQL, MySQL
- Tools: Docker, Git, Linux
- Specialties: AI workflow automation (Zapier, n8n), IoT systems

Projects:
1. AI-Augmented CPS for Supply Chain Optimization — uses AI for smarter supply chain decisions
2. Automated Farming (IoT) — soil sensors + real-time cloud monitoring to optimize irrigation
3. Voice-Based Web Browsing App — accessibility tool for disabled individuals to browse the web via voice

Patents: Filed 8+ patents in industrial design; 4 already published

Contact: itsamanarya@gmail.com | LinkedIn and GitHub available on the portfolio page

Always be warm, professional, and concise. Never make up information not listed above.`;

// ─── Component ─────────────────────────────────────────────────────────────────
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
  // Keeps a rolling multi-turn history for the API (excludes the welcome message)
  const historyRef = useRef([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // ── Call Claude API ──────────────────────────────────────────────────────────
  const fetchReply = async (userText) => {
    historyRef.current.push({ role: 'user', content: userText });

    // Keep history window reasonable (last 20 turns)
    if (historyRef.current.length > 20) {
      historyRef.current = historyRef.current.slice(-20);
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': 'YOUR_ANTHROPIC_API_KEY' // TODO: Replace with your key (Note: frontend exposure is insecure)
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022', // Updated to a valid model name as requested by user or best guess
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: historyRef.current,
      }),
    });

    const data = await response.json();
    const reply =
      data.content
        ?.filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('') || "Sorry, I couldn't fetch a response. Please try again!";

    historyRef.current.push({ role: 'assistant', content: reply });
    return reply;
  };

  // ── Send handler ─────────────────────────────────────────────────────────────
  const handleSend = async (e) => {
    e?.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const reply = await fetchReply(userText);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! Connection issue. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50">

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
                  <Sparkles size={10} /> Powered by Claude · Always ready
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
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
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
