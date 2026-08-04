import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Favourites } from "@/components/home/Favourites";
import { Story } from "@/components/home/Story";
import { Offers } from "@/components/home/Offers";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { Location } from "@/components/home/Location";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hey Foodies — Pizza, Burgers, Wraps & Shakes" },
      {
        name: "description",
        content:
          "Hot pizza, stacked burgers, rolls, loaded fries and thick shakes at Hey Foodies. Browse the menu, see offers, get directions or call to order.",
      },
      { property: "og:title", content: "Hey Foodies — Pizza, Burgers, Wraps & Shakes" },
      {
        property: "og:description",
        content: "Hot pizza, stacked burgers, rolls, loaded fries and thick shakes at Hey Foodies. Browse the menu, see offers, get directions or call to order.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Story />
      <Favourites />
      <Offers />
      <GalleryStrip />
      <Location />
    </>
  );
}
