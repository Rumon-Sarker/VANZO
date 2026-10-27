'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/products';
import { CONTENT } from '@/lib/content';

export default function ShopGrid() {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <>
      <div className="section-head">
        <div>
          <h2 className="h2">{CONTENT.sections.shopTitle}</h2>
          <p className="lead">{CONTENT.sections.shopLead}</p>
        </div>
        <div className="tabs" role="group" aria-label="ক্যাটাগরি ফিল্টার">
          <button className="tab" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>সব</button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} className="tab" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</button>
          ))}
        </div>
      </div>
      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }}>
              <ProductCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
