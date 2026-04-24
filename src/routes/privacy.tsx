import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — IZU Paros" },
      { name: "description", content: "How IZU Paros collects, stores and uses your personal data." },
      { property: "og:title", content: "Privacy Policy — IZU Paros" },
      { property: "og:description", content: "How we look after your data." },
    ],
  }),
  component: PrivacyPage,
});

const css = `
.policy{max-width:760px;margin:0 auto;padding:5rem 1.6rem 6rem;color:var(--mid)}
.policy small{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);font-family:var(--sans);display:block;margin-bottom:1.2rem}
.policy h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.2rem,4.6vw,3.6rem);line-height:1.04;color:var(--dk);margin:0 0 2rem}
.policy h2{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.4rem;color:var(--dk);margin:2.6rem 0 1rem}
.policy p,.policy li{font-size:1rem;line-height:1.95;color:var(--mid);margin:0 0 1rem;font-family:var(--serif);font-weight:300}
.policy ul{padding-left:1.2rem;margin:0 0 1.4rem}
`;

function PrivacyPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <article className="policy">
        <small>Legal · Privacy Policy</small>
        <h1>Privacy Policy.</h1>
        <p>IZU Paros is a small family business. We collect only the data we need to send you your order and, if you have asked, our newsletter.</p>

        <h2>What We Collect</h2>
        <ul>
          <li>Your name, email and shipping address — to send your order</li>
          <li>Your order history — to help us assist you with returns or restocks</li>
          <li>Your email — only for our newsletter, and only if you explicitly subscribed</li>
        </ul>

        <h2>What We Don't Do</h2>
        <ul>
          <li>We do not sell your data to anyone, ever.</li>
          <li>We do not share your data with advertisers.</li>
          <li>We do not store your payment card details — these are handled securely by our payment processor.</li>
        </ul>

        <h2>Cookies</h2>
        <p>We use only the cookies necessary to keep your shopping cart working between visits and to understand which pages our customers find most useful. You can disable these in your browser at any time.</p>

        <h2>Your Rights</h2>
        <p>You can request a copy of your data, or ask us to delete everything we hold about you, at any time. Email <strong>privacy@izuparos.com</strong> and we will respond within 7 days.</p>

        <h2>Contact</h2>
        <p>IZU Paros · Market Street, Parikia, 84400 Paros, Greece</p>
      </article>
    </IzuLayout>
  );
}
