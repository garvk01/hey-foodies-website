import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/lib/content";
import { submitReservation } from "@/lib/forms.functions";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Hey Foodies" },
      {
        name: "description",
        content:
          "Request a table at Hey Foodies. Send your date, time and party size and we'll confirm by phone or WhatsApp.",
      },
      { property: "og:title", content: "Reservations — Hey Foodies" },
      { property: "og:description", content: "Request a table at Hey Foodies in a few seconds." },
    ],
  }),
  component: ReservationsPage,
});

const field =
  "mt-2 h-12 w-full rounded-md border border-border bg-card px-4 text-sm text-charcoal-deep outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand";
const label = "eyebrow text-muted-foreground";

function ReservationsPage() {
  const { business } = useContent();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      await submitReservation({
        data: {
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          date: String(data.get("date") ?? ""),
          time: String(data.get("time") ?? ""),
          guests: Number(data.get("guests") ?? 2),
          notes: String(data.get("notes") ?? ""),
        },
      });
      setSent(true);
      form.reset();
      toast.success("Table request sent — we'll confirm shortly.");
    } catch {
      toast.error("Could not send your request. Please call us instead.");
    } finally {
      setSending(false);
    }
  }


  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Save a table before the rush."
        intro="Send us the details and we'll confirm your table by phone or WhatsApp."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  Name
                </label>
                <input id="name" name="name" required className={field} autoComplete="name" />
              </div>
              <div>
                <label className={label} htmlFor="phone">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" required className={field} autoComplete="tel" />
              </div>
              <div>
                <label className={label} htmlFor="date">
                  Date
                </label>
                <input id="date" name="date" type="date" required className={field} />
              </div>
              <div>
                <label className={label} htmlFor="time">
                  Time
                </label>
                <input id="time" name="time" type="time" required className={field} />
              </div>
              <div>
                <label className={label} htmlFor="guests">
                  Guests
                </label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={30}
                  defaultValue={2}
                  required
                  className={field}
                />
              </div>
            </div>
            <div className="mt-5">
              <label className={label} htmlFor="notes">
                Anything we should know?
              </label>
              <textarea id="notes" name="notes" rows={4} className={`${field} h-auto py-3`} />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-7 inline-flex h-12 items-center rounded-md bg-brand px-7 text-sm font-extrabold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send request"}
            </button>
            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {sent
                ? "Request received — we'll confirm your table shortly."
                : "We'll confirm your table by phone or WhatsApp."}
            </p>

          </form>

          <aside className="rounded-xl bg-charcoal-deep p-6 text-cream sm:p-8">
            <p className="eyebrow text-brand">Good to know</p>
            <ul className="mt-5 grid gap-4 text-sm text-cream/70">
              <li>Large groups are welcome — tell us the headcount and we'll arrange the table.</li>
              <li>Reservations are confirmed once we reply, not on submission.</li>
              <li>For same-day tables, calling is fastest.</li>
            </ul>
            <a
              href={business.phoneHref}
              className="mt-8 inline-flex h-12 items-center rounded-md bg-brand px-6 text-sm font-extrabold text-brand-foreground"
            >
              Call {business.phone}
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
