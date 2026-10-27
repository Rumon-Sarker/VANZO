'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartCtx = createContext(null);
const KEY = 'vanzo-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const api = useMemo(() => {
    const add = (product, size, qty = 1) => {
      const key = `${product.id}__${size}`;
      setItems((prev) => {
        const found = prev.find((i) => i.key === key);
        if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { key, id: product.id, name: product.name, price: product.price, image: product.images[0], size, qty }];
      });
    };
    const setQty = (key, qty) =>
      setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))));
    const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
    const clear = () => setItems([]);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { items, add, setQty, remove, clear, count, subtotal, open, setOpen };
  }, [items, open]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
