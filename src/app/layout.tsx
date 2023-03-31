import "./globals.css";
import "./raycast.scss";

import { Inter } from "next/font/google";

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
    creator: "@fedevitaledev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
