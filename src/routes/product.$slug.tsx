import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout, formatPrice } from "@/components/IzuLayout";
import { resolveProductImage } from "@/lib/product-images";
import { VirtualFittingRoom } from "@/components/VirtualFittingRoom";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  category: string | null;
};

const css = `
.pdp{padding:3rem 5% 5rem;max-width:1380px;margin:0 auto}
.pdp-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:4rem;align-items:start}
.pdp-img{aspect-ratio:3/4;overflow:hidden;background:var(--parch);position:relative}
.pdp-img img{width:100%;height:100%;object-fit:cover}
.pdp-badge{position:absolute;top:1.2rem;left:1.2rem;background:var(--white);color:var(--brand);font-size:.55rem;letter-spacing:.24em;text-transform:uppercase;padding:.5rem .9rem;font-weight:500;border:.5px solid var(--brand)}
.pdp-info{padding-top:.5rem}
.pdp-cat{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--terracotta);margin-bottom:.9rem;display:block}
.pdp-name{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2rem,4vw,3.2rem);line-height:1.04;margin:0 0 .9rem;color:var(--dk)}
.pdp-price{font-size:1.05rem;color:var(--dk);margin-bottom:.4rem;font-weight:300;letter-spacing:.04em}
.pdp-price small{display:block;font-size:.62rem;letter-spacing:.18em;color:var(--lt);text-transform:uppercase;margin-top:.2rem;font-weight:400}
.pdp-desc{color:var(--mid);line-height:1.85;margin:1.6rem 0;max-width:48ch;font-size:.92rem}
.pdp-block{padding:1.2rem 0;border-top:.5px solid var(--parch)}
.pdp-block:last-of-type{border-bottom:.5px solid var(--parch)}
.pdp-block-title{font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--lt);margin-bottom:.7rem;font-weight:400}
.pdp-sizes{display:flex;gap:.5rem;flex-wrap:wrap}
.pdp-size{padding:.7rem 1.1rem;border:.5px solid var(--clay);background:var(--white);font-family:var(--sans);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;transition:all .2s;color:var(--dk);font-weight:400}
.pdp-size:hover{border-color:var(--brand)}
.pdp-size.is-active{background:var(--dk);color:var(--white);border-color:var(--dk)}
.pdp-fit{font-size:.85rem;color:var(--mid);line-height:1.7;font-style:italic;font-family:var(--serif);font-weight:400}
.pdp-link-btn{background:none;border:none;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--brand);cursor:pointer;padding:.4rem 0;text-decoration:underline;text-underline-offset:4px;font-family:var(--sans)}
.pdp-cta-row{display:flex;gap:.8rem;margin-top:1.6rem;align-items:stretch}
.pdp-qty{display:flex;align-items:center;border:.5px solid var(--clay);overflow:hidden}
.pdp-qty button{width:42px;height:48px;background:var(--white);border:none;font-size:1rem;cursor:pointer;color:var(--dk)}
.pdp-qty span{width:42px;text-align:center;font-size:.85rem;color:var(--dk)}
.pdp-add{flex:1}
.pdp-trust{display:flex;gap:1.4rem;margin-top:1.6rem;flex-wrap:wrap}
.pdp-trust div{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mid);display:flex;align-items:center;gap:.5rem;font-weight:400}
.pdp-trust div:before{content:"";width:5px;height:5px;background:var(--brand);border-radius:50%}
.pdp-msg{margin-top:1.2rem;color:var(--brand);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase}
.pdp-modal-bg{position:fixed;inset:0;background:rgba(36,24,16,.55);z-index:300;display:flex;align-items:center;justify-content:center;padding:1.4rem;animation:pdpFade .3s}
@keyframes pdpFade{from{opacity:0}to{opacity:1}}
.pdp-modal{background:var(--white);max-width:560px;width:100%;max-height:85vh;overflow-y:auto;padding:2.4rem 2rem;position:relative}
.pdp-modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--mid);line-height:1}
.pdp-modal h3{font-family:var(--serif);font-style:italic;font-weight:300;font-size:1.8rem;margin:0 0 1.2rem;color:var(--dk)}
.pdp-table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.82rem}
.pdp-table th,.pdp-table td{padding:.7rem .5rem;text-align:left;border-bottom:.5px solid var(--parch);color:var(--mid)}
.pdp-table th{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--lt);font-weight:400}
@media(max-width:900px){.pdp-grid{grid-template-columns:1fr;gap:2rem}}
`;

