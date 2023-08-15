import "./globals.css";
import Provider from "./provider";
import "./raycast.scss";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Raycast Music",
  description: "Raycast Music extension",
  authors: [
    {
      name: "Federico Vitale",
      url: "https://fedevitale.dev",
    },
  ],
  twitter: {
    site: "@fedevitaledev",
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    images: [
      {
        alt: "Raycast Music",
        url: "/og-image.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="max-md:overflow-hidden">
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
