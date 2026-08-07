import { MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import spread from "@/assets/pasta-photo.png.asset.json";
import { useContent } from "@/lib/content";

export function Offers() {
  const { business, offers } = useContent();

  return (
    <section id="order" className="relative overflow-hidden bg-brand py-16 sm:py-20 text-brand-foreground lg:py-24">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-deep/25" />
      <div className="shell relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Running now</p>
          <h2 className="mt-4 display-lg">Offers worth the trip.</h2>
          <ul className="mt-8 grid gap-4">
            {offers.map((o) => (
              <li key={o.title} className="tap-card rounded-lg bg-charcoal-deep/90 p-5 text-cream">
                <p className="font-display text-xl font-extrabold">{o.title}</p>
                <p className="mt-1 text-sm text-cream/70">{o.detail}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-brand">{o.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={business.phoneHref}
              className="tap inline-flex h-12 items-center gap-2 rounded-md bg-charcoal-deep px-6 text-sm font-extrabold text-cream hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" aria-hidden /> Call to order
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="tap inline-flex h-12 items-center gap-2 rounded-md border border-charcoal-deep/40 px-6 text-sm font-bold hover:bg-brand-deep/20"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
            </a>
          </div>
        </div>

        <Reveal>
          <img
            src={spread.url}
          alt="Creamy white sauce pasta served at Hey Foodies"
          loading="lazy"
          width={1600}
          height={1000}
          className="w-full rounded-xl object-cover shadow-food"
          />
        </Reveal>
      </div>
    </section>
  );
}
