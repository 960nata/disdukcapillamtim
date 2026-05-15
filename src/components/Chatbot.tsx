'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya **Sobat Dukcapil**, asisten AI resmi Disdukcapil Lampung Timur. Ada yang bisa saya bantu seputar persyaratan dokumen atau alur pelayanan?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2 menit dalam detik
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Efek untuk Hitung Mundur Reset (2 Menit)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Hanya hitung mundur jika sudah ada percakapan (lebih dari 1 pesan pesan awal)
    if (messages.length > 1) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Reset Chat ke awal
            setMessages([
              { 
                role: 'assistant', 
                content: 'Sesi sebelumnya telah berakhir karena tidak ada aktivitas. Halo! Saya **Sobat Dukcapil**, ada yang bisa saya bantu lagi?' 
              }
            ]);
            return 120; // Reset timer ke 2 menit
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [messages]);

  // Reset timer ke 120 detik setiap kali ada pesan baru
  useEffect(() => {
    if (messages.length > 1) {
      setTimer(120);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();
      
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

  const suggestedQuestions = [
    "Syarat KTP baru",
    "KK hilang",
    "Akta Kelahiran",
    "Daftar IKD"
  ];

  const handleSuggestedClick = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#27ae60] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1e8449] transition-all z-50 hover:scale-105"
        aria-label="Tanya AI"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            {/* Tampilkan sisa menit jika chat sedang aktif tapi ditutup */}
            {messages.length > 1 && !isOpen && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {Math.ceil(timer / 60)}m
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-fade-in-up font-sans">
          
          {/* Header */}
          <div className="bg-[#27ae60] p-4 text-white flex items-center gap-3">
            <div className="w-8 h-8 relative flex-shrink-0 bg-white rounded-full p-1">
              <Image src="/images/logo/logo.avif" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Sobat Dukcapil (AI)</h3>
              <p className="text-[10px] text-white/80">Online | Khusus Informasi Adminduk</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/80 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Warning Timer (Muncul jika waktu sisa <= 10 detik) */}
          {timer <= 10 && messages.length > 1 && (
            <div className="bg-red-50 text-red-600 text-xs text-center py-1.5 font-bold animate-pulse">
              ⚠️ Sesi akan direset dalam {timer} detik karena tidak ada aktivitas!
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#27ae60] text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSuggestedClick(q)}
                    className="text-[11px] bg-gray-50 border border-gray-200 hover:border-[#27ae60] hover:text-[#27ae60] text-gray-600 px-2.5 py-1 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya syarat KTP, KK..."
              className="flex-grow px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] text-sm text-gray-900"
              disabled={loading}
            />
            <button 
              type="submit" 
              className={`w-10 h-10 bg-[#27ae60] text-white font-bold rounded-xl flex items-center justify-center transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e8449]'}`}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
          
          <div className="bg-gray-50 text-[10px] text-gray-400 text-center py-1.5 border-t border-gray-100 flex justify-between px-4">
            <span>Hanya informasi kependudukan.</span>
            <span className="font-bold text-[#27ae60]">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      )}
    </>
  );
}
