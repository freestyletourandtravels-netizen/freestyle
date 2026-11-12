import type { ImageKey } from "./images";

export const highlights = [
  { title: "Kashmir Travel Specialists", text: "Every trip we plan is in Kashmir, so we know this land well.", icon: "MountainSnow" },
  { title: "Personalized Itineraries", text: "Your dates, your pace, your interests, shaped into one plan.", icon: "Route" },
  { title: "Local Travel Assistance", text: "A team based in Tangmarg, reachable throughout your journey.", icon: "MapPin" },
  { title: "Customized Holiday Experiences", text: "Honeymoon, family or adventure, designed around you.", icon: "Sparkles" },
] as const;

export const whyChooseUs = [
  {
    title: "Local Kashmir Knowledge",
    text: "We are based in Tangmarg, at the gateway to Gulmarg. We know which roads open when, where the light is best and which valleys are quiet this week.",
    icon: "Compass",
  },
  {
    title: "Personalized Itineraries",
    text: "We start with how you like to travel, then build the days around it. Nothing is copy-pasted from another trip.",
    icon: "PenLine",
  },
  {
    title: "Comfortable Travel Arrangements",
    text: "Hotels in the category you choose and private vehicles sized for your group, for transfers and sightseeing alike.",
    icon: "Car",
  },
  {
    title: "Flexible Holiday Planning",
    text: "Add a day, swap a valley, slow the pace. Your plan can change before you travel, and we adjust it with you.",
    icon: "Layers",
  },
  {
    title: "Attention to Travel Details",
    text: "Flight timings, union taxi rules, Gondola phases, snow gear: the small things that make a trip feel effortless.",
    icon: "Sparkles",
  },
  {
    title: "Direct Travel Assistance",
    text: "Talk to the people planning your trip, not a call centre. One WhatsApp message away before, during and after your journey.",
    icon: "Headset",
  },
] as const;

export const planningSteps = [
  {
    title: "Tell Us Your Plans",
    text: "Share your dates, who is travelling and the kind of holiday you have in mind, through the planner, WhatsApp or a call.",
  },
  {
    title: "Receive Your Customized Itinerary",
    text: "We send a day-by-day plan with hotel options and a clear quote. Change anything until it feels right.",
  },
  {
    title: "Explore Kashmir",
    text: "Arrive in Srinagar and we take it from there, with our team a message away for the whole journey.",
  },
] as const;

export type Experience = { title: string; text: string; image: ImageKey; place: string };

export const experiences: Experience[] = [
  {
    title: "Shikara Rides",
    place: "Dal Lake, Srinagar",
    text: "Drift past floating gardens and lotus beds in a hand-painted shikara as the sun sets behind the Zabarwan hills.",
    image: "shikara-dal",
  },
  {
    title: "Houseboat Stays",
    place: "Dal & Nigeen Lakes",
    text: "Sleep aboard a walnut-carved houseboat, a Kashmiri tradition that goes back more than a century.",
    image: "srinagar-houseboats-2",
  },
  {
    title: "Snowfall in Gulmarg",
    place: "Gulmarg, December to March",
    text: "Fresh powder on the pines, the Gondola rising into cloud and the quiet that only snow brings.",
    image: "gulmarg-snowfall",
  },
  {
    title: "Mountain Landscapes",
    place: "Sonamarg",
    text: "Glacier-fed rivers and Himalayan peaks along the old road to Ladakh.",
    image: "sonamarg-03",
  },
  {
    title: "Meadow Experiences",
    place: "Doodhpathri & Yusmarg",
    text: "Lie back on open pastures while shepherds move their flocks across the hills.",
    image: "doodhpathri-sheep",
  },
  {
    title: "Adventure Activities",
    place: "Pahalgam, Aru & Gulmarg",
    text: "Pony rides to high meadows, gentle treks, skiing lessons and the Gondola to Kongdoori.",
    image: "pahalgam-trek",
  },
];

/** Shown as a typographic tile (we do not yet have our own food photography). */
export const cuisineNote = {
  title: "Kashmiri Cuisine",
  place: "Wazwan, kahwa & bakery bread",
  text: "Saffron kahwa poured from a samovar, fresh girda bread at dawn and, for special occasions, the many courses of a traditional Wazwan.",
};

export const faqs = [
  {
    q: "How do I book a Kashmir trip with Freestyle Tour & Travels?",
    a: "Share your dates, number of travellers and the places you would like to see through the trip planner, WhatsApp or a phone call. We send you a day-by-day itinerary with hotel options and a quote, adjust it until it feels right, and confirm once you are happy.",
  },
  {
    q: "Do you arrange pick-up from Srinagar airport?",
    a: "Yes. Pick-up and drop at Srinagar airport or railway station are part of our tour packages, and we time them around your flight or train.",
  },
  {
    q: "What is the best time to visit Kashmir?",
    a: "Kashmir is beautiful all year. December to March is best for snow in Gulmarg and Sonamarg. April and May bring blossoms and tulips, while June to October offers green meadows and pleasant weather for Pahalgam, Doodhpathri and Gurez.",
  },
  {
    q: "Can I customise a Kashmir tour package?",
    a: "Yes. Every package on this page is a starting point. We can change the number of days, destinations, hotel category and activities to match your plans and budget.",
  },
  {
    q: "Do you offer Kashmir honeymoon and family tour packages?",
    a: "Yes. We plan honeymoon trips with houseboat stays and private sightseeing, and family trips with comfortable pacing and vehicles sized for your group.",
  },
  {
    q: "I am travelling from Delhi. Can you plan my Kashmir trip?",
    a: "Yes. Travellers from Delhi and other cities usually fly into Srinagar. Our packages start and end in Srinagar, and we plan your itinerary around your flight or train timings.",
  },
  {
    q: "Why are prices not shown on the website?",
    a: "Costs depend on your dates, group size, hotel category and season. Share your details through the enquiry form or WhatsApp and we will send you a clear, personalised quote.",
  },
];
