import type { ImageKey } from "./images";

export type Destination = {
  slug: string;
  name: string;
  /** Short editorial line. */
  tagline: string;
  description: string;
  /** Small location label, e.g. "Central Kashmir · 1,585 m". */
  label: string;
  image: ImageKey;
  /** Optional CSS object-position for card crops, e.g. "center 85%". */
  imagePosition?: string;
  /** Second photo, revealed on hover. */
  altImage: ImageKey;
  /** Short best-season hint shown on cards. */
  bestTime: string;
  /** Value preselected in the enquiry form. */
  enquiryValue: string;
  /** Destination used to filter the packages page. */
  packageFilter: string;
};

export const destinations: Destination[] = [
  {
    slug: "srinagar",
    bestTime: "All year",
    name: "Srinagar",
    tagline: "A city that floats",
    description:
      "Mornings on Dal Lake begin with the soft knock of a shikara paddle. Houseboats carved from walnut wood, terraced Mughal gardens and old-city lanes make Srinagar the gentle beginning of every Kashmir journey.",
    label: "Summer capital · Dal Lake",
    image: "srinagar-hazratbal",
    altImage: "srinagar-dal-sunset",
    enquiryValue: "Srinagar",
    packageFilter: "Srinagar",
  },
  {
    slug: "gulmarg",
    bestTime: "All year",
    name: "Gulmarg",
    tagline: "The meadow of flowers, the kingdom of snow",
    description:
      "Wildflowers in summer, deep powder in winter. Ride the Gondola towards Apharwat, walk silent pine forests and watch the light change over the Pir Panjal, just above our home in Tangmarg.",
    label: "Baramulla · Pir Panjal range",
    image: "gulmarg-snowfall",
    altImage: "gulmarg-gondola",
    enquiryValue: "Gulmarg",
    packageFilter: "Gulmarg",
  },
  {
    slug: "pahalgam",
    bestTime: "Apr – Oct",
    name: "Pahalgam",
    tagline: "Where the Lidder sings",
    description:
      "A valley of shepherds and pine, cut by the clear Lidder River. Pahalgam is for long walks, riverside evenings and slow mornings before setting out to Betaab and Chandanwari.",
    label: "Anantnag · Lidder Valley",
    image: "pahalgam-meadow",
    altImage: "pahalgam-valley",
    enquiryValue: "Pahalgam",
    packageFilter: "Pahalgam",
  },
  {
    slug: "sonamarg",
    bestTime: "May – Oct",
    name: "Sonamarg",
    tagline: "The meadow of gold",
    description:
      "Glaciers, alpine meadows and the Sindh river along the old road to Ladakh. In late afternoon the valley turns the colour that gave it its name.",
    label: "Ganderbal · Sindh Valley",
    image: "sonamarg-paradise",
    altImage: "sonamarg-snow",
    enquiryValue: "Sonamarg",
    packageFilter: "Sonamarg",
  },
  {
    slug: "doodhpathri",
    bestTime: "Apr – Oct",
    name: "Doodhpathri",
    tagline: "The valley of milk",
    description:
      "Rolling pastures, grazing flocks and streams that run white over the stones. A quieter meadow for those who want Kashmir without the crowds.",
    label: "Budgam · Pir Panjal foothills",
    image: "doodhpathri-pastures",
    altImage: "doodhpathri-sheep",
    enquiryValue: "Doodhpathri",
    packageFilter: "Doodhpathri",
  },
  {
    slug: "gurez-valley",
    bestTime: "Jun – Oct",
    name: "Gurez Valley",
    tagline: "Beyond the Razdan Pass",
    description:
      "Log-house villages, the Kishanganga river and peaks that see few visitors. Gurez is Kashmir at its most remote and untouched.",
    label: "Bandipora · Kishanganga",
    image: "gurez-03",
    altImage: "gurez-05",
    enquiryValue: "Gurez Valley",
    packageFilter: "Gurez Valley",
  },
  {
    slug: "yusmarg",
    bestTime: "Apr – Oct",
    name: "Yusmarg",
    tagline: "A meadow ringed by pine",
    description:
      "Wide open pastures framed by pine and fir, with walks towards Nilnag lake. An easy, peaceful day from Srinagar.",
    label: "Budgam · Pir Panjal",
    image: "yusmarg-valley",
    altImage: "yusmarg",
    enquiryValue: "Yusmarg",
    packageFilter: "Yusmarg",
  },
  {
    slug: "aru-valley",
    bestTime: "May – Oct",
    name: "Aru Valley",
    tagline: "The trailhead to the high meadows",
    description:
      "A small village above Pahalgam, surrounded by meadows, forest and snow-streaked ridges. The starting point for treks towards Kolahoi and Tarsar.",
    label: "Pahalgam · 12 km upstream",
    image: "aru-meadow",
    altImage: "aru-valley",
    enquiryValue: "Aru Valley",
    packageFilter: "Pahalgam",
  },
];
