'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: string[];
};

const AVAILABLE_PERMISSIONS = [
  { id: 'dashboard', name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'news', name: 'Manajemen Berita', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v14zm-7-10H7v2h5v-2zm0 4H7v2h5v-2zm5-8H7v2h10V6z' },
  { id: 'users', name: 'Manajemen User', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'innovations', name: 'Manajemen Inovasi', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'gallery', name: 'Manajemen Galeri', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'speeches', name: 'Manajemen Sambutan', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
  { id: 'sliders', name: 'Manajemen Slider', icon: 'M8 7h8M8 12h8M8 17h8 M3 3v18 M21 3v18' },
  { id: 'settings', name: 'Pengaturan', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
    status: 'Aktif',
    permissions: [] as string[],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.includes(permissionId);
      if (isSelected) {
        return { ...prev, permissions: prev.permissions.filter((id) => id !== permissionId) };
      } else {
        return { ...prev, permissions: [...prev.permissions, permissionId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users';
    const method = editingUser ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', password: '', role: 'Admin', status: 'Aktif', permissions: [] });
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Leave blank unless changing
      role: user.role,
      status: user.status,
      permissions: user.permissions || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        const res = await fetch(`/api/users/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <div className="p-[14px] md:p-8 space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/></svg>
            Manajemen User
          </h1>
          <p className="text-sm text-gray-500">Kelola akun administrator dan hak akses panel kontrol.</p>
        </div>
        <button 
          onClick={() => {
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', role: 'Admin', status: 'Aktif', permissions: [] });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah User
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Informasi User</th>
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Email</th>
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Role</th>
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Status</th>
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium">Memuat data user...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                    Belum ada data user.
                  </td>
                </tr>
              ) : users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#27ae60] to-[#2ecc71] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 group-hover:text-[#27ae60] transition-colors">{user.name}</span>
                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">ID: #{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-600 font-medium">{user.email}</td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                        user.status === 'Aktif' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                {editingUser ? 'Edit Profil User' : 'Tambah User Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="Masukkan nama..."
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Password {editingUser && '(Kosongkan jika tidak diubah)'}
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="••••••••"
                    required={!editingUser}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Role Jabatan</label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                  >
                    <option value="Superadmin">Superadmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Penulis Artikel">Penulis Artikel</option>
                    <option value="Reviewer">Reviewer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Status Keaktifan</label>
                <div className="flex gap-4">
                  {['Aktif', 'Nonaktif'].map((status) => (
                    <label key={status} className={`flex-1 flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.status === status 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold' 
                        : 'bg-white border-gray-100 text-gray-400 font-medium hover:bg-gray-50'
                    }`}>
                      <input 
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              {/* Permissions Section */}
              <div className="space-y-3 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Hak Akses Menu (Sidebar)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <label key={perm.id} className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                      formData.permissions.includes(perm.id)
                        ? 'bg-white border-emerald-200 shadow-sm'
                        : 'bg-transparent border-transparent grayscale opacity-60 hover:opacity-100'
                    }`}>
                      <input 
                        type="checkbox"
                        checked={formData.permissions.includes(perm.id)}
                        onChange={() => handlePermissionChange(perm.id)}
                        className="w-5 h-5 rounded-lg text-[#27ae60] focus:ring-[#27ae60] border-gray-300"
                      />
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold ${formData.permissions.includes(perm.id) ? 'text-gray-900' : 'text-gray-500'}`}>{perm.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Batalkan
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-[#27ae60] hover:bg-[#1e8449] text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-green-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {editingUser ? 'Simpan Perubahan' : 'Buat User Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
