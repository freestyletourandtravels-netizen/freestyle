import type { ImageKey } from "./images";

/**
 * KASHMIR TOUR PACKAGES — single source of truth.
 *
 * Everything shown on the home page, the packages page, the package detail
 * pages, the sitemap and the structured data comes from this file.
 * Itineraries, inclusions and hotel categories below are SAMPLE content:
 * edit them to match what you actually offer. No prices are shown on the
 * site; every package has a "Request Price" button that opens the enquiry form.
 */

export const packageCategories = ["Family", "Honeymoon", "Luxury", "Adventure", "Winter", "Group"] as const;
export type PackageCategory = (typeof packageCategories)[number];

/** Long labels for filters and headings. */
export const categoryLabels: Record<PackageCategory, string> = {
  Family: "Family Holidays",
  Honeymoon: "Honeymoon Escapes",
  Luxury: "Premium Holidays",
  Adventure: "Adventure Tours",
  Winter: "Winter Snow",
  Group: "Group Tours",
};

/** Matching option in the enquiry form, if any. */
export const categoryToEnquiry: Partial<Record<PackageCategory, string>> = {
  Family: "Family Holiday",
  Honeymoon: "Honeymoon",
  Luxury: "Luxury Escape",
  Adventure: "Adventure",
  Group: "Group Tour",
};

export type ItineraryDay = { day: number; title: string; description: string };

export type TourPackage = {
  slug: string;
  categories: PackageCategory[];
  name: string;
  nights: number;
  days: number;
  durationLabel: string;
  destinations: string[];
  image: ImageKey;
  gallery: ImageKey[];
  /** Search-engine title (keep under ~60 characters). */
  seoTitle: string;
  summary: string;
  idealFor: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  hotelCategory: string;
  transport: string;
  inclusions: string[];
  exclusions: string[];
  bestTime: string;
  featured: boolean;
};

const commonTransport =
  "Private vehicle for all transfers and sightseeing (sedan, SUV or tempo traveller depending on group size). Local union taxis at Pahalgam, Sonamarg and Gulmarg are used where local rules require them.";

const commonHotel =
  "Your choice of Budget, Standard, Premium or Luxury hotels, plus an optional houseboat night in Srinagar. Exact properties are confirmed with your quote.";

const commonInclusions = [
  "Accommodation in your chosen hotel category",
  "Daily breakfast (meal plan can be customised)",
  "Airport / railway station pick-up and drop in Srinagar",
  "All sightseeing by private vehicle as per itinerary",
  "Shikara ride on Dal Lake",
  "Local travel assistance throughout your trip",
];

const commonExclusions = [
  "Flights or train tickets to Srinagar",
  "Gulmarg Gondola tickets, pony rides and adventure activities",
  "Local union taxis for valley excursions (if applicable)",
  "Entry fees to gardens and monuments",
  "Personal expenses, tips and anything not mentioned in inclusions",
];

