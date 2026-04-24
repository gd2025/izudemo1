import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns Policy — IZU Paros" },
      { name: "description", content: "How to return or exchange an IZU piece. Effortless returns within 30 days." },
      { property: "og:title", content: "Returns Policy — IZU Paros" },
      { property: "og:description", content: "Effortless returns within 30 days." },
    ],
  }),
  component: ReturnsPage,
});

const css = `
.policy{max-width:760px;margin:0 auto;padding:5rem 1.6rem 6rem;color:var(--mid)}
.policy small{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);font-family:var(--sans);display:block;margin-bottom:1.2rem}
.policy h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.2rem,4.6vw,3.6rem);line-height:1.04;color:var(--dk);margin:0 0 2rem}
.policy h2{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.4rem;color:var(--dk);margin:2.6rem 0 1rem}
.policy p,.policy li{font-size:1rem;line-height:1.95;color:var(--mid);margin:0 0 1rem;font-family:var(--serif);font-weight:300}
.policy ul{padding-left:1.2rem;margin:0 0 1.4rem}
`;

function ReturnsPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <article className="policy">
        <small>Customer Care · Returns</small>
        <h1>Returns & Exchanges.</h1>
        <p>You have <strong>30 days</strong> from the day your IZU order arrives to return or exchange any unworn piece.</p>

        <h2>How To Return</h2>
        <ul>
          <li>Email us at <strong>care@izuparos.com</strong> with your order number.</li>
          <li>We will reply within 24 hours with a return label and instructions.</li>
          <li>Drop the parcel at any post office. Refunds are processed within 5 working days of receipt.</li>
        </ul>

        <h2>What We Accept</h2>
        <p>Pieces in original condition, unworn, with all tags attached. Items must be in their original packaging where applicable.</p>

        <h2>What We Cannot Accept</h2>
        <ul>
          <li>Pieces marked Final Sale</li>
          <li>Earrings and pierced jewelry, for hygiene</li>
          <li>Pieces showing wear, perfume, or makeup marks</li>
        </ul>

        <h2>Exchanges</h2>
        <p>To exchange a size or colour, simply request "Exchange" rather than "Return" in your email — we will hold the new piece for you while the original is in transit.</p>

        <h2>EU Customers</h2>
        <p>Returns from within the EU are <strong>free</strong>. Outside the EU, the return shipping is at the customer's expense.</p>
      </article>
    </IzuLayout>
  );
}
