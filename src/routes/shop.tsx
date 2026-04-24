import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout, formatPrice } from "@/components/IzuLayout";
import { resolveProductImage, CATEGORIES } from "@/lib/product-images";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — IZU Paros" },
      { name: "description", content: "Shop dresses, kimonos, scarfs and accessories — born in Paros, worn everywhere." },
      { property: "og:title", content: "Shop — IZU Paros" },
      { property: "og:description", content: "Shop dresses, kimonos, scarfs and accessories — born in Paros, worn everywhere." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  component: ShopPage,
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

function chipStyle(active: boolean): CSSProperties {
  return {
    padding: ".55rem 1.1rem",
    border: ".5px solid var(--clay)",
    borderRadius: 999,
    fontSize: ".6rem",
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: active ? "var(--white)" : "var(--dk)",
    background: active ? "var(--brand)" : "var(--white)",
    borderColor: active ? "var(--brand)" : "var(--clay)",
    fontWeight: 400,
  };
}

function ShopPage() {
  const { category } = Route.useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let q = supabase.from("products").select("id,slug,name,price_cents,image_url,category,fabric").order("created_at");
    if (category) q = q.eq("category", category);
    q.then(({ data }) => {
      setProducts((data ?? []) as Product[]);
      setLoading(false);
    });
  }, [category]);

  return (
    <IzuLayout>
      <section className="page-hero">
        <span className="label">Collection</span>
        <h1>{category ?? "Shop All"}</h1>
        <p>Silk, cotton, viscose and rayon — pieces made to be lived in.</p>
      </section>

      <div style={{ padding: "0 5% 1.6rem", display: "flex", gap: ".5rem", flexWrap: "wrap", borderBottom: ".5px solid var(--parch)" }}>
        <a href="/shop" style={chipStyle(!category)}>All</a>
        {CATEGORIES.map((c) => (
          <a key={c} href={`/shop?category=${encodeURIComponent(c)}`} style={chipStyle(category === c)}>{c}</a>
        ))}
      </div>

      <section className="page-section">
        {loading ? (
          <p style={{ color: "var(--lt)" }}>Loading…</p>
        ) : (
          <div className="shop-grid">
            {products.map((p) => (
              <a key={p.id} href={`/product/${p.slug}`} className="p-card">
                <div className="p-img">
                  <img src={resolveProductImage(p.image_url, p.category)} alt={p.name} loading="lazy" />
                </div>
                <h3 className="p-name">{p.name}</h3>
                <div className="p-price">
                  {formatPrice(p.price_cents)}
                  {p.fabric && <span style={{ marginLeft: ".5rem", color: "var(--lt)", fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase" }}>· {p.fabric}</span>}
                </div>
              </a>
            ))}
            {products.length === 0 && <p style={{ color: "var(--lt)" }}>No products found.</p>}
          </div>
        )}
      </section>
    </IzuLayout>
  );
}
