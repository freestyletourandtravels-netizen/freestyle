/**
 * Central business information. Edit here and it updates everywhere
 * (navbar, footer, contact page, WhatsApp links, structured data, SEO).
 */
export const site = {
  name: "Freestyle Tour & Travels",
  shortName: "Freestyle",
  tagline: "Happiness Will Happen!",
  description:
    "Freestyle Tour & Travels is a Kashmir travel agency in Tangmarg offering personalised Kashmir tour packages to Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri and Gurez Valley.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.freestyletourandtravels.com").replace(/\/$/, ""),
  phone: "+91 7889649774",
  phoneHref: "tel:+917889649774",
  whatsappNumber: "917889649774",
  email: "Freestyletourandtravels@gmail.com",
  instagramHandle: "freestyle__tour_and_travels",
  instagramUrl: "https://www.instagram.com/freestyle__tour_and_travels/",
  facebookUrl: "https://www.facebook.com/share/p/1CGGn43VkS/",
  address: {
    locality: "Tangmarg",
    region: "Jammu & Kashmir",
    regionSchema: "Jammu and Kashmir",
    country: "India",
    countryCode: "IN",
    full: "Tangmarg, Kashmir, Jammu & Kashmir, India",
  },
  mapsEmbedUrl: "https://www.google.com/maps?q=Tangmarg,+Jammu+and+Kashmir,+India&z=13&output=embed",
  mapsLinkUrl: "https://www.google.com/maps/search/?api=1&query=Tangmarg%2C+Jammu+and+Kashmir%2C+India",

  /**
   * LOGO — place the original logo file in /public and set its path + real
   * pixel dimensions here. `srcOnDark` is optional (a white/light version for
   * the transparent navbar and the navy footer). While `src` is null, a
   * typographic wordmark is shown instead.
   */
  logo: {
    src: "/logo.png" as string | null,
    srcOnDark: null as string | null, // e.g. "/logo-white.png"
    width: 432,
    height: 432,
  },
  ogImage: "/images/srinagar-dal-sunset.jpg",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kashmir-tour-packages", label: "Kashmir Packages" },
  { href: "/about-us", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

export const destinationOptions = [
  "Srinagar",
  "Gulmarg",
  "Pahalgam",
  "Sonamarg",
  "Doodhpathri",
  "Gurez Valley",
  "Yusmarg",
  "Aru Valley",
  "Complete Kashmir Tour",
  "Not sure yet",
] as const;

/** Trip styles. Used by the enquiry form and the package filters. */
export const packageCategoryOptions = [
  "Family Holiday",
  "Honeymoon",
  "Luxury Escape",
  "Adventure",
  "Group Tour",
  "Customized Kashmir Tour",
] as const;
export type PackageCategoryOption = (typeof packageCategoryOptions)[number];

export const hotelPreferenceOptions = ["Budget", "Standard (3 star)", "Premium (4 star)", "Luxury (5 star)", "Houseboat + Hotel", "Not sure yet"] as const;

/** Country codes offered in the phone field. India is the default. */
export const phoneCountryCodes = [
  { code: "91", label: "India +91" },
  { code: "971", label: "UAE +971" },
  { code: "966", label: "Saudi Arabia +966" },
  { code: "974", label: "Qatar +974" },
  { code: "965", label: "Kuwait +965" },
  { code: "968", label: "Oman +968" },
  { code: "973", label: "Bahrain +973" },
  { code: "1", label: "USA / Canada +1" },
  { code: "44", label: "UK +44" },
  { code: "61", label: "Australia +61" },
  { code: "65", label: "Singapore +65" },
  { code: "60", label: "Malaysia +60" },
  { code: "49", label: "Germany +49" },
  { code: "33", label: "France +33" },
  { code: "880", label: "Bangladesh +880" },
  { code: "977", label: "Nepal +977" },
] as const;
