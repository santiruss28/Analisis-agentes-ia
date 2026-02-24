import { Navbar } from "@/components/navbar";
import { PreciosCRMContent } from "@/components/precios-crm";

export const metadata = {
  title: "Mapa de Precios CRM - Analisis de Competencia",
  description: "Comparativa de costos de implementacion y fees mensuales para plataformas CRM con IA",
};

export default function PreciosPage() {
  return (
    <main className="relative z-10 mx-auto max-w-[1200px] px-8 py-12">
      <Navbar />

      <header className="mb-12 text-center animate-fade-in-down">
        <h1 className="mb-2 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-balance text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
          Mapa de Precios de Competencia
        </h1>
        <p className="text-text-secondary">
          Comparativa de costos de implementacion (Set up) y Fees mensuales para plataformas CRM con IA.
        </p>
      </header>

      <PreciosCRMContent />
    </main>
  );
}
