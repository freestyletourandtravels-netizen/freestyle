import credits from "./image-credits.json";

/**
 * Every photo used on the site, with descriptive alt text.
 * Photos are real Kashmir photographs from Wikimedia Commons, used under
 * their Creative Commons licences (credited on the Gallery page).
 * To use your own photos: drop files in /public/images and add entries here.
 */
export type SiteImage = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: { artist: string; license?: string; licenseUrl?: string | null; source: string };
};

const alts = {
  "srinagar-dal-sunset": "Shikara boats on Dal Lake at sunset with houseboats and the Zabarwan hills, Srinagar",
  "srinagar-houseboats": "Traditional carved wooden houseboats moored on Dal Lake, Srinagar",
  "srinagar-houseboats-2": "Row of Kashmiri houseboats along the shore of Dal Lake",
  "srinagar-dal-dusk": "Dal Lake in Srinagar glowing at dusk",
  "srinagar-dal": "Colourful houseboats on Dal Lake, Srinagar",
  "srinagar-hazratbal": "Shikaras on Dal Lake near Hazratbal beneath snow-covered mountains",
  "srinagar-floating-market": "Houseboats and a shikara on Dal Lake, Srinagar",
  "shikara-dal": "Colourful shikara boat gliding across Dal Lake",
  "shikara-empty": "Shikara among lotus leaves on Dal Lake with houseboats beyond",
  "nishat-bagh": "Terraced lawns and fountains of Nishat Bagh Mughal Garden, Srinagar",
  "nishat-sunset": "Sunset over the terraces of Nishat Bagh Mughal Garden",
  "shalimar-bagh": "Chinar trees and water channels in Shalimar Bagh, Srinagar",
  "gulmarg-gondola": "Gulmarg Gondola cable car rising over snow-covered slopes and pine forest",
  "gulmarg-gondola-2": "Gulmarg Gondola cabins above the snowy meadows",
  "gulmarg-snowfall": "Fresh snowfall over the pine forests of Gulmarg",
  "gulmarg-snowy-sunset": "Snow-covered valley and stream at sunset near Gulmarg",
  "gulmarg-kongdoori": "Snowfields at Kongdoori on the Gulmarg Gondola route",
  "gulmarg-meadow": "Snow-covered meadow in Gulmarg with a small footbridge",
  "gulmarg-jannat": "Panoramic view of Gulmarg, often called heaven on earth",
  "gulmarg-sunset-point": "View from Sunset Point in Gulmarg in summer",
  "pahalgam-valley": "Lidder River winding through the pine-clad Pahalgam valley below snowy peaks",
  "pahalgam-lidder": "The clear Lidder River flowing past Pahalgam",
  "pahalgam-the-lidder": "The Lidder River at Pahalgam",
  "pahalgam-trek": "Trekking trail through a green Kashmir valley near Pahalgam",
  "pahalgam-meadow": "Wide alpine meadow in Pahalgam",
  sonamarg: "Snowy peaks above the pine forest and meadows of Sonamarg",
  "sonamarg-03": "Glacier-fed valley and mountains at Sonamarg",
  "sonamarg-snow": "Snow-capped mountains around Sonamarg",
  "sonamarg-paradise": "Sonamarg valley with river and snowy Himalayan peaks",
  doodhpathri: "Rolling meadows and pine forests of Doodhpathri",
  "doodhpathri-pastures": "Sheep grazing on the green pastures of Doodhpathri",
  "doodhpathri-sheep": "Sheep and horses grazing in the meadows of Doodhpathri",
  "gurez-01": "Traditional log house beneath forested slopes in Gurez Valley",
  "gurez-03": "Traditional wooden architecture in Gurez Valley",
  "gurez-05": "Village houses on the mountain slopes of Gurez Valley",
  "gurez-08": "Traditional log house in Gurez Valley",
  "gulmarg-winter-hero": "Snow-covered hotels and shops in Gulmarg beneath the snowy Apharwat range under a clear blue sky",
  yusmarg: "Green rolling meadows and pine forest at Yusmarg with snow-dusted peaks beyond",
  "yusmarg-valley": "The open meadows of Yusmarg valley in Kashmir",
  "aru-meadow": "The Lidder river flowing past pine forest and village houses in Aru Valley, Pahalgam",
  "aru-valley": "Snow-covered ridges rising above the pine forests of Aru Valley, Pahalgam",
  "aru-horse": "A local man in a pheran, carrying a kangri, leads a hay-laden horse across the snow in Aru Valley, Pahalgam",
} as const;

export type ImageKey = keyof typeof alts;

type CreditRecord = {
  artist: string;
  license?: string;
  licenseUrl?: string | null;
  source: string;
  width: number;
  height: number;
};
const creditMap = credits as Record<string, CreditRecord>;

export const images = Object.fromEntries(
  (Object.keys(alts) as ImageKey[]).map((key) => {
    const c = creditMap[key];
    return [
      key,
      {
        key,
        src: `/images/${key}.jpg`,
        alt: alts[key],
        width: c?.width ?? 1920,
        height: c?.height ?? 1280,
        credit: c ? { artist: c.artist, license: c.license, licenseUrl: c.licenseUrl, source: c.source } : undefined,
      } satisfies SiteImage,
    ];
  }),
) as Record<ImageKey, SiteImage>;

export const img = (key: ImageKey) => images[key];
