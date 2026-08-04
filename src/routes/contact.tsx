import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/lib/content";
import { submitContactMessage } from "@/lib/forms.functions";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions — Hey Foodies" },
      {
        name: "description",
        content:
          "Call Hey Foodies, message us on WhatsApp, check opening hours or get directions to the restaurant.",
      },
      { property: "og:title", content: "Contact & Directions — Hey Foodies" },
      { property: "og:description", content: "Phone, WhatsApp, hours and directions for Hey Foodies." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { business } = useContent();
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Call, message or just walk in."
        intro="Contact details below are placeholders until the restaurant confirms them."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-px overflow-hidden rounded-xl bg-border">
            {[
              { icon: Phone, label: "Phone", value: business.phone, href: business.phoneHref },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: business.whatsapp,
                href: business.whatsappHref,
              },
              { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
              {
                icon: MapPin,
                label: "Address",
                value: business.addressLines.join(", "),
                href: business.mapsHref,
              },
            ].map((row) => (
              <a
                key={row.label}
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 bg-card px-5 py-6 transition-colors hover:bg-accent"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand/20 text-brand-deep">
                  <row.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block text-muted-foreground">{row.label}</span>
                  <span className="mt-1 block font-display text-lg font-extrabold text-charcoal-deep">
                    {row.value}
                  </span>
                </span>
              </a>
            ))}
            <a
              href={business.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-charcoal-deep px-5 py-6 font-extrabold text-cream transition-colors hover:bg-charcoal"
            >
              <Navigation className="h-4 w-4 text-brand" aria-hidden /> Get directions
            </a>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <p className="flex items-center gap-2 font-display text-xl font-extrabold text-charcoal-deep">
              <Clock className="h-5 w-5 text-brand-deep" aria-hidden /> Opening hours
            </p>
            <ul className="mt-6 divide-y divide-border">
              {business.hours.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between py-3 text-sm ${
                    i === todayIndex ? "font-extrabold text-charcoal-deep" : "text-muted-foreground"
                  }`}
                >
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="shell mt-12">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

const field =
  "mt-2 h-12 w-full rounded-md border border-border bg-card px-4 text-sm text-charcoal-deep outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand";
const label = "eyebrow text-muted-foreground";

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      await submitContactMessage({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          message: String(data.get("message") ?? ""),
        },
      });
      setSent(true);
      form.reset();
      toast.success("Message sent — we'll get back to you.");
    } catch {
      toast.error("Could not send your message. Please call us instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <p className="font-display text-xl font-extrabold text-charcoal-deep">Send us a message</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="cname">
            Name
          </label>
          <input id="cname" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="cemail">
            Email
          </label>
          <input id="cemail" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="cphone">
            Phone
          </label>
          <input id="cphone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
      </div>
      <div className="mt-5">
        <label className={label} htmlFor="cmessage">
          Message
        </label>
        <textarea id="cmessage" name="message" rows={4} required className={`${field} h-auto py-3`} />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex h-12 items-center rounded-md bg-brand px-7 text-sm font-extrabold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {sent ? "Thanks — your message reached the restaurant." : ""}
      </p>
    </form>
  );
}

