import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginClient } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    const result = loginClient(username.trim(), password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Erro ao entrar.');
      return;
    }

    navigate(result.needsSetup ? '/setup' : '/catalog');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl shadow-2xl shadow-primary/30 mb-4">
            <span className="text-white font-black text-4xl">F</span>
          </div>
          <h1 className="text-gray-900 text-3xl font-black tracking-tight">Da Fonte</h1>
          <p className="text-primary mt-1 text-sm font-medium">Catálogo exclusivo B2B</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg">
          <h2 className="text-gray-800 font-bold text-xl mb-6">Entrar na conta</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-medium block mb-1.5">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="seu.usuario"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium block mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/30 mt-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-gray-400 text-xs text-center mt-5">
            Acesso liberado pelo administrador
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
