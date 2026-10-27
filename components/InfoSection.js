import { SITE } from '@/lib/config';
import { CONTENT, fill, rich } from '@/lib/content';
import Social from './Social';

export default function InfoSection() {
  const { info, terms, sections } = CONTENT;
  return (
    <>
      <section className="section" id="info">
        <div className="wrap">
          <div className="section-head"><h2 className="h2">{sections.infoTitle}</h2></div>
          <div className="info">
            {info.map((block) => (
              <div key={block.title}>
                <h3>{fill(block.title)}</h3>
                {block.lines.map((l, i) => <p key={i}>{rich(l)}</p>)}
              </div>
            ))}
            <div>
              <h3>যোগাযোগ</h3>
              <p>{SITE.address}</p>
              <p>WhatsApp (অর্ডার ও প্রশ্ন): <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" style={{ fontWeight: 600, textDecoration: 'underline' }}>{SITE.whatsappDisplay}</a></p>
              <Social />
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="terms" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head"><h2 className="h2">{sections.termsTitle}</h2></div>
          <ol className="terms">
            {terms.map((t, i) => <li key={i}>{rich(t)}</li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
