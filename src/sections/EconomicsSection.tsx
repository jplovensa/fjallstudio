import { useState, useEffect } from "react";

const quarters = ["Q1 Y1", "Q2 Y1", "Q3 Y1", "Q4 Y1", "Q1 Y2", "Q2 Y2"];
const pods = [1, 2, 4, 8, 12, 18];
const revenue = [2.5, 7.2, 18.5, 42.0, 72.5, 120.0];
const orders = [3, 10, 28, 65, 112, 185];

function Chart() {
  const [m, setM] = useState(false);
  useEffect(() => { setM(true); }, []);
  if (!m) return <div className="w-full h-[240px] bg-gray-50 rounded-xl animate-pulse" />;
  const maxR = Math.max(...revenue);
  return (
    <div className="w-full h-[240px]">
      <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0071e3" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#0071e3" stopOpacity={0} />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => <line key={t} x1={55} y1={195 - t * 150} x2={760} y2={195 - t * 150} stroke="rgba(0,0,0,0.04)" strokeWidth={1} />)}
        <polygon points={revenue.map((v, i) => `${55 + (i * 705) / 5},${195 - (v / maxR) * 150}`).join(" ") + ` ${760},195 ${55},195`} fill="url(#rg)" />
        <polyline points={revenue.map((v, i) => `${55 + (i * 705) / 5},${195 - (v / maxR) * 150}`).join(" ")} fill="none" stroke="#0071e3" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {revenue.map((v, i) => (
          <g key={i}>
            <circle cx={55 + (i * 705) / 5} cy={195 - (v / maxR) * 150} r={5} fill="#fff" stroke="#0071e3" strokeWidth={2} />
            <text x={55 + (i * 705) / 5} y={195 - (v / maxR) * 150 - 12} textAnchor="middle" fill="#0071e3" fontSize={11} fontWeight={700}>{v}B</text>
          </g>
        ))}
        {pods.map((v, i) => <rect key={i} x={55 + (i * 705) / 5 - 10} y={195 - (v / 20) * 150} width={20} height={(v / 20) * 150} fill="rgba(0,0,0,0.05)" rx={4} />)}
        {quarters.map((q, i) => <text key={q} x={55 + (i * 705) / 5} y={218} textAnchor="middle" fill="#86868b" fontSize={12} fontWeight={600}>{q}</text>)}
        <text x="25" y="50" textAnchor="middle" fill="#86868b" fontSize={10} fontWeight={600}>Rev</text>
        <text x="25" y="62" textAnchor="middle" fill="#86868b" fontSize={10} fontWeight={600}>(B)</text>
        <text x="790" y="50" textAnchor="middle" fill="#86868b" fontSize={10} fontWeight={600}>Pods</text>
      </svg>
    </div>
  );
}

export default function EconomicsSection() {
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);

  const kpis = [
    { label: "Customer Acquisition Cost", value: "8M", unit: "IDR", delta: "↓ 82%", deltaColor: "text-green-600", bg: "bg-green-50", detail: "Traditional: Rp 45M. Our studios get organic footfall — no paid ads needed." },
    { label: "Average Order Value", value: "850M", unit: "IDR", delta: "↑ 460%", deltaColor: "text-green-600", bg: "bg-green-50", detail: "Interior-only avg: Rp 185M. Full-stack modular converts 4.6x higher." },
    { label: "Studio Setup CapEx", value: "400M", unit: "IDR", delta: "< 2 Mo", deltaColor: "text-[#4CD3B3]", bg: "bg-[#4CD3B3]/10", detail: "One sale pays back the entire studio. Every subsequent sale is pure margin." },
    { label: "Studio-to-PO Time", value: "55", unit: "min", delta: "Auto", deltaColor: "text-[#0071e3]", bg: "bg-[#0071e3]/10", detail: "From client walk-in to factory PO — fully automated through the app." },
  ];

  return (
    <section id="economics" className="scroll-mt-32 fade-in-section delay-7">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/10 rounded-full border border-[#4CD3B3]/20 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#3D867C]">Investor Intelligence</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">GTM Dashboard.</h2>
        <p className="text-lg text-apple-gray font-medium max-w-2xl mx-auto">
          Interactive numbers showing how the Phygital model cracks hyperscale.
          Hover each metric for the full investor story.
        </p>
      </div>

      {/* Interactive KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className="dash-metric cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setHoveredKpi(i)}
            onMouseLeave={() => setHoveredKpi(null)}
          >
            <div className="text-[10px] font-bold text-apple-gray uppercase tracking-widest mb-3">{k.label}</div>
            <div className="flex items-end gap-2 mb-2">
              <div className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-[#3D867C]">{k.value}</div>
              <div className="text-sm font-medium text-apple-gray mb-1">{k.unit}</div>
            </div>
            <div className={`text-xs font-semibold ${k.deltaColor} ${k.bg} px-2 py-1 rounded-md inline-block`}>{k.delta}</div>
            {/* Hover detail */}
            <div className={`absolute inset-0 bg-[#1d1d1f] rounded-xl p-4 flex items-center transition-all duration-300 ${hoveredKpi === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <p className="text-xs text-white/80 font-medium leading-relaxed">{k.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xs font-bold text-apple-gray uppercase tracking-widest">Revenue Trajectory</div>
              <h3 className="text-xl font-bold tracking-tight text-apple-text">Hyperscale Growth</h3>
            </div>
            <div className="hidden sm:flex gap-4 text-xs font-semibold text-apple-gray">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-apple-blue rounded-sm" /> Revenue (B IDR)</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-200 rounded-sm" /> Studios</span>
            </div>
          </div>
          <Chart />
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          {/* Conversion */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-bold text-apple-gray uppercase tracking-widest mb-4">Conversion Funnel</div>
            <div className="space-y-3">
              {[
                { label: "Studio Walk-ins", value: "2,400", pct: 100, color: "#4CD3B3" },
                { label: "Design Sessions", value: "1,680", pct: 70, color: "#34c759" },
                { label: "BoQ Generated", value: "1,344", pct: 56, color: "#0071e3" },
                { label: "PO Confirmed", value: "1,008", pct: 42, color: "#5856d6" },
              ].map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-apple-text">{f.label}</span>
                    <span className="font-semibold" style={{ color: f.color }}>{f.value}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${f.pct}%`, backgroundColor: f.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ratios */}
          <div className="dash-dark">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Key Ratios</div>
            <div className="space-y-4">
              {[
                { label: "Conversion Rate", value: "42%", desc: "Walk-in to PO" },
                { label: "Gross Margin", value: "38%", desc: "Per unit delivered" },
                { label: "CAC Payback", value: "1.2", desc: "Months to recover" },
                { label: "LTV / CAC", value: "12.5x", desc: "Lifetime value ratio" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-white/80">{r.label}</div>
                    <div className="text-[10px] text-white/30">{r.desc}</div>
                  </div>
                  <div className="text-lg font-bold text-[#4CD3B3]">{r.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quarterly */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-bold text-apple-gray uppercase tracking-widest mb-4">Cumulative Orders</div>
            <div className="flex items-end justify-between gap-2 h-20">
              {orders.map((o, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div className="text-[10px] font-bold text-[#0071e3]">{o}</div>
                  <div className="w-full bg-gray-100 rounded-full overflow-hidden" style={{ height: 48 }}>
                    <div className="w-full rounded-full bg-gradient-to-t from-[#0071e3] to-[#4CD3B3]" style={{ height: `${(o / 200) * 48}px` }} />
                  </div>
                  <div className="text-[9px] font-semibold text-apple-gray">{quarters[i].split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
