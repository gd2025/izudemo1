import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout, MOODS, MOOD_IMAGES, MOOD_DESCRIPTIONS } from "@/components/IzuLayout";

export const Route = createFileRoute("/moods")({
  head: () => ({
    meta: [
      { title: "Shop by Mood — IZU Paros" },
      { name: "description", content: "Find your IZU piece by the moment you'll wear it. Sea & Salt, Sunset Hour, Slow Days and more." },
      { property: "og:title", content: "Shop by Mood — IZU Paros" },
      { property: "og:description", content: "Find your IZU piece by the moment you'll wear it." },
    ],
  }),
  component: MoodsLandingPage,
});

const css = `
.mds-hero{padding:5rem 5% 3rem;text-align:center;background:linear-gradient(180deg,var(--cream),var(--white))}
.mds-hero .label{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);display:block;margin-bottom:1rem}
.mds-hero h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.4rem,5.2vw,4.4rem);line-height:1.04;margin:0 auto;max-width:18ch;color:var(--dk)}
.mds-hero p{margin:1.4rem auto 0;max-width:560px;color:var(--mid);font-size:.92rem;line-height:1.85}
.mds-grid{padding:3rem 5% 6rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;max-width:1480px;margin:0 auto}
.mds-card{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:var(--parch);cursor:pointer}
.mds-card img{width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}
.mds-card:hover img{transform:scale(1.06)}
.mds-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 35%,rgba(36,24,16,.78) 100%)}
.mds-cap{position:absolute;left:1.6rem;right:1.6rem;bottom:1.4rem;color:var(--white);z-index:2}
.mds-cap small{font-family:var(--sans);font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(253,250,246,.7);display:block;margin-bottom:.5rem}
.mds-cap h3{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.7rem;margin:0 0 .4rem;line-height:1.05}
.mds-cap p{font-size:.78rem;color:rgba(253,250,246,.78);margin:0 0 .9rem;font-weight:300;line-height:1.5}
.mds-cap span.cta{font-size:.58rem;letter-spacing:.26em;text-transform:uppercase;color:var(--brand-lt);border-bottom:.5px solid rgba(224,90,78,.5);padding-bottom:.2rem;display:inline-block}
@media(max-width:900px){.mds-grid{grid-template-columns:1fr 1fr;gap:.9rem;padding:2rem 1rem 4rem}.mds-cap h3{font-size:1.3rem}}
@media(max-width:560px){.mds-grid{grid-template-columns:1fr}}
`;

function MoodsLandingPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header className="mds-hero">
        <span className="label">Shop by Mood</span>
        <h1>Dress for the moment.</h1>
        <p>Seven edits, drawn from the rhythm of an island day. Choose the moment you're dressing for.</p>
      </header>
      <section className="mds-grid">
        {MOODS.map((m) => (
          <a key={m.slug} href={`/moods/${encodeURIComponent(m.slug)}`} className="mds-card">
            <img src={MOOD_IMAGES[m.slug]} alt={m.label} loading="lazy" />
            <div className="mds-cap">
              <small>Mood</small>
              <h3>{m.label}</h3>
              <p>{MOOD_DESCRIPTIONS[m.slug] ?? m.caption}</p>
              <span className="cta">Shop the Mood →</span>
            </div>
          </a>
        ))}
      </section>
    </IzuLayout>
  );
}