const SIZES = ["XS", "S", "M", "L", "XL"];

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [size, setSize] = useState("S");
  const [qty, setQty] = useState(1);
  const [showSizeModal, setShowSizeModal] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as Product | null);
        setLoading(false);
      });
  }, [slug]);

  async function addToCart() {
    if (!product) return;
    setAdding(true);
    setMsg(null);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      navigate({ to: "/login", search: { redirect: `/product/${slug}` } });
      return;
    }
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id,quantity")
      .eq("user_id", userData.user.id)
      .eq("product_id", product.id)
      .maybeSingle();
    if (existing) {
      await supabase.from("cart_items").update({ quantity: existing.quantity + qty }).eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({ user_id: userData.user.id, product_id: product.id, quantity: qty });
    }
    setAdding(false);
    setMsg(`Added · Size ${size}`);
  }

  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="pdp">
        {loading ? (
          <p style={{ color: "var(--lt)" }}>Loading…</p>
        ) : !product ? (
          <p>Product not found.</p>
        ) : (
          <div className="pdp-grid">
            <div className="pdp-img">
              <img src={resolveProductImage(product.image_url, product.category)} alt={product.name} />
              <span className="pdp-badge">Handpicked in India</span>
            </div>
            <div className="pdp-info">
              <span className="pdp-cat">{product.category || "IZU Heritage"}</span>
              <h1 className="pdp-name">{product.name}</h1>
              <div className="pdp-price">
                {formatPrice(product.price_cents)}
                <small>Tax included · Complimentary shipping over €150</small>
              </div>
              <p className="pdp-desc">{product.description || "A signature IZU piece — designed in Paros, hand-finished in India. Made for the women who travel light and live well."}</p>

              <div className="pdp-block">
                <div className="pdp-block-title">The Fit · On the Model</div>
                <p className="pdp-fit">"Model is wearing Size S. Height: 175cm · Weight: 58kg. Fits true to size with a relaxed Mediterranean drape."</p>
              </div>

              <div className="pdp-block">
                <div className="pdp-block-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Choose your size</span>
                  <button className="pdp-link-btn" onClick={() => setShowSizeModal(true)}>Size Chart</button>
                </div>
                <div className="pdp-sizes">
                  {SIZES.map((s) => (
                    <button key={s} className={`pdp-size ${size === s ? "is-active" : ""}`} onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="pdp-cta-row">
                <div className="pdp-qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
                </div>
                <button className="btn-brand pdp-add" onClick={addToCart} disabled={adding}>
                  {adding ? "Adding…" : "Add to Cart"}
                </button>
              </div>

              {msg && <p className="pdp-msg">{msg}</p>}

              <div className="pdp-trust">
                <div>Made in small batches</div>
                <div>Free returns in EU</div>
                <div>Atelier finished</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {showSizeModal && (
        <div className="pdp-modal-bg" onClick={() => setShowSizeModal(false)}>
          <div className="pdp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pdp-modal-close" onClick={() => setShowSizeModal(false)} aria-label="Close">×</button>
            <h3>Size Chart · IZU Measurements</h3>
            <p style={{ color: "var(--mid)", fontSize: ".88rem", margin: "0 0 1rem", lineHeight: 1.7 }}>
              All measurements in centimetres. IZU pieces fit with a relaxed Mediterranean drape — when between sizes, size down for a defined silhouette or up for ease.
            </p>
            <table className="pdp-table">
              <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr></thead>
              <tbody>
                <tr><td>XS</td><td>82</td><td>62</td><td>88</td></tr>
                <tr><td>S</td><td>86</td><td>66</td><td>92</td></tr>
                <tr><td>M</td><td>90</td><td>70</td><td>96</td></tr>
                <tr><td>L</td><td>96</td><td>76</td><td>102</td></tr>
                <tr><td>XL</td><td>102</td><td>82</td><td>108</td></tr>
              </tbody>
            </table>
            <p style={{ color: "var(--lt)", fontSize: ".75rem", marginTop: "1rem", letterSpacing: ".05em" }}>
              Need help? Email us at care@izuparos.com — we reply within 24 hours.
            </p>
          </div>
        </div>
      )}
    </IzuLayout>
  );
}
