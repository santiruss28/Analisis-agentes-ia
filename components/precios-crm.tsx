"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const crmData = [
  { name: "Chattigo", setup: 840, feeIA: 180, feeSinIA: 450, feeTotal: 630, mes1: 1470 },
  { name: "Zenvia", setup: 137, feeIA: 0, feeSinIA: 440, feeTotal: 440, mes1: 577 },
  { name: "Call bell", setup: 1200, feeIA: 154, feeSinIA: 200, feeTotal: 354, mes1: 1554 },
  { name: "Bot Maker", setup: 1500, feeIA: 154, feeSinIA: 150, feeTotal: 304, mes1: 1804 },
  { name: "Kommo", setup: 0, feeIA: 279, feeSinIA: 250, feeTotal: 529, mes1: 529 },
  { name: "Blip", setup: 3000, feeIA: 0, feeSinIA: 1000, feeTotal: 1000, mes1: 4000 },
  { name: "B2chat", setup: 80, feeIA: 154, feeSinIA: 370, feeTotal: 524, mes1: 604 },
  { name: "Pip", setup: 200, feeIA: 300, feeSinIA: 279, feeTotal: 579, mes1: 779 },
  { name: "Vambe", setup: 325, feeIA: 0, feeSinIA: 590, feeTotal: 590, mes1: 915 },
];

const insights = [
  { label: "Minimo costo mensual (fee total):", value: "Bot Maker ($304), Call bell ($354), Zenvia ($440)", color: "text-accent-green" },
  { label: "Minimo costo primer mes (entrada):", value: "Kommo ($529), Zenvia ($577), B2chat ($604)", color: "text-accent-green" },
  { label: "Barrera de entrada mas alta (Setup):", value: "Take a Blip ($3000), Bot Maker ($1500), Call bell ($1200)", color: "text-red-500" },
  { label: "Plataformas con Fee IA = 0:", value: "Zenvia, Take a Blip, Vambe (incluido en el plan base)", color: "text-accent-cyan" },
];

export function PreciosCRMContent() {
  return (
    <div className="space-y-12">
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-secondary p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <h2 className="mb-6 text-center text-xl font-bold text-accent-green">
          Tabla Comparativa
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-border bg-bg-tertiary p-4 text-center font-bold text-accent-cyan">CRM</th>
                <th className="border-b-2 border-border bg-bg-tertiary p-4 text-center font-bold text-accent-cyan">Set up IA</th>
                <th className="border-b-2 border-border bg-bg-tertiary p-4 text-center font-bold text-accent-cyan">
                  <div>Fee IA</div>
                  <span className="mt-1 inline-block rounded-md bg-[rgba(124,58,237,0.2)] px-2 py-0.5 text-xs text-[#d8b4fe]">3k interacciones</span>
                </th>
                <th className="border-b-2 border-border bg-bg-tertiary p-4 text-center font-bold text-accent-cyan">
                  <div>Fee sin IA</div>
                  <span className="mt-1 inline-block rounded-md bg-[rgba(124,58,237,0.2)] px-2 py-0.5 text-xs text-[#d8b4fe]">10 usuarios</span>
                </th>
                <th className="border-b-2 border-border bg-bg-tertiary p-4 text-center font-bold text-accent-cyan">Fee Mensual Total</th>
                <th className="border-b-2 border-border bg-bg-tertiary p-4 text-center font-bold text-accent-cyan">Mes 1 (Fee + Setup)</th>
              </tr>
            </thead>
            <tbody>
              {crmData.map((row) => (
                <tr key={row.name} className="transition-colors hover:bg-card-hover">
                  <td className="border-b border-border p-4 text-center font-mono text-sm">{row.name}</td>
                  <td className="border-b border-border p-4 text-center font-mono text-sm">${row.setup}</td>
                  <td className="border-b border-border p-4 text-center font-mono text-sm">${row.feeIA}</td>
                  <td className="border-b border-border p-4 text-center font-mono text-sm">${row.feeSinIA}</td>
                  <td className="border-b border-border p-4 text-center font-mono text-sm font-bold text-accent-green">${row.feeTotal}</td>
                  <td className="border-b border-border p-4 text-center font-mono text-sm font-bold text-accent-cyan">${row.mes1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 space-y-1 text-sm italic text-text-secondary">
          <p><strong>(1)</strong> Se paga via API OpenAI. Costo aprox de 154 USD incluido en fee IA.</p>
          <p><strong>(2)</strong> Tambien se paga a OpenAI 154 USD, sumando al fee propio de 125 USD (total 279 USD de IA).</p>
        </div>
      </div>

      <div className="rounded-2xl border border-accent-green bg-gradient-to-br from-[rgba(0,255,136,0.05)] to-[rgba(0,212,255,0.05)] p-8">
        <h2 className="mb-6 text-center text-xl font-bold text-accent-green">Resumen de Posiciones</h2>
        <ul className="list-none space-y-3">
          {insights.map((item, i) => (
            <li key={i} className="relative pl-6 text-text-secondary">
              <span className="absolute left-0 text-accent-green">{">"}</span>
              <strong className="text-text-primary">{item.label}</strong>{" "}
              <span className={item.color}>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-bg-secondary p-6">
          <h3 className="mb-4 text-center text-lg font-bold text-text-primary">Costo Mensual Total (Sin Setup)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={crmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ backgroundColor: "#111936", border: "1px solid rgba(148,163,184,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="feeTotal" fill="rgba(0, 255, 136, 0.7)" radius={[4, 4, 0, 0]} name="Fee Mensual" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-bg-secondary p-6">
          <h3 className="mb-4 text-center text-lg font-bold text-text-primary">Costo Primer Mes (Fee + Setup)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={crmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ backgroundColor: "#111936", border: "1px solid rgba(148,163,184,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="mes1" fill="rgba(124, 58, 237, 0.7)" radius={[4, 4, 0, 0]} name="Primer Mes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-secondary p-6">
        <h3 className="mb-4 text-center text-lg font-bold text-text-primary">Detalle: Fee IA vs Fee Plataforma</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={crmData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ backgroundColor: "#111936", border: "1px solid rgba(148,163,184,0.1)", borderRadius: "12px", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#94a3b8" }} />
            <Bar dataKey="feeIA" stackId="a" fill="rgba(0, 212, 255, 0.7)" name="Costo IA" />
            <Bar dataKey="feeSinIA" stackId="a" fill="rgba(255, 255, 255, 0.1)" radius={[4, 4, 0, 0]} name="Costo Plataforma" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
