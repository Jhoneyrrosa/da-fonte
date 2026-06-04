import { Product, Client, CartItem } from '../types';

const KEYS = {
  PRODUCTS: 'df_products',
  CLIENTS: 'df_clients',
  CART: 'df_cart',
  COUNTER: 'df_counter',
} as const;

export const storage = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },
  setProducts: (products: Product[]) => {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getClients: (): Client[] => {
    const data = localStorage.getItem(KEYS.CLIENTS);
    return data ? JSON.parse(data) : [];
  },
  setClients: (clients: Client[]) => {
    localStorage.setItem(KEYS.CLIENTS, JSON.stringify(clients));
  },

  getCart: (): CartItem[] => {
    const data = localStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  },
  setCart: (cart: CartItem[]) => {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  },
  clearCart: () => {
    localStorage.removeItem(KEYS.CART);
  },

  getClientCounter: (): number => {
    const data = localStorage.getItem(KEYS.COUNTER);
    return data ? parseInt(data, 10) : 0;
  },
  incrementClientCounter: (): number => {
    const next = storage.getClientCounter() + 1;
    localStorage.setItem(KEYS.COUNTER, next.toString());
    return next;
  },
};
