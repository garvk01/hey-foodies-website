import { Clock, MapPin, Navigation } from "lucide-react";
import { useContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Location() {
  const { business } = useContent();
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-28">
      <div className="shell grid gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="eyebrow text-brand-deep">Find us</p>
          <h2 className="mt-4 display-lg text-charcoal-deep">Drop by, we're close.</h2>
          <address className="mt-8 flex gap-3 not-italic text-lg leading-relaxed text-charcoal">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-deep" aria-hidden />
            <span>
              {business.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </span>
          </address>
          <a
            href={business.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="tap mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-charcoal-deep px-6 text-sm font-extrabold text-cream hover:-translate-y-0.5"
          >
            <Navigation className="h-4 w-4" aria-hidden /> Get directions
          </a>
        </Reveal>

        <Reveal delay={90} className="rounded-xl border border-border bg-card p-6 sm:p-8">
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
          <p className="mt-4 text-xs text-muted-foreground">Hours to be confirmed by the restaurant.</p>
        </Reveal>
      </div>
    </section>
  );
}
