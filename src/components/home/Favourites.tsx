import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import pizzaPhoto from "@/assets/hf-pizza.png.asset.json";
import fries from "@/assets/fries.png";
import wrap from "@/assets/wrap.png";
import shakePhoto from "@/assets/hf-shake-2.png.asset.json";

const picks = [
  { img: pizzaPhoto.url, name: "Cheese Burst Pizza", cat: "Pizza", to: "/menu", photo: true },
  { img: fries, name: "Loaded Cheese Fries", cat: "Sides", to: "/menu", photo: false },
  { img: wrap, name: "Paneer Makhni Wrap", cat: "Wraps", to: "/menu", photo: false },
  { img: shakePhoto.url, name: "Chocolate Thick Shake", cat: "Shakes", to: "/menu", photo: false },
];


export function Favourites() {
  return (
    <section className="bg-charcoal py-16 text-cream sm:py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-lg">
            <p className="eyebrow text-brand">What people order</p>
            <h2 className="mt-4 display-lg text-cream">The ones that keep selling out.</h2>
          </div>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 text-sm font-extrabold text-brand"
          >
            See the full menu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
          {picks.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 70} className={i % 2 === 1 ? "lg:mt-10" : ""}>
              <Link to={p.to} className="tap-card group block">
                <div className="relative aspect-square">
                  <div className="absolute inset-x-3 bottom-0 top-10 rounded-t-full bg-cream/5 transition-colors group-hover:bg-brand/20" />
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={`relative h-full w-full transition-transform duration-500 group-hover:-translate-y-3 ${
                      p.photo ? "rounded-t-full object-cover" : "object-contain"
                    }`}
                  />

                </div>
                <p className="eyebrow mt-5 text-brand">{p.cat}</p>
                <p className="mt-2 font-display text-lg font-extrabold text-cream sm:text-xl">{p.name}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
