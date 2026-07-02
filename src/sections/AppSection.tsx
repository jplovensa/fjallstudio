import { useState, useRef, useEffect } from "react";

type AppTab = "scan" | "plan" | "templates" | "bespoke" | "eps" | "view" | "po";

const templates = [
  { name: "Fjäll Studio", size: "28m²", rooms: 1, price: "Rp 485M", popular: true },
  { name: "Fjäll Compact", size: "36m²", rooms: 2, price: "Rp 625M" },
  { name: "Fjäll Family", size: "52m²", rooms: 3, price: "Rp 845M", popular: true },
  { name: "Fjäll Villa", size: "72m²", rooms: 4, price: "Rp 1.2B" },
];

const epsMaterials = [
  { name: "Wall Panel 1200", qty: 18, cost: 12.5 },
  { name: "Wall Panel 900", qty: 8, cost: 9.8 },
  { name: "Corner Panel", qty: 6, cost: 14.2 },
  { name: "Window Frame", qty: 3, cost: 22.0 },
  { name: "Door Frame", qty: 2, cost: 18.5 },
  { name: "Roof Panel", qty: 12, cost: 11.0 },
  { name: "Floor Insulation", qty: 1, cost: 85.0 },
  { name: "Joint Sealant", qty: 24, cost: 2.1 },
];

function ShowroomCube() {
  const s = 70;
  const h = 50;
  return (
    <div style={{
      width: s, height: s,
      WebkitTransformStyle: "preserve-3d" as const,
      transformStyle: "preserve-3d" as const,
      WebkitTransform: "rotateX(60deg) rotateZ(-40deg)",
      transform: "rotateX(60deg) rotateZ(-40deg)",
      position: "relative",
      WebkitAnimation: "spinSlow 20s linear infinite",
      animation: "spinSlow 20s linear infinite",
      flexShrink: 0,
    }}>
      <div style={{ position: "absolute", width: s, height: s, background: "linear-gradient(135deg,#1a2f2f,#0f1e1e)", border: "1px solid rgba(76,211,179,0.3)", WebkitTransform: "translateZ(0)", transform: "translateZ(0)", boxShadow: "0 0 30px rgba(76,211,179,0.15)" }} />
      <div style={{ position: "absolute", width: s, height: h, background: "linear-gradient(to bottom,rgba(76,211,179,0.18),rgba(76,211,179,0.04))", border: "1px solid rgba(76,211,179,0.35)", WebkitTransformOrigin: "top", transformOrigin: "top", WebkitTransform: "rotateX(90deg)", transform: "rotateX(90deg)", top: 0 }}>
        <div style={{ position: "absolute", top: 12, left: 14, width: 16, height: 12, border: "1px solid rgba(76,211,179,0.4)", background: "rgba(76,211,179,0.08)" }} />
        <div style={{ position: "absolute", top: 12, left: 42, width: 16, height: 12, border: "1px solid rgba(76,211,179,0.4)", background: "rgba(76,211,179,0.08)" }} />
      </div>
      <div style={{ position: "absolute", width: h, height: s, background: "linear-gradient(to right,rgba(76,211,179,0.14),rgba(76,211,179,0.03))", border: "1px solid rgba(76,211,179,0.3)", WebkitTransformOrigin: "left", transformOrigin: "left", WebkitTransform: "rotateY(-90deg)", transform: "rotateY(-90deg)", left: 0 }}>
        <div style={{ position: "absolute", top: 18, left: 10, width: 16, height: 30, border: "1px solid rgba(76,211,179,0.4)", borderBottom: "none", background: "rgba(76,211,179,0.06)" }} />
      </div>
      <div style={{ position: "absolute", width: h, height: s, background: "linear-gradient(to left,rgba(76,211,179,0.08),rgba(76,211,179,0.02))", border: "1px solid rgba(76,211,179,0.2)", WebkitTransformOrigin: "right", transformOrigin: "right", WebkitTransform: "rotateY(90deg)", transform: "rotateY(90deg)", right: 0 }} />
      <div style={{ position: "absolute", width: s, height: h, background: "linear-gradient(to top,rgba(76,211,179,0.06),rgba(76,211,179,0.02))", border: "1px solid rgba(76,211,179,0.2)", WebkitTransformOrigin: "bottom", transformOrigin: "bottom", WebkitTransform: "rotateX(-90deg)", transform: "rotateX(-90deg)", bottom: 0 }} />
      <div style={{ position: "absolute", width: s + 2, height: s + 2, background: "linear-gradient(135deg,rgba(76,211,179,0.22),rgba(61,134,124,0.15))", WebkitTransform: "translate(-1px,-1px) translateZ(50px)", transform: "translate(-1px,-1px) translateZ(50px)", border: "1px solid rgba(76,211,179,0.4)", borderRadius: 2, boxShadow: "0 0 25px rgba(76,211,179,0.2)" }} />
    </div>
  );
}

