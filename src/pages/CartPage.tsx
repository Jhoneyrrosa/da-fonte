import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { openWhatsApp } from '../utils/whatsapp';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems } = useCart();
  const { products } = useData();
  const { currentClient } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  const cartProducts = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  })).filter((i) => i.product);

  const total = cartProducts.reduce((acc, i) => acc + (i.product!.price * i.quantity), 0);

  const handleCheckout = () => {
    if (!currentClient || items.length === 0) return;
    setConfirming(false);
    openWhatsApp(currentClient, items, products);
    clearCart();
    navigate('/catalog');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Carrinho vazio</h2>
          <p className="text-gray-500 text-sm mb-6">Adicione produtos do catálogo</p>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Ver catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-5">Seu carrinho ({totalItems} itens)</h1>

        <div className="space-y-3 mb-6">
          {cartProducts.map(({ productId, quantity, product }) => (
            <div key={productId} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100">
              {/* Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={product!.imageUrl}
                  alt={product!.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = ''; }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm leading-tight truncate">{product!.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product!.category}</p>
                <p className="text-primary font-bold text-sm mt-1">
                  {(product!.price * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <button
                  onClick={() => removeItem(productId)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(productId, quantity - 1)}
                    className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-semibold text-gray-700 text-sm">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(productId, quantity + 1)}
                    className="w-7 h-7 rounded-full bg-primary text-white font-bold flex items-center justify-center hover:bg-primary-700 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Subtotal ({totalItems} itens)</span>
            <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800">
            <span>Total do pedido</span>
            <span className="text-primary text-lg">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>

        {/* CTA */}
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-green-500/30"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.998 2C6.475 2 2 6.477 2 12.001c0 1.761.46 3.42 1.265 4.866L2 22l5.278-1.389A9.947 9.947 0 0012 22c5.523 0 10-4.477 10-10.001C22 6.477 17.521 2 11.998 2zm.002 18a7.98 7.98 0 01-4.063-1.11l-.291-.173-3.13.824.833-3.044-.19-.312A7.957 7.957 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
            </svg>
            Finalizar pelo WhatsApp
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <p className="text-green-800 font-semibold text-sm mb-1">Confirmar pedido?</p>
            <p className="text-green-600 text-xs mb-4">
              Você será redirecionado ao WhatsApp com o pedido formatado. O carrinho será limpo após confirmar.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 border border-gray-300 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-green-500 text-white font-bold py-2.5 rounded-xl hover:bg-green-600 transition-colors text-sm"
              >
                Confirmar e enviar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
