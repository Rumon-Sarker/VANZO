import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import OfferPopup from '@/components/OfferPopup';
import { SITE } from '@/lib/config';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: 'website', siteName: SITE.name, locale: 'bn_BD',
    title: SITE.title,
    description: SITE.description,
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export const viewport = { themeColor: '#fafaf8', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        />
        <link rel="icon" type="image/png" href="/brand/favicon.png" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <OfferPopup />
          <WhatsAppFab />
        </CartProvider>
      </body>
    </html>
  );
}
