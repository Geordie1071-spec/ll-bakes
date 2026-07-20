import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export interface CartLine {
  id: string;
  name: string;
  sub: string;
  price: number;
  qty: number;
  image?: string;
}

export interface CartItemInput {
  id: string;
  name: string;
  sub?: string;
  price: number;
  qty?: number;
  image?: string;
}

interface CartContextValue {
  items: CartLine[];
  isOpen: boolean;
  count: number;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItemInput) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (item: CartItemInput) => {
    const addQty = item.qty ?? 1;
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const next = prev.slice();
        next[idx] = {
          ...next[idx],
          qty: next[idx].qty + addQty,
          image: next[idx].image || item.image,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          sub: item.sub ?? 'Freshly baked',
          price: item.price,
          qty: addQty,
          image: item.image,
        },
      ];
    });
    setIsOpen(true);
  };

  const increment = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));

  const decrement = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)));

  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((a, x) => a + x.qty, 0),
      total: items.reduce((a, x) => a + x.price * x.qty, 0),
    }),
    [items],
  );

  const value: CartContextValue = {
    items,
    isOpen,
    count,
    total,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    increment,
    decrement,
    remove,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
