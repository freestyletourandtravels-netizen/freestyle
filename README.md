# Freestyle Tour & Travels — Website

Premium travel website for **Freestyle Tour & Travels**, Tangmarg, Kashmir.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Framer Motion.

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 20.9 or newer.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home: hero, highlights, destinations, packages, experiences, gallery preview |
| `/kashmir-tour-packages` | All packages, what's included, travel styles, FAQ |
| `/kashmir-tour-packages/[slug]` | One page per package with a day-wise itinerary (generated from data) |
| `/about-us` | Story, philosophy, why travel with us, destinations |
| `/gallery` | Filterable masonry gallery with a full-screen lightbox |
| `/contact-us` | Contact channels, enquiry form, Google Map |
| `/admin/leads` | Private enquiries viewer (needs `ADMIN_TOKEN`) |

## ⚠️ Before going live

1. **Add the logo.** Put the original logo in `/public` (e.g. `/public/logo.png`). If you have a white version for dark
   backgrounds, add it too (e.g. `/public/logo-white.png`). Then in `src/data/site.ts` set:
   ```ts
   logo: { src: "/logo.png", srcOnDark: "/logo-white.png", width: <real px width>, height: <real px height> }
   ```
   The logo keeps its aspect ratio. Until it's set, a temporary text wordmark is shown.
   Also replace `src/app/icon.svg` (browser tab icon) with an icon made from the logo.
2. **Set `NEXT_PUBLIC_SITE_URL`** to the real domain. Canonical URLs, sitemap, Open Graph and structured data use it.
3. **Configure lead storage** (below) and send a test enquiry.
4. **Review package content** in `src/data/packages.ts`. Itineraries, inclusions and hotel notes are sample content.
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

## Editing content

Everything is data-driven. You don't need to touch the components.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Business name, phone, WhatsApp, email, Instagram, address, logo, map, destinations in forms |
| `src/data/packages.ts` | All tour packages: itinerary, highlights, inclusions, exclusions, hotel, transport, SEO title |
| `src/data/destinations.ts` | The 6 destination cards |
| `src/data/content.ts` | Highlights, "Why choose us", experiences, FAQs |
| `src/data/gallery.ts` | Gallery photos, categories and the home-page preview |
| `src/data/images.ts` | Alt text for every photo |

Add a package by copying an object in `packages.ts` and giving it a new `slug`. Its page, sitemap entry, footer link and
structured data are created automatically.

## Enquiries (leads)

Both the popup and the contact form `POST` to `/api/enquiry`. Input is validated on the client **and** the server
(`src/lib/enquiry-schema.ts`). The endpoint has a hidden spam trap (honeypot) and a simple rate limit. A lead counts as
saved only when at least one storage destination succeeds. Otherwise the visitor sees an error with a one-tap WhatsApp
fallback that carries their details. The site never shows a fake success message.

Configure one or more destinations in `.env.local` / your host's environment settings:

| Variable | Purpose |
| --- | --- |
| `LEADS_FILE_STORAGE` / `LEADS_FILE_PATH` | Appends each lead as a JSON line to `data/leads.jsonl`. Works on a VPS or any Node server with a disk. **Set `LEADS_FILE_STORAGE=false` on Vercel/serverless**, where the disk is read-only. |
| `LEADS_WEBHOOK_URL` | POSTs each lead as JSON to Google Sheets (via Apps Script), Zapier, Make, n8n or a CRM. Recommended for serverless hosting. |
| `RESEND_API_KEY`, `LEADS_NOTIFY_EMAIL`, `LEADS_FROM_EMAIL` | Emails each lead to the business inbox via [Resend](https://resend.com). `LEADS_FROM_EMAIL` must be on a domain verified in Resend. |
| `ADMIN_TOKEN` | Unlocks `/admin/leads` (view and export CSV of file-stored leads). Use a long random string. |

**Simple Google Sheets setup:** create a sheet, then go to Extensions → Apps Script and paste:

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([d.createdAt, d.fullName, "+91 " + d.phone, d.email || "", d.travelDate,
    d.travellers, d.destination, d.packageType || "", d.packageName || "", d.message || "", d.source]);
  return ContentService.createTextOutput("ok");
}
```

Deploy it as a Web app (access: Anyone) and put the URL in `LEADS_WEBHOOK_URL`.

The enquiry popup opens about 1 second after a visitor's first page load, once per browser session. Every "Plan Your
Trip", "Request Price" and "Get a Free Quote" button reopens it, with the package or destination already filled in.

## SEO

- Unique title, description, canonical URL, Open Graph and Twitter card on every page (`src/lib/seo.ts`).
- Structured data: `TravelAgency` (a LocalBusiness and Organization type), `WebSite`, `BreadcrumbList`, `TouristTrip` on each
  package page, `ItemList` of packages, `FAQPage` (the FAQs are visible on the packages page), `ImageGallery`.
- `sitemap.xml`, `robots.txt` and `manifest.webmanifest` are generated from the data files.
- One `<h1>` per page, semantic sections, breadcrumbs, descriptive alt text on every image.

Good SEO foundations help, but no website can guarantee Google rankings. Keep content fresh, add genuine reviews to your
Google Business Profile and earn links from travel sites.

## Photos

All photographs are real Kashmir photos from Wikimedia Commons, used under Creative Commons licences (CC BY / CC BY-SA).
Attribution is shown in the gallery lightbox and in **Photo credits** at the bottom of `/gallery` (data in
`src/data/image-credits.json`). Keep the credits if you keep these photos. Replacing them with your own trip photos is
even better for trust and SEO.

## Performance and accessibility notes

- Images are served as AVIF/WebP at responsive sizes via `next/image`. Only the hero image loads eagerly.
- Above-the-fold animations (hero text, navbar, page transitions) are pure CSS, so content paints straight from the
  server HTML. Framer Motion handles scroll reveals, the popup, the menu, the gallery and the lightbox.
- The enquiry popup is code-split and only loads when it's needed.
- Every animation respects the visitor's reduce-motion setting.
- Swiper.js was not needed: mobile carousels use native CSS scroll-snap, which ships no extra JavaScript.

## Deployment

**Vercel:** import the project, add the environment variables (with `LEADS_FILE_STORAGE=false` and a webhook and/or
Resend), and deploy.
**VPS / Node host:** `npm ci && npm run build && npm start` behind a reverse proxy. File storage works there, but back up
`data/leads.jsonl`.
