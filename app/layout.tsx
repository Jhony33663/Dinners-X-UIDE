import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#08090C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "REINVENTORS PAD | UIDE × Diners Club × Raúl Coka Barriga",
  description:
    "El futuro de tus hijos no se espera: se reinventa desde hoy. Programa fiduciario de ahorro universitario con respaldo Diners Club, seguros Raúl Coka Barriga y vinculación a Arizona State University.",
  keywords: [
    "Reinventors PAD",
    "UIDE",
    "Diners Club Ecuador",
    "Raul Coka Barriga",
    "Arizona State University",
    "Ahorro Universitario",
    "Fondo Educativo",
  ],
  authors: [{ name: "UIDE & Diners Club" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08090C] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
