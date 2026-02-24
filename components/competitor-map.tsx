"use client";

import { useState, useMemo } from "react";
import type { Platform } from "@/lib/platforms-data";

interface PlatformCardProps {
  platform: Platform;
  index: number;
  onViewAnalysis: (platform: Platform) => void;
}

function PlatformCard({ platform, index, onViewAnalysis }: PlatformCardProps) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-secondary p-6 transition-all duration-400 hover:-translate-y-1 hover:border-accent-green hover:bg-card-hover hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-accent-cyan to-accent-green transition-transform duration-400 group-hover:scale-x-100" />

      <div className="mb-4 flex items-start justify-between">
        <div>
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-text-primary no-underline transition-colors duration-300 hover:text-accent-green"
          >
            {platform.name}{" "}
            <span className="text-xs opacity-60">{"↗"}</span>
          </a>
          <div className="mt-1 font-mono text-xs text-text-secondary">
            {platform.region}
          </div>
        </div>
        <span
          className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold uppercase ${
            platform.easySetup === "easy"
              ? "bg-[rgba(0,255,136,0.15)] text-accent-green"
              : "bg-[rgba(0,212,255,0.15)] text-accent-cyan"
          }`}
        >
          {platform.easySetup === "easy" ? "Facil" : "Medio"}
        </span>
      </div>

      <div className="mb-4 flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-accent-green">{"✓"}</span>
          <span className="text-text-secondary">{platform.connection}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span
            className={platform.handoff ? "text-accent-green" : "text-red-500"}
          >
            {platform.handoff ? "✓" : "✗"}
          </span>
          <span className="text-text-secondary">Hand-off humano</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-accent-cyan">{"~"}</span>
          <span className="text-text-secondary">
            Analytics: {platform.analytics}
          </span>
        </div>
      </div>

      <div className="mb-4 text-xs text-text-secondary">{platform.notes}</div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        {platform.userAnalysis.length > 0 ? (
          <button
            onClick={() => onViewAnalysis(platform)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-accent-purple bg-bg-tertiary px-3 py-2 text-xs font-semibold text-text-primary transition-all duration-200 hover:bg-accent-purple hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]"
          >
            Ver Analisis
          </button>
        ) : (
          <div />
        )}
        <div className="text-right">
          <div className="font-mono text-xl font-bold text-accent-green">
            {platform.price}
          </div>
          <div className="text-xs text-text-secondary">/mes</div>
        </div>
      </div>
    </div>
  );
}

interface AnalysisModalProps {
  platform: Platform | null;
  onClose: () => void;
}

function AnalysisModal({ platform, onClose }: AnalysisModalProps) {
  if (!platform) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,14,39,0.8)] p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Analisis de ${platform.name}`}
    >
      <div className="w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl border border-accent-purple bg-bg-secondary shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-[rgba(124,58,237,0.1)] to-transparent p-8">
          <h3 className="text-2xl font-bold text-text-primary">
            {"Analisis de "}{platform.name}
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer border-none bg-transparent text-2xl text-text-secondary transition-colors duration-200 hover:text-red-500"
            aria-label="Cerrar modal"
          >
            {"×"}
          </button>
        </div>
        <div className="p-8 text-text-secondary leading-relaxed">
          <ul className="list-none space-y-4">
            {platform.userAnalysis.map((item, i) => {
              const parts = item.split(": ");
              const title = parts[0];
              const desc = parts.slice(1).join(": ");
              return (
                <li key={i} className="relative pl-6">
                  <span className="absolute left-0 top-1 text-xs text-accent-purple">
                    {"➤"}
                  </span>
                  <strong className="text-accent-cyan">{title}:</strong> {desc}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface PlatformTableProps {
  platforms: Platform[];
}

function PlatformTable({ platforms }: PlatformTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-secondary">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="sticky top-0 z-10 bg-bg-tertiary">
            <tr>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Plataforma
              </th>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Region
              </th>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Setup
              </th>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Conexion
              </th>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Hand-off
              </th>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Analytics
              </th>
              <th className="border-b-2 border-border p-4 text-left text-sm font-semibold text-accent-green whitespace-nowrap">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr key={p.name} className="transition-colors hover:bg-card-hover">
                <td className="border-b border-border p-4 text-sm">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-text-primary no-underline transition-colors hover:text-accent-green"
                  >
                    {p.name} {"↗"}
                  </a>
                </td>
                <td className="border-b border-border p-4 text-sm text-text-secondary">
                  {p.region}
                </td>
                <td className="border-b border-border p-4 text-sm text-text-secondary">
                  {p.easySetup === "easy" ? "Facil" : "Medio"}
                </td>
                <td className="border-b border-border p-4 text-sm text-text-secondary">
                  {p.connection}
                </td>
                <td className="border-b border-border p-4 text-sm">
                  <span className={p.handoff ? "text-accent-green" : "text-red-500"}>
                    {p.handoff ? "✓" : "✗"}
                  </span>
                </td>
                <td className="border-b border-border p-4 text-sm text-text-secondary">
                  {p.analytics}
                </td>
                <td className="border-b border-border p-4 text-sm font-bold text-accent-green">
                  {p.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CompetitorMap() {
  const [view, setView] = useState<"cards" | "table">("table");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  const { platforms: allPlatforms } = require("@/lib/platforms-data");

  const filteredPlatforms = useMemo(() => {
    let filtered = allPlatforms as Platform[];

    if (filter === "easy") {
      filtered = filtered.filter((p: Platform) => p.easySetup === "easy");
    } else if (filter === "latam") {
      filtered = filtered.filter((p: Platform) => p.isLatam);
    } else if (filter === "cheap") {
      filtered = filtered.filter((p: Platform) => p.priceNum < 50);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p: Platform) =>
          p.name.toLowerCase().includes(s) ||
          p.region.toLowerCase().includes(s) ||
          p.notes.toLowerCase().includes(s) ||
          p.connection.toLowerCase().includes(s)
      );
    }

    return filtered;
  }, [allPlatforms, filter, search]);

  const filters = [
    { key: "all", label: "Todas" },
    { key: "easy", label: "Facil Setup" },
    { key: "latam", label: "LATAM" },
    { key: "cheap", label: "Economico" },
  ];

  return (
    <>
      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 rounded-2xl border border-border bg-bg-secondary p-6 animate-fade-in">
        <div className="min-w-[250px] flex-1">
          <input
            type="text"
            placeholder="Buscar plataforma, caracteristica o pais..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-bg-tertiary p-3 font-sans text-sm text-text-primary transition-all duration-300 outline-none focus:border-accent-green focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`cursor-pointer rounded-xl border px-4 py-2 font-sans text-sm font-semibold transition-all duration-300 ${
                filter === f.key
                  ? "border-accent-green bg-accent-green text-bg-primary"
                  : "border-border bg-bg-tertiary text-text-secondary hover:border-accent-green hover:text-accent-green"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView("cards")}
            className={`cursor-pointer rounded-xl border px-4 py-2 font-mono text-sm transition-all duration-300 ${
              view === "cards"
                ? "border-accent-purple bg-accent-purple text-text-primary"
                : "border-border bg-bg-tertiary text-text-secondary"
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setView("table")}
            className={`cursor-pointer rounded-xl border px-4 py-2 font-mono text-sm transition-all duration-300 ${
              view === "table"
                ? "border-accent-purple bg-accent-purple text-text-primary"
                : "border-border bg-bg-tertiary text-text-secondary"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Cards View */}
      {view === "cards" && (
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPlatforms.map((platform: Platform, index: number) => (
            <PlatformCard
              key={platform.name}
              platform={platform}
              index={index}
              onViewAnalysis={setSelectedPlatform}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && <PlatformTable platforms={filteredPlatforms} />}

      {/* Analysis Modal */}
      {selectedPlatform && (
        <AnalysisModal
          platform={selectedPlatform}
          onClose={() => setSelectedPlatform(null)}
        />
      )}
    </>
  );
}
