'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Selamat datang di layanan asisten digital Disdukcapil Lampung Timur. Saya **Sobat Dukcapil**. Agar saya dapat membantu Bapak/Ibu dengan lebih baik, bolehkah saya tahu **nama** dan **nomor telepon/WhatsApp** yang bisa dihubungi?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<{ name?: string; phone?: string; city?: string; region?: string; country?: string; latitude?: number; longitude?: number }>({});
  const [timer, setTimer] = useState(300); // 5 menit untuk percakapan yang lebih panjang
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Load session from localStorage
  useEffect(() => {
    const savedChatId = localStorage.getItem('dukcapil_chat_id');
    const savedName = localStorage.getItem('dukcapil_user_name');
    const savedPhone = localStorage.getItem('dukcapil_user_phone');
    
    if (savedChatId && savedName && savedPhone) {
      setChatId(parseInt(savedChatId));
      setUserInfo({ name: savedName, phone: savedPhone });
      // If we have saved session, we might want to reload messages or just keep going
    }

    // Try to get geolocation
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(geo => {
        setUserInfo(prev => ({
          ...prev,
          city: geo.city,
          region: geo.region,
          country: geo.country_name,
          latitude: geo.latitude,
          longitude: geo.longitude
        }));
      })
      .catch(err => console.error('Geo tracking failed:', err));
  }, []);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (messages.length > 1) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            localStorage.removeItem('dukcapil_chat_id'); // Clear session on timeout
            setChatId(null);
            setMessages([{ 
              role: 'assistant', 
              content: 'Sesi sebelumnya telah berakhir. Halo! Saya **Sobat Dukcapil**, ada yang bisa saya bantu lagi? Mohon sebutkan nama dan nomor telepon Bapak/Ibu kembali.' 
            }]);
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1) setTimer(300);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgContent = input.trim();
    const userMessage = { role: 'user', content: userMsgContent };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Identity Extraction Logic
    let updatedUserInfo = { ...userInfo };
    let isInitialIdent = false;

    if (!chatId && !userInfo.name) {
      // Very simple extraction: assume first message contains name and phone
      // We'll let the AI help refine this later, but for the initial DB record:
      const phoneMatch = userMsgContent.match(/(\d{10,15})/);
      const name = userMsgContent.replace(/(\d{10,15})/, '').replace(/nama|saya|adalah|panggil|halo|hi/gi, '').trim();
      
      updatedUserInfo.name = name || "User Tanpa Nama";
      updatedUserInfo.phone = phoneMatch ? phoneMatch[0] : "0000000000";
      setUserInfo(updatedUserInfo);
      isInitialIdent = true;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          chatId: chatId,
          userInfo: isInitialIdent ? updatedUserInfo : null
        }),
      });

      const data = await response.json();
      
      if (data.chatId) {
        setChatId(data.chatId);
        localStorage.setItem('dukcapil_chat_id', data.chatId.toString());
        if (updatedUserInfo.name) localStorage.setItem('dukcapil_user_name', updatedUserInfo.name);
        if (updatedUserInfo.phone) localStorage.setItem('dukcapil_user_phone', updatedUserInfo.phone);
      }

      if (data.choices && data.choices[0]?.message) {
        setMessages((prev) => [...prev, data.choices[0].message]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: 'assistant', content: `Maaf, terjadi kesalahan: ${data.error}` }]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Maaf, gagal terhubung ke AI. Silakan coba lagi nanti.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#27ae60] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1e8449] transition-all z-50 hover:scale-105"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            {messages.length > 1 && !isOpen && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                !
              </span>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-fade-in-up font-sans">
          
          <div className="bg-gradient-to-r from-[#27ae60] to-[#2ecc71] p-5 text-white flex items-center gap-4">
            <div className="w-10 h-10 relative flex-shrink-0 bg-white rounded-2xl p-1.5 shadow-inner">
              <Image src="/images/logo/logo.avif" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-bold">Sobat Dukcapil (AI)</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <p className="text-[10px] text-white/90 font-medium">Asisten Layanan Publik</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#f8fafc]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#27ae60] text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1" dangerouslySetInnerHTML={{ 
                      __html: msg.content
                        .replace(/\n/g, '<br/>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#27ae60]">$1</strong>')
                        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-[#27ae60] font-bold underline break-all">$1</a>')
                    }} />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#27ae60]/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#27ae60]/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-[#27ae60] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={!chatId && !userInfo.name ? "Sebutkan Nama & Nomor HP..." : "Tanya syarat KTP, KK..."}
              className="flex-grow px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#27ae60]/20 focus:border-[#27ae60] text-sm text-gray-900 transition-all"
              disabled={loading}
            />
            <button 
              type="submit" 
              className={`w-12 h-12 bg-[#27ae60] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 transition-all ${loading ? 'opacity-50' : 'hover:bg-[#1e8449] active:scale-95'}`}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
          
          <div className="bg-white text-[10px] text-gray-400 text-center py-2 px-4 border-t border-gray-50 flex justify-between">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Data terenkripsi & aman
            </span>
            <span className="font-bold text-[#27ae60]">Sesi Aktif: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      )}
    </>
  );
}
