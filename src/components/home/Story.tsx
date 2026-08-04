import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import interior from "@/assets/Screenshot_2026-08-01_001017.png.asset.json";

export function Story() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-brand/25" />
          <img
            src={interior.url}
            alt="The Hey Foodies dining room with wooden chairs and illuminated wall panels"
            loading="lazy"
            width={960}
            height={1200}
            className="relative w-full rounded-xl object-cover shadow-lift"
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-xl bg-charcoal px-6 py-5 text-cream shadow-food sm:block">
            <p className="eyebrow text-brand">Inside</p>
            <p className="mt-1 max-w-[12rem] font-display text-lg font-extrabold leading-tight">
              Warm lights, bright seats, zero fuss.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-brand-deep">Who we are</p>
          <h2 className="mt-4 display-lg text-charcoal-deep">
            A neighbourhood kitchen with a loud appetite.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            Hey Foodies is built around simple things done properly — dough that gets time to
            rise, patties cooked to order, sauces mixed in-house and a room that is comfortable
            enough to stay in long after the plates are cleared.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            Come for a quick roll between classes or take the big table with everyone you know.
            Both work here.
          </p>
          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-charcoal-deep"
          >
            More about us
            <ArrowRight className="h-4 w-4 text-brand-deep transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
