"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
  ZAxis,
} from "recharts";

interface BotPlatform {
  name: string;
  connection: string;
  type: string;
  price: number;
  complexity: string;
  instagram: boolean;
  oficial: boolean;
  hasIA: boolean;
  notes: string;
}

const botPlatforms: BotPlatform[] = [
  { name: "ManyChat", connection: "Cloud API Oficial", type: "Plataforma. Solo Bot", price: 15, complexity: "Media", instagram: true, oficial: true, hasIA: false, notes: "Popular por su facilidad. Funcionalidad de IA limitada o cobra extra." },
  { name: "UChat", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 29, complexity: "Alta", instagram: true, oficial: true, hasIA: true, notes: "Buen precio con IA, pero complejidad en configuracion de IA." },
  { name: "Chatfuel", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 39, complexity: "Media", instagram: true, oficial: true, hasIA: true, notes: "Popular por su facilidad. Buen equilibrio precio-funcionalidad." },
  { name: "Typebot", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 46, complexity: "Media", instagram: false, oficial: true, hasIA: true, notes: "No es omnicanal (sin Instagram). Buen builder visual." },
  { name: "Voiceflow", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 60, complexity: "Muy Alta", instagram: true, oficial: true, hasIA: true, notes: "Maxima personalizacion. Disenada para equipos tecnicos." },
  { name: "Botpress", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 89, complexity: "Alta", instagram: true, oficial: true, hasIA: true, notes: "APIs robustas y capacidades avanzadas de IA. Curva de aprendizaje alta." },
  { name: "Parlabots", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 110, complexity: "Muy Alta", instagram: true, oficial: true, hasIA: true, notes: "Maxima personalizacion. Costos prohibitivos para PyMEs tipicas." },
  { name: "Botmaker", connection: "Cloud API Oficial", type: "Plataforma. Bot + IA", price: 149, complexity: "Alta", instagram: true, oficial: true, hasIA: true, notes: "Incluye $99 USD de setup. Disenado para integradores o empresas grandes." },
  { name: "WAPLUS", connection: "Integracion No Oficial", type: "Extension Chrome. Solo Bot", price: 15, complexity: "Media", instagram: false, oficial: false, hasIA: false, notes: "Extension de Chrome. Conexion no oficial, riesgo de bloqueo." },
  { name: "WhatsAuto", connection: "Integracion No Oficial", type: "App Smartphone. Solo Bot", price: 10, complexity: "Baja", instagram: false, oficial: false, hasIA: false, notes: "Solo respuesta automatica simple. Alta inestabilidad." },
  { name: "AutoResponder", connection: "Integracion No Oficial", type: "App Smartphone. Solo Bot", price: 7, complexity: "Baja", instagram: false, oficial: false, hasIA: false, notes: "El mas barato. Funcionalidad muy limitada." },
];

const segments = [
  {
    name: "Segmento 1: Soluciones No Oficiales / Bajo Costo",
    color: "#ff6464",
    range: "$7 - $15 USD",
    platforms: ["WAPLUS", "WhatsAuto", "AutoResponder"],
    features: [
      "Precio base muy bajo",
      "Conexion no oficial, alta inestabilidad y riesgo de bloqueo",
      "Funcionalidad limitada (solo respuesta automatica simple)",
      "No apto para PyMEs que dependan de comunicacion estable",
    ],
    conclusion: "Chat Duo no compite en este segmento, ya que su propuesta de valor esta basada en la seguridad y la IA avanzada (Cloud API Oficial).",
  },
  {
    name: "Segmento 2: Chatbot Builders Oficiales / Precio Medio",
    color: "#00d4ff",
    range: "$15 - $46 USD",
    platforms: ["ManyChat", "Chatfuel", "UChat", "Typebot"],
    features: [
      "Buen equilibrio entre precio y funcionalidad",
      "ManyChat y Chatfuel son populares por su facilidad",
      "IA avanzada limitada, se cobra extra o es dificil de implementar",
      "UChat y Typebot tienen complejidades en configuracion de IA",
    ],
    conclusion: "Posicionarse en el extremo superior de este segmento ($45 - $70 USD) ofreciendo una integracion de IA mucho mas sencilla y potente.",
  },
  {
    name: "Segmento 3: Plataformas de IA y Enterprise / Alto Costo",
    color: "#7c3aed",
    range: "$60 - $149 USD",
    platforms: ["Voiceflow", "Botpress", "Parlabots", "Botmaker"],
    features: [
      "Maxima personalizacion, APIs robustas y capacidades avanzadas de IA",
      "Curva de aprendizaje muy alta",
      "Costos prohibitivos para la PyME tipica argentina",
      "Disenadas para integradores o grandes empresas",
    ],
    conclusion: "Chat Duo debe evitar ser percibido como competidor directo. La clave es ofrecer una porcion de la potencia de IA de este segmento a un precio del Segmento 2.",
  },
];

