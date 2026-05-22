import { useEffect, useState, useRef, useCallback } from "react";
import {
  issueFittingDiscount,
  readFittingDiscount,
  type FittingDiscount,
} from "@/lib/fitting-room-discount";

type Product = {
  id: string;
  name: string;
  category: string | null;
  image_url: string | null;
};

const css = `
.vfr{margin:2.4rem 0;padding:2.2rem 1.6rem;background:var(--cream);border:.5px solid var(--parch)}
.vfr-eyebrow{font-family:var(--sans);font-size:.56rem;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--brand);margin:0 0 .55rem;display:block}
.vfr-title{font-family:var(--serif);font-weight:300;font-size:1.55rem;line-height:1.15;color:var(--dk);margin:0 0 .55rem}
.vfr-title em{font-style:italic;color:var(--terracotta);font-weight:300}
.vfr-sub{font-family:var(--serif);font-style:italic;font-weight:300;color:var(--mid);font-size:.94rem;line-height:1.7;max-width:46ch;margin:0 0 1.3rem}
.vfr-privacy{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--sans);font-weight:300;font-size:.62rem;color:#8a7a6a;letter-spacing:.04em;margin-bottom:1.3rem}
.vfr-privacy svg{width:11px;height:11px;stroke:#8a7a6a;fill:none;stroke-width:1.4}

.vfr-drop{border:1px dashed var(--clay);border-radius:4px;padding:2.4rem 1.4rem;text-align:center;background:transparent;cursor:pointer;transition:border-color .25s,background .25s}
.vfr-drop:hover{border-color:var(--brand);background:rgba(245,237,224,.6)}
.vfr-drop svg{width:26px;height:26px;stroke:var(--clay);fill:none;stroke-width:1.2;margin:0 auto .9rem;display:block}
.vfr-drop-h{font-family:var(--serif);font-style:italic;font-weight:300;font-size:1.1rem;color:var(--dk);margin:0 0 .3rem}
.vfr-drop-s{font-family:var(--sans);font-weight:300;font-size:.62rem;color:var(--lt);letter-spacing:.14em;text-transform:uppercase}
.vfr-mobile-links{display:none;gap:1.4rem;justify-content:center;margin-top:1rem;font-size:.66rem;letter-spacing:.18em;text-transform:uppercase}
.vfr-mobile-links span{color:var(--brand);cursor:pointer;text-decoration:underline;text-underline-offset:3px}
@media(max-width:700px){.vfr-mobile-links{display:flex}}

.vfr-error{margin-top:1rem;font-family:var(--serif);font-style:italic;font-size:.88rem;color:var(--brand-dk);line-height:1.6}

/* Preview */
.vfr-preview{background:rgba(253,250,246,.7);padding:1.4rem;text-align:center}
.vfr-preview-img{width:100%;max-width:240px;aspect-ratio:3/4;margin:0 auto 1rem;background:var(--parch);overflow:hidden;filter:saturate(.95)}
.vfr-preview-img img{width:100%;height:100%;object-fit:cover}
.vfr-preview-h{font-family:var(--serif);font-style:italic;font-size:1.15rem;color:var(--dk);margin:0 0 1rem;font-weight:300}
.vfr-actions{display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap}
.vfr-btn{font-family:var(--sans);font-weight:400;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;padding:.85rem 1.5rem;cursor:pointer;border:.5px solid var(--dk);background:var(--dk);color:var(--white);transition:opacity .2s}
.vfr-btn:hover{opacity:.85}
.vfr-btn.ghost{background:transparent;color:var(--dk)}
.vfr-btn[disabled]{opacity:.5;cursor:not-allowed}

/* Loading */
.vfr-loading{text-align:center;padding:2rem .5rem}
.vfr-ring{width:38px;height:38px;border:1px solid var(--parch);border-top-color:var(--brand);border-radius:50%;margin:0 auto 1.2rem;animation:vfrSpin 1.1s linear infinite}
@keyframes vfrSpin{to{transform:rotate(360deg)}}
.vfr-loading-h{font-family:var(--serif);font-style:italic;font-size:1rem;color:var(--dk);margin:0 0 .4rem;font-weight:300}
.vfr-loading-msg{font-family:var(--sans);font-weight:300;font-size:.72rem;color:var(--mid);min-height:1.2em;transition:opacity .4s}
.vfr-loading-time{font-family:var(--sans);font-weight:300;font-size:.58rem;color:var(--lt);letter-spacing:.18em;text-transform:uppercase;margin-top:1.1rem}

/* Result — mobile-first side-by-side, no scrolling */
.vfr-result-wrap{animation:vfrFade .9s ease}
@keyframes vfrFade{from{opacity:0}to{opacity:1}}
.vfr-compare{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;background:rgba(253,250,246,.6);padding:.5rem}
.vfr-compare-cell{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--parch)}
.vfr-compare-cell img{width:100%;height:100%;object-fit:cover}
.vfr-compare-cell .lbl{position:absolute;left:.4rem;bottom:.4rem;font-family:var(--sans);font-weight:500;font-size:.5rem;letter-spacing:.26em;color:var(--white);background:rgba(36,24,16,.65);padding:.25rem .5rem;text-transform:uppercase}
.vfr-result-cap{text-align:center;font-family:var(--serif);font-style:italic;font-weight:300;font-size:1.1rem;color:var(--dk);margin:1.1rem 0 1rem;line-height:1.4}
.vfr-result-cap strong{font-weight:400;color:var(--terracotta);font-style:italic}

.vfr-trust{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-top:1.4rem;padding-top:1.2rem;border-top:.5px solid var(--parch)}
.vfr-trust span{font-family:var(--sans);font-weight:300;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mid);display:inline-flex;align-items:center;gap:.4rem}
.vfr-trust span:before{content:"";width:4px;height:4px;border-radius:50%;background:var(--brand)}

@media(min-width:700px){
  .vfr{padding:2.6rem 2.2rem}
  .vfr-title{font-size:1.7rem}
  .vfr-compare{gap:.7rem;padding:.7rem}
}
`;

