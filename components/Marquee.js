import { CONTENT } from '@/lib/content';

export default function Marquee() {
  const words = CONTENT.marquee;
  const all = [...words, ...words, ...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{all.map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  );
}
