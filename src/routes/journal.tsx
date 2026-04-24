import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout, MOOD_IMAGES } from "@/components/IzuLayout";
import journalHero from "@/assets/journal-hero.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — IZU Paros" },
      { name: "description", content: "Atelier stories, styling notes, and the small details from our boutiques in Parikia and Naoussa." },
      { property: "og:title", content: "The IZU Journal" },
      { property: "og:description", content: "Atelier stories, styling notes, and the small details from Paros." },
      { property: "og:image", content: journalHero },
    ],
  }),
  component: JournalPage,
});

const css = `
.jr-hero{padding:5rem 5% 3rem;text-align:center;background:var(--white)}
.jr-hero small{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);display:block;margin-bottom:1rem}
.jr-hero h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.6rem,5.4vw,4.6rem);line-height:1.04;margin:0;color:var(--dk)}
.jr-hero p{max-width:540px;margin:1.4rem auto 0;color:var(--mid);font-size:.92rem;line-height:1.85}
.jr-grid{padding:3rem 5% 6rem;display:grid;grid-template-columns:repeat(3,1fr);gap:2.4rem;max-width:1380px;margin:0 auto}
.jr-card{display:block;cursor:pointer}
.jr-card-img{aspect-ratio:4/5;overflow:hidden;background:var(--parch);margin-bottom:1.2rem}
.jr-card-img img{width:100%;height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.2,.7,.2,1)}
.jr-card:hover .jr-card-img img{transform:scale(1.05)}
.jr-meta{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--lt);margin-bottom:.6rem;display:flex;gap:.7rem;align-items:center}
.jr-meta strong{color:var(--brand);font-weight:400;letter-spacing:.22em}
.jr-card h3{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.5rem;line-height:1.2;color:var(--dk);margin:0 0 .6rem}
.jr-card p{font-size:.86rem;color:var(--mid);line-height:1.7;margin:0;font-weight:300}
.jr-card span.read{display:inline-block;margin-top:.9rem;font-size:.58rem;letter-spacing:.26em;text-transform:uppercase;color:var(--brand);border-bottom:.5px solid var(--brand);padding-bottom:.18rem}
.jr-feature{padding:0 5% 4rem;max-width:1380px;margin:0 auto}
.jr-feature-card{display:grid;grid-template-columns:1.1fr 1fr;gap:3rem;align-items:center;background:var(--cream);padding:2.4rem}
.jr-feature-img{aspect-ratio:4/3;overflow:hidden;background:var(--parch)}
.jr-feature-img img{width:100%;height:100%;object-fit:cover}
.jr-feature-text small{font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;color:var(--terracotta);display:block;margin-bottom:.8rem}
.jr-feature-text h2{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.7rem,3vw,2.4rem);line-height:1.1;color:var(--dk);margin:0 0 1rem}
.jr-feature-text p{font-size:.92rem;line-height:1.85;color:var(--mid);margin:0 0 1rem;font-weight:300}
@media(max-width:900px){.jr-grid{grid-template-columns:1fr;gap:2.4rem}.jr-feature-card{grid-template-columns:1fr;padding:1.4rem}}
`;

const articles = [
  {
    img: "Sunset Hour",
    cat: "Atelier",
    date: "September 2025",
    title: "How a silk dress is made — from Jaipur to Paros.",
    excerpt: "We follow a single Naoussa Silk Kimono from the dye room in India to the boutique in Naoussa.",
  },
  {
    img: "The Slow Days",
    cat: "Stories",
    date: "August 2025",
    title: "The mothers, the sons, and twenty years of IZU.",
    excerpt: "Our family has been making clothes on Paros since before the millennium. A note from the family.",
  },
  {
    img: "Mornings In Paros",
    cat: "Styling",
    date: "July 2025",
    title: "One bag, one week — packing IZU for a Cycladic summer.",
    excerpt: "Five pieces, infinite ways. The IZU travel edit, illustrated.",
  },
  {
    img: "Sea & Salt",
    cat: "Places",
    date: "June 2025",
    title: "Where to eat in Parikia (after you've shopped at IZU).",
    excerpt: "The little tavernas behind the boutique that the locals never tell tourists about.",
  },
  {
    img: "Effortless in Every Step",
    cat: "Atelier",
    date: "May 2025",
    title: "Why we never use linen — and what we use instead.",
    excerpt: "A note on silk, viscose, rayon and cotton — the four fabrics that make every IZU piece.",
  },
  {
    img: "Beach Walk",
    cat: "Journal",
    date: "April 2025",
    title: "A morning swim before the boutique opens.",
    excerpt: "What we do on the days the season hasn't yet started. A photo essay.",
  },
];

function JournalPage() {
  const [feature, ...rest] = articles;
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header className="jr-hero">
        <small>The IZU Journal</small>
        <h1>Quiet stories from Paros.</h1>
        <p>Atelier notes, styling thoughts, and the small details from a brand that has spent over twenty years on one island.</p>
      </header>

      {/* Editor's pick / feature */}
      <section className="jr-feature">
        <div className="jr-feature-card">
          <div className="jr-feature-img"><img src={journalHero} alt="Featured journal entry" loading="lazy" /></div>
          <div className="jr-feature-text">
            <small>Editor's Note · {feature.date}</small>
            <h2>{feature.title}</h2>
            <p>{feature.excerpt}</p>
            <p>From the dye rooms outside Jaipur to the morning light of our Parikia boutique, we trace the whole life of one IZU piece — and the people who make it possible.</p>
            <span className="jr-card-read" style={{ fontSize: ".58rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--brand)", borderBottom: ".5px solid var(--brand)", paddingBottom: ".2rem" }}>Read the Story →</span>
          </div>
        </div>
      </section>

      <section className="jr-grid">
        {rest.map((a, i) => (
          <a key={i} href="/journal" className="jr-card">
            <div className="jr-card-img"><img src={MOOD_IMAGES[a.img]} alt={a.title} loading="lazy" /></div>
            <div className="jr-meta"><strong>{a.cat}</strong><span>·</span><span>{a.date}</span></div>
            <h3>{a.title}</h3>
            <p>{a.excerpt}</p>
            <span className="read">Read More →</span>
          </a>
        ))}
      </section>
    </IzuLayout>
  );
}
