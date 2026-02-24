"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CRMPlatform {
  name: string;
  url: string;
  price: number;
  priceDetail: string;
  multipleBoards: string;
  customization: string;
  automations: string;
  features: string[];
  negativeFeatures?: string[];
  tag?: string;
}

const crmPlatforms: CRMPlatform[] = [
  {
    name: "Bitrix24",
    url: "https://www.bitrix24.com",
    price: 50,
    priceDetail: "5 usuarios incluidos ($10/usuario)",
    multipleBoards: "Si",
    customization: "Muy customizable",
    automations: "Muy automatizable",
    tag: "#1 RECOMENDADO",
    features: [
      "Excelente tablero, hiper personalizables y lleno de funcionalidades de automatizacion",
      "Muy completo totalmente dedicado a ventas pero al ser tan personalizable se puede aplicar a todo",
      "Tiene modulos de integracion con otras aplicaciones",
      "El plan mas basico de 50 usd incluye la mayoria de las funcionalidades mencionadas",
    ],
  },
  {
    name: "Kommo",
    url: "https://www.kommo.com",
    price: 25,
    priceDetail: "Por licencia",
    multipleBoards: "Si",
    customization: "Muy customizable",
    automations: "Si - incluidas",
    tag: "#2 RECOMENDADO",
    features: [
      "Plan de tablero con automatizaciones 25 usd",
      "Multiple embudo personalizable con automatizaciones",
    ],
  },
  {
    name: "Brevo",
    url: "https://www.brevo.com",
    price: 49,
    priceDetail: "$31 + $18 WhatsApp",
    multipleBoards: "Si (Deals)",
    customization: "Muy customizable",
    automations: "Si - incluidas",
    tag: "#3 RECOMENDADO",
    features: [
      "Multiples Tableros customizables con automatizaciones",
      "31 usd + 18 usd para vinculacion con whatsapp",
      "Estos tableros los llaman Deals",
    ],
  },
  {
    name: "Freshworks",
    url: "https://www.freshworks.com/crm/",
    price: 39,
    priceDetail: "Por usuario",
    multipleBoards: "Si",
    customization: "Muy customizable",
    automations: "No",
    features: [
      "Ofrece la posibilidad de editar los campos del tablero",
      "Crear multiples tableros pero sin automatizaciones",
      "En el plan de 39 usd",
    ],
  },
  {
    name: "NetHunt CRM",
    url: "https://nethunt.com",
    price: 42,
    priceDetail: "Por usuario",
    multipleBoards: "Si",
    customization: "Poco customizable",
    automations: "No",
    features: [
      "Tablero orientado a ventas, personalizable pero de bajo nivel",
      "Solo se puede cambiar los nombres de los campos pero no se puede crear ni sacar campos",
      "Tampoco tiene automatizacion",
      "Si se puede crear multiples tableros",
    ],
  },
  {
    name: "JivoChat",
    url: "https://www.jivochat.com",
    price: 42,
    priceDetail: "Por agente",
    multipleBoards: "Basico",
    customization: "Poco customizable",
    automations: "No",
    features: [
      "Ofrece un tablero de ventas sencillo, poco personalizable",
      "Solo se puede editar los nombres de las etiquetas",
      "No se pueden agregar ni quitar campos",
      "No tiene automatizaciones",
    ],
  },
  {
    name: "Interakt",
    url: "https://www.interakt.shop",
    price: 49,
    priceDetail: "5 agentes incluidos",
    multipleBoards: "No (solo 1)",
    customization: "No customizable",
    automations: "No",
    features: [
      "El kanban es full orientado para ventas",
      "Es decir para calificar leads y armar un embudo de ventas",
      "Un solo tablero no customizable sin automatizaciones",
    ],
  },
  {
    name: "Cliently",
    url: "https://clientify.com",
    price: 77,
    priceDetail: "1 usuario",
    multipleBoards: "Si",
    customization: "Muy customizable",
    automations: "Poco (recordatorios)",
    features: [
      "El paquete mas basico incluye 1000 contactos, un solo usuario",
      "Multiple tablero personalizable",
      "Tiene funcionalidad de automatizacion pero solo de recordatorios",
    ],
  },
  {
    name: "Leadsales",
    url: "https://leadsales.io",
    price: 133,
    priceDetail: "4 usuarios incluidos",
    multipleBoards: "Si",
    customization: "Muy customizable",
    automations: "No",
    features: [
      "Plan de CRM con embudo e integracion cloud api 133 usd",
      "Multiple tablero personalizable",
      "Sin automatizaciones",
    ],
  },
];

const priceChartData = [
  { name: "Kommo", price: 25, color: "#c0c0c0" },
  { name: "Freshworks", price: 39, color: "#00d4ff" },
  { name: "NetHunt", price: 42, color: "#00d4ff" },
  { name: "JivoChat", price: 42, color: "#00d4ff" },
  { name: "Brevo", price: 49, color: "#cd7f32" },
  { name: "Interakt", price: 49, color: "#00d4ff" },
  { name: "Bitrix24", price: 50, color: "#ffd700" },
  { name: "Cliently", price: 77, color: "#00d4ff" },
  { name: "Leadsales", price: 133, color: "#00d4ff" },
];

