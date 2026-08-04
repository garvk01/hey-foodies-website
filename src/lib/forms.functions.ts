import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  date: z.string().trim().min(1).max(20),
  time: z.string().trim().min(1).max(20),
  guests: z.number().int().min(1).max(60),
  notes: z.string().trim().max(1000).default(""),
});

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(255).email().or(z.literal("")).default(""),
  phone: z.string().trim().max(30).default(""),
  message: z.string().trim().min(1).max(2000),
});

export const submitReservation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => reservationSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicClient } = await import("./public-supabase.server");
    const { error } = await createPublicClient().from("reservations").insert(data);
    if (error) throw new Error("Could not save your request. Please call us instead.");
    return { ok: true };
  });

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicClient } = await import("./public-supabase.server");
    const { error } = await createPublicClient().from("contact_messages").insert(data);
    if (error) throw new Error("Could not send your message. Please call us instead.");
    return { ok: true };
  });
