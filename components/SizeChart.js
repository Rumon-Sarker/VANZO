'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTENT } from '@/lib/content';

export default function SizeChart({ open, onClose, type }) {
  const chart = CONTENT.sizeChart[type] || CONTENT.sizeChart.clothing;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="modal" role="dialog" aria-modal="true" aria-label="সাইজ চার্ট"
            initial={{ opacity: 0, x: '-50%', y: '-45%' }} animate={{ opacity: 1, x: '-50%', y: '-50%' }} exit={{ opacity: 0, x: '-50%', y: '-45%' }}>
            <button className="x" style={{ position: 'absolute', top: 14, right: 14 }} onClick={onClose} aria-label="বন্ধ করুন">×</button>
            <h2>সাইজ চার্ট</h2>
            <p className="lead" style={{ fontSize: 15 }}>{chart.hint} {CONTENT.sizeChart.footer}</p>
            <div className="table-wrap">
              <table>
                <thead><tr>{chart.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{chart.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