const valuePropItems = [
  { title: "Seguridad y Estabilidad", desc: "Cloud API oficial de Meta para garantizar la seguridad de la cuenta de WhatsApp y rendimiento sin interrupciones." },
  { title: "Omnicanalidad Real", desc: "Constructor unificado para WhatsApp e Instagram sin necesidad de herramientas o integraciones separadas." },
  { title: "IA Accesible", desc: "Agentes de IA avanzada que realizan tareas complejas (resumenes, clasificacion de leads, generacion de contenido) sin programacion." },
  { title: "Precios Transparentes", desc: "Sin costos ocultos por volumen de conversaciones o complejidad de nodos. Suscripcion clara y predecible." },
];

const criteria = [
  { title: "1. Tipo de Conexion", desc: "Filtro de seguridad principal: Cloud API oficial de Meta vs. metodos no oficiales (WhatsApp Web/QR). Vital para garantizar estabilidad y evitar bloqueos de cuenta." },
  { title: "2. Omnicanalidad", desc: "Capacidad de gestionar flujos tanto en WhatsApp como en Instagram desde un mismo constructor, sin herramientas separadas." },
  { title: "3. Independencia del CRM", desc: "Chatbot Builders puros que funcionen como motor de automatizacion e integren con cualquier sistema existente via Webhooks o Make/Zapier." },
  { title: "4. Nivel de Complejidad", desc: "Curva de aprendizaje evaluada: desde Baja (reglas sencillas) hasta Muy Alta (plataformas para desarrolladores con codigo e IA propia)." },
];

