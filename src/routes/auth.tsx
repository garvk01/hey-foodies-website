import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — Hey Foodies" },
      {
        name: "description",
        content: "Sign in to the Hey Foodies admin dashboard to manage the menu, hours, offers and bookings.",
      },
      { property: "og:title", content: "Staff Sign In — Hey Foodies" },
      { property: "og:description", content: "Restaurant staff access to the Hey Foodies dashboard." },
    ],
  }),
  component: AuthPage,
});

const field =
  "mt-2 h-12 w-full rounded-md border border-border bg-card px-4 text-sm text-charcoal-deep outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand";
const label = "eyebrow text-muted-foreground";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      // Email confirmation is disabled — sign the new account straight in.
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (signInError) {
        toast.error(signInError.message);
        return;
      }
      navigate({ to: "/admin", replace: true });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  return (
    <>
      <PageHero
        eyebrow="Staff area"
        title="Sign in to manage the site."
        intro="Menu, hours, offers, bookings and messages all live behind this door."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="shell max-w-md">
          <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <div>
              <label className={label} htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div className="mt-5">
              <label className={label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className={field}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-md bg-brand px-7 text-sm font-extrabold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="mt-4 w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
            </button>

          </form>
        </div>
      </section>
    </>
  );
}
