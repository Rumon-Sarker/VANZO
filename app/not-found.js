import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap section" style={{ textAlign: 'center' }}>
      <h1 className="h2">এই পেজটি পাওয়া যায়নি</h1>
      <p className="lead">লিংকটি ভুল হতে পারে, অথবা প্রোডাক্টটি সরিয়ে ফেলা হয়েছে।</p>
      <Link href="/" className="btn btn-ink" style={{ marginTop: 20 }}>হোমে ফিরে যান</Link>
    </div>
  );
}