export const packages: TourPackage[] = [
  {
    slug: "kashmir-3-nights-4-days",
    categories: ["Family", "Group"],
    seoTitle: "Kashmir 3 Nights 4 Days Tour Package | Freestyle Tour & Travels",
    name: "Kashmir Highlights",
    nights: 3,
    days: 4,
    durationLabel: "3 Nights / 4 Days",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
    image: "srinagar-hazratbal",
    gallery: ["srinagar-hazratbal", "gulmarg-kongdoori", "pahalgam-lidder"],
    summary:
      "A short, beautifully paced introduction to Kashmir: Dal Lake by shikara, the snowy heights of Gulmarg and the river valleys of Pahalgam.",
    idealFor: ["First-time visitors", "Short breaks", "Couples"],
    highlights: [
      "Sunset shikara ride on Dal Lake",
      "Day excursion to Gulmarg with optional Gondola ride",
      "Pahalgam's Lidder River and valley viewpoints",
      "Mughal gardens of Srinagar",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar · Shikara on Dal Lake",
        description:
          "Pick-up from Srinagar airport and check in to your hotel or houseboat. Visit the Mughal gardens and end the day with a relaxed shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Srinagar → Gulmarg → Srinagar",
        description:
          "Drive through Tangmarg to Gulmarg, the meadow of flowers. Enjoy the snow or the meadows, with an optional Gondola ride, before returning to Srinagar.",
      },
      {
        day: 3,
        title: "Srinagar → Pahalgam → Srinagar",
        description:
          "Drive past saffron fields to Pahalgam. Walk along the Lidder River and visit valleys such as Betaab and Aru by local taxi, then return to Srinagar.",
      },
      {
        day: 4,
        title: "Departure",
        description: "After breakfast, transfer to Srinagar airport with memories of paradise.",
      },
    ],
    hotelCategory: commonHotel,
    transport: commonTransport,
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    bestTime: "All year. Snow from December to March, meadows and blooms from April to October.",
    featured: true,
  },
  {
    slug: "kashmir-4-nights-5-days",
    categories: ["Family", "Group"],
    seoTitle: "Kashmir 4 Nights 5 Days Tour Package | Freestyle Tour & Travels",
    name: "Valley & Meadows",
    nights: 4,
    days: 5,
    durationLabel: "4 Nights / 5 Days",
    destinations: ["Srinagar", "Sonamarg", "Gulmarg", "Pahalgam"],
    image: "sonamarg-paradise",
    gallery: ["sonamarg-paradise", "gulmarg-jannat", "pahalgam-valley"],
    summary:
      "Kashmir's four favourite destinations in five days: lakes, glaciers, meadows and mountain rivers, all with Srinagar as your base.",
    idealFor: ["Families", "Friends", "First-time visitors"],
    highlights: [
      "Glacier views and meadows of Sonamarg",
      "Gulmarg Gondola (optional) and snow play",
      "Pahalgam valleys by local taxi",
      "Dal Lake shikara ride and Mughal gardens",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar · Lakes & Gardens",
        description:
          "Airport pick-up and check-in. Afternoon at Nishat and Shalimar Bagh, followed by a shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Day trip to Sonamarg",
        description:
          "Drive along the Sindh River to Sonamarg, the meadow of gold. Optional pony ride towards Thajiwas Glacier. Return to Srinagar.",
      },
      {
        day: 3,
        title: "Day trip to Gulmarg",
        description:
          "Travel via Tangmarg to Gulmarg. Ride the Gondola (optional) and enjoy snow or summer meadows, then return to Srinagar.",
      },
      {
        day: 4,
        title: "Day trip to Pahalgam",
        description:
          "Visit Pahalgam and its valleys (Betaab, Aru, Chandanwari) by local taxi, with time along the Lidder River.",
      },
      { day: 5, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory: commonHotel,
    transport: commonTransport,
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    bestTime: "April to October for green meadows; December to March for snow.",
    featured: true,
  },
  {
    slug: "kashmir-5-nights-6-days",
    categories: ["Family", "Honeymoon"],
    seoTitle: "Kashmir 5 Nights 6 Days Tour Package | Freestyle Tour & Travels",
    name: "Classic Kashmir",
    nights: 5,
    days: 6,
    durationLabel: "5 Nights / 6 Days",
    destinations: ["Srinagar", "Sonamarg", "Gulmarg", "Pahalgam"],
    image: "pahalgam-valley",
    gallery: ["pahalgam-valley", "gulmarg-gondola", "srinagar-dal"],
    summary:
      "Our most popular length for a complete Kashmir holiday, with overnight stays in Gulmarg and Pahalgam so you wake up in the mountains.",
    idealFor: ["Families", "Honeymooners", "Relaxed travellers"],
    highlights: [
      "Overnight stay in Gulmarg",
      "Overnight stay in Pahalgam",
      "Sonamarg day excursion",
      "Optional houseboat night on Dal Lake",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar · Shikara ride",
        description: "Airport pick-up, check-in to your hotel or houseboat and an evening shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Day trip to Sonamarg",
        description: "Scenic drive to Sonamarg with time for the meadows and optional pony ride to Thajiwas Glacier.",
      },
      {
        day: 3,
        title: "Srinagar → Gulmarg (overnight)",
        description: "Drive to Gulmarg via Tangmarg. Afternoon Gondola ride (optional) and an evening in the mountains.",
      },
      {
        day: 4,
        title: "Gulmarg → Pahalgam (overnight)",
        description: "Travel to Pahalgam via saffron fields at Pampore. Evening walk along the Lidder River.",
      },
      {
        day: 5,
        title: "Pahalgam valleys → Srinagar",
        description: "Morning in Betaab, Aru or Chandanwari valley by local taxi, then drive back to Srinagar for the night.",
      },
      { day: 6, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory: commonHotel,
    transport: commonTransport,
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    bestTime: "Wonderful all year. Choose winter for snow or spring and summer for blooms and meadows.",
    featured: true,
  },
  {
    slug: "kashmir-6-nights-7-days",
    categories: ["Luxury", "Honeymoon", "Family"],
    seoTitle: "Kashmir 6 Nights 7 Days Tour Package | Freestyle Tour & Travels",
    name: "Grand Kashmir",
    nights: 6,
    days: 7,
    durationLabel: "6 Nights / 7 Days",
    destinations: ["Srinagar", "Doodhpathri", "Sonamarg", "Gulmarg", "Pahalgam"],
    image: "shikara-empty",
    gallery: ["shikara-empty", "doodhpathri", "sonamarg-03"],
    summary:
      "An unhurried week through Kashmir, adding the hidden meadows of Doodhpathri and a houseboat stay to the classic valley circuit.",
    idealFor: ["Honeymooners", "Families", "Nature lovers"],
    highlights: [
      "Houseboat night on Dal Lake",
      "Hidden meadows of Doodhpathri",
      "Overnight stays in Gulmarg and Pahalgam",
      "Sonamarg glacier views",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar · Houseboat stay",
        description: "Airport pick-up and check-in to a traditional houseboat. Evening shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Day trip to Doodhpathri",
        description: "Explore the quiet pastures and streams of Doodhpathri, the valley of milk. Return to Srinagar.",
      },
      {
        day: 3,
        title: "Day trip to Sonamarg",
        description: "Drive to Sonamarg for alpine meadows and optional pony ride to Thajiwas Glacier.",
      },
      {
        day: 4,
        title: "Srinagar → Gulmarg (overnight)",
        description: "Travel to Gulmarg via Tangmarg. Gondola ride (optional) and a peaceful mountain evening.",
      },
      {
        day: 5,
        title: "Gulmarg → Pahalgam (overnight)",
        description: "Drive to Pahalgam via the saffron town of Pampore. Evening by the Lidder River.",
      },
      {
        day: 6,
        title: "Pahalgam valleys → Srinagar",
        description: "Visit Betaab, Aru or Chandanwari valley, then return to Srinagar for Mughal gardens and shopping.",
      },
      { day: 7, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory: commonHotel,
    transport: commonTransport,
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    bestTime: "April to October is ideal for Doodhpathri's meadows; winter itineraries can be adapted.",
    featured: true,
  },
  {
    slug: "gulmarg-snow-experience",
    categories: ["Winter", "Adventure"],
    seoTitle: "Gulmarg Tour Package – Snow Experience | Freestyle Tour & Travels",
    name: "Gulmarg Snow Experience",
    nights: 2,
    days: 3,
    durationLabel: "2 Nights / 3 Days",
    destinations: ["Srinagar", "Gulmarg"],
    image: "gulmarg-gondola-2",
    gallery: ["gulmarg-gondola-2", "gulmarg-snowfall", "gulmarg-kongdoori"],
    summary:
      "A winter escape planned by locals from Tangmarg, the gateway to Gulmarg. Deep snow, Gondola views and cosy mountain evenings.",
    idealFor: ["Snow lovers", "Couples", "Adventure seekers"],
    highlights: [
      "Gulmarg Gondola (Phase 1 & 2, subject to weather)",
      "Skiing lessons and sledging (optional)",
      "Snow-covered pine forests and meadows",
      "Planned by a team based in Tangmarg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Srinagar → Gulmarg",
        description: "Pick-up in Srinagar and drive via Tangmarg to Gulmarg. Check in and enjoy your first evening in the snow.",
      },
      {
        day: 2,
        title: "Gondola & snow activities",
        description:
          "Ride the Gulmarg Gondola (optional, weather permitting) and try skiing, snowboarding lessons or sledging.",
      },
      {
        day: 3,
        title: "Gulmarg → Srinagar · Departure",
        description: "Morning in the snow, then transfer to Srinagar airport or extend your stay in Srinagar.",
      },
    ],
    hotelCategory: "Hotels in Gulmarg in your chosen category. Exact properties are confirmed with your quote.",
    transport: commonTransport,
    inclusions: [
      "Accommodation in Gulmarg in your chosen category",
      "Daily breakfast (meal plan can be customised)",
      "Srinagar ↔ Gulmarg transfers by private vehicle",
      "Local travel assistance from our Tangmarg team",
    ],
    exclusions: [
      "Gondola tickets, ski equipment and instructor fees",
      "Snow clothing and boots on hire",
      "Flights or train tickets",
      "Personal expenses and anything not mentioned in inclusions",
    ],
    bestTime: "December to March for snow.",
    featured: true,
  },
  {
    slug: "pahalgam-nature-escape",
    categories: ["Family", "Adventure"],
    seoTitle: "Pahalgam Tour Package – Nature Escape | Freestyle Tour & Travels",
    name: "Pahalgam Nature Escape",
    nights: 2,
    days: 3,
    durationLabel: "2 Nights / 3 Days",
    destinations: ["Srinagar", "Pahalgam"],
    image: "pahalgam-lidder",
    gallery: ["pahalgam-lidder", "pahalgam-trek", "pahalgam-meadow"],
    summary:
      "Slow down in the valley of shepherds: riverside stays, pine-forest walks and the meadows of Betaab, Aru and Chandanwari.",
    idealFor: ["Nature lovers", "Families", "Honeymooners"],
    highlights: [
      "Riverside stay by the Lidder",
      "Betaab, Aru and Chandanwari valleys",
      "Saffron fields of Pampore en route",
      "Optional pony ride to Baisaran meadow",
    ],
    itinerary: [
      {
        day: 1,
        title: "Srinagar → Pahalgam",
        description: "Drive via the saffron fields of Pampore and the ruins of Awantipora to Pahalgam. Evening by the river.",
      },
      {
        day: 2,
        title: "Pahalgam valleys",
        description: "Explore Betaab, Aru and Chandanwari valleys by local taxi, with an optional pony ride to Baisaran.",
      },
      {
        day: 3,
        title: "Pahalgam → Srinagar · Departure",
        description: "Leisurely morning, then transfer back to Srinagar airport or continue your Kashmir holiday.",
      },
    ],
    hotelCategory: "Hotels or riverside resorts in Pahalgam in your chosen category. Confirmed with your quote.",
    transport: commonTransport,
    inclusions: [
      "Accommodation in Pahalgam in your chosen category",
      "Daily breakfast (meal plan can be customised)",
      "Srinagar ↔ Pahalgam transfers by private vehicle",
      "Local travel assistance throughout",
    ],
    exclusions: [
      "Local union taxi for Betaab, Aru and Chandanwari",
      "Pony rides and entry fees",
      "Flights or train tickets",
      "Personal expenses and anything not mentioned in inclusions",
    ],
    bestTime: "April to October.",
    featured: true,
  },
  {
    slug: "kashmir-honeymoon-escape",
    categories: ["Honeymoon", "Luxury"],
    seoTitle: "Kashmir Honeymoon Package 5N/6D | Freestyle Tour & Travels",
    name: "Romantic Kashmir Honeymoon",
    nights: 5,
    days: 6,
    durationLabel: "5 Nights / 6 Days",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
    image: "srinagar-houseboats",
    gallery: ["srinagar-houseboats", "srinagar-dal-sunset", "gulmarg-snowy-sunset"],
    summary:
      "A slower, more private way to see Kashmir as a couple: a houseboat night on Dal Lake, two nights in the mountains of Gulmarg and riverside evenings in Pahalgam.",
    idealFor: ["Honeymooners", "Anniversary trips", "Couples"],
    highlights: [
      "Houseboat night on Dal Lake",
      "Private sunset shikara ride",
      "Two nights in Gulmarg",
      "Riverside stay in Pahalgam",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar · Houseboat night",
        description:
          "Airport pick-up and check-in to a traditional houseboat. Spend the evening on a private shikara as the light fades over the Zabarwan hills.",
      },
      {
        day: 2,
        title: "Mughal gardens · Srinagar → Gulmarg",
        description:
          "Morning at Nishat and Shalimar Bagh, then drive to Gulmarg through Tangmarg for the first of two nights in the mountains.",
      },
      {
        day: 3,
        title: "Gulmarg at your own pace",
        description:
          "An unhurried day: the Gondola to Kongdoori (optional), meadow walks in summer or snow play in winter, and a quiet evening at your hotel.",
      },
      {
        day: 4,
        title: "Gulmarg → Pahalgam",
        description: "Drive to Pahalgam via the saffron fields of Pampore. Evening walk along the Lidder River.",
      },
      {
        day: 5,
        title: "Pahalgam valleys → Srinagar",
        description: "Morning in Betaab or Aru Valley by local taxi, then return to Srinagar for your final night.",
      },
      { day: 6, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory:
      "Houseboat on night one, then hotels in your chosen category (we usually suggest Premium or Luxury for honeymoons). Exact properties are confirmed with your quote.",
    transport: commonTransport,
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    bestTime: "April to June for blossoms and green meadows; December to February for a snowy honeymoon.",
    featured: true,
  },
  {
    slug: "gurez-valley-adventure",
    categories: ["Adventure", "Group"],
    seoTitle: "Gurez Valley Tour Package 4N/5D | Freestyle Tour & Travels",
    name: "Gurez Valley Adventure",
    nights: 4,
    days: 5,
    durationLabel: "4 Nights / 5 Days",
    destinations: ["Srinagar", "Gurez Valley"],
    image: "gurez-05",
    gallery: ["gurez-05", "gurez-01", "gurez-03"],
    summary:
      "A journey to one of Kashmir's most remote valleys: over the Razdan Pass to log-house villages, the Kishanganga river and peaks that see few visitors.",
    idealFor: ["Explorers", "Photographers", "Small groups"],
    highlights: [
      "Drive over the Razdan Pass",
      "Two nights in Gurez Valley",
      "Dawar village and the Kishanganga river",
      "Habba Khatoon peak viewpoint",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar",
        description: "Airport pick-up and check-in. Evening shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Srinagar → Gurez",
        description:
          "An early start for the long, scenic drive via Bandipora and the Razdan Pass, descending into Gurez Valley by afternoon.",
      },
      {
        day: 3,
        title: "Exploring Gurez",
        description:
          "Walk through Dawar and nearby villages, follow the Kishanganga river and take in the views of Habba Khatoon peak.",
      },
      {
        day: 4,
        title: "Gurez → Srinagar",
        description: "Return drive over the Razdan Pass to Srinagar for the night.",
      },
      { day: 5, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory:
      "Hotel in Srinagar in your chosen category; guest houses or simple hotels in Gurez, where options are limited. Confirmed with your quote.",
    transport:
      "Private SUV recommended for the mountain roads. The Razdan Pass road depends on season and conditions, and permits or registration may be required. We check this before confirming dates.",
    inclusions: [
      "Accommodation in Srinagar and Gurez",
      "Daily breakfast (meal plan can be customised)",
      "Srinagar airport pick-up and drop",
      "Private vehicle for the Gurez journey",
      "Local travel assistance throughout",
    ],
    exclusions: [
      "Flights or train tickets to Srinagar",
      "Permit fees where applicable",
      "Entry fees, personal expenses and tips",
      "Anything not mentioned in inclusions",
    ],
    bestTime: "Usually May/June to October, when the Razdan Pass is open. Dates are confirmed against road conditions.",
    featured: false,
  },
  {
    slug: "doodhpathri-yusmarg-meadows",
    categories: ["Family", "Group"],
    seoTitle: "Doodhpathri & Yusmarg Tour Package | Freestyle Tour & Travels",
    name: "Hidden Meadows: Doodhpathri & Yusmarg",
    nights: 3,
    days: 4,
    durationLabel: "3 Nights / 4 Days",
    destinations: ["Srinagar", "Doodhpathri", "Yusmarg"],
    image: "doodhpathri-pastures",
    gallery: ["doodhpathri-pastures", "yusmarg", "doodhpathri-sheep"],
    summary:
      "Two quieter meadows that many visitors miss: the milky streams of Doodhpathri and the pine-ringed pastures of Yusmarg, both easy day trips from Srinagar.",
    idealFor: ["Families", "Repeat visitors", "Nature lovers"],
    highlights: [
      "Day trip to Doodhpathri",
      "Day trip to Yusmarg",
      "Shikara ride on Dal Lake",
      "Fewer crowds than the classic circuit",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar · Lakes & gardens",
        description: "Airport pick-up, Mughal gardens and an evening shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Day trip to Doodhpathri",
        description:
          "Drive to Doodhpathri for a day among rolling pastures, pine forest and the cold, milky stream that gives the meadow its name.",
      },
      {
        day: 3,
        title: "Day trip to Yusmarg",
        description:
          "Visit Yusmarg's open meadows ringed by pine and fir, with optional pony rides or a gentle walk towards Nilnag lake.",
      },
      { day: 4, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory: commonHotel,
    transport: commonTransport,
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    bestTime: "April to October, when the meadows are green.",
    featured: false,
  },
  {
    slug: "kashmir-winter-snow-holiday",
    categories: ["Winter", "Family"],
    seoTitle: "Kashmir Winter Package 5N/6D | Freestyle Tour & Travels",
    name: "Kashmir Winter Wonderland",
    nights: 5,
    days: 6,
    durationLabel: "5 Nights / 6 Days",
    destinations: ["Srinagar", "Gulmarg", "Sonamarg", "Pahalgam"],
    image: "gulmarg-snowy-sunset",
    gallery: ["gulmarg-snowy-sunset", "sonamarg-snow", "gulmarg-kongdoori"],
    summary:
      "Kashmir under snow: two nights in Gulmarg for the slopes and the Gondola, a snowy day at Sonamarg and the Lidder valley in its winter colours.",
    idealFor: ["Families", "Snow lovers", "First snow experience"],
    highlights: [
      "Two nights in snowy Gulmarg",
      "Gondola ride (optional)",
      "Skiing or sledging with local instructors (optional)",
      "Sonamarg in winter, as road access allows",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar",
        description: "Airport pick-up and check-in to a heated hotel. Short evening shikara ride if the weather allows.",
      },
      {
        day: 2,
        title: "Srinagar → Gulmarg",
        description: "Drive to Gulmarg via Tangmarg, where you can hire snow boots and jackets. Afternoon in the snow.",
      },
      {
        day: 3,
        title: "Gondola & snow activities",
        description: "Gondola to Kongdoori (optional), sledging, skiing lessons or simply a walk through snowy pine forest.",
      },
      {
        day: 4,
        title: "Gulmarg → Srinagar · Sonamarg excursion",
        description: "Return towards Srinagar with a day excursion to Sonamarg as far as winter road access allows.",
      },
      {
        day: 5,
        title: "Day trip to Pahalgam",
        description: "Drive to Pahalgam to see the Lidder valley in winter, returning to Srinagar in the evening.",
      },
      { day: 6, title: "Departure", description: "Breakfast and transfer to Srinagar airport." },
    ],
    hotelCategory: "Heated hotels in your chosen category in Srinagar and Gulmarg. Exact properties are confirmed with your quote.",
    transport:
      "Private vehicle suited to winter roads. In heavy snow, local rules may require snow-chained or local vehicles in Gulmarg and Sonamarg.",
    inclusions: commonInclusions,
    exclusions: [...commonExclusions, "Snow boots, jackets and ski equipment hire"],
    bestTime: "December to early March. Snow depends on the season.",
    featured: false,
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const packageTitle = (p: TourPackage) => `${p.durationLabel} · ${p.name}`;

/** Every distinct destination covered by a package. */
export const packageDestinations = Array.from(new Set(packages.flatMap((p) => p.destinations)));
