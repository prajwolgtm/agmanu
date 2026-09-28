import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agmanu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "A.G. Manufacturing & Trading | Premium Lubricants Made in Nepal",
  description:
    "Automotive, agricultural and industrial lubricants, greases and specialty fluids manufactured in Manigram, Nepal. Explore Loaded and A.G. Lube products.",
  applicationName: "A.G. Manufacturing & Trading",
  keywords: [
    "lubricants Nepal",
    "engine oil Nepal",
    "Loaded lubricants",
    "AG Lube",
    "hydraulic oil",
    "gear oil",
    "automotive grease",
  ],
  icons: {
    icon: "/ag-logo.png",
    shortcut: "/ag-logo.png",
    apple: "/ag-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: siteUrl,
    siteName: "A.G. Manufacturing & Trading",
    title: "Performance That Keeps Nepal Moving",
    description:
      "Premium automotive, agricultural and industrial lubricants manufactured in Manigram, Nepal.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "A.G. Manufacturing & Trading — Performance That Keeps Nepal Moving" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance That Keeps Nepal Moving",
    description: "Premium lubricants manufactured in Nepal.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0f12",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
