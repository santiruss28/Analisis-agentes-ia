"use client";

import { useMemo, useCallback, useRef, useEffect } from "react";
import { platforms, topPlatforms, boxplotPlatforms } from "@/lib/platforms-data";

function PriceStats() {
  const stats = useMemo(() => {
    const priceable = platforms.filter((p) => p.priceNum < 600);
    const prices = priceable.map((p) => p.priceNum);
    const sorted = [...prices].sort((a, b) => a - b);
    const n = prices.length;

    const avg = prices.reduce((a, b) => a + b, 0) / n;
    const median =
      n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)];
    const variance =
      prices.reduce((sum, p) => sum + Math.pow(p - avg, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { avg, median, stdDev, min, max, count: n };
  }, []);

  const statCards = [
    {
      label: "PRECIO PROMEDIO",
      value: `$${stats.avg.toFixed(0)}`,
      detail: `USD/mes (n=${stats.count})`,
      color: "text-accent-cyan",
    },
    {
      label: "MEDIANA",
      value: `$${stats.median.toFixed(0)}`,
      detail: "50% estan por debajo",
      color: "text-accent-green",
    },
    {
      label: "DESVIACION ESTANDAR",
      value: `$${stats.stdDev.toFixed(0)}`,
      detail: "Variabilidad de precios",
      color: "text-accent-purple",
    },
    {
      label: "RANGO",
      value: `$${stats.min}-$${stats.max}`,
      detail: "Min - Max",
      color: "text-[#ff8800]",
    },
  ];

  return (
    <div className="mb-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-bg-tertiary p-8 text-center"
        >
          <div className="mb-2 font-mono text-xs uppercase tracking-wider text-text-secondary">
            {stat.label}
          </div>
          <div className={`text-4xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="mt-2 text-xs text-text-secondary">{stat.detail}</div>
        </div>
      ))}
    </div>
  );
}

function ValueScoreTable() {
  const scored = useMemo(() => {
    const priceable = platforms.filter((p) => p.priceNum < 600);
    const maxPrice = Math.max(...priceable.map((p) => p.priceNum));

    return priceable
      .map((platform) => {
        const setupScore = platform.easySetup === "easy" ? 3 : 1.5;
        const handoffScore = platform.handoff ? 2.5 : 0;
        const analyticsScore =
          platform.analytics === "Avanzado"
            ? 2
            : platform.analytics === "Medio"
              ? 1
              : 0.5;

        const featureTotal = setupScore + handoffScore + analyticsScore;
        const priceNormalized = (maxPrice - platform.priceNum) / maxPrice;
        const valueScore = (featureTotal * (1 + priceNormalized * 2)) / 3;

        return {
          name: platform.name,
          url: platform.url,
          price: platform.price,
          featureTotal: featureTotal.toFixed(1),
          valueScore: valueScore.toFixed(2),
        };
      })
      .sort((a, b) => parseFloat(b.valueScore) - parseFloat(a.valueScore));
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-bg-tertiary p-8">
      <h3 className="mb-4 text-xl font-bold text-accent-cyan">
        Value Score: Features vs Precio
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="bg-bg-secondary">
            <tr>
              <th className="border-b-2 border-border p-4 text-left text-accent-green">
                Rank
              </th>
              <th className="border-b-2 border-border p-4 text-left text-accent-green">
                Plataforma
              </th>
              <th className="border-b-2 border-border p-4 text-center text-accent-green">
                Precio
              </th>
              <th className="border-b-2 border-border p-4 text-center text-accent-green">
                Features Score
              </th>
              <th className="border-b-2 border-border p-4 text-center text-accent-green">
                Value Score
              </th>
            </tr>
          </thead>
          <tbody>
            {scored.map((item, index) => {
              const medal =
                index === 0
                  ? "1"
                  : index === 1
                    ? "2"
                    : index === 2
                      ? "3"
                      : `${index + 1}`;
              const vs = parseFloat(item.valueScore);
              const scoreColor =
                vs > 4
                  ? "text-accent-green"
                  : vs > 3
                    ? "text-accent-cyan"
                    : "text-text-secondary";

              return (
                <tr
                  key={item.name}
                  className="border-b border-border transition-colors hover:bg-card-hover"
                >
                  <td className="p-4 font-bold">#{medal}</td>
                  <td className="p-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary no-underline transition-colors hover:text-accent-green"
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="p-4 text-center font-mono">{item.price}</td>
                  <td className="p-4 text-center text-accent-cyan">
                    {item.featureTotal}
                  </td>
                  <td
                    className={`p-4 text-center text-lg font-bold ${scoreColor}`}
                  >
                    {item.valueScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TopPlatforms() {
  const medalStyles = {
    gold: "bg-gradient-to-br from-[#ffd700] to-[#ffed4e]",
    silver: "bg-gradient-to-br from-[#c0c0c0] to-[#e8e8e8]",
    bronze: "bg-gradient-to-br from-[#cd7f32] to-[#e9967a]",
  };

  const medalLabels = { gold: "#1", silver: "#2", bronze: "#3" };

  return (
    <div className="mb-12">
      <h2 className="mb-8 bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-3xl font-bold text-transparent">
        Top 3 Recomendadas
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {topPlatforms.map((p) => (
          <div
            key={p.name}
            className="group relative overflow-hidden rounded-2xl border-2 border-border bg-bg-secondary p-8 transition-all duration-400 hover:-translate-y-2 hover:border-accent-green hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] rounded-full bg-[radial-gradient(circle,rgba(0,255,136,0.1)_0%,transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            <div className="relative z-10">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-bg-primary ${medalStyles[p.medal]}`}
              >
                {medalLabels[p.medal]}
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <h3 className="text-3xl font-extrabold text-text-primary transition-colors duration-300 hover:text-accent-green">
                  {p.name}
                </h3>
              </a>
              <p className="mt-2 mb-6 text-sm text-text-secondary">
                {p.tagline}
              </p>
              <div className="font-mono text-xl font-bold text-accent-green">
                {p.price}
                <span className="text-xs text-text-secondary">
                  {p.priceLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Boxplot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prices = boxplotPlatforms.map((p) => p.price).sort((a, b) => a - b);
    const n = prices.length;
    const min = prices[0];
    const max = prices[n - 1];
    const q1 = prices[Math.floor(n * 0.25)];
    const median =
      n % 2 === 0 ? (prices[n / 2 - 1] + prices[n / 2]) / 2 : prices[Math.floor(n / 2)];
    const q3 = prices[Math.floor(n * 0.75)];
    const mean = prices.reduce((a, b) => a + b, 0) / n;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement?.getBoundingClientRect();
    const width = rect?.width || 800;
    const height = 350;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    const padding = 50;
    const plotWidth = width - padding * 2;
    const centerY = height / 2;
    const xScale = (val: number) =>
      padding + ((val - min) / (max - min)) * plotWidth;

    ctx.clearRect(0, 0, width, height);

    // Axis
    ctx.strokeStyle = "#2d3748";
    ctx.beginPath();
    ctx.moveTo(padding, centerY + 50);
    ctx.lineTo(width - padding, centerY + 50);
    ctx.stroke();

    // Whiskers
    ctx.strokeStyle = "#00d4ff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(xScale(min), centerY - 20);
    ctx.lineTo(xScale(min), centerY + 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xScale(max), centerY - 20);
    ctx.lineTo(xScale(max), centerY + 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xScale(min), centerY);
    ctx.lineTo(xScale(q1), centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xScale(q3), centerY);
    ctx.lineTo(xScale(max), centerY);
    ctx.stroke();

    // Box
    ctx.fillStyle = "rgba(0, 255, 136, 0.1)";
    ctx.fillRect(xScale(q1), centerY - 40, xScale(q3) - xScale(q1), 80);
    ctx.strokeRect(xScale(q1), centerY - 40, xScale(q3) - xScale(q1), 80);

    // Median line
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xScale(median), centerY - 40);
    ctx.lineTo(xScale(median), centerY + 40);
    ctx.stroke();

    // Mean
    ctx.strokeStyle = "#ff8800";
    ctx.beginPath();
    ctx.arc(xScale(mean), centerY, 5, 0, Math.PI * 2);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px JetBrains Mono, monospace";
    ctx.textAlign = "center";
    [min, q1, median, q3, max].forEach((val) => {
      ctx.fillText(`$${val}`, xScale(val), centerY + 70);
    });

    ctx.textAlign = "left";
    ctx.fillText(
      "Boxplot Distribucion de Precios (n=14)",
      padding,
      30
    );
    ctx.fillStyle = "#00ff88";
    ctx.textAlign = "right";
    ctx.fillText("| Mediana", width - padding, 30);
  }, []);

  useEffect(() => {
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  return (
    <div className="rounded-2xl border border-border bg-bg-tertiary p-8">
      <canvas ref={canvasRef} />
    </div>
  );
}

export function PriceAnalysis() {
  return (
    <section className="mt-16 animate-fade-in">
      <h2 className="mb-8 bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-3xl font-bold text-transparent">
        Analisis de Precios y Value Score
      </h2>
      <PriceStats />
      <ValueScoreTable />
    </section>
  );
}

export function StatisticalAnalysis() {
  return (
    <section className="mt-16 animate-fade-in">
      <h2 className="mb-8 bg-gradient-to-r from-accent-cyan to-accent-green bg-clip-text text-3xl font-bold text-transparent">
        Analisis Estadistico del Mercado
      </h2>
      <Boxplot />
    </section>
  );
}

export { TopPlatforms };
