import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import interior from "@/assets/Screenshot_2026-08-01_001025.png.asset.json";
import wrap from "@/assets/wrap.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hey Foodies" },
      {
        name: "description",
        content:
          "Hey Foodies is a neighbourhood kitchen serving pizza, burgers and rolls in a bright, colourful dining room.",
      },
      { property: "og:title", content: "About — Hey Foodies" },
      {
        property: "og:description",
        content: "A neighbourhood kitchen with a loud appetite — this is Hey Foodies.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Food we'd want to eat, in a room we'd want to sit in."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-charcoal">
              Hey Foodies started with a short list of things worth getting right: dough with
              time to prove, patties cooked to order, sauces mixed in our own kitchen and a
              welcome that doesn't rush anyone out the door.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              The dining room borrows its character from the food — warm pendant light, wood
              tables, panels of green, yellow and red seating, and a wall of quotes for the
              people who take eating seriously.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Whether it's a roll on the way home or the big table on a Saturday night, the
              kitchen runs the same way: fresh, fast and generous.
            </p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3">
              {[
                { k: "Kitchen", v: "Pizza, burgers, rolls, sides" },
                { k: "Seating", v: "Dine-in dining room" },
                { k: "Service", v: "Dine in & takeaway" },
              ].map((s) => (
                <div key={s.k} className="bg-card p-5">
                  <dt className="eyebrow text-brand-deep">{s.k}</dt>
                  <dd className="mt-2 font-display text-lg font-extrabold text-charcoal-deep">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={interior.url}
              alt="Hey Foodies dining area with wall quotes and colourful chairs"
              loading="lazy"
              className="w-full rounded-xl object-cover shadow-lift"
            />
            <img
              src={wrap}
              alt="Chicken wrap sliced in half"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute -bottom-10 -left-8 hidden w-40 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] sm:block float-slow"
            />
          </div>
        </div>
      </section>
    </>
  );
}
