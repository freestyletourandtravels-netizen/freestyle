import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#243B60",
    icons: [{ src: "/logo.png", sizes: "432x432", type: "image/png" }],
  };
}
