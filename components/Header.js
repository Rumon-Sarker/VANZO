'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { CATEGORIES } from '@/lib/products';
import { SITE } from '@/lib/config';

export default function Header() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const links = CATEGORIES.map((c) => {
    const href = `/category/${c.slug}/`;
    return <Link key={c.slug} href={href} aria-current={pathname === href ? 'page' : undefined}>{c.name}</Link>;
  });
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href="/" className="logo" aria-label={`${SITE.name} home`}>
          <span className="logo-mark"><img src={SITE.logo} alt="" width="28" height="28" /></span>{SITE.name.toUpperCase()}
        </Link>
        <nav className="nav" aria-label="Categories">{links}</nav>
        <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`কার্ট খুলুন, ${count}টি পণ্য`}>
          কার্ট
          <motion.span
            key={count}
            className="cart-count"
            initial={{ scale: count ? 1.6 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            {count}
          </motion.span>
        </button>
      </div>
      <nav className="subnav" aria-label="Categories">{links}</nav>
    </header>
  );
}