const top3 = [
  {
    name: "Bitrix24",
    medal: "gold",
    price: "$50/mes",
    priceDetail: "5 usuarios ($10/usuario)",
    why: [
      "Hiper personalizables: Crear/editar/eliminar campos completamente",
      "Automatizaciones avanzadas: Sistema completo por cambio de etapa",
      "Mejor precio/usuario: $10 efectivo por usuario",
      "Muy completo: Adaptable a cualquier proceso",
    ],
    idealFor: "Empresas con equipos de 2-5 personas que buscan la solucion mas completa con automatizaciones avanzadas.",
  },
  {
    name: "Kommo",
    medal: "silver",
    price: "$25/mes",
    priceDetail: "Por licencia",
    why: [
      "Mejor precio individual: Solo $25/mes con todo",
      "Multiples embudos: Completamente configurables",
      "Automatizaciones incluidas: Por cambio de etapa",
      "WhatsApp nativo: BSP oficial + Cloud API",
    ],
    idealFor: "Pequenas empresas o individuales que buscan el mejor precio con automatizaciones. Perfecto para LATAM.",
  },
  {
    name: "Brevo",
    medal: "bronze",
    price: "$49/mes",
    priceDetail: "$31 + $18 WhatsApp",
    why: [
      "Deals ilimitados: Sin restricciones de pipelines",
      "Automatizaciones incluidas: Sales automation completo",
      "Precio competitivo: $49/mes total con WhatsApp",
      "Muy customizable: Campos y etapas configurables",
    ],
    idealFor: "Pequenas empresas que necesitan CRM completo con automatizaciones a precio accesible.",
  },
];

type TabKey = "cards" | "table" | "chart" | "top3";

