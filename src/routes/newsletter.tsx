import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IzuLayout } from "@/components/IzuLayout";
import moodSunset from "@/assets/mood-sunset-hour.jpg";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Join Our Newsletter — IZU Paros" },
      { name: "description", content: "Subscribe to receive updates on new collections, stories, and exclusive releases from IZU Paros." },
      { property: "og:title", content: "Join the IZU Newsletter" },
      { property: "og:description", content: "Private previews, atelier stories, exclusive releases — once a month." },
    ],
  }),
  component: NewsletterPage,
});

const css = `
.nl-wrap{display:grid;grid-template-columns:1fr 1fr;min-height:calc(100vh - var(--bar-h) - var(--nav-h));background:var(--cream)}
.nl-img{position:relative;overflow:hidden;background:var(--parch)}
.nl-img img{width:100%;height:100%;object-fit:cover;object-position:center 30%}
.nl-content{display:flex;flex-direction:column;justify-content:center;padding:5rem 5rem;max-width:620px}
.nl-content small{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);display:block;margin-bottom:1.4rem}
.nl-content h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.4rem,4.8vw,3.8rem);line-height:1.04;margin:0 0 1.4rem;color:var(--dk)}
.nl-content p{font-size:.95rem;color:var(--mid);line-height:1.85;margin:0 0 .9rem;font-weight:300}
.nl-form{margin-top:2.2rem;display:flex;flex-direction:column;gap:1rem;max-width:420px}
.nl-form input{background:transparent;border:none;border-bottom:1px solid var(--clay);font-family:var(--sans);font-size:.95rem;padding:.95rem 0;outline:none;color:var(--dk)}
.nl-form input:focus{border-bottom-color:var(--brand)}
.nl-form button{margin-top:.6rem;align-self:flex-start}
.nl-perks{margin-top:2.4rem;padding-top:1.8rem;border-top:.5px solid var(--parch);display:grid;gap:.7rem}
.nl-perks div{display:flex;align-items:flex-start;gap:.8rem;font-size:.82rem;color:var(--mid);line-height:1.5;font-weight:300}
.nl-perks div:before{content:"";width:5px;height:5px;border-radius:50%;background:var(--brand);margin-top:.5rem;flex-shrink:0}
.nl-thanks{padding:1.6rem;border:.5px solid var(--brand);background:rgba(197,52,42,.05);color:var(--brand);font-family:var(--serif);font-style:italic;font-size:1.1rem;margin-top:1.4rem;max-width:420px}
@media(max-width:900px){.nl-wrap{grid-template-columns:1fr}.nl-img{aspect-ratio:5/3;min-height:280px}.nl-content{padding:2.6rem 1.6rem}}
`;

function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="nl-wrap">
        <div className="nl-img"><img src={moodSunset} alt="IZU sunset hour" /></div>
        <div className="nl-content">
          <small>Join Our Newsletter</small>
          <h1>Letters from Paros, once a month.</h1>
          <p>Subscribe to receive updates on new collections, stories, and exclusive releases. Slow letters from a slow brand — never spam, never sold.</p>
          {done ? (
            <div className="nl-thanks">"Welcome to the family. Your first letter arrives soon."</div>
          ) : (
            <form className="nl-form" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-brand">Subscribe</button>
            </form>
          )}

          <div className="nl-perks">
            <div>Private previews of new collections, before they go live</div>
            <div>Stories from our atelier in Jaipur and our boutiques in Paros</div>
            <div>Subscriber-only sales and seasonal release notes</div>
          </div>
        </div>
      </section>
    </IzuLayout>
  );
}