export default function AppSection() {
  const [tab, setTab] = useState<AppTab>("scan");
  const [modal, setModal] = useState({ show: false, title: "", progress: 0 });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = (title: string, nextTab: AppTab) => {
    setModal({ show: true, title, progress: 0 });
    setTimeout(() => setModal((m) => ({ ...m, progress: 100 })), 100);
    timerRef.current = setTimeout(() => {
      setModal({ show: false, title: "", progress: 0 });
      setTab(nextTab);
    }, 1800);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const tabs: { id: AppTab; icon: string; label: string }[] = [
    { id: "scan", icon: "📐", label: "Scan" },
    { id: "plan", icon: "📋", label: "Plan" },
    { id: "templates", icon: "🏠", label: "Design" },
    { id: "bespoke", icon: "✏️", label: "Custom" },
    { id: "eps", icon: "🧱", label: "EPS" },
    { id: "view", icon: "👁", label: "View" },
    { id: "po", icon: "📄", label: "PO" },
  ];

  const totalCost = epsMaterials.reduce((s, m) => s + m.qty * m.cost, 0);

  return (
    <section id="app" className="scroll-mt-32 fade-in-section delay-3">
      <div className="glass-card-dark p-5 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4CD3B3]/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/10 rounded-full border border-[#4CD3B3]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CD3B3] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3]">The Software Hook</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white mb-2">Fjäll Studio App.</h2>
          <p className="text-sm text-white/50 font-medium max-w-xl mx-auto">Seven tabs. One seamless flow. The catalyst that drives every hardware sale.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start max-w-5xl mx-auto relative z-10">
          {/* iPhone */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="iphone-frame">
              <div className="iphone-notch" />
              <div className="iphone-screen">
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-7 flex items-center justify-between px-5 z-20">
                  <span className="text-[9px] text-white/50 font-semibold">9:41</span>
                  <span className="text-[8px] text-white/40">5G 🔋</span>
                </div>

                {/* === SCAN === */}
                <div className={`app-screen${tab === "scan" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#4CD3B3] font-bold uppercase tracking-widest mb-0.5">Step 1</div>
                    <div className="text-base font-bold text-white leading-tight">Scan Room</div>
                    <div className="text-[11px] text-white/40 mb-2">Point camera at walls</div>
                    <div className="bg-[#111] rounded-xl flex-1 relative overflow-hidden border border-white/10 mb-3" style={{ minHeight: 140 }}>
                      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(76,211,179,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(76,211,179,0.08) 1px,transparent 1px)", backgroundSize: "14px 14px" }} />
                      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#4CD3B3]" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#4CD3B3]" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#4CD3B3]" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#4CD3B3]" />
                      <div className="absolute left-0 right-0 h-0.5 bg-[#4CD3B3] shadow-[0_0_8px_#4CD3B3]" style={{ animation: "scanLine 2.5s ease-in-out infinite", top: "35%" }} />
                      <svg viewBox="0 0 200 160" className="absolute inset-2 w-auto h-auto"><rect x="40" y="30" width="120" height="90" fill="none" stroke="rgba(76,211,179,0.3)" strokeWidth="1" rx="2" /><text x="100" y="80" fill="rgba(76,211,179,0.5)" fontSize="9" textAnchor="middle">4.2m x 5.8m</text></svg>
                    </div>
                    <button onClick={() => openModal("Processing scan...", "plan")} className="w-full py-2.5 bg-[#4CD3B3] text-black rounded-xl text-xs font-bold mb-2">Generate Floorplan</button>
                  </div>
                </div>

                {/* === PLAN === */}
                <div className={`app-screen${tab === "plan" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#4CD3B3] font-bold uppercase tracking-widest mb-0.5">Step 2</div>
                    <div className="text-base font-bold text-white leading-tight">Floorplan</div>
                    <div className="text-[11px] text-white/40 mb-2">Auto-generated</div>
                    <div className="bg-[#fafafa] rounded-xl p-2 mb-2 flex-1" style={{ minHeight: 120 }}>
                      <svg viewBox="0 0 180 160" className="w-full h-full"><rect x="20" y="15" width="140" height="110" fill="none" stroke="#333" strokeWidth="2.5" rx="3" /><line x1="80" y1="15" x2="80" y2="95" stroke="#666" strokeWidth="1.5" /><line x1="80" y1="95" x2="160" y2="95" stroke="#666" strokeWidth="1.5" /><path d="M 55 125 Q 55 100 80 100" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="3 3" /><rect x="35" y="20" width="30" height="3" fill="#4CD3B3" opacity="0.4" rx="1" /><rect x="105" y="20" width="30" height="3" fill="#4CD3B3" opacity="0.4" rx="1" /><text x="50" y="60" fill="#888" fontSize="8" fontWeight="600">Living</text><text x="120" y="60" fill="#888" fontSize="8" fontWeight="600">Bed</text><text x="110" y="115" fill="#888" fontSize="8" fontWeight="600">Kitchen</text></svg>
                    </div>
                    <div className="flex gap-2 mb-2">
                      {[{ v: "42m²", l: "Area" }, { v: "5.8m", l: "Len" }, { v: "4.2m", l: "Wid" }].map((m) => (
                        <div key={m.l} className="flex-1 bg-white/5 rounded-lg p-1.5 text-center border border-white/5"><div className="text-[11px] font-bold text-white">{m.v}</div><div className="text-[8px] text-white/30">{m.l}</div></div>
                      ))}
                    </div>
                    <button onClick={() => openModal("Loading templates...", "templates")} className="w-full py-2.5 bg-[#4CD3B3] text-black rounded-xl text-xs font-bold mb-2">Choose Template</button>
                  </div>
                </div>

                {/* === TEMPLATES === */}
                <div className={`app-screen${tab === "templates" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#4CD3B3] font-bold uppercase tracking-widest mb-0.5">Step 3</div>
                    <div className="text-base font-bold text-white leading-tight">Templates</div>
                    <div className="text-[11px] text-white/40 mb-2">Pre-designed by Fjäll</div>
                    <div className="app-scroll space-y-2 flex-1">
                      {templates.map((t, i) => (
                        <button key={i} onClick={() => setSelectedTemplate(i)} className={`w-full text-left p-2.5 rounded-xl border transition-all ${selectedTemplate === i ? "bg-[#4CD3B3]/15 border-[#4CD3B3]/40" : "bg-white/5 border-white/5 hover:bg-white/8"}`}>
                          <div className="flex justify-between items-start">
                            <div><div className="text-[12px] font-bold text-white">{t.name}</div><div className="text-[9px] text-white/40">{t.rooms} rooms · {t.size}</div></div>
                            <div className="text-right"><div className="text-[12px] font-bold text-[#4CD3B3]">{t.price}</div>{t.popular && <div className="text-[7px] bg-[#4CD3B3]/20 text-[#4CD3B3] px-1 py-0.5 rounded-full mt-0.5">Popular</div>}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setTab("bespoke")} className="flex-1 py-2 bg-white/5 text-white/60 rounded-xl text-[10px] font-bold border border-white/10">Custom</button>
                      <button onClick={() => openModal("Calculating EPS...", "eps")} disabled={selectedTemplate === null} className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition ${selectedTemplate !== null ? "bg-[#4CD3B3] text-black" : "bg-white/10 text-white/30"}`}>Calculate EPS</button>
                    </div>
                  </div>
                </div>

                {/* === BESPOKE === */}
                <div className={`app-screen${tab === "bespoke" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#af52de] font-bold uppercase tracking-widest mb-0.5">Step 3b</div>
                    <div className="text-base font-bold text-white leading-tight">Custom Build</div>
                    <div className="text-[11px] text-white/40 mb-2">Design from scratch</div>
                    <div className="app-scroll flex-1">
                      <div className="bg-[#1c1c1e] rounded-xl p-3 mb-2 border border-white/5">
                        <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Room Config</div>
                        {[{ label: "Bedrooms", val: "3", icon: "🛏️" }, { label: "Bathrooms", val: "2", icon: "🚿" }, { label: "Living Area", val: "28m²", icon: "🛋️" }, { label: "Kitchen", val: "Yes", icon: "🍳" }, { label: "Terrace", val: "12m²", icon: "🌿" }].map((r) => (
                          <div key={r.label} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-2"><span className="text-sm">{r.icon}</span><span className="text-[11px] text-white/70">{r.label}</span></div>
                            <span className="text-[11px] font-bold text-white">{r.val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-[#af52de]/10 rounded-xl p-3 border border-[#af52de]/20 mb-2">
                        <div className="text-[9px] text-[#af52de] font-bold uppercase tracking-widest mb-1">AI Assistant</div>
                        <div className="text-[11px] text-white/60">Fjäll AI suggests optimal layouts based on your scanned dimensions and local building codes.</div>
                      </div>
                    </div>
                    <button onClick={() => openModal("Optimising layout...", "eps")} className="w-full py-2.5 bg-[#af52de] text-white rounded-xl text-xs font-bold mt-1 mb-2">Generate Custom EPS</button>
                  </div>
                </div>

                {/* === EPS === */}
                <div className={`app-screen${tab === "eps" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#4CD3B3] font-bold uppercase tracking-widest mb-0.5">Step 4</div>
                    <div className="text-base font-bold text-white leading-tight">EPS Calculator</div>
                    <div className="text-[11px] text-white/40 mb-2">Materials breakdown</div>
                    <div className="app-scroll flex-1">
                      {epsMaterials.map((m, i) => (
                        <div key={i} className="flex justify-between py-1.5 border-b border-white/5">
                          <div><div className="text-[11px] font-medium text-white">{m.name}</div><div className="text-[9px] text-white/30">{m.qty} pcs</div></div>
                          <span className="text-[11px] font-semibold text-white">Rp {m.cost}M</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <div className="flex justify-between"><span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Total</span><span className="text-sm font-bold text-[#4CD3B3]">Rp {totalCost.toFixed(0)}M</span></div>
                    </div>
                    <button onClick={() => openModal("Rendering 3D...", "view")} className="w-full py-2.5 bg-[#4CD3B3] text-black rounded-xl text-xs font-bold mt-2 mb-2">Preview 3D</button>
                  </div>
                </div>

                {/* === VIEW (3D Showroom) === */}
                <div className={`app-screen${tab === "view" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#4CD3B3] font-bold uppercase tracking-widest mb-0.5">Step 5</div>
                    <div className="text-base font-bold text-white leading-tight">3D Showroom</div>
                    <div className="text-[11px] text-white/40 mb-2">Your modular home</div>
                    <div className="rounded-xl flex-1 flex items-center justify-center overflow-hidden border border-white/10 mb-3 relative" style={{ background: "linear-gradient(135deg,#0c1a1a,#0a1218)", minHeight: 140 }}>
                      <ShowroomCube />
                      <div className="absolute bottom-2 left-2 text-[8px] text-[#4CD3B3]/40 font-mono">AR Ready</div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      {[{ v: "52m²", l: "Area" }, { v: "3", l: "Rooms" }, { v: "14d", l: "Build" }].map((m) => (
                        <div key={m.l} className="flex-1 bg-white/5 rounded-lg p-1.5 text-center border border-white/5"><div className="text-[11px] font-bold text-white">{m.v}</div><div className="text-[8px] text-white/30">{m.l}</div></div>
                      ))}
                    </div>
                    <button onClick={() => openModal("Generating PO...", "po")} className="w-full py-2.5 bg-[#4CD3B3] text-black rounded-xl text-xs font-bold mb-2">Send Factory PO</button>
                  </div>
                </div>

                {/* === PO === */}
                <div className={`app-screen${tab === "po" ? " active" : ""}`}>
                  <div className="pt-8 px-3 flex flex-col h-full">
                    <div className="text-[9px] text-[#34c759] font-bold uppercase tracking-widest mb-0.5 text-center">Complete</div>
                    <div className="text-base font-bold text-white mb-0.5 text-center">Purchase Order</div>
                    <div className="text-[11px] text-white/40 mb-3 text-center">Sent to Factory Hub</div>
                    <div className="app-scroll flex-1 space-y-2">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <div className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">PO Number</div>
                        <div className="text-base font-bold text-white font-mono">PO #FJ-8472-A</div>
                        <div className="text-[10px] text-white/30">Factory Hub — Jakarta</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        {[{ l: "Template", v: "Fjäll Family" }, { l: "Floor Area", v: "52m²" }, { l: "EPS Panels", v: "47 pcs" }].map((r) => (
                          <div key={r.l} className="flex justify-between mb-1"><span className="text-[10px] text-white/50">{r.l}</span><span className="text-[10px] font-bold text-white">{r.v}</span></div>
                        ))}
                        <div className="flex justify-between border-t border-white/10 pt-1 mt-1"><span className="text-[10px] text-white/50 font-bold">Total</span><span className="text-sm font-bold text-[#4CD3B3]">Rp 845M</span></div>
                      </div>
                      <div className="bg-[#4CD3B3]/10 rounded-xl p-2.5 border border-[#4CD3B3]/20">
                        <div className="flex items-center gap-2"><span className="text-base">🚛</span><div><div className="text-[11px] font-bold text-[#4CD3B3]">14-Day Delivery</div><div className="text-[8px] text-white/40">CNC machine code generated</div></div></div>
                      </div>
                    </div>
                    <button onClick={() => setTab("scan")} className="w-full py-2.5 bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 mt-2 mb-2">Start New Project</button>
                  </div>
                </div>

                {/* Modal */}
                {modal.show && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-[#1c1c1e] rounded-2xl p-5 text-center w-full max-w-[180px] border border-white/10">
                      <div className="text-3xl mb-2 animate-spin">⚙️</div>
                      <div className="text-xs font-bold text-white mb-2">{modal.title}</div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#4CD3B3] to-[#3D867C] rounded-full transition-all" style={{ width: `${modal.progress}%` }} /></div>
                    </div>
                  </div>
                )}

                {/* Tab Bar */}
                <div className="app-tab-bar">
                  {tabs.map((t) => (
                    <button key={t.id} onClick={() => setTab(t.id)} className={`app-tab-btn${tab === t.id ? " active" : ""}`}>
                      <span className="app-tab-icon">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side explanation */}
          <div className="lg:col-span-3 space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {[
              { s: "1", t: "scan" as AppTab, title: "Scan the Room", desc: "LiDAR-scan any room. Walls, doors, windows mapped in seconds.", m: "< 2 min", color: "#4CD3B3" },
              { s: "2", t: "plan" as AppTab, title: "Auto Floorplan", desc: "2D architectural floorplan generated instantly with exact measurements.", m: "100%", color: "#4CD3B3" },
              { s: "3", t: "templates" as AppTab, title: "Pick a Template", desc: "Fjäll pre-designed: Studio, Compact, Family, Villa — fitted to your scan.", m: "4", color: "#4CD3B3" },
              { s: "3b", t: "bespoke" as AppTab, title: "Bespoke Build", desc: "Design from scratch. AI suggests optimal layouts based on your space.", m: "Custom", color: "#af52de" },
              { s: "4", t: "eps" as AppTab, title: "EPS Calculator", desc: "Every panel, joint, fitting calculated and priced in real-time.", m: "47", color: "#4CD3B3" },
              { s: "5", t: "view" as AppTab, title: "3D Showroom", desc: "Full isometric preview. Walk through your home before manufacturing.", m: "AR", color: "#4CD3B3" },
              { s: "6", t: "po" as AppTab, title: "Factory PO", desc: "One tap. CNC machine code sent to factory. 14-day delivery.", m: "14d", color: "#34c759" },
            ].map((item, i) => (
              <button key={i} onClick={() => setTab(item.t)} className={`w-full text-left p-3 rounded-xl border transition-all ${tab === item.t ? "bg-[#4CD3B3]/10 border-[#4CD3B3]/30" : "bg-white/5 border-white/5 hover:bg-white/8"}`}>
                <div className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${tab === item.t ? "bg-[#4CD3B3] text-black" : "bg-white/10 text-white/50"}`}>{item.s}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-right shrink-0 ml-2"><div className="text-sm font-bold" style={{ color: item.color }}>{item.m}</div></div>
                    </div>
                    <div className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
