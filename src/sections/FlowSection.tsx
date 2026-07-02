import { useState } from "react";

const steps = [
  { icon: "📐", title: "Scan", subtitle: "Room Capture", desc: "Client LiDAR-scans their space using the Fjäll app. Walls, doors, and openings mapped in seconds.", output: "3D Room Data", color: "#4CD3B3" },
  { icon: "📋", title: "Floorplan", subtitle: "Auto Layout", desc: "App generates a precise 2D architectural floorplan with measurements. No manual drafting.", output: "2D Floorplan", color: "#00c8ff" },
  { icon: "🏠", title: "Template", subtitle: "Design Select", desc: "Client picks a Fjäll modular template or goes bespoke. The app fits it to scanned dimensions.", output: "Design Match", color: "#0071e3" },
  { icon: "✏️", title: "Bespoke", subtitle: "Custom Build", desc: "AI assistant helps design from scratch. Optimal layouts based on scanned dimensions and building codes.", output: "Custom Design", color: "#af52de" },
  { icon: "🧱", title: "EPS Calc", subtitle: "Material BOM", desc: "Every EPS panel, joint, and fitting is calculated. Real-time pricing per unit.", output: "Live BoQ", color: "#5856d6" },
  { icon: "👁", title: "3D Showroom", subtitle: "Visualisation", desc: "Full isometric 3D preview of the modular home. Explore every wall, window, and door.", output: "3D Model", color: "#ff9f0a" },
  { icon: "📄", title: "Factory PO", subtitle: "Auto Purchase Order", desc: "Complete PO with CNC machine code transmitted to Factory Hub. 14-day production begins.", output: "PO Confirmed", color: "#3D867C" },
];

export default function FlowSection() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section id="flow" className="scroll-mt-32" style={{ opacity: 0, animation: "fadeInUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards", animationDelay: "0.4s" }}>
      <div className="glass-card-dark p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4CD3B3]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/15 rounded-full border border-[#4CD3B3]/30 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3]">Product Flow</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-3">From Scan to PO.</h2>
          <p className="text-base md:text-lg text-white/50 font-medium max-w-2xl mx-auto">Seven steps. One seamless flow. Tap each step to explore.</p>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Mobile: vertical step list */}
          <div className="md:hidden space-y-3 mb-6">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 ${active === i ? "bg-white/8 border-white/20" : "bg-white/3 border-white/5"}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center"><span className="text-sm font-bold text-white">{s.title}</span><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>{s.output}</span></div>
                  <div className="text-[10px] text-white/30">{s.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop: horizontal pills */}
          <div className="hidden md:flex justify-center gap-2 mb-8 flex-wrap">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border transition-all min-w-[80px] ${active === i ? "bg-white/10 border-white/25 scale-105" : "bg-white/3 border-white/7 hover:bg-white/7"}`}>
                <span className="text-xl">{s.icon}</span>
                <span className="text-[10px] font-bold text-white/70">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${current.color}18`, border: `1px solid ${current.color}35` }}>{current.icon}</div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: current.color }}>Step {active + 1} of {steps.length}</div>
                    <div className="text-xl font-display font-bold text-white">{current.title}</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-4">{current.desc}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold" style={{ background: `${current.color}12`, color: current.color, border: `1px solid ${current.color}25` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: current.color }} /> Output: {current.output}
                </span>
              </div>
              <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Progress</div>
                <div className="text-3xl font-bold mb-2" style={{ color: current.color }}>{Math.round(((active + 1) / steps.length) * 100)}%</div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${((active + 1) / steps.length) * 100}%`, background: `linear-gradient(90deg, ${current.color}, ${current.color}80)` }} />
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {steps.map((_, i) => (
                    <div key={i} className="h-1 rounded-full" style={{ background: i <= active ? current.color : "rgba(255,255,255,0.1)", opacity: i <= active ? 1 : 0.3 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
