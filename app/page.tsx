import { Navbar } from "@/components/navbar";
import { CompetitorMap } from "@/components/competitor-map";
import {
  TopPlatforms,
  PriceAnalysis,
  StatisticalAnalysis,
} from "@/components/price-analysis";

export default function HomePage() {
  return (
    <main className="relative z-10 mx-auto max-w-[1400px] px-8 py-12">
      <Navbar />

      <header className="mb-16 text-center animate-fade-in-down">
        <h1 className="mb-2 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-balance text-4xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl">
          Mapa de Competidores 2025
        </h1>
        <p className="mx-auto max-w-3xl text-text-secondary leading-relaxed">
          Analisis profundo de plataformas de agentes IA para WhatsApp Business.
          <br />
          <span className="text-sm text-accent-purple">
            Incluye analisis de experiencia de usuario real
          </span>
        </p>
      </header>

      <CompetitorMap />

      <TopPlatforms />
      <PriceAnalysis />
      <StatisticalAnalysis />
    </main>
  );
}
