import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminClientsPage from './pages/admin/AdminClientsPage';

function ClientGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, isAdmin, currentClient } = useAuth();

  return (
    <Routes>
      {/* Client routes */}
      <Route
        path="/"
        element={
          isAuthenticated && !isAdmin
            ? <Navigate to={currentClient?.profileComplete ? '/catalog' : '/setup'} replace />
            : <LoginPage />
        }
      />
      <Route path="/setup" element={<ClientGuard><SetupPage /></ClientGuard>} />
      <Route path="/catalog" element={<ClientGuard><CatalogPage /></ClientGuard>} />
      <Route path="/cart" element={<ClientGuard><CartPage /></ClientGuard>} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          isAuthenticated && isAdmin
            ? <Navigate to="/admin/dashboard" replace />
            : <AdminLoginPage />
        }
      />
      <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboardPage /></AdminGuard>} />
      <Route path="/admin/products" element={<AdminGuard><AdminProductsPage /></AdminGuard>} />
      <Route path="/admin/clients" element={<AdminGuard><AdminClientsPage /></AdminGuard>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
