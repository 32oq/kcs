import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kashmir Cascade — Premium Travel Packages",
  description:
    "Discover paradise on earth with Kashmir Cascade — J&K's most trusted travel company. Luxury honeymoons, alpine treks, photography expeditions and more from ₹12,499.",
  keywords: [
    "Kashmir tour packages",
    "Kashmir honeymoon",
    "Dal Lake houseboat",
    "Kashmir Great Lakes Trek",
    "Gulmarg skiing",
    "JKEA certified travel",
  ],
  openGraph: {
    title: "Kashmir Cascade — Explore Paradise on Earth",
    description: "Premium Kashmir travel packages by J&K's most trusted travel company.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="overflow-x-hidden antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
