import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "C.A.S.H. Handyman & Remodeling — Abilene, TX",
  description:
    "Family-owned handyman and remodeling serving Abilene and surrounding areas. Decks, fences, roofing, painting, and more.",
  keywords: [
    "handyman",
    "remodeling",
    "Abilene",
    "deck repair",
    "deck construction",
    "fence installation",
    "roofing",
    "painting",
  ],
  authors: [{ name: "C.A.S.H. Handyman & Remodeling", url: "mailto:Cameron.sargent@yahoo.com" }],
  openGraph: {
    title: "C.A.S.H. Handyman & Remodeling",
    description:
      "Family-owned handyman and remodeling serving Abilene and surrounding areas.",
    images: ["/project18.jpg.jpg"],
    siteName: "C.A.S.H. Handyman & Remodeling",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "C.A.S.H. Handyman & Remodeling",
    description: "Family-owned handyman and remodeling serving Abilene and surrounding areas.",
    images: ["/project18.jpg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
