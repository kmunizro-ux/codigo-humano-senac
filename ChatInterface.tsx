import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, ChevronUp } from 'lucide-react';
import { sendMessage, Message } from '../services/geminiService';

const INITIAL_GREETING = `Olá! 🤖💙 Eu sou o assistente virtual do projeto Código Humano, criado em comemoração aos 80 anos do Senac! Fui desenvolvido para ajudar a construir um ambiente de trabalho mais humano, inclusivo e sustentável.

O que eu faço:
🌱 Mostro como a Inteligência Artificial pode apoiar o RH na quebra de barreiras para o desenvolvimento profissional.
🤝 Ajudo a alinhar suas práticas com o ESG, os 17 ODS da ONU e o conceito de Multitude, sempre vendo o crescimento como uma parceria viva entre empresa e colaborador.`;

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_GREETING }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowScrollTop(scrollRef.current.scrollTop > 400);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    const trimmedInput = text.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { role: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage(messages, trimmedInput);
    
    const botMessage: Message = { role: 'model', text: response };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const suggestions = [
    { text: "IA e Inclusão", full: "Como a IA pode ajudar o RH a promover mais inclusão para diferentes perfis?" },
    { text: "ESG e Bem-estar", full: "Quais as melhores práticas de ESG voltadas para o bem-estar sustentável da equipe?" },
    { text: "Planos de Carreira", full: "Como estruturar o desenvolvimento de carreira fortalecendo a parceria entre empresa e funcionário?" },
    { text: "Engajamento Líderes", full: "como chamar a atenção e incentivar os líderes das áreas a colaborar com o rh a realizar pesquisas avaliativas periódicas?" }
  ];

  return (
    <div className="h-full flex flex-col pt-8 px-8 gap-6">
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 relative">
        {/* Messages Column */}
        <div className="col-span-8 flex flex-col gap-6 relative">
          <div 
            ref={scrollRef} 
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto space-y-6 pr-4 scroll-smooth"
          >
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-2xl p-6 shadow-xl max-w-[90%] relative overflow-hidden transition-all duration-300 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-[#F37021] to-[#e45d14] border-r-4 border-r-white/30' 
                      : 'glass-card border-l-4 border-l-[#F37021]'
                  }`}>
                    <div className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                        message.role === 'user' ? 'bg-white' : 'bg-[#00417B]'
                      }`}>
                        {message.role === 'user' ? <User className="text-[#F37021] w-5 h-5" /> : <Bot className="text-white w-5 h-5" />}
                      </div>
                      <div className={`text-[15px] leading-relaxed whitespace-pre-wrap font-medium ${
                        message.role === 'user' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="glass-card p-4 rounded-xl flex items-center space-x-3 shadow-md">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#00417B] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#00417B] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#00417B] rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-[10px] font-black text-[#00417B] uppercase tracking-widest">Estudando Cenário</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Back to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                onClick={scrollToTop}
                className="absolute bottom-24 right-8 z-50 bg-[#00417B] text-white p-3 rounded-full shadow-2xl hover:bg-[#F37021] transition-colors cursor-pointer group border-2 border-white/20 backdrop-blur-md"
                title="Voltar ao topo"
              >
                <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Suggestions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.full)}
                className="glass-card p-3 rounded-xl hover:border-[#F37021] hover:translate-y-[-4px] hover:shadow-[0_10px_20px_rgba(243,112,33,0.2)] transition-all text-left group cursor-pointer shadow-sm active:scale-95"
              >
                <div className="text-[9px] font-black text-[#F37021] mb-1 uppercase tracking-tighter opacity-80">Insight {idx + 1}</div>
                <p className="text-[11px] font-bold text-slate-700 leading-tight group-hover:text-[#00417B] transition-colors">{s.text}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Robot Illustration Column */}
        <div className="col-span-4 flex flex-col items-center pt-10 sticky top-0">
          <motion.div 
            className="w-72 h-72 relative flex items-center justify-center cursor-help"
            animate={isLoading ? {
              y: [0, -15, 0],
              rotateZ: [0, -2, 2, 0],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            } : { 
              y: [0, -5, 0],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotateY: 10, perspective: 1000 }}
          >
            {/* 3D Glow effect */}
            <div className="absolute inset-0 bg-[#00417B]/20 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute inset-x-0 bottom-10 h-10 w-32 bg-[#000]/10 rounded-full blur-[20px] mx-auto filter brightness-150 shadow-inner" />
            
            <svg viewBox="0 0 200 200" className="w-64 h-64 relative z-10 drop-shadow-2xl">
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0056a3" />
                  <stop offset="100%" stopColor="#002f59" />
                </linearGradient>
                <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2c3e50" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="70%" stopColor="#F37021" />
                  <stop offset="100%" stopColor="#e45d14" />
                </radialGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Antenna */}
              <rect x="95" y="45" width="10" height="15" fill="url(#bodyGrad)" rx="2"/>
              <circle cx="100" cy="40" r="8" fill="#F37021" className={isLoading ? "animate-ping" : ""} />
              
              {/* Ears / Accessories */}
              <rect x="40" y="90" width="15" height="40" rx="7.5" fill="#F37021" />
              <rect x="145" y="90" width="15" height="40" rx="7.5" fill="#F37021" />

              {/* Main Body / Head */}
              <rect x="50" y="60" width="100" height="90" rx="25" fill="url(#bodyGrad)" filter="url(#shadow)" />
              
              {/* Face Screen */}
              <rect x="62" y="72" width="76" height="45" rx="12" fill="url(#faceGrad)" />
              
              {/* Eyes */}
              <circle cx="82" cy="92" r="10" fill="url(#eyeGlow)">
                {isLoading && <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite" />}
              </circle>
              <circle cx="118" cy="92" r="10" fill="url(#eyeGlow)">
                {isLoading && <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite" />}
              </circle>
              
              {/* Mouth */}
              <path 
                d="M85 125 Q100 135 115 125" 
                stroke="#fff" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round" 
                opacity="0.8" 
              />
              
              {/* Details removed as requested */}
            </svg>

            {/* WiFi Signal Animation (Loading) */}
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 flex flex-col items-center justify-center pointer-events-none"
                  style={{ transform: 'translateY(-40px)' }}
                >
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      d="M10 25C18 17 42 17 50 25"
                      stroke="#F37021"
                      strokeWidth="3"
                      strokeLinecap="round"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.path
                      d="M20 32C24 28 36 28 40 32"
                      stroke="#F37021"
                      strokeWidth="3"
                      strokeLinecap="round"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.path
                      d="M25 38C27 36 33 36 35 38"
                      stroke="#F37021"
                      strokeWidth="3"
                      strokeLinecap="round"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <div className="mt-8 text-center px-4">
            <motion.h3 
              animate={isLoading ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[#00417B] font-black text-xl mb-2 flex items-center justify-center gap-2"
            >
              Código Humano
              {isLoading && <span className="flex gap-1"><span className="w-1 h-1 bg-[#F37021] rounded-full animate-bounce"></span><span className="w-1 h-1 bg-[#F37021] rounded-full animate-bounce [animation-delay:-0.15s]"></span></span>}
            </motion.h3>
            <p className="text-sm text-slate-500 font-bold italic tracking-tight">O futuro do RH em parceria viva</p>
          </div>
        </div>
      </div>

      {/* Footer Input */}
      <footer className="py-6 bg-white/30 backdrop-blur-sm border-t border-gray-100 flex items-center gap-6 px-4">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex-1 flex items-center gap-4"
        >
          <div className="flex-1 bg-white/80 rounded-full h-12 flex items-center px-6 text-slate-700 shadow-inner border border-gray-100 focus-within:ring-2 focus-within:ring-[#00417B]/20 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Como o RH pode utilizar a Inteligência Artificial para identificar barreiras..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#F37021] text-white px-8 h-12 rounded-full font-bold shadow-lg hover:shadow-orange-200 transition-all text-sm disabled:opacity-50 active:scale-95 cursor-pointer uppercase tracking-widest shrink-0"
          >
            ENVIAR
          </button>
        </form>
      </footer>
    </div>
  );
};
