import { useEffect, useState } from "react";
import {
  readFittingDiscount,
  type FittingDiscount,
  FITTING_DISCOUNT_WINDOW_MS,
} from "@/lib/fitting-room-discount";

const css = `
.fdp-bg{position:fixed;inset:0;background:rgba(36,24,16,.55);z-index:400;display:flex;align-items:flex-end;justify-content:center;padding:1.2rem;animation:fdpFade .4s ease}
@media(min-width:700px){.fdp-bg{align-items:center}}
@keyframes fdpFade{from{opacity:0}to{opacity:1}}
.fdp{background:var(--white);max-width:440px;width:100%;padding:2.2rem 1.8rem 1.8rem;position:relative;border:.5px solid var(--parch);box-shadow:0 24px 60px -20px rgba(36,24,16,.35);animation:fdpSlide .5s cubic-bezier(.2,.7,.2,1)}
@keyframes fdpSlide{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
.fdp-close{position:absolute;top:.7rem;right:.9rem;background:none;border:none;font-size:1.4rem;color:var(--lt);cursor:pointer;line-height:1}
.fdp-eyebrow{font-family:var(--sans);font-size:.56rem;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--brand);display:block;margin-bottom:.6rem}
.fdp-h{font-family:var(--serif);font-style:italic;font-weight:300;font-size:1.6rem;color:var(--dk);margin:0 0 .55rem;line-height:1.2}
.fdp-h em{color:var(--terracotta);font-style:italic}
.fdp-sub{font-family:var(--serif);font-style:italic;font-weight:300;color:var(--mid);font-size:.92rem;line-height:1.6;margin:0 0 1.3rem}
.fdp-code{display:flex;align-items:stretch;border:.5px dashed var(--clay);background:var(--cream);margin-bottom:1rem}
.fdp-code-val{flex:1;padding:.95rem 1rem;font-family:var(--sans);font-size:.95rem;letter-spacing:.18em;color:var(--dk);font-weight:400}
.fdp-code-copy{background:var(--dk);color:var(--white);border:none;padding:0 1.1rem;font-family:var(--sans);font-weight:400;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;cursor:pointer}
.fdp-code-copy:hover{opacity:.85}
.fdp-timer{display:flex;align-items:center;gap:.5rem;font-family:var(--sans);font-weight:400;font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--brand);margin-bottom:1.3rem}
.fdp-timer:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--brand);animation:fdpPulse 1.4s ease infinite}
@keyframes fdpPulse{0%,100%{opacity:.4}50%{opacity:1}}
.fdp-note{font-family:var(--sans);font-weight:300;font-size:.7rem;color:var(--lt);line-height:1.6;margin:0 0 1.3rem}
.fdp-cta{display:block;width:100%;text-align:center;background:var(--dk);color:var(--white);font-family:var(--sans);font-weight:400;font-size:.66rem;letter-spacing:.24em;text-transform:uppercase;padding:1.05rem;text-decoration:none;border:none;cursor:pointer;transition:opacity .2s}
.fdp-cta:hover{opacity:.85}
.fdp-copied{font-family:var(--sans);font-size:.58rem;color:var(--brand);letter-spacing:.18em;text-transform:uppercase;margin-top:.5rem;text-align:center;min-height:1em}
`;

function fmt(ms: number): string {
  if (ms <= 0) return "0:00";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function FittingDiscountPopup() {
  const [discount, setDiscount] = useState<FittingDiscount | null>(null);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<FittingDiscount | null>;
      const d = ce.detail;
      if (d) {
        setDiscount(d);
        // Only auto-open if freshly issued (within last 5s)
        if (d.expiresAt - Date.now() > FITTING_DISCOUNT_WINDOW_MS - 5000) {
          setOpen(true);
        }
      } else {
        setDiscount(null);
        setOpen(false);
      }
    };
    window.addEventListener("izu:fitting-discount", handler);
    // restore
    const existing = readFittingDiscount();
    if (existing) setDiscount(existing);
    return () => window.removeEventListener("izu:fitting-discount", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [open]);

  if (!open || !discount) return null;
  const remaining = discount.expiresAt - now;
  if (remaining <= 0) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="fdp-bg" onClick={() => setOpen(false)}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="fdp" onClick={(e) => e.stopPropagation()}>
        <button className="fdp-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        <span className="fdp-eyebrow">A Gift from IZU</span>
        <h3 className="fdp-h">10% off, <em>just for you.</em></h3>
        <p className="fdp-sub">
          Because you stepped into our fitting room — enjoy 10% off your entire order.
          Use it on anything in the maison.
        </p>
        <div className="fdp-code">
          <div className="fdp-code-val">{discount.code}</div>
          <button className="fdp-code-copy" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
        </div>
        <div className="fdp-timer">Valid for {fmt(remaining)}</div>
        <p className="fdp-note">
          Applies sitewide at checkout. One use per customer. Expires in 10 minutes.
        </p>
        <a href="/shop" className="fdp-cta">Continue shopping</a>
      </div>
    </div>
  );
}
