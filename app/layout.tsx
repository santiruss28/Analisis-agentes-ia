import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Analisis Agentes IA - WhatsApp Business 2025",
  description:
    "Mapa de competidores y analisis de plataformas de agentes IA para WhatsApp Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${sora.variable} ${jetbrainsMono.variable} font-sans`}>
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
