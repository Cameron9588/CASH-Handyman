import { NextResponse } from "next/server";

const siteUrl = process.env.SITE_URL || "https://www.cashhandyman.com";
const today = new Date().toISOString();

const pages = [
  {
    loc: `${siteUrl}/`,
    lastmod: today,
  },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `<url><loc>${page.loc}</loc><lastmod>${page.lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
    .join("\n  ")}
</urlset>`;

export async function GET() {
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
