import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout, formatPrice } from "@/components/IzuLayout";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — IZU Paros" }] }),
  component: CartPage,
});

type Row = {
  id: string;
  quantity: number;
  product: { id: string; slug: string; name: string; price_cents: number; image_url: string | null } | null;
};

function CartPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [placing, setPlacing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    setAuthed(true);
    const { data } = await supabase
      .from("cart_items")
      .select("id,quantity,product:products(id,slug,name,price_cents,image_url)")
      .order("created_at");
    setRows((data ?? []) as unknown as Row[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      await supabase.from("cart_items").delete().eq("id", id);
    } else {
      await supabase.from("cart_items").update({ quantity: qty }).eq("id", id);
    }
    load();
  }

  async function checkout() {
    setPlacing(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) {
      navigate({ to: "/login", search: { redirect: "/cart" } });
      return;
    }
    const items = rows
      .filter((r) => r.product)
      .map((r) => ({ product_id: r.product!.id, name: r.product!.name, price_cents: r.product!.price_cents, quantity: r.quantity }));
    const total = items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
    await supabase.from("orders").insert({ user_id: u.user.id, total_cents: total, items, status: "pending" });
    await supabase.from("cart_items").delete().eq("user_id", u.user.id);
    setPlacing(false);
    alert("Order placed! (placeholder checkout)");
    load();
  }

  const total = rows.reduce((s, r) => s + (r.product?.price_cents ?? 0) * r.quantity, 0);

  return (
    <IzuLayout cartCount={rows.reduce((s, r) => s + r.quantity, 0)}>
      <section className="page-hero">
        <span className="label">Your Bag</span>
        <h1>Cart</h1>
      </section>
      <section className="page-section">
        {loading ? (
          <p style={{ color: "var(--lt)" }}>Loading…</p>
        ) : !authed ? (
          <div>
            <p style={{ color: "var(--mid)", marginBottom: "1.5rem" }}>Please sign in to see your cart.</p>
            <a href="/login" className="btn-brand">Sign In</a>
          </div>
        ) : rows.length === 0 ? (
          <div>
            <p style={{ color: "var(--mid)", marginBottom: "1.5rem" }}>Your cart is empty.</p>
            <a href="/shop" className="btn-outline">Continue Shopping</a>
          </div>
        ) : (
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            {rows.map((r) => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr auto auto", gap: "1.5rem", alignItems: "center", padding: "1.5rem 0", borderBottom: ".5px solid var(--parch)" }}>
                <div className="p-img" style={{ aspectRatio: "3/4", margin: 0 }}>
                  {r.product?.image_url && <img src={r.product.image_url} alt={r.product.name} />}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.1rem" }}>{r.product?.name}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--mid)", marginTop: ".3rem" }}>{r.product && formatPrice(r.product.price_cents)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <button onClick={() => updateQty(r.id, r.quantity - 1)} style={qtyBtn}>−</button>
                  <span style={{ minWidth: 24, textAlign: "center" }}>{r.quantity}</span>
                  <button onClick={() => updateQty(r.id, r.quantity + 1)} style={qtyBtn}>+</button>
                </div>
                <div style={{ minWidth: 80, textAlign: "right", color: "var(--dk)" }}>
                  {r.product && formatPrice(r.product.price_cents * r.quantity)}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.5rem" }}>
              <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.4rem" }}>
                Total <span style={{ color: "var(--brand)", marginLeft: "1rem" }}>{formatPrice(total)}</span>
              </div>
              <button className="btn-brand" onClick={checkout} disabled={placing}>{placing ? "Placing…" : "Checkout"}</button>
            </div>
          </div>
        )}
      </section>
    </IzuLayout>
  );
}

const qtyBtn: React.CSSProperties = {
  width: 28, height: 28, border: ".5px solid var(--clay)", background: "transparent", color: "var(--dk)", cursor: "pointer", fontSize: "1rem", lineHeight: 1,
};
