import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useContent } from "@/lib/content";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { business } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell pt-3 sm:pt-5">
        <div
          className={`flex items-center gap-3 rounded-xl border border-transparent bg-cream px-3 py-2 transition-all duration-300 sm:px-5 ${
            scrolled ? "shadow-lift" : "shadow-none"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 pr-2" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-md bg-charcoal font-display text-lg font-extrabold text-brand">
              H
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-charcoal-deep">
              Hey Foodies
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-charcoal-deep after:scale-x-100" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-charcoal-deep" }}
                className="relative px-3 py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-3">
            <a
              href={business.phoneHref}
              aria-label={`Call ${business.name}`}
              className="hidden h-10 w-10 place-items-center rounded-md border border-border text-charcoal transition-colors hover:bg-secondary sm:grid"
            >
              <Phone className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={business.orderHref}
              className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Order Now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-md border border-border text-charcoal lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-xl bg-cream p-3 shadow-lift lg:hidden">
            <nav className="grid">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-brand-deep" }}
                  className="rounded-md px-3 py-3 text-base font-semibold text-charcoal hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={business.phoneHref}
                className="rounded-md border border-border px-3 py-3 text-center text-sm font-bold text-charcoal"
              >
                Call
              </a>
              <a
                href={business.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-3 py-3 text-center text-sm font-bold text-charcoal"
              >
                Directions
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
