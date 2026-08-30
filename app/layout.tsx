import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const baseMetadata: Metadata = {
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
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "agmanufacturing.com.np";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    ...baseMetadata,
    openGraph: {
      type: "website",
      locale: "en_NP",
      url: origin,
      siteName: "A.G. Manufacturing & Trading",
      title: "Performance That Keeps Nepal Moving",
      description:
        "Premium automotive, agricultural and industrial lubricants manufactured in Manigram, Nepal.",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "A.G. Manufacturing & Trading — Performance That Keeps Nepal Moving" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Performance That Keeps Nepal Moving",
      description: "Premium lubricants manufactured in Nepal.",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0f12",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NP">
      <body>{children}</body>
    </html>
  );
}
