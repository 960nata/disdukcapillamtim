'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AIPage() {
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya **Sobat Dukcapil**, asisten AI resmi Disdukcapil Lampung Timur. Ada yang bisa saya bantu seputar persyaratan dokumen kependudukan atau alur pelayanan?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
    "Apa syarat membuat KTP baru?",
    "Bagaimana cara mengurus KK yang hilang?",
    "Syarat pembuatan Akta Kelahiran anak",
    "Cara mendaftar IKD (Identitas Digital)"
  ];

  const handleSuggestedClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex items-center gap-4">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image src="/images/logo/logo.avif" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tanya Sobat Dukcapil (AI)</h1>
              <p className="text-sm text-gray-500">Asisten virtual khusus informasi pelayanan kependudukan Lampung Timur.</p>
            </div>
            <div className="ml-auto hidden md:block">
              <span className="text-xs font-bold text-[#27ae60] bg-[#27ae60]/10 px-3 py-1 rounded-full">Online</span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[600px] overflow-hidden">
            
            {/* Messages Area */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-[#27ae60] text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-bl-none max-w-[80%]">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-500 mb-2">Saran Pertanyaan:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSuggestedClick(q)}
                      className="text-xs bg-white border border-gray-200 hover:border-[#27ae60] hover:text-[#27ae60] text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan seputar syarat KTP, KK, dll..."
                className="flex-grow px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] text-sm text-gray-900"
                disabled={loading}
              />
              <button 
                type="submit" 
                className={`px-6 py-3 bg-[#27ae60] text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e8449]'}`}
                disabled={loading}
              >
                {loading ? 'Mengirim...' : 'Kirim'}
              </button>
            </form>
          </div>

          {/* Warning Note */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            Catatan: AI ini hanya menjawab seputar informasi pelayanan kependudukan Disdukcapil Lampung Timur.
          </p>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
