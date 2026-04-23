import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { IzuLayout, MOODS, MOOD_IMAGES, formatPrice } from "@/components/IzuLayout";
import heroParos from "@/assets/hero-paros.jpg";
import featureKimono from "@/assets/feature-kimono.jpg";
import featureDress from "@/assets/feature-dress.jpg";
import featureAccessories from "@/assets/feature-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IZU Paros — Born in Paros. Worn everywhere." },
      {
        name: "description",
        content:
          "Hand-finished Mediterranean resort wear from the island of Paros. Dresses, kimonos and accessories — born in Paros, worn everywhere.",
      },
      { property: "og:title", content: "IZU Paros — Born in Paros. Worn everywhere." },
      {
        property: "og:description",
        content: "Hand-finished resort wear from the island of Paros.",
      },
      { property: "og:image", content: heroParos },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
};

const IMG_POOL = [heroParos, featureKimono, featureDress, featureAccessories];
const img = (i: number) => IMG_POOL[i % IMG_POOL.length];

const izuEdit: Product[] = [
  { slug: "ios-linen-dress", name: "Ios Linen Dress", price: 24800, image: img(0), tag: "New" },
  { slug: "naoussa-silk-kimono", name: "Naoussa Silk Kimono", price: 38900, image: img(1), tag: "Limited" },
  { slug: "kyma-sunset-dress", name: "Kyma Sunset Dress", price: 31500, image: img(2), tag: "Editor's Pick" },
  { slug: "paros-jewelry-set", name: "Paros Jewelry Set", price: 14200, image: img(3) },
  { slug: "antiparos-cotton-set", name: "Antiparos Cotton Set", price: 22600, image: img(0) },
  { slug: "marpissa-shirt", name: "Marpissa Linen Shirt", price: 16800, image: img(1) },
  { slug: "lefkes-wrap-skirt", name: "Lefkes Wrap Skirt", price: 19500, image: img(2) },
  { slug: "aliki-sandal", name: "Aliki Leather Sandal", price: 18900, image: img(3) },
];

const bestSellers: Product[] = [
  { slug: "ios-linen-dress", name: "Ios Linen Dress", price: 24800, image: img(0), tag: "#1 Bestseller" },
  { slug: "kyma-sunset-dress", name: "Kyma Sunset Dress", price: 31500, image: img(2), tag: "Loved" },
  { slug: "marpissa-shirt", name: "Marpissa Linen Shirt", price: 16800, image: img(1), tag: "Restocked" },
  { slug: "naoussa-silk-kimono", name: "Naoussa Silk Kimono", price: 38900, image: img(1), tag: "Almost Gone" },
  { slug: "aliki-sandal", name: "Aliki Leather Sandal", price: 18900, image: img(3), tag: "Loved" },
  { slug: "paros-jewelry-set", name: "Paros Jewelry Set", price: 14200, image: img(3) },
  { slug: "lefkes-wrap-skirt", name: "Lefkes Wrap Skirt", price: 19500, image: img(2), tag: "Trending" },
  { slug: "antiparos-cotton-set", name: "Antiparos Cotton Set", price: 22600, image: img(0) },
];

const moodProducts = (mood: string): Product[] => {
  const moodImg = MOOD_IMAGES[mood];
  return [
    { slug: `${mood}-piece-1`, name: "Aegean Slip Dress", price: 24800, image: moodImg },
    { slug: `${mood}-piece-2`, name: "Sand Linen Set", price: 21900, image: img(0) },
    { slug: `${mood}-piece-3`, name: "Salt Cotton Shirt", price: 14800, image: img(1) },
    { slug: `${mood}-piece-4`, name: "Coastline Kimono", price: 32900, image: img(2) },
    { slug: `${mood}-piece-5`, name: "Driftwood Sandal", price: 17900, image: img(3) },
    { slug: `${mood}-piece-6`, name: "Naxos Wrap Skirt", price: 18900, image: moodImg },
  ];
};

