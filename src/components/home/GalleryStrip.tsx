import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import shot1 from "@/assets/Screenshot_2026-08-01_001017.png.asset.json";
import shot2 from "@/assets/Screenshot_2026-08-01_001025.png.asset.json";
import shot3 from "@/assets/Screenshot_2026-08-01_002252.png.asset.json";
import shot4 from "@/assets/Screenshot_2026-08-01_002234.png.asset.json";

const spans = ["sm:col-span-2 sm:row-span-2", "", "", "sm:col-span-2"];

const fallbackShots = [
  { src: shot1.url, alt: "Long banquette seating with striped cushions and illuminated wall discs", span: spans[0] },
  { src: shot2.url, alt: "Dining tables with green and red chairs beneath wall quotes", span: spans[1] },
  { src: shot3.url, alt: "Backlit wall panel with circular mirrors and golden detailing", span: spans[2] },
  { src: shot4.url, alt: "Hey Foodies interior and food collage", span: spans[3] },
];

export function GalleryStrip() {
  const { gallery } = useContent();
  const shots = gallery.length
    ? gallery.slice(0, 4).map((g, i) => ({
        src: g.src,
        alt: g.caption || "Hey Foodies gallery photo",
        span: spans[i] ?? "",
      }))
    : fallbackShots;

  return (
    <section className="bg-charcoal-deep py-16 text-cream sm:py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-brand">The room</p>
            <h2 className="mt-4 display-lg text-cream">Come see it for yourself.</h2>
          </div>
          <Link to="/gallery" className="group inline-flex items-center gap-2 text-sm font-extrabold text-brand">
            Open gallery
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid auto-rows-[150px] gap-3 sm:mt-12 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-4">
          {shots.map((s, i) => (
            <Reveal as="figure" key={s.src} delay={i * 70} className={`overflow-hidden rounded-lg ${s.span}`}>
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
