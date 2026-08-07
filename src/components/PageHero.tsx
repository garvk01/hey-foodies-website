import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep pt-28 pb-14 sm:pt-32 sm:pb-16 text-cream lg:pt-40 lg:pb-20">
      <div className="pointer-events-none absolute -right-32 -top-16 h-96 w-96 rounded-full bg-brand/15" />
      <div className="shell relative enter-rise">
        <p className="eyebrow text-brand">{eyebrow}</p>
        <h1 className="mt-4 display-lg max-w-3xl text-cream">{title}</h1>
        {intro && <p className="mt-6 max-w-xl leading-relaxed text-cream/65">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