const COPY: Record<string, string> = {
  dress: "Upload a full-length photo of yourself — ideally wearing fitted clothing so we can understand your silhouette naturally.",
  kimono: "Upload a full-length photo of yourself. Open layers or simple outfits work beautifully for draped pieces.",
  set: "For sets, upload a photo with both top and bottom visible so proportions can be tailored more precisely.",
  kaftan: "Upload a full-length photo in simple or fitted clothing. Your look will be transformed while preserving your natural proportions.",
  default: "Upload a full-length photo of yourself in simple clothing. We'll take care of the rest.",
};

function detectCopy(product: Product): string {
  const hay = `${product.name} ${product.category ?? ""}`.toLowerCase();
  if (hay.includes("kimono")) return COPY.kimono;
  if (hay.includes("kaftan") || hay.includes("caftan")) return COPY.kaftan;
  if (hay.includes("set")) return COPY.set;
  if (hay.includes("dress") || hay.includes("skirt") || hay.includes("top")) return COPY.dress;
  return COPY.default;
}

type Phase = "idle" | "preview" | "loading" | "result" | "error";

const LOADING_MESSAGES = [
  "Reading your silhouette…",
  "Draping the fabric…",
  "Adjusting the light…",
  "Almost ready…",
];

export function VirtualFittingRoom({
  product,
  onDiscount,
}: {
  product: Product;
  onDiscount?: (d: FittingDiscount) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [generationCount, setGenerationCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const sub = detectCopy(product);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("That file doesn't look like a photo. Try a JPG or PNG of yourself, full-length.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("That photo is a touch large. Try one under 12 MB for the best result.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Basic dimension check
      const img = new Image();
      img.onload = () => {
        if (img.width < 320 || img.height < 320) {
          setError("We couldn't fully see your silhouette. Try a clearer full-length photo for the most beautiful result.");
          return;
        }
        setUserImage(dataUrl);
        setPhase("preview");
      };
      img.onerror = () => setError("We couldn't read that photo. Try another one.");
      img.src = dataUrl;
    };
    reader.onerror = () => setError("We couldn't read that photo. Try another one.");
    reader.readAsDataURL(file);
  }, []);

  const onDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const startGeneration = useCallback(async () => {
    if (generationCount >= 10) {
      setPhase("error");
      setError("You've explored 10 looks — ready to choose your favourite?");
      return;
    }
    setPhase("loading");
    setLoadingMsg(LOADING_MESSAGES[0]);

    // Rotate loading messages
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[i]);
    }, 2200);

    // MOCK: in production this calls the Replicate-backed server fn.
    // For now we simulate a 6–8s generation and return the product image
    // as the "you in IZU" placeholder.
    await new Promise((res) => setTimeout(res, 6500 + Math.random() * 1500));
    clearInterval(interval);

    if (!product.image_url) {
      setPhase("error");
      setError("Our fitting room needs a moment.");
      return;
    }

    setResultImage(product.image_url);
    setGenerationCount((c) => c + 1);
    setPhase("result");

    // Issue 10-min 10% off code
    const code = issueFittingDiscount();
    onDiscount?.(code);
  }, [product.image_url, generationCount, onDiscount]);

  const tryAnother = () => {
    setPhase("idle");
    setUserImage(null);
    setResultImage(null);
    setError(null);
  };

  // Restore an active discount on mount (no popup re-trigger)
  useEffect(() => {
    const existing = readFittingDiscount();
    if (existing && onDiscount) onDiscount(existing);
  }, [onDiscount]);

  return (
    <section className="vfr" aria-label="Virtual Fitting Room">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <span className="vfr-eyebrow">Virtual Fitting Room</span>
      <h3 className="vfr-title">See yourself <em>in it.</em></h3>
      <p className="vfr-sub">{sub}</p>
      <div className="vfr-privacy">
        <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>
        Your photo is processed instantly and never stored. We see nothing.
      </div>

      {phase === "idle" && (
        <>
          <div
            className="vfr-drop"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24"><path d="M12 4v12"/><path d="M6 10l6-6 6 6"/><path d="M4 20h16"/></svg>
            <div className="vfr-drop-h">Upload your photo</div>
            <div className="vfr-drop-s">Full-body · Any outfit · JPG or PNG</div>
            <div className="vfr-mobile-links" onClick={(e) => e.stopPropagation()}>
              <span onClick={() => cameraInputRef.current?.click()}>Take photo</span>
              <span onClick={() => fileInputRef.current?.click()}>Choose from library</span>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {error && <p className="vfr-error">{error}</p>}
        </>
      )}

      {phase === "preview" && userImage && (
        <div className="vfr-preview">
          <div className="vfr-preview-img">
            <img src={userImage} alt="Your photo" />
          </div>
          <h4 className="vfr-preview-h">Ready to step into IZU?</h4>
          <div className="vfr-actions">
            <button className="vfr-btn ghost" onClick={tryAnother}>Choose another</button>
            <button className="vfr-btn" onClick={startGeneration}>Create my look</button>
          </div>
        </div>
      )}

      {phase === "loading" && (
        <div className="vfr-loading">
          <div className="vfr-ring" />
          <p className="vfr-loading-h">Creating your fitting room moment…</p>
          <p className="vfr-loading-msg">{loadingMsg}</p>
          <p className="vfr-loading-time">This takes about 15–30 seconds</p>
        </div>
      )}

      {phase === "result" && userImage && resultImage && (
        <div className="vfr-result-wrap">
          <div className="vfr-compare">
            <div className="vfr-compare-cell">
              <img src={userImage} alt="You" />
              <span className="lbl">You</span>
            </div>
            <div className="vfr-compare-cell">
              <img src={resultImage} alt={`You in ${product.name}`} />
              <span className="lbl">In IZU</span>
            </div>
          </div>
          <p className="vfr-result-cap">
            This is you in the <strong>{product.name}</strong>.
          </p>
          <div className="vfr-actions">
            <button className="vfr-btn ghost" onClick={tryAnother}>Try another photo</button>
          </div>
          <div className="vfr-trust">
            <span>Photo never stored</span>
            <span>Ready in 20 seconds</span>
            <span>Private fitting room</span>
          </div>
        </div>
      )}

      {phase === "error" && (
        <div className="vfr-loading">
          <p className="vfr-loading-h">Our fitting room needs a moment.</p>
          <p className="vfr-loading-msg" style={{ marginBottom: "1.2rem" }}>
            {error ?? "Please try again or contact us for personal styling help."}
          </p>
          <div className="vfr-actions">
            <button className="vfr-btn" onClick={tryAnother}>Try again</button>
            <a href="/contact" className="vfr-btn ghost" style={{ textDecoration: "none", display: "inline-block" }}>
              Contact us
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
