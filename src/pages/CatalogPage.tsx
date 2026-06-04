import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { useData } from '../context/DataContext';
import { Category } from '../types';

const CatalogPage: React.FC = () => {
  const { products } = useData();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [search, setSearch] = useState('');

  const activeProducts = useMemo(() => products.filter((p) => p.active), [products]);

  const filtered = useMemo(() => {
    let list = activeProducts;
    if (selectedCategory !== 'Todos') list = list.filter((p) => p.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeProducts, selectedCategory, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-700 font-semibold text-sm">
            {selectedCategory === 'Todos' ? 'Todos os produtos' : selectedCategory}
            <span className="ml-2 text-gray-400 font-normal">({filtered.length})</span>
          </h2>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;
