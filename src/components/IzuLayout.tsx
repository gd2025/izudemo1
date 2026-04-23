import { ReactNode, useEffect, useState } from "react";

const styles = `
*,*::before,*::after{box-sizing:border-box}
:root{
  --white:#FDFAF6;--cream:#F5EDE0;--parch:#EDE3D3;--sand:#D6C4A8;
  --brand:#C5342A;--brand-dk:#9E2820;--brand-lt:#E05A4E;
  --earth:#8C6348;--clay:#B08060;
  --dk:#241810;--mid:#705040;--lt:#A08070;--ghost:#C8B4A4;
  --serif:'Cormorant Garamond',Georgia,serif;
  --sans:'Jost',system-ui,sans-serif;
  --bar-h:40px;--nav-h:72px;
}
body.izu-page{background:var(--white);color:var(--dk);font-family:var(--sans);font-weight:300;font-size:15px;line-height:1.7;-webkit-font-smoothing:antialiased;margin:0}
.izu-root{min-height:100vh;display:flex;flex-direction:column}
.izu-root a{text-decoration:none;color:inherit}
.izu-root img{display:block;max-width:100%}
.announce-bar{position:sticky;top:0;z-index:200;height:var(--bar-h);background:var(--dk);display:flex;align-items:center;justify-content:center;gap:1rem;padding:0 1rem}
.announce-bar span{font-size:.62rem;font-weight:300;letter-spacing:.22em;text-transform:uppercase;color:rgba(253,250,246,.78)}
.a-dot{width:3px;height:3px;border-radius:50%;background:var(--brand);opacity:.85}
.announce-bar a{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(253,250,246,.55);text-decoration:underline;text-underline-offset:3px}
nav.izu-nav{position:sticky;top:var(--bar-h);z-index:100;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 3.2rem;background:rgba(253,250,246,.97);backdrop-filter:blur(10px);border-bottom:.5px solid rgba(197,52,42,.10)}
.nav-left,.nav-right{display:flex;align-items:center;gap:1.8rem}
.nav-link{font-size:.63rem;font-weight:400;letter-spacing:.18em;text-transform:uppercase;color:var(--mid);transition:color .25s;background:none;border:none;cursor:pointer;font-family:var(--sans);padding:0;display:inline-flex;align-items:center;gap:.35rem}
.nav-link:hover,.nav-link.is-open{color:var(--brand)}
.nav-link svg{width:9px;height:9px;stroke:currentColor;stroke-width:1.4;fill:none;transition:transform .25s}
.nav-link.is-open svg{transform:rotate(180deg)}
a.nav-logo,.nav-logo{font-family:var(--serif);font-size:2rem;font-weight:600;font-style:italic;letter-spacing:.32em;color:var(--brand) !important;text-shadow:0 0 1px rgba(197,52,42,.18);transition:opacity .25s}
a.nav-logo:hover{opacity:.82}
.nav-icons{display:flex;align-items:center;gap:1.4rem}
.nav-icon{width:17px;height:17px;stroke:var(--mid);fill:none;stroke-width:1.25;cursor:pointer;transition:stroke .25s}
.nav-icon:hover{stroke:var(--brand)}
.cart-badge{position:relative;display:inline-flex;align-items:center}
.cart-badge .count{position:absolute;top:-6px;right:-10px;background:var(--brand);color:var(--white);font-size:.55rem;letter-spacing:.05em;border-radius:999px;min-width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;padding:0 4px}

/* Mood mega menu */
.mood-menu-wrap{position:relative}
.mood-mega{position:fixed;left:0;right:0;top:calc(var(--bar-h) + var(--nav-h));background:var(--white);border-top:.5px solid var(--parch);border-bottom:.5px solid var(--parch);box-shadow:0 22px 40px -28px rgba(36,24,16,.25);padding:2.2rem 5%;z-index:99;opacity:0;transform:translateY(-8px);pointer-events:none;transition:opacity .28s ease,transform .28s ease}
.mood-mega.is-open{opacity:1;transform:translateY(0);pointer-events:auto}
.mood-mega-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1.2rem;max-width:1480px;margin:0 auto}
.mood-mega-card{display:block;position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--parch)}
.mood-mega-card img{width:100%;height:100%;object-fit:cover;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.mood-mega-card:hover img{transform:scale(1.06)}
.mood-mega-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(36,24,16,.55) 100%)}
.mood-mega-label{position:absolute;left:1rem;right:1rem;bottom:.9rem;color:var(--white);font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.05rem;letter-spacing:.01em;z-index:2}
.mood-mega-label small{display:block;font-family:var(--sans);font-style:normal;font-size:.55rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(253,250,246,.7);margin-bottom:.3rem;font-weight:400}

/* Mobile menu */
.mobile-toggle{display:none;background:none;border:none;cursor:pointer;padding:.4rem;color:var(--mid)}
.mobile-toggle svg{width:22px;height:22px;stroke:currentColor;stroke-width:1.4;fill:none}
.mobile-drawer{position:fixed;inset:calc(var(--bar-h) + var(--nav-h)) 0 0 0;background:var(--white);z-index:90;padding:1.4rem 1.6rem 4rem;overflow-y:auto;transform:translateX(100%);transition:transform .35s cubic-bezier(.2,.7,.2,1)}
.mobile-drawer.is-open{transform:translateX(0)}
.mobile-drawer a,.mobile-drawer button{display:block;width:100%;text-align:left;padding:1rem 0;border-bottom:.5px solid var(--parch);font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dk);background:none;border-left:none;border-right:none;border-top:none;font-family:var(--sans);font-weight:400}
.mobile-drawer .mobile-sub{padding:.7rem 0 .7rem 1rem;font-size:.7rem;color:var(--mid);letter-spacing:.16em;border-bottom:none;display:flex;align-items:center;gap:.7rem}
.mobile-drawer .mobile-sub:before{content:"";width:18px;height:.5px;background:var(--brand)}

.page-hero{padding:4rem 5% 3rem;background:var(--white);border-bottom:.5px solid var(--parch)}
.page-hero .label{font-size:.64rem;letter-spacing:.26em;text-transform:uppercase;color:var(--lt);margin-bottom:.8rem;display:block}
.page-hero h1{font-family:var(--serif);font-size:clamp(2.4rem,5vw,4.4rem);font-weight:300;font-style:italic;color:var(--dk);line-height:1.04;margin:0 0 .8rem}
.page-hero p{font-size:.86rem;color:var(--mid);max-width:520px;line-height:1.8;margin:0}
.page-section{padding:4rem 5%;flex:1}
.btn-brand{display:inline-block;padding:.95rem 2.4rem;font-size:.66rem;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--white);background:var(--brand);border:.5px solid var(--brand);transition:all .25s;cursor:pointer}
.btn-brand:hover{background:var(--brand-dk);letter-spacing:.28em}
.btn-outline{display:inline-block;padding:.95rem 2.4rem;font-size:.66rem;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--dk);background:transparent;border:.5px solid var(--clay);transition:all .3s;cursor:pointer}
.btn-outline:hover{background:rgba(197,52,42,.07);border-color:var(--brand);color:var(--brand)}
input.izu-input,textarea.izu-input{width:100%;background:transparent;border:none;border-bottom:1px solid var(--clay);outline:none;font-family:var(--sans);font-size:.85rem;color:var(--dk);padding:.9rem 0}
input.izu-input:focus,textarea.izu-input:focus{border-bottom-color:var(--brand)}
.izu-form label{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--lt);margin-top:1.2rem}
footer.izu-footer{background:var(--dk);padding:4rem 5% 2.5rem;color:rgba(253,250,246,.42);font-size:.78rem;margin-top:auto}
.izu-footer .footer-logo{font-family:var(--serif);font-size:1.6rem;font-weight:600;font-style:italic;letter-spacing:.32em;color:var(--brand)}
.izu-footer .copy{font-size:.58rem;letter-spacing:.12em;color:rgba(253,250,246,.18);margin-top:2rem}
.shop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.8rem}
.p-card{cursor:pointer}
.p-img{position:relative;aspect-ratio:3/4;overflow:hidden;margin-bottom:1.1rem;background:var(--parch)}
.p-img img{width:100%;height:100%;object-fit:cover;transition:transform .85s}
.p-card:hover .p-img img{transform:scale(1.05)}
.p-name{font-family:var(--serif);font-size:1.1rem;font-weight:400;font-style:italic;color:var(--dk);margin:0 0 .28rem}
.p-price{font-size:.72rem;letter-spacing:.1em;color:var(--mid)}
@media(max-width:1100px){.shop-grid{grid-template-columns:repeat(2,1fr)}.mood-mega-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:900px){
  nav.izu-nav{padding:0 1.4rem}
  .nav-left,.nav-right .nav-link:not(.cart-badge),.nav-right .nav-link{display:none}
  .nav-right{gap:1rem}
  .nav-right .nav-icons{display:flex}
  .mobile-toggle{display:inline-flex;align-items:center;justify-content:center}
  .mood-mega{display:none}
}
@media(max-width:600px){:root{--nav-h:62px;--bar-h:36px}.shop-grid{grid-template-columns:repeat(2,1fr);gap:1rem}.nav-logo{font-size:1.7rem;letter-spacing:.28em}}
`;

