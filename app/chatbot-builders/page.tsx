import { Navbar } from "@/components/navbar";
import { ChatbotBuildersContent } from "@/components/chatbot-builders";

export const metadata = {
  title: "Chat Duo - Analisis de Competencia: Bot Builders para WhatsApp e Instagram",
  description: "Comparativa de plataformas de creacion de bots self-service para WhatsApp e Instagram",
};

export default function ChatbotBuildersPage() {
  return (
    <main className="relative z-10 mx-auto max-w-[1400px] px-8 py-12">
      <Navbar />

      <header className="mb-12 text-center animate-fade-in-down">
        <h1 className="mb-2 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-balance text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
          Analisis de Competencia: Chat Duo
        </h1>
        <p className="mx-auto max-w-3xl text-text-secondary leading-relaxed">
          Comparativa de plataformas de creacion de bots self-service para{" "}
          <strong className="text-accent-green">WhatsApp</strong> e{" "}
          <strong className="text-accent-purple">Instagram</strong>. Analisis de precios,
          funcionalidades y posicionamiento de mercado para el lanzamiento de Chat Duo.
        </p>
      </header>

      <ChatbotBuildersContent />
    </main>
  );
}