export function ChatbotBuildersContent() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = [...botPlatforms];

    if (filter === "oficial") result = result.filter((p) => p.oficial);
    else if (filter === "instagram") result = result.filter((p) => p.instagram);
    else if (filter === "ia") result = result.filter((p) => p.hasIA);
    else if (filter === "economico") result = result.filter((p) => p.price < 50);

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.type.toLowerCase().includes(s) ||
          p.connection.toLowerCase().includes(s) ||
          p.notes.toLowerCase().includes(s)
      );
    }

    return result;
  }, [filter, search]);

  const stats = useMemo(() => {
    const prices = botPlatforms.map((p) => p.price);
    const oficialPrices = botPlatforms.filter((p) => p.oficial).map((p) => p.price);
    const sorted = [...prices].sort((a, b) => a - b);
    const n = prices.length;
    const avg = (prices.reduce((a, b) => a + b, 0) / n).toFixed(0);
    const median = n % 2 === 0 ? ((sorted[n / 2 - 1] + sorted[n / 2]) / 2).toFixed(0) : sorted[Math.floor(n / 2)].toString();
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avgOficial = (oficialPrices.reduce((a, b) => a + b, 0) / oficialPrices.length).toFixed(0);
    return { avg, median, min, max, count: n, avgOficial, oficialCount: oficialPrices.length };
  }, []);

  const barChartData = useMemo(() => {
    return [...botPlatforms].sort((a, b) => a.price - b.price).map((p) => ({
      name: p.name,
      price: p.price,
      color: p.oficial ? "rgba(0, 255, 136, 0.6)" : "rgba(255, 100, 100, 0.6)",
    }));
  }, []);

  const complexityMap: Record<string, number> = { Baja: 1, Media: 2, Alta: 3, "Muy Alta": 4 };
  const complexityColorMap: Record<string, string> = { Baja: "#00ff88", Media: "#00d4ff", Alta: "#ff8800", "Muy Alta": "#ff4040" };

  const scatterData = botPlatforms.map((p) => ({
    x: complexityMap[p.complexity] || 2,
    y: p.price,
    z: p.instagram ? 200 : 80,
    name: p.name,
    complexity: p.complexity,
    color: complexityColorMap[p.complexity] || "#00d4ff",
  }));

  const filters = [
    { key: "all", label: "Todas" },
    { key: "oficial", label: "API Oficial" },
    { key: "instagram", label: "Instagram" },
    { key: "ia", label: "Bot + IA" },
    { key: "economico", label: "< $50" },
  ];

  const complexityBadge = (c: string) => {
    const map: Record<string, string> = {
      Baja: "bg-[rgba(0,255,136,0.15)] text-accent-green",
      Media: "bg-[rgba(0,212,255,0.15)] text-accent-cyan",
      Alta: "bg-[rgba(255,136,0,0.15)] text-[#ff8800]",
      "Muy Alta": "bg-[rgba(255,64,64,0.15)] text-[#ff4040]",
    };
    return map[c] || "";
  };

  return (
    <div className="space-y-12">
      {/* Value Proposition */}
      <div className="animate-fade-in rounded-2xl border border-border bg-bg-secondary p-8">
        <h2 className="mb-4 text-xl font-bold text-accent-green">Propuesta de Valor de Chat Duo</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {valuePropItems.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-bg-tertiary p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green">
              <h3 className="mb-2 text-sm font-semibold text-accent-cyan">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-bg-secondary p-6">
        <div className="min-w-[250px] flex-1">
          <input
            type="text"
            placeholder="Buscar plataforma, tipo, conexion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-bg-tertiary p-3 font-sans text-sm text-text-primary transition-all outline-none focus:border-accent-green focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`cursor-pointer rounded-xl border px-4 py-2 font-sans text-sm font-medium transition-all ${
                filter === f.key
                  ? "border-accent-green bg-gradient-to-r from-[rgba(0,255,136,0.15)] to-[rgba(0,212,255,0.15)] text-accent-green"
                  : "border-border bg-bg-tertiary text-text-secondary hover:border-accent-green hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("cards")}
            className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition-all ${view === "cards" ? "border-accent-cyan bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-[rgba(124,58,237,0.15)] text-accent-cyan" : "border-border bg-bg-tertiary text-text-secondary"}`}
          >
            Cards
          </button>
          <button
            onClick={() => setView("table")}
            className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition-all ${view === "table" ? "border-accent-cyan bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-[rgba(124,58,237,0.15)] text-accent-cyan" : "border-border bg-bg-tertiary text-text-secondary"}`}
          >
            Tabla
          </button>
        </div>
      </div>

      {/* Cards View */}
      {view === "cards" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <div
              key={p.name}
              className="animate-fade-in-up rounded-2xl border border-border bg-bg-secondary p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green hover:bg-card-hover hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="text-lg font-bold text-text-primary transition-colors hover:text-accent-green">{p.name}</div>
                  <div className="mt-1 text-xs italic text-text-secondary">{p.type}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${p.oficial ? "border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.15)] text-accent-green" : "border-[rgba(255,100,100,0.3)] bg-[rgba(255,100,100,0.15)] text-[#ff6464]"}`}>
                    {p.oficial ? "API Oficial" : "No Oficial"}
                  </span>
                  <span className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold ${complexityBadge(p.complexity)}`}>
                    {p.complexity}
                  </span>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {p.instagram && (
                  <span className="rounded-lg border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.1)] px-3 py-1 text-xs text-accent-purple">Instagram</span>
                )}
                {p.hasIA ? (
                  <span className="rounded-lg border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.1)] px-3 py-1 text-xs text-accent-cyan">IA Integrada</span>
                ) : (
                  <span className="rounded-lg border border-border bg-bg-tertiary px-3 py-1 text-xs text-text-secondary">Solo Bot</span>
                )}
                <span className="rounded-lg border border-border bg-bg-tertiary px-3 py-1 text-xs text-text-secondary">{p.connection}</span>
              </div>
              <p className="mb-4 text-sm text-text-secondary">{p.notes}</p>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="font-mono text-2xl font-bold text-accent-green">${p.price}</div>
                <div className="text-xs text-text-secondary">USD/mes</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse bg-bg-secondary">
              <thead className="sticky top-0 z-10 bg-bg-tertiary">
                <tr>
                  <th className="border-b-2 border-accent-green p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Plataforma</th>
                  <th className="border-b-2 border-accent-green p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Conexion</th>
                  <th className="border-b-2 border-accent-green p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Tipo</th>
                  <th className="border-b-2 border-accent-green p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Precio</th>
                  <th className="border-b-2 border-accent-green p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Complejidad</th>
                  <th className="border-b-2 border-accent-green p-4 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">Instagram</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.name} className="transition-colors hover:bg-card-hover">
                    <td className="border-b border-border p-4 font-bold text-text-primary">{p.name}</td>
                    <td className="border-b border-border p-4 text-sm">
                      <span className={p.oficial ? "text-accent-green" : "text-[#ff6464]"}>{p.oficial ? "Oficial" : "No Oficial"}</span>
                    </td>
                    <td className="border-b border-border p-4 text-sm text-text-secondary">{p.type}</td>
                    <td className="border-b border-border p-4 font-mono font-bold text-accent-green">${p.price} USD</td>
                    <td className="border-b border-border p-4">
                      <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${complexityBadge(p.complexity)}`}>{p.complexity}</span>
                    </td>
                    <td className="border-b border-border p-4 text-center text-lg">{p.instagram ? <span className="text-accent-green">{"Yes"}</span> : <span className="text-red-500">{"No"}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats */}
      <div>
        <h2 className="mb-8 bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-center text-3xl font-bold text-transparent">Analisis de Precios</h2>
        <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-bg-tertiary p-8 text-center">
            <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">Precio Promedio</div>
            <div className="mt-2 text-4xl font-bold text-accent-cyan">${stats.avg}</div>
            <div className="mt-1 text-xs text-text-secondary">USD/mes (n={stats.count})</div>
          </div>
          <div className="rounded-2xl border border-border bg-bg-tertiary p-8 text-center">
            <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">Mediana</div>
            <div className="mt-2 text-4xl font-bold text-accent-green">${stats.median}</div>
            <div className="mt-1 text-xs text-text-secondary">50% estan por debajo</div>
          </div>
          <div className="rounded-2xl border border-border bg-bg-tertiary p-8 text-center">
            <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">Rango</div>
            <div className="mt-2 text-4xl font-bold text-[#ff8800]">${stats.min}-${stats.max}</div>
            <div className="mt-1 text-xs text-text-secondary">Min - Max</div>
          </div>
          <div className="rounded-2xl border border-border bg-bg-tertiary p-8 text-center">
            <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">Promedio API Oficial</div>
            <div className="mt-2 text-4xl font-bold text-accent-purple">${stats.avgOficial}</div>
            <div className="mt-1 text-xs text-text-secondary">Solo oficiales (n={stats.oficialCount})</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div>
        <h2 className="mb-8 bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-center text-3xl font-bold text-transparent">Visualizacion de Precios</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="mb-4 text-center text-sm text-accent-cyan">Precio Base por Plataforma</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ backgroundColor: "#111936", border: "1px solid rgba(148,163,184,0.1)", borderRadius: "12px", color: "#fff" }} />
                <Bar dataKey="price" radius={[4, 4, 0, 0]} name="Precio USD/mes">
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="mb-4 text-center text-sm text-accent-cyan">Precio vs Complejidad</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" dataKey="x" domain={[0.5, 4.5]} tick={{ fill: "#94a3b8" }} tickFormatter={(v) => ["", "Baja", "Media", "Alta", "Muy Alta"][v] || ""} />
                <YAxis type="number" dataKey="y" tick={{ fill: "#94a3b8" }} tickFormatter={(v) => `$${v}`} />
                <ZAxis type="number" dataKey="z" range={[50, 200]} />
                <Tooltip content={({ payload }) => {
                  if (!payload || !payload[0]) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-border bg-bg-secondary p-3 text-sm text-text-primary">
                      <div className="font-bold">{d.name}</div>
                      <div>${d.y} | {d.complexity}</div>
                    </div>
                  );
                }} />
                <Scatter data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color + "80"} stroke={entry.color} strokeWidth={2} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Segmentation */}
      <div>
        <h2 className="mb-8 bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-center text-3xl font-bold text-transparent">Segmentacion de Mercado</h2>
        <div className="space-y-6">
          {segments.map((seg) => (
            <div key={seg.name} className="rounded-2xl border border-border bg-bg-secondary p-8 transition-colors hover:border-accent-cyan" style={{ borderLeftWidth: "4px", borderLeftColor: seg.color }}>
              <h3 className="text-lg font-bold" style={{ color: seg.color }}>{seg.name}</h3>
              <div className="mt-1 font-mono text-base font-semibold text-accent-green">{seg.range}</div>
              <p className="mt-2 text-sm text-text-secondary">
                Plataformas: <strong className="text-text-primary">{seg.platforms.join(", ")}</strong>
              </p>
              <ul className="mt-3 list-none space-y-1">
                {seg.features.map((f, i) => (
                  <li key={i} className="relative pl-5 text-sm text-text-secondary">
                    <span className="absolute left-0 font-mono text-accent-cyan">{">"}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl border-l-[3px] border-accent-green bg-bg-tertiary p-4 text-sm text-text-secondary">
                <strong className="text-accent-green">Chat Duo:</strong> {seg.conclusion}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Criteria */}
      <div>
        <h2 className="mb-8 bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-center text-3xl font-bold text-transparent">Criterios de Evaluacion</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {criteria.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-bg-secondary p-7 transition-colors hover:border-accent-purple">
              <h3 className="mb-3 text-base font-semibold text-accent-cyan">{c.title}</h3>
              <p className="text-sm text-text-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