function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeMood, setActiveMood] = useState(MOODS[0].slug);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentMoodProducts = moodProducts(activeMood);

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
          <span className="izu-eyebrow izu-eyebrow-light" style={{ animationDelay: "0.1s" }}>
            Summer Collection — MMXXV
          </span>
          <h1 className="izu-hero-title">
            <span style={{ animationDelay: "0.25s" }}>Born in <em>Paros.</em></span>
            <span style={{ animationDelay: "0.55s" }}>Worn everywhere.</span>
          </h1>
          <p className="izu-hero-sub" style={{ animationDelay: "0.95s" }}>
            Hand-finished resort wear, woven on the island of Paros. Pieces made to
            move with the sea breeze.
          </p>
          <div className="izu-hero-cta" style={{ animationDelay: "1.15s" }}>
            <Link to="/shop" search={{ category: undefined }} className="btn-brand izu-btn-primary">
              Shop the Collection
            </Link>
            <Link to="/our-story" className="btn-outline izu-btn-ghost">
              Explore the House →
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
            <div>
              <div className="izu-trust-title">{t}</div>
              <div className="izu-trust-sub">{s}</div>
            </div>
          </div>
        ))}
      </section>

      {/* IZU EDIT */}
      <section className="izu-section izu-edit">
        <div className="izu-section-head">
          <span className="izu-eyebrow">The IZU Edit</span>
          <h2 className="izu-h2">
            This year's <em>best pieces.</em>
          </h2>
          <p className="izu-section-sub">
            Curated by our atelier — eight silhouettes our clients keep returning for.
          </p>
        </div>

        <ProductGrid products={izuEdit} />

        <div className="izu-section-foot">
          <Link to="/shop" search={{ category: undefined }} className="btn-outline izu-btn-ghost">
            View The Edit
          </Link>
        </div>
      </section>

      {/* SHOP BY MOOD */}
      <section className="izu-mood">
        <div className="izu-section-head">
          <span className="izu-eyebrow">Shop by Mood</span>
          <h2 className="izu-h2">
            Dress for <em>the moment.</em>
          </h2>
          <p className="izu-section-sub">
            Five edits, drawn from the rhythm of an island day.
          </p>
        </div>

        <div className="izu-mood-tabs" role="tablist">
          {MOODS.map((m) => (
            <button
              key={m.slug}
              role="tab"
              aria-selected={activeMood === m.slug}
              className={`izu-mood-tab ${activeMood === m.slug ? "is-active" : ""}`}
              onClick={() => setActiveMood(m.slug)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="izu-mood-stage" key={activeMood}>
          <div className="izu-mood-feature">
            <img src={MOOD_IMAGES[activeMood]} alt={activeMood} loading="lazy" />
            <div className="izu-mood-feature-text">
              <span className="izu-eyebrow izu-eyebrow-light">Mood</span>
              <h3>{MOODS.find((m) => m.slug === activeMood)?.label}</h3>
              <p>{MOODS.find((m) => m.slug === activeMood)?.caption}</p>
              <a
                href={`/shop?category=${encodeURIComponent(activeMood)}`}
                className="btn-brand izu-btn-primary"
              >
                Shop the Mood
              </a>
            </div>
          </div>

          <div className="izu-mood-rail" aria-label={`${activeMood} pieces`}>
            {currentMoodProducts.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="izu-rail-card"
              >
                <div className="izu-rail-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="izu-rail-meta">
                  <h4>{p.name}</h4>
                  <span>{formatPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="izu-section izu-bestsellers">
        <div className="izu-section-head">
          <span className="izu-eyebrow">Bestsellers</span>
          <h2 className="izu-h2">
            Worn <em>everywhere.</em>
          </h2>
          <p className="izu-section-sub">
            The pieces our community keeps choosing — restocked by demand.
          </p>
        </div>

        <ProductGrid products={bestSellers} refined />

        <div className="izu-section-foot">
          <Link to="/shop" search={{ category: undefined }} className="btn-brand izu-btn-primary">
            Shop All Bestsellers
          </Link>
        </div>
      </section>

      {/* JOURNAL CTA */}
      <section className="izu-journal">
        <div className="izu-journal-inner">
          <span className="izu-eyebrow izu-eyebrow-light">The IZU Journal</span>
          <h2 className="izu-h2 izu-h2-light">
            Receive the next chapter <em>first.</em>
          </h2>
          <p>
            Private previews, atelier stories, and styling notes — once a month, no more.
          </p>
          <form className="izu-journal-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" required className="izu-journal-input" />
            <button type="submit" className="btn-brand izu-btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </IzuLayout>
  );
}

function ProductGrid({ products, refined = false }: { products: Product[]; refined?: boolean }) {
  return (
    <div className={`izu-product-grid ${refined ? "is-refined" : ""}`}>
      {products.map((p, i) => (
        <RevealCard key={`${p.slug}-${i}`} index={i}>
          <Link to="/product/$slug" params={{ slug: p.slug }} className="izu-pcard">
            <div className="izu-pcard-img">
              <img src={p.image} alt={p.name} loading="lazy" />
              {p.tag && <span className="izu-pcard-tag">{p.tag}</span>}
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
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`izu-reveal ${visible ? "is-in" : ""}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
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
.izu-hero-gradient{position:absolute;inset:0;background:linear-gradient(180deg,rgba(36,24,16,.18) 0%,rgba(36,24,16,.05) 35%,rgba(36,24,16,.6) 100%);pointer-events:none}
.izu-hero-content{position:absolute;left:6%;bottom:14%;max-width:680px;color:var(--white);z-index:5}
.izu-hero-content > *{opacity:0;transform:translateY(24px)}
.izu-hero-content.is-in > *{animation:izuRise 1.1s cubic-bezier(.2,.7,.2,1) forwards}
.izu-hero-content .izu-eyebrow-light{color:rgba(253,250,246,.78);display:inline-block;margin-bottom:1.4rem}
.izu-hero-title{font-family:var(--serif);font-weight:300;font-size:clamp(3rem,7vw,6.4rem);line-height:1;margin:0 0 1.6rem;letter-spacing:-.01em}
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
.izu-trust-item{padding:1.6rem 1.4rem;display:flex;align-items:center;justify-content:center;gap:.9rem;border-right:.5px solid var(--parch);text-align:center}
.izu-trust-item:last-child{border-right:none}
.izu-trust-title{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dk);font-weight:400}
.izu-trust-sub{font-size:.7rem;color:var(--lt);margin-top:.2rem}

/* SECTION HEADERS */
.izu-section{padding:6rem 5%;background:var(--white)}
.izu-section-head{text-align:center;max-width:640px;margin:0 auto 3.5rem}
.izu-eyebrow{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--brand);font-weight:400;display:inline-block;margin-bottom:1rem}
.izu-eyebrow-light{color:rgba(253,250,246,.7)!important}
.izu-h2{font-family:var(--serif);font-weight:300;font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1.05;color:var(--dk);margin:0 0 1rem;letter-spacing:-.005em}
.izu-h2 em{font-style:italic;color:var(--brand)}
.izu-h2-light{color:var(--white)}
.izu-h2-light em{color:var(--brand-lt)}
.izu-section-sub{font-size:.92rem;color:var(--mid);line-height:1.7;margin:0}
.izu-section-foot{text-align:center;margin-top:3rem}

/* PRODUCT GRID */
.izu-product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;max-width:1480px;margin:0 auto}
.izu-product-grid.is-refined{gap:2.4rem}
.izu-reveal{opacity:0;transform:translateY(40px);transition:opacity 1s cubic-bezier(.2,.7,.2,1),transform 1s cubic-bezier(.2,.7,.2,1)}
.izu-reveal.is-in{opacity:1;transform:translateY(0)}
.izu-pcard{display:block;cursor:pointer;color:inherit}
.izu-pcard-img{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--parch);margin-bottom:1.2rem}
.izu-pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.2,.7,.2,1),filter .6s}
.izu-pcard:hover .izu-pcard-img img{transform:scale(1.06);filter:brightness(.92)}
.izu-pcard-tag{position:absolute;top:1rem;left:1rem;background:var(--white);color:var(--dk);font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;padding:.45rem .8rem;font-weight:400}
.izu-bestsellers .izu-pcard-tag{background:var(--brand);color:var(--white)}
.izu-pcard-quick{position:absolute;left:1rem;right:1rem;bottom:1rem;background:var(--dk);color:var(--white);text-align:center;padding:.85rem;font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;transform:translateY(120%);transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.izu-pcard:hover .izu-pcard-quick{transform:translateY(0)}
.izu-pcard-meta{display:flex;justify-content:space-between;align-items:baseline;gap:1rem}
.izu-pcard-meta h3{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.15rem;margin:0;color:var(--dk)}
.izu-pcard-meta span{font-size:.78rem;color:var(--mid);letter-spacing:.06em}

/* SHOP BY MOOD */
.izu-mood{padding:6rem 0;background:var(--cream);overflow:hidden}
.izu-mood .izu-section-head{padding:0 5%}
.izu-mood-tabs{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;padding:0 5%;margin-bottom:3rem}
.izu-mood-tab{font-family:var(--sans);font-size:.66rem;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--mid);background:transparent;border:.5px solid var(--clay);padding:.85rem 1.4rem;cursor:pointer;transition:all .3s}
.izu-mood-tab:hover{color:var(--brand);border-color:var(--brand)}
.izu-mood-tab.is-active{background:var(--dk);color:var(--white);border-color:var(--dk)}
.izu-mood-stage{animation:izuMoodFade .6s cubic-bezier(.2,.7,.2,1)}
@keyframes izuMoodFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.izu-mood-feature{position:relative;height:520px;margin:0 5% 2.5rem;overflow:hidden}
.izu-mood-feature img{width:100%;height:100%;object-fit:cover;animation:izuMoodZoom 12s ease-out infinite alternate}
@keyframes izuMoodZoom{from{transform:scale(1)}to{transform:scale(1.08)}}
.izu-mood-feature:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(36,24,16,.55) 0%,rgba(36,24,16,.15) 60%,transparent 100%)}
.izu-mood-feature-text{position:absolute;left:3rem;top:50%;transform:translateY(-50%);color:var(--white);max-width:380px;z-index:2}
.izu-mood-feature-text h3{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2rem,4vw,3.2rem);margin:.5rem 0 .8rem;line-height:1;color:var(--white)}
.izu-mood-feature-text p{font-size:.92rem;color:rgba(253,250,246,.85);margin:0 0 1.8rem;line-height:1.7}
.izu-mood-rail{display:flex;gap:1.4rem;overflow-x:auto;padding:.5rem 5% 2rem;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:var(--clay) transparent}
.izu-mood-rail::-webkit-scrollbar{height:4px}
.izu-mood-rail::-webkit-scrollbar-thumb{background:var(--clay);border-radius:2px}
.izu-rail-card{flex:0 0 240px;scroll-snap-align:start;color:inherit}
.izu-rail-img{aspect-ratio:3/4;overflow:hidden;background:var(--parch);margin-bottom:.8rem}
.izu-rail-img img{width:100%;height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.2,.7,.2,1)}
.izu-rail-card:hover .izu-rail-img img{transform:scale(1.06)}
.izu-rail-meta{display:flex;justify-content:space-between;align-items:baseline;gap:.6rem}
.izu-rail-meta h4{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1rem;margin:0;color:var(--dk)}
.izu-rail-meta span{font-size:.72rem;color:var(--mid);letter-spacing:.06em}

/* BESTSELLERS */
.izu-bestsellers{background:var(--white)}
.izu-bestsellers .izu-pcard-meta h3{font-size:1.18rem}

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
  .izu-mood-feature{height:440px}
  .izu-mood-feature-text{left:2rem;max-width:320px}
}
@media(max-width:680px){
  .izu-hero{height:auto;min-height:560px;padding:5rem 0 4rem}
  .izu-hero-content{position:relative;left:auto;bottom:auto;padding:0 6%;max-width:none}
  .izu-scroll-cue{display:none}
  .izu-trust{grid-template-columns:1fr}
  .izu-trust-item{border-right:none;border-bottom:.5px solid var(--parch)}
  .izu-trust-item:last-child{border-bottom:none}
  .izu-product-grid{grid-template-columns:repeat(2,1fr);gap:1.2rem}
  .izu-section{padding:4rem 5%}
  .izu-mood{padding:4rem 0}
  .izu-mood-feature{height:380px;margin:0 0 2rem}
  .izu-mood-feature-text{left:1.4rem;right:1.4rem;max-width:none}
  .izu-rail-card{flex:0 0 180px}
  .izu-journal{padding:4rem 5%}
}
`;
