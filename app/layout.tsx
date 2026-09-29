import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins, Syncopate } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-brachial",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#03185D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "REINVENTORS PAD | UIDE × Diners Club × Raúl Coka Barriga",
  description:
    "El futuro de tus hijos lo reinventas desde hoy. Programa fiduciario y previsor de ahorro educativo universitario en alianza entre UIDE, Diners Club y Raúl Coka Barriga.",
  keywords: [
    "Reinventors PAD",
    "UIDE",
    "Diners Club Ecuador",
    "Raul Coka Barriga",
    "Arizona State University",
    "Ahorro Educativo",
    "Fideicomiso Universitario",
  ],
  authors: [{ name: "UIDE, Diners Club & Raúl Coka Barriga" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${syncopate.variable} h-full antialiased font-poppins`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#313131] font-poppins antialiased selection:bg-[#4C71FC] selection:text-white">
        {children}
      </body>
    </html>
  );
}
