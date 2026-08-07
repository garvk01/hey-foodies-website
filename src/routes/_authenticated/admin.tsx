import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { claimAdminIfUnclaimed } from "@/lib/admin.functions";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Hey Foodies" },
      { name: "description", content: "Manage menu, hours, offers, reservations and messages for Hey Foodies." },
      { property: "og:title", content: "Admin Dashboard — Hey Foodies" },
      { property: "og:description", content: "Internal dashboard for Hey Foodies staff." },
    ],
  }),
  component: AdminPage,
});

type Tables = Database["public"]["Tables"];
type Settings = Tables["site_settings"]["Row"];
type Hour = Tables["opening_hours"]["Row"];
type Category = Tables["menu_categories"]["Row"];
type Item = Tables["menu_items"]["Row"];
type Offer = Tables["offers"]["Row"];
type Reservation = Tables["reservations"]["Row"];
type Message = Tables["contact_messages"]["Row"];

const field =
  "h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-charcoal-deep outline-none focus:border-brand focus-visible:ring-2 focus-visible:ring-brand";
const label = "eyebrow text-muted-foreground";
const btn =
  "inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-extrabold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60";
const btnGhost =
  "inline-flex h-9 items-center justify-center rounded-md border border-border bg-card px-3 text-xs font-bold text-charcoal-deep hover:bg-accent";
const card = "rounded-xl border border-border bg-card p-6";

const TABS = ["Details", "Hours", "Menu", "Offers", "Gallery", "Bookings", "Messages"] as const;
type Tab = (typeof TABS)[number];

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("Details");
  const [checkedRole, setCheckedRole] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await claimAdminIfUnclaimed();
      } catch {
        /* already claimed or not permitted */
      }
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      if (!active) return;
      setIsAdmin((data ?? []).some((r) => r.role === "admin"));
      setCheckedRole(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <section className="min-h-screen bg-cream py-12">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-brand-deep">Admin</p>
            <h1 className="font-display text-3xl font-extrabold text-charcoal-deep">Dashboard</h1>
          </div>
          <button onClick={signOut} className={btnGhost}>
            Sign out
          </button>
        </div>

        {!checkedRole ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
        ) : !isAdmin ? (
          <div className={`${card} mt-10`}>
            <p className="font-display text-xl font-extrabold text-charcoal-deep">No admin access</p>
            <p className="mt-2 text-sm text-muted-foreground">
              This account isn't an admin yet. Ask an existing admin to grant access.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`h-10 rounded-md px-4 text-sm font-bold transition-colors ${
                    tab === t
                      ? "bg-charcoal-deep text-cream"
                      : "border border-border bg-card text-charcoal-deep hover:bg-accent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6">
              {tab === "Details" && <DetailsTab />}
              {tab === "Hours" && <HoursTab />}
              {tab === "Menu" && <MenuTab />}
              {tab === "Offers" && <OffersTab />}
              {tab === "Gallery" && <GalleryTab />}
              {tab === "Bookings" && <BookingsTab />}
              {tab === "Messages" && <MessagesTab />}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries();
  };
}

/* ---------------- Details ---------------- */

