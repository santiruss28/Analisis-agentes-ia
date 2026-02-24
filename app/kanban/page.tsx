import { Navbar } from "@/components/navbar";
import { KanbanCRMContent } from "@/components/kanban-crm";

export const metadata = {
  title: "CRM WhatsApp + Tableros Kanban - Analisis 2026",
  description: "Analisis de 9 plataformas CRM con vista Kanban nativa para gestion de WhatsApp",
};

export default function KanbanPage() {
  return (
    <main className="relative z-10 mx-auto max-w-[1400px] px-8 py-12">
      <Navbar />

      <header className="mb-12 text-center animate-fade-in-down">
        <h1 className="mb-2 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-balance text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
          CRM WhatsApp + Tableros Kanban
        </h1>
        <p className="mx-auto max-w-3xl text-text-secondary">
          Analisis de 9 plataformas CRM con vista Kanban nativa para gestion de WhatsApp.
        </p>
      </header>

      <KanbanCRMContent />
    </main>
  );
}
