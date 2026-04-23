import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { IzuLayout, formatPrice } from "@/components/IzuLayout";
import heroParos from "@/assets/hero-paros.jpg";
import featureKimono from "@/assets/feature-kimono.jpg";
import featureDress from "@/assets/feature-dress.jpg";
import featureAccessories from "@/assets/feature-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IZU Paros — Mediterranean Luxury, Born in the Cyclades" },
      {
        name: "description",
        content:
          "Sun-drenched silhouettes, hand-finished fabrics. Resort wear inspired by the light of Paros — shipped worldwide.",
      },
      { property: "og:title", content: "IZU Paros — Mediterranean Luxury" },
      {
        property: "og:description",
        content: "Sun-drenched silhouettes inspired by the light of Paros.",
      },
      { property: "og:image", content: heroParos },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const featured = [
  {
    slug: "ios-linen-dress",
    name: "Ios Linen Dress",
    price: 24800,
    image: heroParos,
    tag: "New Arrival",
  },
  {
    slug: "naoussa-silk-kimono",
    name: "Naoussa Silk Kimono",
    price: 38900,
    image: featureKimono,
    tag: "Limited",
  },
  {
    slug: "kyma-sunset-dress",
    name: "Kyma Sunset Dress",
    price: 31500,
    image: featureDress,
    tag: "Bestseller",
  },
  {
    slug: "paros-jewelry-set",
    name: "Paros Jewelry Set",
    price: 14200,
    image: featureAccessories,
    tag: "Handcrafted",
  },
];

function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <IzuLayout cartCount={0}>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      {/* HERO */}
      <section className="izu-hero">
        <div
          className="izu-hero-bg"
          style={{
            backgroundImage: `url(${heroParos})`,
            transform: `scale(${1.08 + scrollY * 0.0003}) translateY(${scrollY * 0.35}px)`,
          }}
        />
        <div className="izu-hero-grain" />
        <div className="izu-hero-gradient" />

        <div className={`izu-hero-content ${mounted ? "is-in" : ""}`}>
          <span className="izu-eyebrow" style={{ animationDelay: "0.1s" }}>
            Summer Collection — MMXXV
          </span>
          <h1 className="izu-hero-title">
            <span style={{ animationDelay: "0.25s" }}>Born of</span>
            <span style={{ animationDelay: "0.45s" }}>
              <em>Mediterranean</em>
            </span>
            <span style={{ animationDelay: "0.65s" }}>light.</span>
          </h1>
          <p className="izu-hero-sub" style={{ animationDelay: "0.95s" }}>
            Hand-finished resort wear, woven on the island of Paros. Pieces made to
            move with the sea breeze.
          </p>
          <div className="izu-hero-cta" style={{ animationDelay: "1.15s" }}>
            <Link to="/shop" search={{ category: undefined as string | undefined }} className="btn-brand izu-btn-primary">
              Shop the Collection
            </Link>
            <Link to="/our-story" className="btn-outline izu-btn-ghost">
              Our Story →
            </Link>
          </div>
        </div>

        <div className="izu-scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <div className="izu-scroll-line" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="izu-trust">
        {[
          ["Complimentary Worldwide Shipping", "Orders over €150"],
          ["30-Day Effortless Returns", "On every order"],
          ["Hand-Finished in Greece", "Small batch, ethically made"],
          ["Concierge Styling", "Personal advice, anytime"],
        ].map(([t, s]) => (
          <div key={t} className="izu-trust-item">
            <div className="izu-trust-dot" />
            <div>
              <div className="izu-trust-title">{t}</div>
              <div className="izu-trust-sub">{s}</div>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURED */}
      <section className="izu-featured">
        <div className="izu-section-head">
          <span className="izu-eyebrow">The Edit</span>
          <h2 className="izu-h2">
            Pieces, <em>chosen by hand.</em>
          </h2>
          <p className="izu-section-sub">
            A curated selection from our atelier — the silhouettes our clients keep
            returning for.
          </p>
        </div>

        <div className="izu-product-grid">
          {featured.map((p, i) => (
            <RevealCard key={p.slug} index={i}>
              <Link to="/product/$slug" params={{ slug: p.slug }} className="izu-pcard">
                <div className="izu-pcard-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <span className="izu-pcard-tag">{p.tag}</span>
                  <div className="izu-pcard-quick">Quick Add</div>
                </div>
                <div className="izu-pcard-meta">
                  <h3>{p.name}</h3>
                  <span>{formatPrice(p.price)}</span>
                </div>
              </Link>
            </RevealCard>
          ))}
        </div>

        <div className="izu-section-foot">
          <Link to="/shop" search={{ category: undefined as string | undefined }} className="btn-outline izu-btn-ghost">
            View All Pieces
          </Link>
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="izu-editorial">
        <div className="izu-editorial-img">
          <img src={featureDress} alt="The light of Paros" loading="lazy" />
        </div>
        <div className="izu-editorial-text">
          <span className="izu-eyebrow">The Atelier</span>
          <h2 className="izu-h2">
            A house built on <em>slowness.</em>
          </h2>
          <p>
            Every IZU piece begins as a sketch by the harbor in Naoussa. We cut in
            small batches, dye with mineral pigments, and finish each seam by hand —
            so what arrives at your door carries the weight of an island summer.
          </p>
          <Link to="/our-story" className="btn-brand izu-btn-primary">
            Discover the House
          </Link>
        </div>
      </section>

      {/* JOURNAL CTA */}
      <section className="izu-journal">
        <div className="izu-journal-inner">
          <span className="izu-eyebrow" style={{ color: "rgba(253,250,246,.55)" }}>
            The IZU Journal
          </span>
          <h2 className="izu-h2 izu-h2-light">
            Receive the next chapter <em>first.</em>
          </h2>
          <p>
            Private previews, atelier stories, and styling notes — once a month, no
            more.
          </p>
          <form
            className="izu-journal-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              required
              className="izu-journal-input"
            />
            <button type="submit" className="btn-brand izu-btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </IzuLayout>
  );
}

function RevealCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`izu-reveal ${visible ? "is-in" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {children}
    </div>
  );
}

const pageStyles = `
/* HERO */
.izu-hero{position:relative;height:calc(100vh - var(--bar-h) - var(--nav-h));min-height:620px;overflow:hidden;background:var(--dk)}
.izu-hero-bg{position:absolute;inset:-5%;background-size:cover;background-position:center;will-change:transform;transition:transform .1s linear}
.izu-hero-grain{position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.12) 1px,transparent 1px);background-size:3px 3px;opacity:.35;pointer-events:none}
.izu-hero-gradient{position:absolute;inset:0;background:linear-gradient(180deg,rgba(36,24,16,.15) 0%,rgba(36,24,16,.05) 35%,rgba(36,24,16,.55) 100%);pointer-events:none}
.izu-hero-content{position:absolute;left:6%;bottom:14%;max-width:640px;color:var(--white);z-index:5}
.izu-hero-content > *{opacity:0;transform:translateY(24px)}
.izu-hero-content.is-in > *{animation:izuRise 1.1s cubic-bezier(.2,.7,.2,1) forwards}
.izu-hero-content .izu-eyebrow{color:rgba(253,250,246,.78);display:inline-block;margin-bottom:1.4rem}
.izu-hero-title{font-family:var(--serif);font-weight:300;font-size:clamp(3rem,7.5vw,6.8rem);line-height:.98;margin:0 0 1.6rem;letter-spacing:-.01em}
.izu-hero-title span{display:block}
.izu-hero-title em{font-style:italic;color:var(--brand-lt)}
.izu-hero-sub{font-size:1rem;line-height:1.7;color:rgba(253,250,246,.85);max-width:440px;margin:0 0 2.2rem;font-weight:300}
.izu-hero-cta{display:flex;gap:1rem;flex-wrap:wrap}
.izu-btn-primary{box-shadow:0 8px 24px -8px rgba(197,52,42,.5);transition:transform .3s,box-shadow .3s,letter-spacing .3s,background .3s}
.izu-btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 32px -10px rgba(197,52,42,.65)}
.izu-btn-ghost{color:var(--white);border-color:rgba(253,250,246,.4)}
.izu-btn-ghost:hover{background:rgba(253,250,246,.08);border-color:var(--white);color:var(--white)}
.izu-scroll-cue{position:absolute;right:2.4rem;bottom:2rem;display:flex;flex-direction:column;align-items:center;gap:.8rem;color:rgba(253,250,246,.55);font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;z-index:5}
.izu-scroll-line{width:1px;height:42px;background:rgba(253,250,246,.4);position:relative;overflow:hidden}
.izu-scroll-line:after{content:"";position:absolute;top:-100%;left:0;width:100%;height:100%;background:var(--brand-lt);animation:izuScroll 2.2s ease-in-out infinite}
@keyframes izuScroll{0%{top:-100%}60%,100%{top:100%}}
@keyframes izuRise{to{opacity:1;transform:translateY(0)}}

/* TRUST */
.izu-trust{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:var(--cream);border-bottom:.5px solid var(--parch)}
.izu-trust-item{padding:1.6rem 1.4rem;display:flex;align-items:center;gap:.9rem;border-right:.5px solid var(--parch)}
.izu-trust-item:last-child{border-right:none}
.izu-trust-dot{width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0}
.izu-trust-title{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dk);font-weight:400}
.izu-trust-sub{font-size:.7rem;color:var(--lt);margin-top:.2rem}

