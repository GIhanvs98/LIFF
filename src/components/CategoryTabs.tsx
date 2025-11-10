import type { MenuCategory } from '../types';

const categories: MenuCategory[] = ['Drinks', 'Main Dishes', 'Desserts'];

interface CategoryTabsProps {
  active: MenuCategory | 'All';
  onChange: (category: MenuCategory | 'All') => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...categories].map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category as MenuCategory | 'All')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-primary text-white shadow'
                : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

