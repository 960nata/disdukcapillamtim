'use client';

import * as React from 'react';
import Link from 'next/link';
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
    { name: 'Pengaturan', href: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z', id: 'settings' },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (userRole === 'Superadmin') return true;
    if (item.id === 'dashboard') return true;
    return userPermissions.includes(item.id);
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-screen z-30">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-[#27ae60] rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">DISDUKCAPIL</h1>
            <p className="text-[10px] font-medium text-gray-500">Panel Admin</p>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-1 mt-4">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#27ae60]/10 text-[#27ae60]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Keluar
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-grow ml-64 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Selamat datang kembali,</h2>
            <p className="text-lg font-bold text-gray-900">Admin Disdukcapil</p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-1 right-1 w-2h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* Profile */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">A</div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-900">Admin</p>
                <p className="text-xs font-medium text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          {children}
        </main>
        
      </div>
    </div>
  );
}
