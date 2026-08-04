import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import pizza from "@/assets/pizza.png";
import fries from "@/assets/fries.png";
import wrap from "@/assets/wrap.png";
import shake from "@/assets/shake.png";

const picks = [
  { img: pizza, name: "Cheese Burst Pizza", cat: "Pizza", to: "/menu" },
  { img: fries, name: "Loaded Cheese Fries", cat: "Sides", to: "/menu" },
  { img: wrap, name: "Chicken Shawarma Roll", cat: "Wraps", to: "/menu" },
  { img: shake, name: "Chocolate Thick Shake", cat: "Shakes", to: "/menu" },
];

export function Favourites() {
  return (
    <section className="bg-charcoal py-20 text-cream lg:py-28">
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

        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((p, i) => (
            <li key={p.name} className={i % 2 === 1 ? "lg:mt-10" : ""}>
              <Link to={p.to} className="group block">
                <div className="relative aspect-square">
                  <div className="absolute inset-x-3 bottom-0 top-10 rounded-t-full bg-cream/5 transition-colors group-hover:bg-brand/20" />
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="relative h-full w-full object-contain transition-transform duration-500 group-hover:-translate-y-3"
                  />
                </div>
                <p className="eyebrow mt-5 text-brand">{p.cat}</p>
                <p className="mt-2 font-display text-xl font-extrabold text-cream">{p.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
