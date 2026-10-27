import Link from 'next/link';
import { SITE } from '@/lib/config';
import { CATEGORIES } from '@/lib/products';
import Social from './Social';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div>
          <div className="logo"><span className="logo-mark"><img src={SITE.logo} alt="" width="28" height="28" /></span>{SITE.name.toUpperCase()}</div>
          <p style={{ maxWidth: 340, fontSize: 15 }}>{SITE.description}</p>
          <Social className="social-dark" />
        </div>
        <div>
          <h4>ক্যাটাগরি</h4>
          <ul>{CATEGORIES.map((c) => <li key={c.slug}><Link href={`/category/${c.slug}/`}>{c.name}</Link></li>)}</ul>
        </div>
        <div>
          <h4>যোগাযোগ</h4>
          <ul>
            <li>{SITE.address}</li>
            <li><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener">WhatsApp: {SITE.whatsappDisplay}</a></li>
            <li>bKash/Nagad: {SITE.bkash}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-copy">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Developed by <a href="https://rumon-sarker.vercel.app" target="_blank" rel="noopener">Rumon Sarker</a></span>
      </div>
    </footer>
  );
}
