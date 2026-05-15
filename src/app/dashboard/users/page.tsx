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
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'news', name: 'Manajemen Berita' },
  { id: 'users', name: 'Manajemen User' },
  { id: 'innovations', name: 'Manajemen Inovasi' },
  { id: 'gallery', name: 'Manajemen Galeri' },
  { id: 'speeches', name: 'Manajemen Sambutan' },
  { id: 'sliders', name: 'Manajemen Slider' },
  { id: 'settings', name: 'Pengaturan' },
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
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen User</h1>
          <p className="text-xs text-gray-500">Kelola pengguna dan hak akses panel admin</p>
        </div>
        <button 
          onClick={() => {
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', role: 'Admin', status: 'Aktif', permissions: [] });
            setIsModalOpen(true);
          }}
          className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm"
        >
          Tambah User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading data...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Belum ada data user dari database.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Nama</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Role</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.status === 'Aktif' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="text-[#27ae60] hover:underline text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:underline text-xs font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900">
              {editingUser ? 'Edit User' : 'Tambah User'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Nama</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Password {editingUser && '(Kosongkan jika tidak diubah)'}
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                    required={!editingUser}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Role</label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                  >
                    <option value="Superadmin">Superadmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Penulis Artikel">Penulis Artikel</option>
                    <option value="Reviewer">Reviewer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              {/* Permissions Section */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">Hak Akses Menu (Sidebar)</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input 
                        type="checkbox"
                        checked={formData.permissions.includes(perm.id)}
                        onChange={() => handlePermissionChange(perm.id)}
                        className="rounded text-[#27ae60] focus:ring-[#27ae60]"
                      />
                      <span className="text-sm text-gray-700">{perm.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-[#27ae60] hover:bg-[#1e8449] text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-sm"
                >
                  {editingUser ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
