import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IzuLayout } from "@/components/IzuLayout";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — IZU Paros" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/",
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else window.location.href = redirect;
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setError(error.message);
      else window.location.href = redirect;
    }
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", search: {} });
    setUser(null);
  }

  return (
    <IzuLayout>
      <section className="page-section" style={{ maxWidth: 420, margin: "0 auto", padding: "5rem 1.5rem" }}>
        {user ? (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "2rem", fontWeight: 300, margin: "0 0 1rem" }}>Account</h1>
            <p style={{ color: "var(--mid)", marginBottom: "2rem" }}>Signed in as {user.email}</p>
            <button className="btn-outline" onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <>
            <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "2.4rem", fontWeight: 300, textAlign: "center", margin: "0 0 .5rem" }}>
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p style={{ textAlign: "center", color: "var(--lt)", fontSize: ".75rem", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "3rem" }}>
              IZU Paros
            </p>
            <form onSubmit={submit} className="izu-form">
              <label>Email</label>
              <input className="izu-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Password</label>
              <input className="izu-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p style={{ color: "var(--brand)", fontSize: ".75rem", marginTop: "1rem" }}>{error}</p>}
              <button className="btn-brand" style={{ marginTop: "2rem", width: "100%" }} disabled={loading}>
                {loading ? "…" : mode === "signin" ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: ".72rem", color: "var(--mid)" }}>
              {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, fontSize: ".72rem" }}
              >
                {mode === "signin" ? "Create account" : "Sign in"}
              </button>
            </p>
          </>
        )}
      </section>
    </IzuLayout>
  );
}