function DetailsTab() {
  const invalidate = useInvalidate();
  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as Settings | null;
    },
  });

  const save = useMutation({
    mutationFn: async (values: Partial<Settings> & { id: string }) => {
      const { error } = await supabase.from("site_settings").update(values).eq("id", values.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Details saved");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!data) return <p className="text-sm text-muted-foreground">No settings row found.</p>;

  return (
    <form
      className={card}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        save.mutate({
          id: data.id,
          name: String(f.get("name")),
          tagline: String(f.get("tagline")),
          phone: String(f.get("phone")),
          whatsapp: String(f.get("whatsapp")),
          email: String(f.get("email")),
          instagram: String(f.get("instagram")),
          maps_href: String(f.get("maps_href")),
          address_lines: String(f.get("address_lines"))
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
        });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {(
          [
            ["name", "Restaurant name"],
            ["tagline", "Tagline"],
            ["phone", "Phone"],
            ["whatsapp", "WhatsApp"],
            ["email", "Email"],
            ["instagram", "Instagram URL"],
            ["maps_href", "Google Maps URL"],
          ] as const
        ).map(([key, text]) => (
          <div key={key}>
            <label className={label} htmlFor={key}>
              {text}
            </label>
            <input id={key} name={key} defaultValue={String(data[key] ?? "")} className={`${field} mt-2`} />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <label className={label} htmlFor="address_lines">
          Address (one line per row)
        </label>
        <textarea
          id="address_lines"
          name="address_lines"
          rows={3}
          defaultValue={(data.address_lines ?? []).join("\n")}
          className={`${field} mt-2 h-auto py-3`}
        />
      </div>
      <button type="submit" disabled={save.isPending} className={`${btn} mt-6`}>
        Save details
      </button>
    </form>
  );
}

/* ---------------- Hours ---------------- */

function HoursTab() {
  const invalidate = useInvalidate();
  const { data } = useQuery({
    queryKey: ["admin", "hours"],
    queryFn: async () => {
      const { data, error } = await supabase.from("opening_hours").select("*").order("day_index");
      if (error) throw error;
      return data as Hour[];
    },
  });

  const save = useMutation({
    mutationFn: async (row: { id: string; time: string; closed: boolean }) => {
      const { error } = await supabase
        .from("opening_hours")
        .update({ time: row.time, closed: row.closed })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Hours updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className={card}>
      <div className="grid gap-4">
        {(data ?? []).map((h) => (
          <div key={h.id} className="grid items-center gap-3 sm:grid-cols-[120px_1fr_auto_auto]">
            <span className="font-bold text-charcoal-deep">{h.day}</span>
            <input defaultValue={h.time} id={`time-${h.id}`} className={field} />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" id={`closed-${h.id}`} defaultChecked={h.closed} /> Closed
            </label>
            <button
              className={btnGhost}
              onClick={() =>
                save.mutate({
                  id: h.id,
                  time: (document.getElementById(`time-${h.id}`) as HTMLInputElement).value,
                  closed: (document.getElementById(`closed-${h.id}`) as HTMLInputElement).checked,
                })
              }
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Menu ---------------- */

function MenuTab() {
  const invalidate = useInvalidate();
  const { data: categories } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_categories").select("*").order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });
  const { data: items } = useQuery({
    queryKey: ["admin", "items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_items").select("*").order("sort_order");
      if (error) throw error;
      return data as Item[];
    },
  });

  const mutate = useMutation({
    mutationFn: async (fn: () => PromiseLike<{ error: unknown }>) => {
      const { error } = await fn();
      if (error) throw new Error((error as { message?: string }).message ?? "Update failed");
    },
    onSuccess: () => {
      toast.success("Menu updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-6">
      {(categories ?? []).map((cat) => (
        <div key={cat.id} className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-xl font-extrabold text-charcoal-deep">{cat.name}</p>
            <span className="eyebrow text-muted-foreground">{cat.slug}</span>
          </div>

          <div className="mt-5 grid gap-3">
            {(items ?? [])
              .filter((i) => i.category_id === cat.id)
              .map((item) => (
                <div key={item.id} className="grid gap-3 rounded-md border border-border p-4 sm:grid-cols-[1fr_2fr_100px_auto]">
                  <input id={`n-${item.id}`} defaultValue={item.name} className={field} />
                  <input id={`d-${item.id}`} defaultValue={item.description} className={field} />
                  <input id={`p-${item.id}`} defaultValue={item.price} className={field} />
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-1 text-xs text-muted-foreground">
                      <input type="checkbox" id={`a-${item.id}`} defaultChecked={item.available} /> Available
                    </label>
                    <button
                      className={btnGhost}
                      onClick={() =>
                        mutate.mutate(() =>
                          supabase
                            .from("menu_items")
                            .update({
                              name: (document.getElementById(`n-${item.id}`) as HTMLInputElement).value,
                              description: (document.getElementById(`d-${item.id}`) as HTMLInputElement).value,
                              price: (document.getElementById(`p-${item.id}`) as HTMLInputElement).value,
                              available: (document.getElementById(`a-${item.id}`) as HTMLInputElement).checked,
                            })
                            .eq("id", item.id),
                        )
                      }
                    >
                      Save
                    </button>
                    <button
                      className={btnGhost}
                      onClick={() => mutate.mutate(() => supabase.from("menu_items").delete().eq("id", item.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <form
            className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr_100px_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const f = new FormData(form);
              mutate.mutate(() =>
                supabase.from("menu_items").insert({
                  category_id: cat.id,
                  name: String(f.get("name")),
                  description: String(f.get("description")),
                  price: String(f.get("price")),
                }),
              );
              form.reset();
            }}
          >
            <input name="name" required placeholder="New item" className={field} />
            <input name="description" placeholder="Description" className={field} />
            <input name="price" placeholder="Price" className={field} />
            <button type="submit" className={btnGhost}>
              Add
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Offers ---------------- */

function OffersTab() {
  const invalidate = useInvalidate();
  const { data } = useQuery({
    queryKey: ["admin", "offers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("offers").select("*").order("sort_order");
      if (error) throw error;
      return data as Offer[];
    },
  });

  const mutate = useMutation({
    mutationFn: async (fn: () => PromiseLike<{ error: unknown }>) => {
      const { error } = await fn();
      if (error) throw new Error((error as { message?: string }).message ?? "Update failed");
    },
    onSuccess: () => {
      toast.success("Offers updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className={card}>
      <div className="grid gap-3">
        {(data ?? []).map((o) => (
          <div key={o.id} className="grid gap-3 rounded-md border border-border p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <input id={`ot-${o.id}`} defaultValue={o.title} className={field} />
            <input id={`od-${o.id}`} defaultValue={o.detail} className={field} />
            <input id={`on-${o.id}`} defaultValue={o.note} className={field} />
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1 text-xs text-muted-foreground">
                <input type="checkbox" id={`oa-${o.id}`} defaultChecked={o.active} /> Active
              </label>
              <button
                className={btnGhost}
                onClick={() =>
                  mutate.mutate(() =>
                    supabase
                      .from("offers")
                      .update({
                        title: (document.getElementById(`ot-${o.id}`) as HTMLInputElement).value,
                        detail: (document.getElementById(`od-${o.id}`) as HTMLInputElement).value,
                        note: (document.getElementById(`on-${o.id}`) as HTMLInputElement).value,
                        active: (document.getElementById(`oa-${o.id}`) as HTMLInputElement).checked,
                      })
                      .eq("id", o.id),
                  )
                }
              >
                Save
              </button>
              <button className={btnGhost} onClick={() => mutate.mutate(() => supabase.from("offers").delete().eq("id", o.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form
        className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const f = new FormData(form);
          mutate.mutate(() =>
            supabase.from("offers").insert({
              title: String(f.get("title")),
              detail: String(f.get("detail")),
              note: String(f.get("note")),
            }),
          );
          form.reset();
        }}
      >
        <input name="title" required placeholder="New offer" className={field} />
        <input name="detail" placeholder="Detail" className={field} />
        <input name="note" placeholder="Note" className={field} />
        <button type="submit" className={btnGhost}>
          Add
        </button>
      </form>
    </div>
  );
}

/* ---------------- Bookings ---------------- */

function BookingsTab() {
  const invalidate = useInvalidate();
  const { data } = useQuery({
    queryKey: ["admin", "reservations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Reservation[];
    },
  });

  const mutate = useMutation({
    mutationFn: async (fn: () => PromiseLike<{ error: unknown }>) => {
      const { error } = await fn();
      if (error) throw new Error((error as { message?: string }).message ?? "Update failed");
    },
    onSuccess: () => invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  if (!data?.length) return <p className="text-sm text-muted-foreground">No table requests yet.</p>;

  return (
    <div className="grid gap-3">
      {data.map((r) => (
        <div key={r.id} className={`${card} flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="font-display text-lg font-extrabold text-charcoal-deep">
              {r.name} · {r.guests} guests
            </p>
            <p className="text-sm text-muted-foreground">
              {r.date} at {r.time} · {r.phone}
            </p>
            {r.notes && <p className="mt-1 text-sm text-muted-foreground">{r.notes}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow text-brand-deep">{r.status}</span>
            {(["confirmed", "declined"] as const).map((s) => (
              <button
                key={s}
                className={btnGhost}
                onClick={() => mutate.mutate(() => supabase.from("reservations").update({ status: s }).eq("id", r.id))}
              >
                {s}
              </button>
            ))}
            <button className={btnGhost} onClick={() => mutate.mutate(() => supabase.from("reservations").delete().eq("id", r.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Messages ---------------- */

function MessagesTab() {
  const invalidate = useInvalidate();
  const { data } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Message[];
    },
  });

  const mutate = useMutation({
    mutationFn: async (fn: () => PromiseLike<{ error: unknown }>) => {
      const { error } = await fn();
      if (error) throw new Error((error as { message?: string }).message ?? "Update failed");
    },
    onSuccess: () => invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  if (!data?.length) return <p className="text-sm text-muted-foreground">No messages yet.</p>;

  return (
    <div className="grid gap-3">
      {data.map((m) => (
        <div key={m.id} className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-lg font-extrabold text-charcoal-deep">{m.name}</p>
            <div className="flex items-center gap-2">
              <span className="eyebrow text-muted-foreground">{m.handled ? "handled" : "new"}</span>
              <button
                className={btnGhost}
                onClick={() =>
                  mutate.mutate(() => supabase.from("contact_messages").update({ handled: !m.handled }).eq("id", m.id))
                }
              >
                {m.handled ? "Mark new" : "Mark handled"}
              </button>
              <button
                className={btnGhost}
                onClick={() => mutate.mutate(() => supabase.from("contact_messages").delete().eq("id", m.id))}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {m.email} {m.phone}
          </p>
          <p className="mt-3 text-sm text-charcoal-deep">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Gallery ---------------- */

type GalleryRow = Tables["gallery_images"]["Row"];

async function signRows(rows: GalleryRow[]) {
  const paths = rows.map((r) => r.storage_path).filter(Boolean);
  const map = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from("gallery").createSignedUrls(paths, 60 * 60);
    for (const s of data ?? []) if (s.path && s.signedUrl) map.set(s.path, s.signedUrl);
  }
  return rows.map((r) => ({ ...r, preview: r.storage_path ? (map.get(r.storage_path) ?? r.url) : r.url }));
}

async function uploadGalleryFile(file: File) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("gallery").upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  return path;
}

function GalleryTab() {
  const invalidate = useInvalidate();
  const [busy, setBusy] = useState(false);
  const { data } = useQuery({
    queryKey: ["admin", "gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return signRows(data as GalleryRow[]);
    },
  });

  const mutate = useMutation({
    mutationFn: async (fn: () => Promise<unknown>) => {
      await fn();
    },
    onSuccess: () => {
      toast.success("Gallery updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function addImage(form: HTMLFormElement) {
    const f = new FormData(form);
    const file = f.get("file") as File | null;
    if (!file || !file.size) throw new Error("Pick an image file");
    const path = await uploadGalleryFile(file);
    const { error } = await supabase.from("gallery_images").insert({
      url: "",
      storage_path: path,
      caption: String(f.get("caption") ?? ""),
      tall: f.get("tall") === "on",
      sort_order: Number(f.get("sort_order") ?? 0) || 0,
    });
    if (error) throw new Error(error.message);
  }

  async function replaceImage(row: GalleryRow, file: File) {
    const path = await uploadGalleryFile(file);
    const { error } = await supabase.from("gallery_images").update({ storage_path: path, url: "" }).eq("id", row.id);
    if (error) throw new Error(error.message);
    if (row.storage_path) await supabase.storage.from("gallery").remove([row.storage_path]);
  }

  async function removeImage(row: GalleryRow) {
    const { error } = await supabase.from("gallery_images").delete().eq("id", row.id);
    if (error) throw new Error(error.message);
    if (row.storage_path) await supabase.storage.from("gallery").remove([row.storage_path]);
  }

  return (
    <div className="grid gap-6">
      <div className={card}>
        <div className="grid gap-3">
          {(data ?? []).map((g) => (
            <div key={g.id} className="grid gap-3 rounded-md border border-border p-4 sm:grid-cols-[120px_1fr_100px_auto]">
              <img src={g.preview} alt={g.caption || "Gallery image"} className="h-20 w-full rounded-md object-cover" />
              <input id={`gc-${g.id}`} defaultValue={g.caption} placeholder="Caption" className={field} />
              <input id={`gs-${g.id}`} type="number" defaultValue={g.sort_order} className={field} />
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-1 text-xs text-muted-foreground">
                  <input type="checkbox" id={`gt-${g.id}`} defaultChecked={g.tall} /> Tall
                </label>
                <button
                  className={btnGhost}
                  disabled={busy}
                  onClick={() =>
                    mutate.mutate(async () => {
                      const { error } = await supabase
                        .from("gallery_images")
                        .update({
                          caption: (document.getElementById(`gc-${g.id}`) as HTMLInputElement).value,
                          sort_order: Number((document.getElementById(`gs-${g.id}`) as HTMLInputElement).value) || 0,
                          tall: (document.getElementById(`gt-${g.id}`) as HTMLInputElement).checked,
                        })
                        .eq("id", g.id);
                      if (error) throw new Error(error.message);
                    })
                  }
                >
                  Save
                </button>
                <label className={`${btnGhost} cursor-pointer`}>
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (file) mutate.mutate(() => replaceImage(g, file));
                    }}
                  />
                </label>
                <button className={btnGhost} disabled={busy} onClick={() => mutate.mutate(() => removeImage(g))}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!data?.length && (
            <p className="text-sm text-muted-foreground">
              No gallery images yet — the site shows the default photos until you add some.
            </p>
          )}
        </div>

        <form
          className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_100px_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setBusy(true);
            mutate.mutate(
              () => addImage(form).then(() => form.reset()),
            );
            setBusy(false);
          }}
        >
          <input name="file" type="file" accept="image/*" required className={`${field} py-2`} />
          <input name="caption" placeholder="Caption" className={field} />
          <input name="sort_order" type="number" placeholder="Order" className={field} />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-xs text-muted-foreground">
              <input type="checkbox" name="tall" /> Tall
            </label>
            <button type="submit" className={btnGhost} disabled={busy}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
