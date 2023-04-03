import "./globals.css";
import Provider from "./provider";
import "./raycast.scss";
import { getVisitorFingerprint } from "@/lib/analytics.server";
import PageViews from "@/components/Tracker";
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
  const fingerprint = getVisitorFingerprint();

  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          <PageViews visitorId={fingerprint} />
        </Provider>

        <Analytics />
      </body>
    </html>
  );
}