export const MOODS = [
  { slug: "Sea & Salt", label: "Sea & Salt", caption: "Linen for the shore" },
  { slug: "Sunset Hour", label: "Sunset Hour", caption: "Silk in golden light" },
  { slug: "The Slow Days", label: "The Slow Days", caption: "Long lunches, lazy afternoons" },
  { slug: "Mornings In Paros", label: "Mornings In Paros", caption: "Soft starts, fresh bread" },
  { slug: "Effortless in Every Step", label: "Effortless", caption: "Made to move" },
];

import moodSeaSalt from "@/assets/mood-sea-salt.jpg";
import moodSunset from "@/assets/mood-sunset-hour.jpg";
import moodSlow from "@/assets/mood-slow-days.jpg";
import moodMornings from "@/assets/mood-mornings-paros.jpg";
import moodEffortless from "@/assets/mood-effortless.jpg";

export const MOOD_IMAGES: Record<string, string> = {
  "Sea & Salt": moodSeaSalt,
  "Sunset Hour": moodSunset,
  "The Slow Days": moodSlow,
  "Mornings In Paros": moodMornings,
  "Effortless in Every Step": moodEffortless,
};

export function IzuLayout({ children, cartCount = 0 }: { children: ReactNode; cartCount?: number }) {
  const [moodOpen, setMoodOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.add("izu-page");
    return () => document.body.classList.remove("izu-page");
  }, []);

  useEffect(() => {
    if (!moodOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoodOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moodOpen]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@200;300;400;500&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="izu-root">
        <div className="announce-bar">
          <span>Free shipping in Greece for orders over €150</span>
          <div className="a-dot" />
          <a href="/contact">Learn More</a>
        </div>

        <nav className="izu-nav">
          <div className="nav-left">
            <a href="/shop" className="nav-link">Shop</a>
            <div className="mood-menu-wrap" onMouseEnter={() => setMoodOpen(true)} onMouseLeave={() => setMoodOpen(false)}>
              <button
                className={`nav-link ${moodOpen ? "is-open" : ""}`}
                onClick={() => setMoodOpen((v) => !v)}
                aria-expanded={moodOpen}
              >
                Shop by Mood
                <svg viewBox="0 0 12 12"><path d="M3 4.5L6 7.5L9 4.5" /></svg>
              </button>
            </div>
            <a href="/shop?category=Dresses" className="nav-link">Dresses</a>
            <a href="/shop?category=Kimonos" className="nav-link">Kimonos</a>
          </div>

          <a href="/" className="nav-logo" aria-label="IZU — Home">IZU</a>

          <div className="nav-right">
            <a href="/our-story" className="nav-link">Our Story</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/login" className="nav-link">Account</a>
            <div className="nav-icons">
              <a href="/cart" aria-label="Cart" className="cart-badge">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {cartCount > 0 && <span className="count">{cartCount}</span>}
              </a>
            </div>
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <svg viewBox="0 0 24 24">
                {mobileOpen ? (
                  <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>
                ) : (
                  <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Desktop mega menu */}
        <div
          className={`mood-mega ${moodOpen ? "is-open" : ""}`}
          onMouseEnter={() => setMoodOpen(true)}
          onMouseLeave={() => setMoodOpen(false)}
        >
          <div className="mood-mega-grid">
            {MOODS.map((m) => (
              <a key={m.slug} href={`/shop?category=${encodeURIComponent(m.slug)}`} className="mood-mega-card">
                <img src={MOOD_IMAGES[m.slug]} alt={m.label} loading="lazy" />
                <div className="mood-mega-label">
                  <small>Mood</small>
                  {m.label}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`}>
          <a href="/shop" onClick={() => setMobileOpen(false)}>Shop All</a>
          <div style={{ padding: "1rem 0", borderBottom: ".5px solid var(--parch)" }}>
            <div style={{ fontSize: ".78rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand)", marginBottom: ".4rem" }}>Shop by Mood</div>
            {MOODS.map((m) => (
              <a key={m.slug} href={`/shop?category=${encodeURIComponent(m.slug)}`} className="mobile-sub" onClick={() => setMobileOpen(false)}>
                {m.label}
              </a>
            ))}
          </div>
          <a href="/shop?category=Dresses" onClick={() => setMobileOpen(false)}>Dresses</a>
          <a href="/shop?category=Kimonos" onClick={() => setMobileOpen(false)}>Kimonos</a>
          <a href="/our-story" onClick={() => setMobileOpen(false)}>Our Story</a>
          <a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a>
          <a href="/login" onClick={() => setMobileOpen(false)}>Account</a>
          <a href="/cart" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</a>
        </div>

        {children}

        <footer className="izu-footer">
          <div className="footer-logo">IZU</div>
          <div className="copy">© {new Date().getFullYear()} IZU Paros. Born in Paros. Worn everywhere.</div>
        </footer>
      </div>
    </>
  );
}

export function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}
