import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import { cn } from '../lib/utils';

export default function ProposalWriting() {
  const { addJob } = useJobContext();
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', content: 'Hello! Paste a job title and description below, and I will generate a custom proposal for you. I will also save this job to your performance tracker automatically.' }
  ]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputTitle.trim() || !inputDescription.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), role: 'user', title: inputTitle, content: inputDescription };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const capturedTitle = inputTitle;
    const capturedDesc = inputDescription;

    setInputTitle('');
    setInputDescription('');

    // Simulate AI thinking and generating
    setTimeout(() => {
      const generatedProposal = `Hi there,\n\nI read your job post for "${capturedTitle}" and it immediately caught my attention. Based on your description, you are looking for an expert who can deliver quality results quickly.\n\nI have extensive experience dealing with similar requirements and can ensure that this project is executed flawlessly. Let's schedule a brief chat to discuss how I can bring value to your team.\n\nBest regards,\nShahid R.`;
      
      const aiMsg = { id: Date.now() + 1, role: 'system', content: generatedProposal };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Add to context as incomplete
      addJob({
        title: capturedTitle,
        description: capturedDesc,
        proposal: generatedProposal,
        budget: 'TBD',
        connectsCost: 0,
        status: 'view',
        completed: false, // user needs to add rest details later
        appliedAt: new Date().toISOString()
      });

    }, 2000);
  };

  return (
    <div className="space-y-4 h-[calc(100vh-4rem)] flex flex-col pt-2 pb-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            AI Proposal Writer
          </h1>
          <p className="text-slate-400 mt-1">Generate highly converting proposals instantly</p>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/5 relative shadow-xl">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map(msg => (
            <div key={msg.id} className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                msg.role === 'user' 
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/30" 
                  : "bg-indigo-600/20 text-indigo-400 border-indigo-500/30"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                msg.role === 'user' 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-[#1e293b] text-slate-200 rounded-bl-none border border-[#334155]"
              )}>
                {msg.title && <strong className="block text-white mb-2 text-base">{msg.title}</strong>}
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
               <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border bg-indigo-600/20 text-indigo-400 border-indigo-500/30">
                  <Bot className="w-5 h-5" />
               </div>
               <div className="p-4 rounded-2xl bg-[#1e293b] rounded-bl-none border border-[#334155] flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
               </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0f172a] border-t border-[#334155]">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto space-y-3">
            <input 
              type="text" 
              value={inputTitle}
              onChange={e => setInputTitle(e.target.value)}
              placeholder="Job Title (e.g. Need Senior React Developer)" 
              disabled={isTyping}
              className="w-full bg-[#1e293b] text-white border border-[#334155] rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            />
            <div className="relative">
              <textarea 
                value={inputDescription}
                onChange={e => setInputDescription(e.target.value)}
                placeholder="Paste the full job description here..." 
                rows={3}
                disabled={isTyping}
                className="w-full bg-[#1e293b] text-white border border-[#334155] rounded-xl pl-4 pr-14 pt-3 pb-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isTyping || !inputTitle.trim() || !inputDescription.trim()}
                className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-lg transition-colors shadow-lg active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
