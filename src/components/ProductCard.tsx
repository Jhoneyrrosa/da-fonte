import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const cartItem = items.find((i) => i.productId === product.id);
  const qty = cartItem?.quantity ?? 0;

  const formattedPrice = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-orange-50">
            <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <span className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-0.5 rounded-full font-medium">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-primary font-bold text-base">{formattedPrice}</span>

          {qty === 0 ? (
            <button
              onClick={() => addItem(product.id)}
              className="bg-primary text-white text-sm px-4 py-1.5 rounded-xl font-medium hover:bg-primary-700 active:scale-95 transition-all"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, qty - 1)}
                className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                −
              </button>
              <span className="w-5 text-center font-semibold text-gray-700 text-sm">{qty}</span>
              <button
                onClick={() => addItem(product.id)}
                className="w-7 h-7 rounded-full bg-primary text-white font-bold flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
