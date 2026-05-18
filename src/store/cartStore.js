import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => {
        const existing = get().items.find(i => i.id === product.id);
        if (existing) {
          set(s => ({
            items: s.items.map(i =>
              i.id === product.id ? { ...i, qty: i.qty + qty } : i
            ),
          }));
        } else {
          set(s => ({ items: [...s.items, { ...product, qty }] }));
        }
      },

      removeItem: (id) =>
        set(s => ({ items: s.items.filter(i => i.id !== id) })),

      updateQty: (id, qty) => {
        if (qty < 1) return get().removeItem(id);
        set(s => ({
          items: s.items.map(i => (i.id === id ? { ...i, qty } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },

      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.qty, 0);
      },
    }),
    { name: 'handbag-cart' }
  )
);