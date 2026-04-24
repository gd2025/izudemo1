import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout, MOODS, MOOD_IMAGES, MOOD_DESCRIPTIONS, formatPrice } from "@/components/IzuLayout";
import { resolveProductImage } from "@/lib/product-images";

export const Route = createFileRoute("/moods/$slug")({
  component: MoodCollectionPage,
});

type Product = {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
  image_url: string | null;
  category: string | null;
  fabric: string | null;
};

const css = `
.mc-hero{position:relative;height:54vh;min-height:380px;overflow:hidden;background:var(--dk)}
.mc-hero img{width:100%;height:100%;object-fit:cover;object-position:center 40%}
.mc-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(36,24,16,.2) 0%,rgba(36,24,16,.65) 100%)}
.mc-hero-text{position:absolute;left:0;right:0;bottom:2.4rem;text-align:center;color:var(--white);z-index:2;padding:0 1.4rem}
.mc-hero-text small{font-size:.58rem;letter-spacing:.34em;text-transform:uppercase;color:rgba(253,250,246,.75);display:block;margin-bottom:1rem}
.mc-hero-text h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.4rem,5vw,4rem);line-height:1.05;margin:0 0 .8rem}
.mc-hero-text p{font-size:.9rem;color:rgba(253,250,246,.85);max-width:540px;margin:0 auto;line-height:1.7;font-weight:300}
.mc-back{display:inline-block;font-size:.58rem;letter-spacing:.26em;text-transform:uppercase;color:var(--brand);padding:1.4rem 0 0;margin-left:5%}
.mc-section{padding:3rem 5% 5rem;max-width:1480px;margin:0 auto}
.mc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.8rem}
.mc-empty{text-align:center;padding:4rem 1rem;color:var(--lt);font-family:var(--serif);font-style:italic;font-size:1.1rem}
@media(max-width:1100px){.mc-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){.mc-grid{grid-template-columns:repeat(2,1fr);gap:1rem}}
`;

function MoodCollectionPage() {
  const { slug } = Route.useParams();
  const decoded = decodeURIComponent(slug);
  const mood = MOODS.find((m) => m.slug === decoded);
  const heroImg = MOOD_IMAGES[decoded] ?? MOOD_IMAGES["Sea & Salt"];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("products")
      .select("id,slug,name,price_cents,image_url,category,fabric")
      .contains("moods", [decoded])
      .order("created_at")
      .then(({ data }) => {
        setProducts((data ?? []) as Product[]);
        setLoading(false);
      });
  }, [decoded]);

  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="mc-hero">
        <img src={heroImg} alt={mood?.label ?? decoded} />
        <div className="mc-hero-text">
          <small>Mood Collection</small>
          <h1>{mood?.label ?? decoded}</h1>
          <p>{MOOD_DESCRIPTIONS[decoded] ?? mood?.caption ?? "An edit of IZU pieces for this moment."}</p>
        </div>
      </section>

      <Link to="/moods" className="mc-back">← All Moods</Link>

      <section className="mc-section">
        {loading ? (
          <p style={{ color: "var(--lt)" }}>Loading…</p>
        ) : products.length === 0 ? (
          <p className="mc-empty">No pieces in this mood yet — check back soon.</p>
        ) : (
          <div className="mc-grid shop-grid">
            {products.map((p) => (
              <a key={p.id} href={`/product/${p.slug}`} className="p-card">
                <div className="p-img">
                  <img src={resolveProductImage(p.image_url, p.category)} alt={p.name} loading="lazy" />
                </div>
                <h3 className="p-name">{p.name}</h3>
                <div className="p-price">{formatPrice(p.price_cents)}</div>
              </a>
            ))}
          </div>
        )}
      </section>
    </IzuLayout>
  );
}
