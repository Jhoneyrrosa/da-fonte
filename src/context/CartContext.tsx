import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem } from '../types';
import { storage } from '../utils/storage';

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => storage.getCart());

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      const next = existing
        ? prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { productId, quantity: 1 }];
      storage.setCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      storage.setCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) => {
      const next = prev.map((i) => (i.productId === productId ? { ...i, quantity } : i));
      storage.setCart(next);
      return next;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    storage.clearCart();
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
