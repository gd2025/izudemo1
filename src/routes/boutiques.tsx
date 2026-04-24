import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";
import boutique1 from "@/assets/mood-mornings-paros.jpg";
import boutique2 from "@/assets/mood-sunset-hour.jpg";

export const Route = createFileRoute("/boutiques")({
  head: () => ({
    meta: [
      { title: "The Boutiques — IZU Parikia & Naoussa, Paros" },
      { name: "description", content: "Visit our two heritage boutiques on the island of Paros — Parikia (since 2003) and Naoussa (since 2010)." },
      { property: "og:title", content: "IZU Boutiques — Parikia & Naoussa" },
      { property: "og:description", content: "Two heritage addresses on Paros. Visit us by the harbour." },
    ],
  }),
  component: BoutiquesPage,
});

const css = `
.bt-hero{padding:6rem 5% 3rem;text-align:center;background:linear-gradient(180deg,var(--cream),var(--white))}
.bt-hero .label{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1.2rem;display:block}
.bt-hero h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.4rem,5.2vw,4.4rem);line-height:1.04;margin:0 auto;max-width:18ch;color:var(--dk)}
.bt-hero p{margin:1.4rem auto 0;max-width:560px;color:var(--mid);font-size:.92rem;line-height:1.85}
.bt-card{display:grid;grid-template-columns:1.1fr 1fr;gap:3.5rem;align-items:center;max-width:1380px;margin:0 auto;padding:5rem 5%}
.bt-card.right{grid-template-columns:1fr 1.1fr}
.bt-card.right .bt-img{order:2}
.bt-img{aspect-ratio:4/5;overflow:hidden;background:var(--parch)}
.bt-img img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s}
.bt-img:hover img{transform:scale(1.04)}
.bt-text .eyebrow{font-size:.6rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1rem;display:block}
.bt-text h2{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2rem,4vw,3.2rem);line-height:1.05;margin:0 0 .4rem;color:var(--dk)}
.bt-text .heritage{font-size:.65rem;letter-spacing:.28em;text-transform:uppercase;color:var(--brand);margin-bottom:1.4rem;display:block;font-weight:400}
.bt-text p{font-size:.92rem;line-height:1.9;color:var(--mid);margin:0 0 1.2rem;font-weight:300;max-width:46ch}
.bt-info{margin:1.6rem 0;padding:1.4rem 0;border-top:.5px solid var(--parch);border-bottom:.5px solid var(--parch)}
.bt-info-row{display:flex;gap:1.2rem;align-items:flex-start;margin-bottom:.8rem;font-size:.82rem;color:var(--mid)}
.bt-info-row:last-child{margin-bottom:0}
.bt-info-row strong{font-family:var(--sans);font-weight:400;font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--lt);min-width:90px;padding-top:.18rem}
.bt-actions{display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.4rem}
.bt-band{background:var(--cream);padding:4rem 5%;text-align:center}
.bt-band p{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.4rem,2.6vw,2rem);color:var(--earth);max-width:680px;margin:0 auto;line-height:1.5}
@media(max-width:900px){
  .bt-card,.bt-card.right{grid-template-columns:1fr;gap:1.8rem;padding:3rem 1.4rem}
  .bt-card.right .bt-img{order:0}
}
`;

function BoutiquesPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header className="bt-hero">
        <span className="label">Visit Us · Paros, Greece</span>
        <h1>Two heritage addresses, one island.</h1>
        <p>For over two decades, IZU has lived in two small whitewashed rooms on the island of Paros. Step inside.</p>
      </header>

      {/* Parikia — left image / right text */}
      <section className="bt-card">
        <div className="bt-img"><img src={boutique1} alt="IZU Parikia boutique" /></div>
        <div className="bt-text">
          <span className="eyebrow">The Original</span>
          <h2>IZU Parikia.</h2>
          <span className="heritage">Established 2003 · 22+ Years</span>
          <p>
            Our first home. A small white room a stone's throw from the old harbour, where every IZU collection has been unveiled for over twenty years. The morning light here is the reason we choose linen.
          </p>
          <div className="bt-info">
            <div className="bt-info-row"><strong>Address</strong>Market Street, Old Town, Parikia, 84400 Paros</div>
            <div className="bt-info-row"><strong>Hours</strong>Mon–Sat · 10:00–14:00 & 18:00–23:00 (Summer)</div>
            <div className="bt-info-row"><strong>Phone</strong>+30 22840 22 000</div>
          </div>
          <div className="bt-actions">
            <a className="btn-brand" href="https://maps.google.com/?q=Parikia+Paros" target="_blank" rel="noreferrer">Get Directions</a>
            <a className="btn-outline" href="/contact">Book a Private Visit</a>
          </div>
        </div>
      </section>

      {/* Naoussa — right image / left text */}
      <section className="bt-card right">
        <div className="bt-text">
          <span className="eyebrow">The Sister Boutique</span>
          <h2>IZU Naoussa.</h2>
          <span className="heritage">Established 2010 · 15+ Years</span>
          <p>
            On the harbour of Naoussa, between fishing boats and bougainvillea. Smaller, slower, more intimate — the boutique we open only when the season allows. A favourite of the women who summer here.
          </p>
          <div className="bt-info">
            <div className="bt-info-row"><strong>Address</strong>Old Port, Naoussa, 84401 Paros</div>
            <div className="bt-info-row"><strong>Hours</strong>Daily · 11:00–14:00 & 19:00–24:00 (May–Oct)</div>
            <div className="bt-info-row"><strong>Phone</strong>+30 22840 53 000</div>
          </div>
          <div className="bt-actions">
            <a className="btn-brand" href="https://maps.google.com/?q=Naoussa+Paros" target="_blank" rel="noreferrer">Get Directions</a>
            <a className="btn-outline" href="/contact">Book a Private Visit</a>
          </div>
        </div>
        <div className="bt-img"><img src={boutique2} alt="IZU Naoussa boutique" /></div>
      </section>

      <section className="bt-band">
        <p>"Two rooms, one island, twenty years. Some things you only build slowly."</p>
      </section>
    </IzuLayout>
  );
}
