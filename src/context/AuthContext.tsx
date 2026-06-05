import React, { createContext, useContext, useState, useCallback } from 'react';
import { Client } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentClient: Client | null;
  loginAdmin: (username: string, password: string) => boolean;
  loginClient: (username: string, password: string) => { success: boolean; error?: string; needsSetup?: boolean };
  updateCurrentClient: (client: Client) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  const loginAdmin = useCallback((username: string, password: string): boolean => {
    if (username === 'admin' && password === 'dafonte@admin') {
      setIsAdmin(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const loginClient = useCallback((username: string, password: string) => {
    const clients = storage.getClients();
    const client = clients.find((c) => c.username === username && c.password === password);

    if (!client) return { success: false, error: 'Usuário ou senha incorretos.' };
    if (!client.active) return { success: false, error: 'Seu acesso está bloqueado. Entre em contato com o administrador.' };

    setCurrentClient(client);
    setIsAuthenticated(true);
    setIsAdmin(false);
    return { success: true, needsSetup: !client.profileComplete };
  }, []);

  const updateCurrentClient = useCallback((client: Client) => {
    setCurrentClient(client);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentClient(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, currentClient, loginAdmin, loginClient, updateCurrentClient, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
