import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Zanna Frost | Premium Creator Profile",
  description: "Official link-in-bio for Zanna Frost. Premium content and lifestyle updates.",
  openGraph: {
    title: "Zanna Frost | Premium Creator Profile 🍒🍑",
    description: "Γιατί να διαλέξεις ενώ μπορείς να τα εχεις και τα δυο; Μπες τώρα για το αποκλειστικό περιεχόμενο.",
    url: "https://zannafrost.com",
    siteName: "Zanna Frost Official",
    images: [
      {
        url: "/frika_1.jpg",
        width: 800,
        height: 800,
        alt: "Zanna Frost Premium Profile",
      },
    ],
    locale: "el_GR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanna Frost | Exclusive Content",
    description: "Γιατί να διαλέξεις ενώ μπορείς να τα εχεις και τα δυο; 🍒",
    images: ["/frika_1.jpg"],
  },
  icons: {
    icon: "/frika_1.jpg",
    apple: "/frika_1.jpg",
    shortcut: "/frika_1.jpg",
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
