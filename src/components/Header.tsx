import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { currentClient, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/catalog" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">F</div>
          <span className="text-primary font-bold text-lg">Da Fonte</span>
        </Link>

        <div className="flex items-center gap-3">
          {currentClient && (
            <span className="text-gray-500 text-xs hidden sm:block">
              {currentClient.id} · {currentClient.company}
            </span>
          )}

          <Link
            to="/cart"
            className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            title="Carrinho"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-700 hover:text-red-500 transition-colors"
            title="Sair"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex">
          <Link
            to="/catalog"
            className={`px-4 py-2 text-sm font-medium transition-colors ${location.pathname === '/catalog' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Catálogo
          </Link>
          <Link
            to="/cart"
            className={`px-4 py-2 text-sm font-medium transition-colors ${location.pathname === '/cart' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Carrinho {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </div>
    </header>
  );
};