/* SECTION HEADERS */
.izu-section-head{text-align:center;max-width:640px;margin:0 auto 3.5rem}
.izu-eyebrow{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--brand);font-weight:400;display:inline-block;margin-bottom:1rem}
.izu-h2{font-family:var(--serif);font-weight:300;font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1.05;color:var(--dk);margin:0 0 1rem;letter-spacing:-.005em}
.izu-h2 em{font-style:italic;color:var(--brand)}
.izu-h2-light{color:var(--white)}
.izu-section-sub{font-size:.92rem;color:var(--mid);line-height:1.7;margin:0}
.izu-section-foot{text-align:center;margin-top:3rem}

/* FEATURED */
.izu-featured{padding:6rem 5%;background:var(--white)}
.izu-product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;max-width:1480px;margin:0 auto}
.izu-reveal{opacity:0;transform:translateY(40px);transition:opacity 1s cubic-bezier(.2,.7,.2,1),transform 1s cubic-bezier(.2,.7,.2,1)}
.izu-reveal.is-in{opacity:1;transform:translateY(0)}
.izu-pcard{display:block;cursor:pointer;color:inherit}
.izu-pcard-img{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--parch);margin-bottom:1.2rem}
.izu-pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.2,.7,.2,1),filter .6s}
.izu-pcard:hover .izu-pcard-img img{transform:scale(1.06);filter:brightness(.92)}
.izu-pcard-tag{position:absolute;top:1rem;left:1rem;background:var(--white);color:var(--dk);font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;padding:.45rem .8rem;font-weight:400}
.izu-pcard-quick{position:absolute;left:1rem;right:1rem;bottom:1rem;background:var(--dk);color:var(--white);text-align:center;padding:.85rem;font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;transform:translateY(120%);transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.izu-pcard:hover .izu-pcard-quick{transform:translateY(0)}
.izu-pcard-meta{display:flex;justify-content:space-between;align-items:baseline;gap:1rem}
.izu-pcard-meta h3{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.15rem;margin:0;color:var(--dk)}
.izu-pcard-meta span{font-size:.78rem;color:var(--mid);letter-spacing:.06em}

/* EDITORIAL */
.izu-editorial{display:grid;grid-template-columns:1fr 1fr;background:var(--cream);min-height:640px}
.izu-editorial-img{position:relative;overflow:hidden}
.izu-editorial-img img{width:100%;height:100%;object-fit:cover;transition:transform 8s ease-out}
.izu-editorial:hover .izu-editorial-img img{transform:scale(1.04)}
.izu-editorial-text{display:flex;flex-direction:column;justify-content:center;padding:5rem 6rem;max-width:600px}
.izu-editorial-text p{font-size:.95rem;line-height:1.85;color:var(--mid);margin:0 0 2rem}

/* JOURNAL */
.izu-journal{background:var(--dk);padding:6rem 5%;text-align:center;position:relative;overflow:hidden}
.izu-journal:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(197,52,42,.18),transparent 60%);pointer-events:none}
.izu-journal-inner{max-width:560px;margin:0 auto;position:relative}
.izu-journal p{color:rgba(253,250,246,.65);font-size:.92rem;margin:0 0 2.4rem;line-height:1.7}
.izu-journal-form{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center}
.izu-journal-input{flex:1;min-width:240px;background:transparent;border:.5px solid rgba(253,250,246,.25);color:var(--white);padding:1rem 1.2rem;font-family:var(--sans);font-size:.85rem;font-weight:300;outline:none;transition:border-color .3s}
.izu-journal-input::placeholder{color:rgba(253,250,246,.4)}
.izu-journal-input:focus{border-color:var(--brand-lt)}

/* RESPONSIVE */
@media(max-width:1100px){
  .izu-product-grid{grid-template-columns:repeat(2,1fr)}
  .izu-trust{grid-template-columns:repeat(2,1fr)}
  .izu-trust-item:nth-child(2){border-right:none}
  .izu-trust-item:nth-child(1),.izu-trust-item:nth-child(2){border-bottom:.5px solid var(--parch)}
  .izu-editorial{grid-template-columns:1fr}
  .izu-editorial-img{aspect-ratio:4/3}
  .izu-editorial-text{padding:3.5rem 2rem;max-width:none}
}
@media(max-width:680px){
  .izu-hero{height:auto;min-height:560px;padding:5rem 0 4rem}
  .izu-hero-content{position:relative;left:auto;bottom:auto;padding:0 6%;max-width:none}
  .izu-scroll-cue{display:none}
  .izu-trust{grid-template-columns:1fr}
  .izu-trust-item{border-right:none;border-bottom:.5px solid var(--parch)}
  .izu-trust-item:last-child{border-bottom:none}
  .izu-product-grid{grid-template-columns:repeat(2,1fr);gap:1.2rem}
  .izu-featured{padding:4rem 5%}
  .izu-journal{padding:4rem 5%}
  .izu-editorial-text{padding:3rem 1.6rem}
}
`;
