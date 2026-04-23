import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout, formatPrice } from "@/components/IzuLayout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — IZU Paros" },
      { name: "description", content: "Shop dresses, kimonos and accessories — born in Paros, worn everywhere." },
      { property: "og:title", content: "Shop — IZU Paros" },
      { property: "og:description", content: "Shop dresses, kimonos and accessories — born in Paros, worn everywhere." },
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
};

function ShopPage() {
  const { category } = Route.useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = supabase.from("products").select("id,slug,name,price_cents,image_url,category").order("created_at");
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
        <p>Linen, silk and quiet detail — pieces made to be lived in.</p>
      </section>
      <section className="page-section">
        {loading ? (
          <p style={{ color: "var(--lt)" }}>Loading…</p>
        ) : (
          <div className="shop-grid">
            {products.map((p) => (
              <a key={p.id} href={`/product/${p.slug}`} className="p-card">
                <div className="p-img">{p.image_url && <img src={p.image_url} alt={p.name} />}</div>
                <h3 className="p-name">{p.name}</h3>
                <div className="p-price">{formatPrice(p.price_cents)}</div>
              </a>
            ))}
            {products.length === 0 && <p style={{ color: "var(--lt)" }}>No products found.</p>}
          </div>
        )}
      </section>
    </IzuLayout>
  );
}
