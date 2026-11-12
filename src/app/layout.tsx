import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { JsonLd } from "@/components/ui/JsonLd";
import { travelAgencySchema } from "@/lib/seo";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Kashmir Tour Packages | ${site.name}, Tangmarg`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1920, height: 1269, alt: "Shikara on Dal Lake at sunset, Srinagar" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#243B60",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <EnquiryProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </EnquiryProvider>
        </MotionProvider>
        <JsonLd data={travelAgencySchema()} />
      </body>
    </html>
  );
}
