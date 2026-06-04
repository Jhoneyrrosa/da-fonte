import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, Client } from '../types';
import { storage } from '../utils/storage';
import { initialProducts, initialClients } from '../utils/initialData';

interface DataContextType {
  products: Product[];
  clients: Client[];
  addProduct: (data: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addClient: (data: Omit<Client, 'id' | 'createdAt'>) => Client;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  toggleClientAccess: (id: string) => void;
  getClientById: (id: string) => Client | null;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = storage.getProducts();
    if (stored.length === 0) {
      storage.setProducts(initialProducts);
      return initialProducts;
    }
    return stored;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const stored = storage.getClients();
    if (stored.length === 0) {
      storage.setClients(initialClients);
      if (storage.getClientCounter() === 0) {
        localStorage.setItem('df_counter', '1');
      }
      return initialClients;
    }
    return stored;
  });

  const addProduct = useCallback((data: Omit<Product, 'id'>) => {
    const product: Product = { ...data, id: `p${Date.now()}` };
    setProducts((prev) => {
      const next = [...prev, product];
      storage.setProducts(next);
      return next;
    });
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === product.id ? product : p));
      storage.setProducts(next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      storage.setProducts(next);
      return next;
    });
  }, []);

  const addClient = useCallback((data: Omit<Client, 'id' | 'createdAt'>): Client => {
    const counter = storage.incrementClientCounter();
    const id = `DF-${counter.toString().padStart(4, '0')}`;
    const client: Client = { ...data, id, createdAt: new Date().toISOString() };
    setClients((prev) => {
      const next = [...prev, client];
      storage.setClients(next);
      return next;
    });
    return client;
  }, []);

  const updateClient = useCallback((client: Client) => {
    setClients((prev) => {
      const next = prev.map((c) => (c.id === client.id ? client : c));
      storage.setClients(next);
      return next;
    });
  }, []);

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => {
      const next = prev.filter((c) => c.id !== id);
      storage.setClients(next);
      return next;
    });
  }, []);

  const toggleClientAccess = useCallback((id: string) => {
    setClients((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c));
      storage.setClients(next);
      return next;
    });
  }, []);

  const getClientById = useCallback((id: string): Client | null => {
    return clients.find((c) => c.id === id) ?? null;
  }, [clients]);

  return (
    <DataContext.Provider value={{ products, clients, addProduct, updateProduct, deleteProduct, addClient, updateClient, deleteClient, toggleClientAccess, getClientById }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
};
