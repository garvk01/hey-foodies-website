import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import heroBurger from "@/assets/veg-burger-hero.png.asset.json";
import { useContent } from "@/lib/content";

export function Hero() {
  const { business } = useContent();

  return (
    <section className="relative overflow-hidden bg-charcoal-deep pt-24 pb-20 sm:pb-24 text-cream sm:pt-32 lg:pb-32">
      <div className="pointer-events-none absolute -right-24 top-24 hidden h-[34rem] w-[34rem] dashed-ring lg:block" />
      <div className="pointer-events-none absolute right-6 top-10 h-3 w-3 rounded-full bg-brand" />
      <div className="pointer-events-none absolute left-[46%] bottom-24 h-2 w-2 rounded-full bg-cream/50" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 enter-rise">
          <p className="eyebrow text-brand">Pizza · Burgers · Wraps</p>
          <h1 className="mt-5 display-xl text-cream">
            Big flavour.
            <br />
            Made for
            <span className="relative ml-3 inline-block text-brand">
              foodies.
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 8c30-6 60 4 92-1s60-6 104 2"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base sm:mt-8 leading-relaxed text-cream/65">
            Hot pizza, stacked burgers and rolls made fresh through the day — served in a
            bright, colourful dining room built for hanging out.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/menu"
              className="tap group inline-flex h-12 items-center gap-2 rounded-md bg-brand px-6 text-sm font-extrabold text-brand-foreground hover:-translate-y-0.5"
            >
              Explore Menu
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <a
              href={business.phoneHref}
              className="tap inline-flex h-12 items-center gap-2 rounded-md border border-cream/25 px-6 text-sm font-bold text-cream hover:bg-cream/10"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {business.phone}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/10 pt-6 text-sm">
            <div>
              <p className="eyebrow text-cream/40">Dine in</p>
              <p className="mt-1 font-semibold text-cream">Full colourful dining room</p>
            </div>
            <div>
              <p className="eyebrow text-cream/40">Takeaway</p>
              <p className="mt-1 font-semibold text-cream">Call ahead & collect</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="enter-pop relative mx-auto aspect-square w-full max-w-[34rem]">
            <div className="absolute inset-0 rounded-full bg-brand" />
            <div className="absolute -inset-4 rounded-full border border-brand/25" />
            <img
              src={heroBurger.url}
              alt="Veg burger from Hey Foodies"
              width={1200}
              height={1200}
              className="relative z-10 h-full w-full rounded-full object-cover drop-shadow-[0_28px_36px_rgba(0,0,0,0.35)]"
            />



          </div>
          <div className="absolute -left-2 top-6 h-4 w-4 rounded-full bg-brand-deep" />
          <svg
            className="absolute -right-2 bottom-8 h-10 w-20 text-brand"
            viewBox="0 0 80 40"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 30c10-16 20 12 30-4s20 12 32-8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
