import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const handleLogout = () => {
    logout();
    nav('/admin');
  };

  const isActive = (path: string) => loc.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">F</div>
          <span className="text-primary font-bold text-lg">Da Fonte</span>
          <span className="text-orange-600 text-xs bg-orange-100 px-2 py-0.5 rounded-full ml-1">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex">
          <Link to="/admin/dashboard" className={`px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/dashboard') ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}>
            Dashboard
          </Link>
          <Link to="/admin/products" className={`px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/products') ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}>
            Produtos
          </Link>
          <Link to="/admin/clients" className={`px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/clients') ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}>
            Clientes
          </Link>
        </div>
      </div>
    </header>
  );
};
