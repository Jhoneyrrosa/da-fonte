import React from 'react';
import { Category, CATEGORIES } from '../types';

interface Props {
  selected: Category | 'Todos';
  onChange: (cat: Category | 'Todos') => void;
}

const ALL = 'Todos' as const;

const categoryEmoji: Record<string, string> = {
  'Todos': '🧴',
  'Hidratação': '💧',
  'Shampoo': '🪣',
  'Alisamento': '✨',
  'Descoloração': '⚗️',
  'Oxidantes': '🔬',
};

export const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {
  const options: (Category | 'Todos')[] = [ALL, ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {options.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selected === cat
              ? 'bg-primary text-white shadow-md shadow-primary/30'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/40 hover:text-primary'
          }`}
        >
          <span>{categoryEmoji[cat]}</span>
          <span>{cat}</span>
        </button>
      ))}
    </div>
  );
};
