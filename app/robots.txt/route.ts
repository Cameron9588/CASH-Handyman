import { NextResponse } from "next/server";

const robots = `User-agent: *
Allow: /
Sitemap: ${process.env.SITE_URL || "https://www.cashhandyman.com"}/sitemap.xml
`;

export async function GET() {
  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
