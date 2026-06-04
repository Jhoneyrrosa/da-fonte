import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const SetupPage: React.FC = () => {
  const { currentClient, updateCurrentClient } = useAuth();
  const { updateClient } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: currentClient?.name || '',
    company: currentClient?.company || '',
    cnpj: currentClient?.cnpj || '',
    phone: currentClient?.phone || '',
    address: currentClient?.address || '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClient) return;
    setError('');

    const { name, company, cnpj, phone, address } = form;
    if (!name || !company || !cnpj || !phone || !address) {
      setError('Preencha todos os campos.');
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));

    const updated = { ...currentClient, ...form, profileComplete: true };
    updateClient(updated);
    updateCurrentClient(updated);
    setSaving(false);
    navigate('/catalog');
  };

  const inputClass =
    'w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg shadow-primary/30 mb-3">
            <span className="text-white font-black text-3xl">F</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Complete seu perfil</h1>
          <p className="text-gray-500 text-sm mt-1">Necessário para finalizar pedidos</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">
          {currentClient && (
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {currentClient.id}
              </div>
              <div>
                <p className="text-xs text-gray-500">Seu ID de cliente</p>
                <p className="font-bold text-primary text-sm">{currentClient.id}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Nome completo *</label>
              <input type="text" value={form.name} onChange={set('name')} className={inputClass} placeholder="João da Silva" required />
            </div>
            <div>
              <label className={labelClass}>Empresa / Salão *</label>
              <input type="text" value={form.company} onChange={set('company')} className={inputClass} placeholder="Salão Beleza Total" required />
            </div>
            <div>
              <label className={labelClass}>CNPJ *</label>
              <input type="text" value={form.cnpj} onChange={set('cnpj')} className={inputClass} placeholder="12.345.678/0001-90" required />
            </div>
            <div>
              <label className={labelClass}>Telefone / WhatsApp *</label>
              <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} placeholder="(44) 99999-0000" required />
            </div>
            <div>
              <label className={labelClass}>Endereço completo *</label>
              <input type="text" value={form.address} onChange={set('address')} className={inputClass} placeholder="Rua das Flores, 123 — Maringá/PR" required />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary hover:bg-primary-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/30 mt-2"
            >
              {saving ? 'Salvando...' : 'Salvar e acessar catálogo →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
