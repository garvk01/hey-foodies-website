import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSiteContent } from "./content.functions";
import { business as fallbackBusiness, menu as fallbackMenu, offers as fallbackOffers } from "./site";
import type { MenuCategory } from "./site";

export type Business = {
  name: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  addressLines: string[];
  mapsHref: string;
  orderHref: string;
  instagram: string;
  hours: { day: string; time: string }[];
};

export type Offer = { title: string; detail: string; note: string };

export type GalleryImage = { id: string; src: string; caption: string; tall: boolean };

export type SiteContent = {
  business: Business;
  menu: MenuCategory[];
  offers: Offer[];
  gallery: GalleryImage[];
};

const digits = (v: string) => v.replace(/[^\d+]/g, "");

export const fallbackContent: SiteContent = {
  business: { ...fallbackBusiness, addressLines: [...fallbackBusiness.addressLines], hours: [...fallbackBusiness.hours] },
  menu: fallbackMenu,
  offers: fallbackOffers,
  gallery: [],
};

type Raw = Awaited<ReturnType<typeof getSiteContent>>;

export function toSiteContent(raw: Raw): SiteContent {
  const s = raw.settings;
  const business: Business = s
    ? {
        name: s.name,
        tagline: s.tagline,
        phone: s.phone,
        phoneHref: `tel:${digits(s.phone)}`,
        whatsapp: s.whatsapp,
        whatsappHref: `https://wa.me/${digits(s.whatsapp).replace("+", "")}`,
        email: s.email,
        addressLines: s.address_lines,
        mapsHref: s.maps_href,
        orderHref: "#order",
        instagram: s.instagram,
        hours: raw.hours.length
          ? raw.hours.map((h) => ({ day: h.day, time: h.closed ? "Closed" : h.time }))
          : fallbackContent.business.hours,
      }
    : fallbackContent.business;

  const menu: MenuCategory[] = raw.categories.length
    ? raw.categories.map((c) => ({
        id: c.slug,
        name: c.name,
        blurb: c.blurb,
        items: raw.items
          .filter((i) => i.category_id === c.id)
          .map((i) => ({
            name: i.name,
            description: i.description,
            price: i.price,
            featured: i.featured,
          })),
      }))
    : fallbackContent.menu;

  const offers: Offer[] = raw.offers.length
    ? raw.offers.map((o) => ({ title: o.title, detail: o.detail, note: o.note }))
    : fallbackContent.offers;

  return { business, menu, offers, gallery: raw.gallery ?? [] };
}

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: async () => toSiteContent(await getSiteContent()),
  staleTime: 60_000,
});

/** Site content with placeholder fallback so nothing ever renders blank. */
export function useContent(): SiteContent {
  const { data } = useQuery(siteContentQuery);
  return data ?? fallbackContent;
}
