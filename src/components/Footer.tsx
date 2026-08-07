import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { useContent } from "@/lib/content";
import logo from "@/assets/logo.png";

export function Footer() {
  const { business } = useContent();

  return (
    <footer className="bg-charcoal-deep text-cream">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <img src={logo} alt="Hey Foodies" className="h-14 w-auto brightness-0 invert" width={220} height={56} />
          <p className="mt-3 max-w-xs text-sm text-cream/60">{business.tagline}</p>
          <div className="mt-6 flex gap-2">
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-md bg-cream/10 transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-md bg-cream/10 transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <Instagram className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={business.phoneHref}
              aria-label="Call us"
              className="grid h-10 w-10 place-items-center rounded-md bg-cream/10 transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-brand">Explore</p>
          <nav className="mt-4 grid gap-2 text-sm">
            {[
              { to: "/menu", label: "Menu" },
              { to: "/gallery", label: "Gallery" },
              { to: "/about", label: "About" },
              { to: "/reservations", label: "Reservations" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="w-fit text-cream/70 transition-colors hover:text-brand">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="eyebrow text-brand">Find us</p>
          <address className="mt-4 not-italic text-sm text-cream/70">
            {business.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={business.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
          >
            <MapPin className="h-4 w-4" aria-hidden /> Get directions
          </a>
          <p className="mt-4 text-sm text-cream/70">{business.phone}</p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hey Foodies. All rights reserved.</p>
          <p>Good food. Good mood.</p>
        </div>
      </div>
    </footer>
  );
}
