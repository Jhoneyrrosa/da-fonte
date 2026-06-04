import React, { useState } from 'react';
import { AdminHeader } from '../../components/AdminHeader';
import { Modal } from '../../components/Modal';
import { useData } from '../../context/DataContext';
import { Client } from '../../types';

const emptyForm = (): Omit<Client, 'id' | 'createdAt'> => ({
  username: '',
  password: '',
  name: '',
  company: '',
  cnpj: '',
  phone: '',
  address: '',
  active: true,
  profileComplete: false,
});

const AdminClientsPage: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient, toggleClientAccess } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, 'id' | 'createdAt'>>(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.username.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setError('');
    setModalOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setForm({
      username: client.username,
      password: client.password,
      name: client.name,
      company: client.company,
      cnpj: client.cnpj,
      phone: client.phone,
      address: client.address,
      active: client.active,
      profileComplete: client.profileComplete,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = () => {
    setError('');
    if (!form.username || !form.password) {
      setError('Usuário e senha são obrigatórios.');
      return;
    }

    // Check username uniqueness
    const taken = clients.find((c) => c.username === form.username && c.id !== editing?.id);
    if (taken) {
      setError('Nome de usuário já em uso.');
      return;
    }

    if (editing) {
      updateClient({ ...editing, ...form });
    } else {
      addClient(form);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteClient(deleteId);
      setDeleteId(null);
    }
  };

  const set = (field: keyof Omit<Client, 'id' | 'createdAt'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'active' || field === 'profileComplete' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass = 'w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Clientes</h1>
            <p className="text-gray-500 text-sm">{clients.length} cadastrados</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-md shadow-primary/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo cliente
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, empresa, ID ou usuário..."
            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">ID</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Cliente</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 hidden lg:table-cell">Usuário</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 hidden md:table-cell">Perfil</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Acesso</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">Nenhum cliente encontrado.</td></tr>
                )}
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-lg font-bold">{c.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-gray-800">{c.name || '—'}</p>
                      <p className="text-xs text-gray-400">{c.company || '—'}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden lg:table-cell font-mono text-xs">{c.username}</td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.profileComplete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {c.profileComplete ? 'Completo' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleClientAccess(c.id)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors ${c.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                      >
                        {c.active ? 'Ativo' : 'Bloqueado'}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <Modal title={editing ? `Editar — ${editing.id}` : 'Novo cliente'} onClose={() => setModalOpen(false)}>
          {!editing && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5 text-sm text-primary">
              O ID será gerado automaticamente (ex: DF-0002)
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Usuário *</label>
                <input type="text" value={form.username} onChange={set('username')} className={inputClass} placeholder="usuario.cliente" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha *</label>
                <input type="text" value={form.password} onChange={set('password')} className={inputClass} placeholder="senha123" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome completo</label>
              <input type="text" value={form.name} onChange={set('name')} className={inputClass} placeholder="João da Silva" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Empresa</label>
              <input type="text" value={form.company} onChange={set('company')} className={inputClass} placeholder="Salão Exemplo" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">CNPJ</label>
                <input type="text" value={form.cnpj} onChange={set('cnpj')} className={inputClass} placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
                <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} placeholder="(44) 99999-0000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Endereço</label>
              <input type="text" value={form.address} onChange={set('address')} className={inputClass} placeholder="Rua, nº — Cidade/UF" />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={set('active')} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
              <span className="text-sm text-gray-600">Acesso ativo</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                Cancelar
              </button>
              <button onClick={handleSave} className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm">
                {editing ? 'Salvar alterações' : 'Criar cliente'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Excluir cliente?</h3>
            <p className="text-gray-500 text-sm mb-5">Esta ação remove o cliente permanentemente.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium">Cancelar</button>
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClientsPage;
