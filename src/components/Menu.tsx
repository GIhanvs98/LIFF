import { useMemo, useState } from 'react';
import { mockMenu } from '../data/menu';
import type { MenuCategory, MenuItem } from '../types';
import { CategoryTabs } from './CategoryTabs';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>(
    'All'
  );

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'All') {
      return mockMenu;
    }
    return mockMenu.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Menu</h2>
          <p className="text-sm text-slate-400">
            Tap an item to add it to your order.
          </p>
        </div>
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredMenu.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col overflow-hidden rounded-3xl bg-slate-900/70 ring-1 ring-slate-800 transition hover:-translate-y-0.5 hover:ring-primary/60"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="flex grow flex-col gap-3 p-5">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <span className="text-sm font-semibold text-primary-light">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {item.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onAddToCart(item)}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

