import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout, formatPrice } from "@/components/IzuLayout";

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

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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
      await supabase.from("cart_items").update({ quantity: existing.quantity + 1 }).eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({ user_id: userData.user.id, product_id: product.id, quantity: 1 });
    }
    setAdding(false);
    setMsg("Added to cart");
  }

  return (
    <IzuLayout>
      <section className="page-section" style={{ paddingTop: "3rem" }}>
        {loading ? (
          <p style={{ color: "var(--lt)" }}>Loading…</p>
        ) : !product ? (
          <p>Product not found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", maxWidth: 1200, margin: "0 auto" }}>
            <div className="p-img" style={{ aspectRatio: "3/4" }}>
              {product.image_url && <img src={product.image_url} alt={product.name} />}
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: ".64rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--lt)" }}>
                {product.category}
              </span>
              <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,4vw,3.2rem)", fontStyle: "italic", fontWeight: 300, margin: ".6rem 0 1rem" }}>
                {product.name}
              </h1>
              <div style={{ fontSize: "1rem", color: "var(--mid)", marginBottom: "1.5rem" }}>{formatPrice(product.price_cents)}</div>
              <p style={{ color: "var(--mid)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: 420 }}>{product.description}</p>
              <button className="btn-brand" onClick={addToCart} disabled={adding} style={{ alignSelf: "flex-start" }}>
                {adding ? "Adding…" : "Add to Cart"}
              </button>
              {msg && <p style={{ marginTop: "1rem", color: "var(--brand)", fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase" }}>{msg}</p>}
            </div>
          </div>
        )}
      </section>
      <style dangerouslySetInnerHTML={{ __html: `@media(max-width:900px){.page-section > div{grid-template-columns:1fr !important}}` }} />
    </IzuLayout>
  );
}
