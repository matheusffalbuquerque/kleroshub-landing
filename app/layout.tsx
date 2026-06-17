import type { Metadata } from "next";
import { Amatic_SC, Bodoni_Moda, Montserrat } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "KlerosHub | Plano Bíblico",
  description:
    "Planos bíblicos, panoramas e sistema de organização para igrejas.",
};

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  style: ["italic"],
  display: "swap",
});

const hand = Amatic_SC({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable} ${hand.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
