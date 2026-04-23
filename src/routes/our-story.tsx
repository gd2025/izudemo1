import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — IZU Paros" },
      { name: "description", content: "Born in Paros. Hand-finished pieces inspired by the Aegean light." },
    ],
  }),
  component: () => (
    <IzuLayout>
      <section className="page-hero">
        <span className="label">Our Story</span>
        <h1>Born in Paros.</h1>
        <p>IZU is a small studio on a small island, making linen, silk and quiet detail for women who travel light and live well.</p>
      </section>
      <section className="page-section" style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ color: "var(--mid)", marginBottom: "1.4rem" }}>
          Every piece is hand-finished in our atelier overlooking the Aegean. We work with natural fabrics, slow processes and a small circle of craftspeople who care about where things come from.
        </p>
        <p style={{ color: "var(--mid)" }}>
          Born in Paros. Worn everywhere.
        </p>
      </section>
    </IzuLayout>
  ),
});
