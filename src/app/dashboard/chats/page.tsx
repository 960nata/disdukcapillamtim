'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

type Chat = {
  id: number;
  name: string;
  phone: string;
  ipAddress: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  createdAt: string;
  _count: { messages: number };
};

type Message = {
  id: number;
  role: string;
  content: string;
  createdAt: string;
};

type ChatDetail = Chat & {
  messages: Message[];
};

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/chats');
      const data = await res.json();
      if (Array.isArray(data)) {
        setChats(data);
      }
    } catch (err) {
      console.error('Failed to fetch chats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatDetail = async (id: number) => {
    setLoadingDetail(true);
    if (window.innerWidth < 1024) {
      setShowDetailOnMobile(true);
    }
    try {
      const res = await fetch(`/api/chats/${id}`);
      const data = await res.json();
      setSelectedChat(data);
    } catch (err) {
      console.error('Failed to fetch chat detail:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.phone.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col gap-0 md:gap-6 font-sans min-h-screen bg-gray-50/50">
      {/* Header - Hidden on mobile detail view to save space */}
      <div className={`${showDetailOnMobile ? 'hidden lg:flex' : 'flex'} flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
            Log Percakapan AI
          </h1>
          <p className="text-sm text-gray-500">Pantau interaksi masyarakat dengan Sobat Dukcapil.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Cari nama atau telepon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27ae60]/20 focus:border-[#27ae60] text-sm font-medium"
          />
          <svg className="absolute left-3 top-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      <div className="flex-grow flex gap-6 min-h-0 overflow-hidden px-0 md:px-0">
        {/* Chat List */}
        <div className={`${showDetailOnMobile ? 'hidden lg:flex' : 'flex'} w-full lg:w-1/3 bg-white md:rounded-2xl shadow-sm border-r border-b md:border border-gray-100 flex flex-col overflow-hidden`}>
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 hidden md:block">
            <h3 className="text-sm font-bold text-gray-700">Daftar Percakapan ({filteredChats.length})</h3>
          </div>
          <div className="flex-grow overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400 flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                <span>Memuat data...</span>
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic text-sm">Tidak ada percakapan ditemukan.</div>
            ) : (
              filteredChats.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => fetchChatDetail(chat.id)}
                  className={`p-5 border-b border-gray-50 cursor-pointer transition-all hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-[#27ae60]/5 border-l-4 border-l-[#27ae60]' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 truncate flex-grow mr-2">{chat.name}</h4>
                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                      {format(new Date(chat.createdAt), 'HH:mm', { locale: idLocale })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-3">{chat.phone}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] bg-[#27ae60]/10 px-2 py-0.5 rounded-full text-[#27ae60] font-black uppercase tracking-tighter">
                      {chat._count.messages} Pesan
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 italic truncate ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {chat.city || 'Tidak diketahui'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Detail View */}
        <div className={`${showDetailOnMobile ? 'flex' : 'hidden lg:flex'} flex-grow bg-white md:rounded-2xl shadow-sm border-l md:border border-gray-100 flex-col overflow-hidden relative h-[calc(100vh-64px)] md:h-auto`}>
          {!selectedChat ? (
            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center bg-gray-50/30">
              <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center mb-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pilih Percakapan</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">Klik salah satu percakapan untuk melihat riwayat obrolan lengkap.</p>
            </div>
          ) : (
            <>
              {/* Mobile Back Button & Header Info */}
              <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <button 
                    onClick={() => setShowDetailOnMobile(false)}
                    className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#27ae60] to-[#2ecc71] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0 shadow-sm">
                    {selectedChat.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-sm md:text-lg font-bold text-gray-900 truncate">{selectedChat.name}</h3>
                    <div className="flex gap-2 text-[10px] md:text-xs font-medium text-gray-400">
                      <span className="truncate">{selectedChat.phone}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{selectedChat.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Waktu</p>
                  <p className="text-xs font-bold text-gray-700">{format(new Date(selectedChat.createdAt), 'dd MMM, HH:mm', { locale: idLocale })}</p>
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-[#f8fafc] space-y-6">
                {loadingDetail ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="w-8 h-8 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  selectedChat.messages.map((msg, i) => (
                    <div key={msg.id} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        msg.role === 'assistant' 
                          ? 'bg-white border border-gray-100 rounded-tl-none' 
                          : 'bg-[#27ae60] text-white rounded-tr-none'
                      }`}>
                        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'assistant' ? 'text-gray-700' : 'text-white'}`}>
                          {msg.content}
                        </div>
                        <div className={`text-[9px] mt-2 font-bold ${msg.role === 'assistant' ? 'text-gray-300' : 'text-green-100 opacity-80'} text-right uppercase tracking-tighter`}>
                          {format(new Date(msg.createdAt), 'HH:mm', { locale: idLocale })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