export function KanbanCRMContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("cards");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "cards", label: "Cards" },
    { key: "table", label: "Tabla" },
    { key: "chart", label: "Precios" },
    { key: "top3", label: "TOP 3" },
  ];

  const medalStyles = {
    gold: "bg-gradient-to-r from-[#ffd700] to-[#ffed4e]",
    silver: "bg-gradient-to-r from-[#c0c0c0] to-[#e8e8e8]",
    bronze: "bg-gradient-to-r from-[#cd7f32] to-[#e8a87c]",
  };

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-border bg-bg-secondary p-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`cursor-pointer rounded-xl border px-5 py-3 font-sans text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.key
                ? "border-accent-green bg-accent-green text-bg-primary"
                : "border-border bg-bg-tertiary text-text-secondary hover:border-accent-green hover:text-accent-green"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards View */}
      {activeTab === "cards" && (
        <div>
          <h2 className="mb-8 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-center text-3xl font-bold text-transparent">
            Plataformas Analizadas
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {crmPlatforms.map((p) => (
              <div
                key={p.name}
                className="relative overflow-hidden rounded-2xl border border-border bg-bg-secondary p-7 transition-all duration-400 hover:-translate-y-1 hover:border-accent-green hover:shadow-[0_20px_40px_rgba(0,255,136,0.1)]"
              >
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-accent-cyan to-accent-green" />
                <div className="mb-4 flex items-start justify-between">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-text-primary no-underline transition-colors hover:text-accent-green"
                  >
                    {p.name} {"->"}
                  </a>
                  {p.tag && (
                    <span className="rounded-lg border border-accent-green bg-[rgba(0,255,136,0.1)] px-3 py-1 text-xs font-semibold text-accent-green">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="mb-4 font-mono text-3xl font-bold text-accent-green">
                  ${p.price}
                  <span className="text-base text-text-secondary">/mes</span>
                </div>
                <div className="mb-1 font-mono text-sm text-text-secondary">
                  {p.priceDetail}
                </div>

                <div className="my-4 rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] p-4">
                  <strong className="mb-3 block text-sm text-accent-cyan">
                    Features Esenciales:
                  </strong>
                  <div className="space-y-2 text-sm">
                    <div className="text-text-secondary">
                      Multiples tableros:{" "}
                      <span className={p.multipleBoards.includes("No") ? "font-semibold text-red-500" : "font-semibold text-accent-green"}>
                        {p.multipleBoards}
                      </span>
                    </div>
                    <div className="text-text-secondary">
                      Customizacion:{" "}
                      <span className={p.customization.includes("No") || p.customization.includes("Poco") ? "font-semibold text-[#ff8800]" : "font-semibold text-accent-green"}>
                        {p.customization}
                      </span>
                    </div>
                    <div className="text-text-secondary">
                      Automatizaciones:{" "}
                      <span className={p.automations === "No" ? "font-semibold text-red-500" : p.automations.includes("Poco") ? "font-semibold text-[#ff8800]" : "font-semibold text-accent-green"}>
                        {p.automations}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="list-none space-y-2">
                  {p.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span className="mt-0.5 shrink-0 font-bold text-accent-green">
                        {"->"}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table View */}
      {activeTab === "table" && (
        <div>
          <h2 className="mb-8 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-center text-3xl font-bold text-transparent">
            Tabla Comparativa
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-bg-secondary p-8">
            <div className="mb-4 rounded-xl border border-border bg-bg-secondary p-4">
              <h4 className="mb-3 text-sm text-accent-cyan">Leyenda</h4>
              <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
                <span><span className="font-bold text-accent-green">{"✓"}</span> Feature disponible</span>
                <span><span className="font-bold text-red-500">{"✗"}</span> Feature no disponible</span>
                <span>{"~"} Feature limitada</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-border bg-bg-tertiary p-4 text-left font-mono text-sm font-semibold text-accent-green">Plataforma</th>
                    <th className="border-b-2 border-border bg-bg-tertiary p-4 text-left font-mono text-sm font-semibold text-accent-green">Precio/mes</th>
                    <th className="border-b-2 border-border bg-bg-tertiary p-4 text-left font-mono text-sm font-semibold text-accent-green">Usuarios</th>
                    <th className="border-b-2 border-border bg-bg-tertiary p-4 text-left font-mono text-sm font-semibold text-accent-green">Tableros</th>
                    <th className="border-b-2 border-border bg-bg-tertiary p-4 text-left font-mono text-sm font-semibold text-accent-green">Custom</th>
                    <th className="border-b-2 border-border bg-bg-tertiary p-4 text-left font-mono text-sm font-semibold text-accent-green">Automations</th>
                  </tr>
                </thead>
                <tbody>
                  {crmPlatforms.map((p) => (
                    <tr key={p.name} className="border-b border-border transition-colors hover:bg-card-hover">
                      <td className="p-4 font-bold">{p.name}</td>
                      <td className="p-4 font-mono font-bold text-accent-green">${p.price}</td>
                      <td className="p-4 text-sm text-text-secondary">{p.priceDetail}</td>
                      <td className="p-4 text-sm">
                        <span className={p.multipleBoards.includes("No") ? "text-red-500" : "text-accent-green"}>{p.multipleBoards}</span>
                      </td>
                      <td className="p-4 text-sm">
                        <span className={p.customization.includes("Muy") ? "text-accent-green" : "text-text-secondary"}>{p.customization}</span>
                      </td>
                      <td className="p-4 text-sm">
                        <span className={p.automations === "No" ? "text-red-500" : "text-accent-green"}>{p.automations}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Chart View */}
      {activeTab === "chart" && (
        <div className="space-y-8">
          <h2 className="bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-center text-3xl font-bold text-transparent">
            Analisis de Precios
          </h2>
          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="mb-4 text-center text-lg text-accent-cyan">Comparacion de Precios por Usuario</h3>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={priceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fill: "#94a3b8" }} domain={[0, 150]} />
                <Tooltip contentStyle={{ backgroundColor: "#111936", border: "1px solid rgba(148,163,184,0.1)", borderRadius: "12px", color: "#fff" }} />
                <Bar dataKey="price" radius={[4, 4, 0, 0]} name="Precio USD/mes">
                  {priceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] p-6">
            <strong className="text-accent-cyan">Insights del Analisis:</strong>
            <p className="mt-2 text-text-secondary">Precio promedio: <strong className="text-text-primary">$56.44 USD/mes</strong> por usuario</p>
            <p className="text-text-secondary">Rango: <strong className="text-text-primary">$25 - $133 USD/mes</strong></p>
            <p className="text-text-secondary">Mejor precio con automatizaciones: <strong className="text-accent-green">Kommo ($25/mes)</strong> y <strong className="text-accent-green">Brevo ($49/mes)</strong></p>
            <p className="text-text-secondary">Mejor relacion calidad-precio: <strong className="text-accent-green">Bitrix24 ($50/mes con 5 usuarios = $10/usuario)</strong></p>
          </div>
        </div>
      )}

      {/* TOP 3 View */}
      {activeTab === "top3" && (
        <div>
          <h2 className="mb-8 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-center text-3xl font-bold text-transparent">
            TOP 3 Recomendados
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {top3.map((p) => (
              <div
                key={p.name}
                className="relative overflow-hidden rounded-2xl border border-border bg-bg-secondary p-8"
              >
                <div className={`absolute top-0 left-0 h-1 w-full ${medalStyles[p.medal as keyof typeof medalStyles]}`} />
                <div className="mb-4 text-5xl">
                  {p.medal === "gold" ? "#1" : p.medal === "silver" ? "#2" : "#3"}
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{p.name}</h3>
                <div className="my-4 font-mono text-3xl font-bold text-accent-green">
                  {p.price}
                </div>
                <div className="mb-6 font-mono text-sm text-text-secondary">
                  {p.priceDetail}
                </div>

                <h4 className="mb-3 text-sm text-accent-cyan">{"Por que?"}</h4>
                <ul className="mb-6 list-none space-y-2">
                  {p.why.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span className="mt-0.5 shrink-0 font-bold text-accent-green">
                        {"->"}
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] p-4">
                  <strong className="text-accent-cyan">Ideal para:</strong>
                  <p className="mt-1 text-sm text-text-secondary">
                    {p.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
