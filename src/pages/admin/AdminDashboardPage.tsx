import React from 'react';
import { Link } from 'react-router-dom';
import { AdminHeader } from '../../components/AdminHeader';
import { useData } from '../../context/DataContext';

const AdminDashboardPage: React.FC = () => {
  const { products, clients } = useData();

  const activeClients = clients.filter((c) => c.active).length;
  const blockedClients = clients.filter((c) => !c.active).length;
  const activeProducts = products.filter((p) => p.active).length;

  const stats = [
    { label: 'Clientes ativos', value: activeClients, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
    { label: 'Clientes bloqueados', value: blockedClients, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
    { label: 'Produtos ativos', value: activeProducts, color: 'text-primary', bg: 'bg-orange-50 border-orange-200' },
    { label: 'Total de produtos', value: products.length, color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm mb-8">Visão geral do sistema</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`border rounded-2xl p-5 ${s.bg}`}>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/admin/clients"
            className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Gerenciar Clientes</h3>
              <p className="text-sm text-gray-500">Cadastrar, editar e liberar acessos</p>
            </div>
          </Link>

          <Link
            to="/admin/products"
            className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Gerenciar Produtos</h3>
              <p className="text-sm text-gray-500">Adicionar, editar e remover produtos</p>
            </div>
          </Link>
        </div>

        {/* Recent clients */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Clientes cadastrados</h2>
            <Link to="/admin/clients" className="text-primary text-sm font-medium hover:underline">Ver todos</Link>
          </div>
          {clients.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">Nenhum cliente cadastrado ainda.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {clients.slice(0, 5).map((client) => (
                <div key={client.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{client.name}</p>
                    <p className="text-xs text-gray-400">{client.company} · {client.id}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {client.active ? 'Ativo' : 'Bloqueado'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
