import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Frost | Premium Creator Profile",
  description: "Official link-in-bio for Frost. Premium content and lifestyle updates.",
  openGraph: {
    title: "Frost | Premium Creator Profile 🍒🍑",
    description: "Γιατί να διαλέξεις ενώ μπορείς να τα εχεις και τα δυο; Μπες τώρα για το αποκλειστικό περιεχόμενο.",
    url: "https://frost.com",
    siteName: "Frost Official",
    images: [
      {
        url: "/zanna_1.jpg",
        width: 800,
        height: 800,
        alt: "Frost Premium Profile",
      },
    ],
    locale: "el_GR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frost | Exclusive Content",
    description: "Γιατί να διαλέξεις ενώ μπορείς να τα εχεις και τα δυο; 🍒",
    images: ["/zanna_1.jpg"],
  },
  themeColor: "#fbcfe8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="overscroll-none">
      <body className={`${inter.className} antialiased bg-black overscroll-none`}>
        {children}
      </body>
    </html>
  );
}
