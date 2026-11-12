import type { ImageKey } from "./images";

export const galleryCategories = [
  { id: "srinagar", label: "Srinagar" },
  { id: "gulmarg", label: "Gulmarg" },
  { id: "pahalgam", label: "Pahalgam" },
  { id: "sonamarg", label: "Sonamarg" },
  { id: "doodhpathri", label: "Doodhpathri" },
  { id: "gurez-valley", label: "Gurez Valley" },
  { id: "snow", label: "Snow Experiences" },
  { id: "lifestyle", label: "Kashmir Lifestyle" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

export type GalleryItem = { image: ImageKey; categories: GalleryCategory[] };

/** Order matters: it is the order shown on the Gallery page. */
export const galleryItems: GalleryItem[] = [
  { image: "srinagar-dal-sunset", categories: ["srinagar"] },
  { image: "gulmarg-gondola", categories: ["gulmarg", "snow"] },
  { image: "pahalgam-valley", categories: ["pahalgam"] },
  { image: "srinagar-houseboats", categories: ["srinagar"] },
  { image: "sonamarg", categories: ["sonamarg", "snow"] },
  { image: "doodhpathri-pastures", categories: ["doodhpathri"] },
  { image: "gulmarg-snowfall", categories: ["gulmarg", "snow"] },
  { image: "gurez-01", categories: ["gurez-valley"] },
  { image: "nishat-bagh", categories: ["srinagar"] },
  { image: "pahalgam-lidder", categories: ["pahalgam"] },
  { image: "sonamarg-paradise", categories: ["sonamarg"] },
  { image: "gulmarg-kongdoori", categories: ["gulmarg", "snow"] },
  { image: "srinagar-floating-market", categories: ["srinagar"] },
  { image: "doodhpathri", categories: ["doodhpathri"] },
  { image: "gurez-03", categories: ["gurez-valley"] },
  { image: "shalimar-bagh", categories: ["srinagar"] },
  { image: "pahalgam-trek", categories: ["pahalgam"] },
  { image: "gulmarg-jannat", categories: ["gulmarg"] },
  { image: "shikara-dal", categories: ["srinagar"] },
  { image: "gurez-05", categories: ["gurez-valley"] },
  { image: "doodhpathri-sheep", categories: ["doodhpathri"] },
  { image: "gulmarg-snowy-sunset", categories: ["gulmarg", "snow"] },
  { image: "srinagar-hazratbal", categories: ["srinagar"] },
  { image: "pahalgam-the-lidder", categories: ["pahalgam"] },
  { image: "sonamarg-03", categories: ["sonamarg"] },
  { image: "gulmarg-gondola-2", categories: ["gulmarg", "snow"] },
  { image: "nishat-sunset", categories: ["srinagar"] },
  { image: "gurez-08", categories: ["gurez-valley"] },
  { image: "srinagar-dal-dusk", categories: ["srinagar"] },
  { image: "pahalgam-meadow", categories: ["pahalgam"] },
  { image: "gulmarg-sunset-point", categories: ["gulmarg"] },
  { image: "shikara-empty", categories: ["srinagar"] },
  { image: "srinagar-dal", categories: ["srinagar"] },
  { image: "srinagar-houseboats-2", categories: ["srinagar"] },
  { image: "gulmarg-meadow", categories: ["gulmarg"] },
  { image: "yusmarg", categories: [] },
  { image: "aru-horse", categories: ["pahalgam", "lifestyle"] },
  { image: "aru-valley", categories: ["pahalgam", "snow"] },
  { image: "aru-meadow", categories: ["pahalgam"] },
  { image: "yusmarg-valley", categories: [] },
];

export const galleryPreview: ImageKey[] = [
  "srinagar-dal-dusk",
  "sonamarg-03",
  "doodhpathri-sheep",
  "shalimar-bagh",
  "nishat-sunset",
  "gurez-05",
];
