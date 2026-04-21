"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Search, 
  MoreVertical, 
  User, 
  BrainCircuit, 
  Sparkles,
  Paperclip,
  CheckCheck,
  Zap,
  ChevronRight,
  Mail
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface Message {
  id: string;
  sender: "me" | "recruiter" | "ai";
  text: string;
  timestamp: string;
}

interface Thread {
  id: string;
  name: string;
  role: string;
  company: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedThread, setSelectedThread] = useState<string | null>("1");
  const [inputMessage, setInputMessage] = useState("");

  const threads: Thread[] = [
    { id: "1", name: "AI Assistant", role: "Career Coach", company: "Umarava", lastMessage: "I've matched you with 3 new roles today!", time: "Now", unread: false },
    { id: "2", name: "Marc Uwimana", role: "HR Tech", company: "Bank of Kigali", lastMessage: "Can we schedule a call for Tuesday?", time: "2h ago", unread: true },
    { id: "3", name: "Clarisse Mutoni", role: "Product Manager", company: "MTN Rwanda", lastMessage: "Your portfolio was very impressive.", time: "6h ago", unread: false }
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Welcome back! I've analyzed your profile update. Based on your new 'Systems Architect' experience, I've calculated a 98% match for a new Lead Role at Irembo.", timestamp: "10:00 AM" },
    { id: "2", sender: "me", text: "That sounds great! Can you help me prepare for a potential interview there?", timestamp: "10:05 AM" },
    { id: "3", sender: "ai", text: "Of course! I've generated an Interview Checklist based on their recent tech stack (Go, Kubernetes). I recommend focusing on your TechNexus scaling case study.", timestamp: "10:06 AM" }
  ]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Thread List Sidebar */}
      <div className="w-[380px] bg-white border-r border-slate-100 flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            Messages
            <span className="text-xs font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded-md">2 New</span>
          </h1>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#2B74F0] transition-colors" />
            <input 
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedThread(thread.id)}
              className={`w-full p-6 text-left border-l-4 transition-all ${
                selectedThread === thread.id 
                  ? "bg-blue-50/50 border-[#2B74F0] shadow-sm" 
                  : "border-transparent hover:bg-slate-50/80"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${thread.id === '1' ? 'bg-[#2B74F0] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {thread.id === '1' ? <BrainCircuit className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className={`text-sm font-black transition-colors ${selectedThread === thread.id ? 'text-[#2B74F0]' : 'text-slate-900'}`}>
                      {thread.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{thread.company}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-300">{thread.time}</span>
              </div>
              <p className={`text-xs mt-3 line-clamp-1 ${thread.unread ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'}`}>
                {thread.lastMessage}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 bg-slate-50/30 flex flex-col relative">
        {selectedThread ? (
          <>
            {/* Chat Header */}
            <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900">
                    {threads.find(t => t.id === selectedThread)?.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-12 space-y-8 scroll-smooth hide-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] group relative ${msg.sender === 'ai' ? 'w-full' : ''}`}>
                      {msg.sender === 'ai' && (
                        <div className="flex items-center gap-2 mb-2 text-[#2B74F0]">
                          <Sparkles className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Insights</span>
                        </div>
                      )}
                      
                      <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed transition-all shadow-sm ${
                        msg.sender === 'me' 
                          ? "bg-[#2B74F0] text-white rounded-br-none" 
                          : msg.sender === 'ai'
                            ? "bg-white border border-blue-100 text-slate-700 rounded-bl-none shadow-blue-500/5"
                            : "bg-white text-slate-700 rounded-bl-none border border-slate-100"
                      }`}>
                        {msg.text}
                      </div>
                      
                      <div className={`flex items-center gap-2 mt-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{msg.timestamp}</span>
                        {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-[#2B74F0]" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className="p-8 bg-white border-t border-slate-100">
               <div className="max-w-4xl mx-auto flex items-center gap-4 bg-slate-50/50 p-2 pl-6 rounded-[2rem] border border-slate-100 focus-within:bg-white focus-within:shadow-xl transition-all">
                  <button className="p-2 text-slate-300 hover:text-[#2B74F0] transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Describe your reply or ask AI for help..."
                    className="flex-1 bg-transparent py-4 outline-none text-sm font-bold text-slate-900 placeholder:text-slate-300"
                  />
                  <button 
                    onClick={sendMessage}
                    className="bg-[#2B74F0] text-white p-4 rounded-[1.8rem] hover:scale-[1.05] active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Send className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
             <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <Mail className="w-10 h-10 text-slate-200" />
             </div>
             <h2 className="text-2xl font-black text-slate-900">Your Communication Hub</h2>
             <p className="text-slate-400 mt-2 max-w-sm">Select a thread to start talking with recruiters or your AI Career Assistant.</p>
          </div>
        )}

        {/* AI Context Panel (Floating Right) */}
        <div className="hidden 2xl:flex absolute top-24 right-8 w-[300px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 shadow-2xl flex-col gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B74F0]">
                 <Zap className="w-5 h-5 fill-current" />
                 <h3 className="text-xs font-black uppercase tracking-widest">AI Context</h3>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Confidence Level</p>
                 <div className="flex items-end gap-1">
                   <span className="text-3xl font-black text-[#2B74F0]">98%</span>
                   <span className="text-[10px] font-bold text-slate-400 pb-1">AI Score</span>
                 </div>
              </div>
           </div>
           
           <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Key Discussion points</h4>
              <ul className="space-y-3">
                 {[ "System Scalability", "Go Microservices", "CI/CD Pipeline" ].map((tag) => (
                   <li key={tag} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                     <ChevronRight className="w-3 h-3 text-[#2B74F0]" />
                     {tag}
                   </li>
                 ))}
              </ul>
           </div>

           <button className="w-full bg-[#2B74F0]/5 border border-[#2B74F0]/20 text-[#2B74F0] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#2B74F0] hover:text-white transition-all">
              Summarize Application
           </button>
        </div>
      </div>
    </div>
  );
}
