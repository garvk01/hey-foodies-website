/**
 * Central business content for Hey Foodies.
 * PLACEHOLDER VALUES — to be replaced with real details (and later moved
 * into the admin CMS). Every phone/address/hour display reads from here.
 */

export const business = {
  name: "Hey Foodies",
  tagline: "Big flavour, made for foodies.",
  phone: "+00 00000 00000",
  phoneHref: "tel:+0000000000",
  whatsapp: "+00 00000 00000",
  whatsappHref: "https://wa.me/0000000000",
  email: "hello@heyfoodies.example",
  addressLines: ["Address line 1", "Address line 2", "City, PIN"],
  mapsHref: "https://maps.google.com/?q=Hey+Foodies",
  orderHref: "#order",
  instagram: "https://instagram.com/",
  hours: [
    { day: "Monday", time: "11:00 – 23:00" },
    { day: "Tuesday", time: "11:00 – 23:00" },
    { day: "Wednesday", time: "11:00 – 23:00" },
    { day: "Thursday", time: "11:00 – 23:00" },
    { day: "Friday", time: "11:00 – 23:30" },
    { day: "Saturday", time: "11:00 – 23:30" },
    { day: "Sunday", time: "11:00 – 23:00" },
  ],
} as const;

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tags?: string[];
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  blurb: string;
  items: MenuItem[];
};

/** PLACEHOLDER menu — replace with the real Hey Foodies menu. */
export const menu: MenuCategory[] = [
  {
    id: "pizza",
    name: "Pizza",
    blurb: "Hand-stretched bases, blistered edges, generous cheese.",
    items: [
      {
        name: "Classic Margherita",
        description: "Tomato, mozzarella, basil.",
        price: "000",
        featured: true,
      },
      { name: "Peppy Paneer", description: "Paneer, capsicum, red paprika.", price: "000" },
      { name: "Loaded Veggie", description: "Corn, onion, olives, jalapeño.", price: "000" },
      { name: "Chicken Tikka Pizza", description: "Spiced chicken, onion, coriander.", price: "000" },
      { name: "Cheese Burst Special", description: "Double cheese, house herbs.", price: "000" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    blurb: "Toasted buns, thick patties, sauces made in-house.",
    items: [
      {
        name: "Hey Foodies Double",
        description: "Two patties, cheddar, house sauce.",
        price: "000",
        featured: true,
      },
      { name: "Crispy Chicken Burger", description: "Fried chicken, slaw, mayo.", price: "000" },
      { name: "Aloo Tikki Burger", description: "Spiced potato patty, chutney.", price: "000" },
      { name: "Paneer Zinger", description: "Crumb-fried paneer, lettuce.", price: "000" },
    ],
  },
  {
    id: "wraps",
    name: "Wraps & Rolls",
    blurb: "Rolled hot, packed tight, built for one hand.",
    items: [
      { name: "Chicken Shawarma Roll", description: "Garlic sauce, pickles.", price: "000", featured: true },
      { name: "Paneer Kathi Roll", description: "Tandoori paneer, onion.", price: "000" },
      { name: "Veg Frankie", description: "Masala potato, chutney.", price: "000" },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    blurb: "The part everyone fights over.",
    items: [
      { name: "Loaded Cheese Fries", description: "Fries, cheese sauce, herbs.", price: "000", featured: true },
      { name: "Peri Peri Fries", description: "Tossed in peri peri.", price: "000" },
      { name: "Garlic Bread", description: "Butter, garlic, cheese.", price: "000" },
      { name: "Crispy Nuggets", description: "Served with dip.", price: "000" },
    ],
  },
  {
    id: "drinks",
    name: "Shakes & Drinks",
    blurb: "Cold, thick, and worth the brain freeze.",
    items: [
      { name: "Chocolate Thick Shake", description: "Cocoa, cream, ice cream.", price: "000", featured: true },
      { name: "Oreo Shake", description: "Cookies and cream.", price: "000" },
      { name: "Cold Coffee", description: "Brewed, chilled, frothy.", price: "000" },
      { name: "Fresh Lime Soda", description: "Sweet or salted.", price: "000" },
    ],
  },
];

export const offers = [
  {
    title: "Combo Hour",
    detail: "Burger + fries + drink, one price.",
    note: "Offer details to be confirmed",
  },
  {
    title: "Pizza Party Pack",
    detail: "Two large pizzas for group orders.",
    note: "Offer details to be confirmed",
  },
];
