import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/lib/content";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Hey Foodies" },
      {
        name: "description",
        content:
          "The full Hey Foodies menu: pizza, burgers, wraps and rolls, loaded sides, shakes and cold drinks.",
      },
      { property: "og:title", content: "Menu — Hey Foodies" },
      {
        property: "og:description",
        content: "Pizza, burgers, wraps, loaded sides and thick shakes at Hey Foodies.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { business, menu } = useContent();
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? menu : menu.filter((c) => c.id === active);

  return (
    <>
      <PageHero
        eyebrow="The menu"
        title="Everything coming out of our kitchen."
        intro="Prices and items shown here are placeholders while the final menu is confirmed."
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="shell">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
            {[{ id: "all", name: "Everything" }, ...menu].map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                  active === c.id
                    ? "bg-charcoal-deep text-cream"
                    : "border border-border text-charcoal hover:bg-secondary"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-16">
            {shown.map((cat) => (
              <div key={cat.id} className="grid gap-8 lg:grid-cols-[16rem_1fr]">
                <div>
                  <h2 className="display-md text-charcoal-deep">{cat.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.blurb}</p>
                </div>
                <ul className="grid gap-px overflow-hidden rounded-xl bg-border">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline gap-4 bg-card px-5 py-5 transition-colors hover:bg-accent"
                    >
                      <div className="min-w-0">
                        <p className="font-display text-lg font-extrabold text-charcoal-deep">
                          {item.name}
                          {item.featured && (
                            <span className="ml-2 rounded bg-brand px-2 py-0.5 align-middle text-[10px] font-extrabold uppercase tracking-widest text-brand-foreground">
                              Popular
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span
                        className="mx-3 hidden h-px flex-1 self-center border-b border-dashed border-border sm:block"
                        aria-hidden
                      />
                      <span className="ml-auto shrink-0 font-display text-lg font-extrabold text-brand-deep sm:ml-0">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-deep py-16 text-cream">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <h2 className="display-md max-w-md text-cream">Ready to eat? Order in a minute.</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phoneHref}
              className="inline-flex h-12 items-center rounded-md bg-brand px-6 text-sm font-extrabold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              Call {business.phone}
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-md border border-cream/25 px-6 text-sm font-bold text-cream transition-colors hover:bg-cream/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
