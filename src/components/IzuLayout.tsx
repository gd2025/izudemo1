import { ReactNode, useState } from "react";

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
.announce-bar{position:sticky;top:0;z-index:200;height:var(--bar-h);background:var(--dk);display:flex;align-items:center;justify-content:center;gap:1rem}
.announce-bar span{font-size:.62rem;font-weight:300;letter-spacing:.22em;text-transform:uppercase;color:rgba(253,250,246,.72)}
.a-dot{width:3px;height:3px;border-radius:50%;background:var(--brand);opacity:.7}
.announce-bar a{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(253,250,246,.5);text-decoration:underline;text-underline-offset:3px}
nav.izu-nav{position:sticky;top:var(--bar-h);z-index:100;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 3.2rem;background:rgba(253,250,246,.97);backdrop-filter:blur(10px);border-bottom:.5px solid rgba(197,52,42,.10)}
.nav-left,.nav-right{display:flex;align-items:center;gap:1.8rem}
.nav-link{font-size:.63rem;font-weight:400;letter-spacing:.18em;text-transform:uppercase;color:var(--mid);transition:color .25s}
.nav-link:hover{color:var(--brand)}
.nav-logo{font-family:var(--serif);font-size:1.9rem;font-weight:400;font-style:italic;letter-spacing:.32em;color:var(--brand)}
.nav-icons{display:flex;align-items:center;gap:1.4rem}
.nav-icon{width:17px;height:17px;stroke:var(--mid);fill:none;stroke-width:1.25;cursor:pointer}
.nav-icon:hover{stroke:var(--brand)}
.cart-badge{position:relative;display:inline-flex;align-items:center}
.cart-badge .count{position:absolute;top:-6px;right:-10px;background:var(--brand);color:var(--white);font-size:.55rem;letter-spacing:.05em;border-radius:999px;min-width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;padding:0 4px}
.page-hero{padding:4rem 5% 3rem;background:var(--white);border-bottom:.5px solid var(--parch)}
.page-hero .label{font-size:.64rem;letter-spacing:.26em;text-transform:uppercase;color:var(--lt);margin-bottom:.8rem;display:block}
.page-hero h1{font-family:var(--serif);font-size:clamp(2.4rem,5vw,4.4rem);font-weight:300;font-style:italic;color:var(--dk);line-height:1.04;margin:0 0 .8rem}
.page-hero p{font-size:.86rem;color:var(--mid);max-width:520px;line-height:1.8;margin:0}
.page-section{padding:4rem 5%;flex:1}
.btn-brand{display:inline-block;padding:.9rem 2.4rem;font-size:.66rem;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--white);background:var(--brand);border:.5px solid var(--brand);transition:all .25s;cursor:pointer}
.btn-brand:hover{background:var(--brand-dk);letter-spacing:.28em}
.btn-outline{display:inline-block;padding:.9rem 2.4rem;font-size:.66rem;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--dk);background:transparent;border:.5px solid var(--clay);transition:all .3s;cursor:pointer}
.btn-outline:hover{background:rgba(197,52,42,.07);border-color:var(--brand);color:var(--brand)}
input.izu-input,textarea.izu-input{width:100%;background:transparent;border:none;border-bottom:1px solid var(--clay);outline:none;font-family:var(--sans);font-size:.85rem;color:var(--dk);padding:.9rem 0}
input.izu-input:focus,textarea.izu-input:focus{border-bottom-color:var(--brand)}
.izu-form label{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--lt);margin-top:1.2rem}
footer.izu-footer{background:var(--dk);padding:4rem 5% 2.5rem;color:rgba(253,250,246,.42);font-size:.78rem;margin-top:auto}
.izu-footer .footer-logo{font-family:var(--serif);font-size:1.6rem;font-style:italic;letter-spacing:.32em;color:var(--brand-lt)}
.izu-footer .copy{font-size:.58rem;letter-spacing:.12em;color:rgba(253,250,246,.18);margin-top:2rem}
.shop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.8rem}
.p-card{cursor:pointer}
.p-img{position:relative;aspect-ratio:3/4;overflow:hidden;margin-bottom:1.1rem;background:var(--parch)}
.p-img img{width:100%;height:100%;object-fit:cover;transition:transform .85s}
.p-card:hover .p-img img{transform:scale(1.05)}
.p-name{font-family:var(--serif);font-size:1.1rem;font-weight:400;font-style:italic;color:var(--dk);margin:0 0 .28rem}
.p-price{font-size:.72rem;letter-spacing:.1em;color:var(--mid)}
@media(max-width:1100px){.shop-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:900px){nav.izu-nav{padding:0 1.6rem}.nav-left{display:none}}
@media(max-width:600px){:root{--nav-h:62px;--bar-h:36px}.shop-grid{grid-template-columns:repeat(2,1fr);gap:1rem}}
`;

export function IzuLayout({ children, cartCount = 0 }: { children: ReactNode; cartCount?: number }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <BodyClass />
      <div className="izu-root">
        <div className="announce-bar">
          <span>Free shipping in Greece for orders over €150</span>
          <div className="a-dot" />
          <a href="/contact">Learn More</a>
        </div>
        <nav className="izu-nav">
          <div className="nav-left">
            <a href="/shop" className="nav-link">Shop</a>
            <a href="/shop?category=Dresses" className="nav-link">Dresses</a>
            <a href="/shop?category=Kimonos" className="nav-link">Kimonos</a>
            <a href="/shop?category=Accessories" className="nav-link">Accessories</a>
          </div>
          <a href="/" className="nav-logo">IZU</a>
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
          </div>
        </nav>
        {children}
        <footer className="izu-footer">
          <div className="footer-logo">IZU</div>
          <div className="copy">© {new Date().getFullYear()} IZU Paros. Born in Paros. Worn everywhere.</div>
        </footer>
      </div>
    </>
  );
}

function BodyClass() {
  if (typeof document !== "undefined") {
    document.body.classList.add("izu-page");
  }
  return null;
}

export function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}
