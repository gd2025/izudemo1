import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IzuLayout } from "@/components/IzuLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — IZU Paros" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <IzuLayout>
      <section className="page-hero">
        <span className="label">Get in touch</span>
        <h1>Contact</h1>
        <p>Questions about sizing, shipping or a custom piece — write to us and we'll reply within two days.</p>
      </section>
      <section className="page-section" style={{ maxWidth: 520, margin: "0 auto" }}>
        {sent ? (
          <p style={{ color: "var(--brand)", textAlign: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.4rem" }}>
            Thank you — we'll be in touch.
          </p>
        ) : (
          <form
            className="izu-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>Name</label>
            <input className="izu-input" required />
            <label>Email</label>
            <input className="izu-input" type="email" required />
            <label>Message</label>
            <textarea className="izu-input" rows={4} required />
            <button className="btn-brand" style={{ marginTop: "2rem" }}>Send</button>
          </form>
        )}
      </section>
    </IzuLayout>
  );
}
