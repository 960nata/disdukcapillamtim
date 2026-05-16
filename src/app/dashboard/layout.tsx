'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userPermissions, setUserPermissions] = React.useState<string[]>([]);
  const [userRole, setUserRole] = React.useState('');
  const [userName, setUserName] = React.useState('Admin');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  React.useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.permissions) {
          setUserPermissions(data.permissions);
          setUserRole(data.role);
          setUserName(data.name);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-10 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', id: 'dashboard' },
    { name: 'Manajemen Berita', href: '/dashboard/news', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v14zm-7-10H7v2h5v-2zm0 4H7v2h5v-2zm5-8H7v2h10V6z', id: 'news' },
    { name: 'Manajemen User', href: '/dashboard/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', id: 'users' },
    { name: 'Manajemen Inovasi', href: '/dashboard/innovations', icon: 'M13 10V3L4 14h7v7l9-11h-7z', id: 'innovations' },
    { name: 'Manajemen Galeri', href: '/dashboard/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', id: 'gallery' },
    { name: 'Manajemen Sambutan', href: '/dashboard/speeches', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v14zm-7-10H7v2h5v-2zm0 4H7v2h5v-2zm5-8H7v2h10V6z', id: 'speeches' },
    { name: 'Manajemen Slider', href: '/dashboard/sliders', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', id: 'sliders' },
    { name: 'Percakapan AI', href: '/dashboard/chats', icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', id: 'chats' },
    { name: 'Manajemen Pengumuman', href: '/dashboard/announcements', icon: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01', id: 'announcements' },
    { name: 'Kirim Notifikasi', href: '/dashboard/notifications', icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0', id: 'notifications' },
    { name: 'Manajemen Demografi', href: '/dashboard/demographics', icon: 'M18 20V10 M12 20V4 M6 20v-6', id: 'demographics' },
    { name: 'Pengaturan', href: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z', id: 'settings' },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (userRole === 'Superadmin') return true;
    if (item.id === 'dashboard') return true;
    return userPermissions.includes(item.id);
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans relative">
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-100 flex flex-col fixed h-screen z-30 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image 
              src="/images/logo/logo.avif" 
              alt="Logo Disdukcapil" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">DISDUKCAPIL</h1>
            <p className="text-[10px] font-medium text-gray-500">Panel Admin</p>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-1 mt-4 overflow-y-auto">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#27ae60]/10 to-transparent text-[#27ae60] border-l-4 border-[#27ae60] rounded-r-xl' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-[#27ae60]' : 'text-gray-400'}>
                  <path d={item.icon}></path>
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Keluar
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-grow md:ml-64 flex flex-col h-screen overflow-hidden w-full">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Hamburger button */}
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div>
              <h2 className="text-xs font-medium text-gray-500">Selamat datang kembali,</h2>
              <p className="text-base md:text-lg font-bold text-gray-900">{userName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* Profile */}
            <div className="relative">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#27ae60] to-[#2ecc71] rounded-full overflow-hidden flex items-center justify-center text-white font-bold shadow-lg shadow-green-100 group-hover:scale-105 transition-transform">
                  {userName.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{userName}</p>
                  <p className="text-[10px] font-black text-[#27ae60] uppercase tracking-widest">{userRole}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 z-40 py-3 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <div className="px-5 py-3 mb-2 border-b border-gray-50">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Akun</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-gray-700">Online • {userRole}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href="/dashboard/settings" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-[#27ae60] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      Edit Profil
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      Keluar Sesi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-grow p-6 overflow-y-auto">
          {children}
        </main>
        
      </div>
    </div>
  );
}
