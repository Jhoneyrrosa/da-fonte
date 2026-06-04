import React, { useState } from 'react';
import { AdminHeader } from '../../components/AdminHeader';
import { Modal } from '../../components/Modal';
import { useData } from '../../context/DataContext';
import { Product, Category, CATEGORIES } from '../../types';

const emptyForm = (): Omit<Product, 'id'> => ({
  name: '',
  category: 'Hidratação',
  description: '',
  price: 0,
  imageUrl: '',
  active: true,
});

const AdminProductsPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<Category | 'Todos'>('Todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchCat = filterCat === 'Todos' || p.category === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({ name: product.name, category: product.category, description: product.description, price: product.price, imageUrl: product.imageUrl, active: product.active });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.description || form.price <= 0) return;
    if (editing) {
      updateProduct({ ...editing, ...form });
    } else {
      addProduct(form);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const set = (field: keyof Omit<Product, 'id'>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = field === 'price' ? parseFloat(e.target.value) || 0 : field === 'active' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass = 'w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Produtos</h1>
            <p className="text-gray-500 text-sm">{products.length} cadastrados</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-md shadow-primary/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo produto
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produto..."
            className="flex-1 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as any)}
            className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          >
            <option value="Todos">Todas as categorias</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Produto</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 hidden md:table-cell">Categoria</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Preço</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">Nenhum produto encontrado.</td></tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={p.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                        <span className="font-medium text-gray-800 line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                    <td className="px-5 py-3 font-semibold text-gray-800">
                      {p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
        <Modal title={editing ? 'Editar produto' : 'Novo produto'} onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome *</label>
              <input type="text" value={form.name} onChange={set('name')} className={inputClass} placeholder="Nome do produto" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoria *</label>
                <select value={form.category} onChange={set('category')} className={inputClass}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preço (R$) *</label>
                <input type="number" min="0" step="0.01" value={form.price} onChange={set('price')} className={inputClass} placeholder="0,00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição *</label>
              <textarea value={form.description} onChange={set('description')} className={inputClass + ' resize-none'} rows={3} placeholder="Descrição do produto" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL da imagem</label>
              <input type="url" value={form.imageUrl} onChange={set('imageUrl')} className={inputClass} placeholder="https://..." />
            </div>
            {form.imageUrl && (
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                <img src={form.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={set('active')} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
              <span className="text-sm text-gray-600">Produto ativo (visível no catálogo)</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                Cancelar
              </button>
              <button onClick={handleSave} className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm">
                {editing ? 'Salvar alterações' : 'Adicionar produto'}
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
            <h3 className="font-bold text-gray-900 text-lg mb-2">Excluir produto?</h3>
            <p className="text-gray-500 text-sm mb-5">Esta ação não pode ser desfeita.</p>
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

export default AdminProductsPage;
