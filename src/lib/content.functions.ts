import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/** Public, read-only site content used by every page (SSR-safe). */
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const [settings, hours, categories, items, offers, gallery] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    supabase.from("opening_hours").select("*").order("day_index"),
    supabase.from("menu_categories").select("*").order("sort_order"),
    supabase.from("menu_items").select("*").eq("available", true).order("sort_order"),
    supabase.from("offers").select("*").eq("active", true).order("sort_order"),
    supabase.from("gallery_images").select("*").order("sort_order").order("created_at"),
  ]);

  const galleryRows = gallery.data ?? [];
  const paths = galleryRows.map((g) => g.storage_path).filter((p): p is string => !!p);
  const signedMap = new Map<string, string>();
  if (paths.length) {
    const { data: signed } = await supabase.storage.from("gallery").createSignedUrls(paths, 60 * 60 * 24 * 7);
    for (const s of signed ?? []) {
      if (s.path && s.signedUrl) signedMap.set(s.path, s.signedUrl);
    }
  }

  return {
    settings: settings.data ?? null,
    hours: hours.data ?? [],
    categories: categories.data ?? [],
    items: items.data ?? [],
    offers: offers.data ?? [],
    gallery: galleryRows.map((g) => ({
      id: g.id,
      caption: g.caption,
      tall: g.tall,
      src: g.storage_path ? (signedMap.get(g.storage_path) ?? g.url) : g.url,
    })),
  };
});
