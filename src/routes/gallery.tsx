import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/lib/content";
import shot1 from "@/assets/Screenshot_2026-08-01_001017.png.asset.json";
import shot2 from "@/assets/Screenshot_2026-08-01_001025.png.asset.json";
import shot3 from "@/assets/Screenshot_2026-08-01_002252.png.asset.json";
import shot4 from "@/assets/Screenshot_2026-08-01_002234.png.asset.json";
import spread from "@/assets/spread.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Hey Foodies" },
      {
        name: "description",
        content: "Photos of the Hey Foodies dining room, the counter and the food we serve.",
      },
      { property: "og:title", content: "Gallery — Hey Foodies" },
      { property: "og:description", content: "Inside Hey Foodies: the room, the lights, the food." },
    ],
  }),
  component: GalleryPage,
});

const fallbackImages = [
  { src: shot1.url, alt: "Banquette seating with striped cushions and illuminated wall discs", tall: true },
  { src: shot2.url, alt: "Wooden tables with green and red chairs beneath framed wall quotes" },
  { src: shot3.url, alt: "Backlit wall panel with circular mirrors and golden geometric detail" },
  { src: spread, alt: "Burgers, pizza and fries laid out on a dark table", tall: true },
  { src: shot4.url, alt: "Collage of the Hey Foodies interior, menu board and food" },
];

function GalleryPage() {
  const { gallery } = useContent();
  const images = gallery.length
    ? gallery.map((g) => ({ src: g.src, alt: g.caption || "Hey Foodies gallery photo", tall: g.tall }))
    : fallbackImages;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Warm lights, bright seats, full plates."
        intro="A look inside the restaurant and at what comes out of the kitchen."
      />
      <section className="bg-cream py-16 lg:py-24">
        <div className="shell columns-1 gap-5 sm:columns-2 lg:columns-3">
          {images.map((img) => (
            <figure key={img.src} className="mb-5 break-inside-avoid overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
