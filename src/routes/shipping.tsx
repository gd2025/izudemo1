import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Information — IZU Paros" },
      { name: "description", content: "Shipping rates, timelines, and information for IZU Paros worldwide deliveries." },
      { property: "og:title", content: "Shipping Information — IZU Paros" },
      { property: "og:description", content: "Worldwide shipping from Paros, Greece." },
    ],
  }),
  component: ShippingPage,
});

const css = `
.policy{max-width:760px;margin:0 auto;padding:5rem 1.6rem 6rem;color:var(--mid);font-family:var(--serif);font-weight:300}
.policy small{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);font-family:var(--sans);display:block;margin-bottom:1.2rem}
.policy h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.2rem,4.6vw,3.6rem);line-height:1.04;color:var(--dk);margin:0 0 2rem}
.policy h2{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.4rem;color:var(--dk);margin:2.6rem 0 1rem}
.policy p,.policy li{font-size:1rem;line-height:1.95;color:var(--mid);margin:0 0 1rem}
.policy ul{padding-left:1.2rem;margin:0 0 1.4rem}
.policy table{width:100%;border-collapse:collapse;margin:1rem 0;font-family:var(--sans);font-size:.88rem}
.policy th,.policy td{padding:.85rem .6rem;text-align:left;border-bottom:.5px solid var(--parch);color:var(--mid)}
.policy th{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--lt);font-weight:400}
`;

function ShippingPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <article className="policy">
        <small>Customer Care · Shipping</small>
        <h1>Shipping Information.</h1>
        <p>Every IZU order ships from our boutique in Parikia, Paros — wrapped by hand in our signature paper. We ship worldwide.</p>

        <h2>Rates & Timelines</h2>
        <table>
          <thead><tr><th>Destination</th><th>Cost</th><th>Delivery</th></tr></thead>
          <tbody>
            <tr><td>Greece</td><td>Free over €150 · €8 below</td><td>2–3 working days</td></tr>
            <tr><td>European Union</td><td>€18 flat · Free over €350</td><td>4–7 working days</td></tr>
            <tr><td>UK / Switzerland</td><td>€28 · Duties at checkout</td><td>5–9 working days</td></tr>
            <tr><td>Rest of World</td><td>€45 · Duties on receipt</td><td>7–14 working days</td></tr>
          </tbody>
        </table>

        <h2>Order Processing</h2>
        <p>Orders placed before 13:00 EET ship the same day. Orders after 13:00, or on Sundays, ship the next working day.</p>

        <h2>Tracking</h2>
        <p>You will receive a tracking link by email as soon as your parcel is collected. If you do not receive it within 48 hours, please write to us at <strong>care@izuparos.com</strong>.</p>

        <h2>Boutique Pickup</h2>
        <p>If you are visiting Paros, you can place your order online and pick it up at either of our boutiques in Parikia or Naoussa — at no extra cost.</p>
      </article>
    </IzuLayout>
  );
}
