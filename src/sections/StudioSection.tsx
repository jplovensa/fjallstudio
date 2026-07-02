import { useState, useEffect } from "react";

export default function StudioSection() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { icon: "🚪", title: "Enter", desc: "Walk into the pod" },
    { icon: "🤝", title: "Welcome", desc: "Architect greets" },
    { icon: "📐", title: "Scan", desc: "LiDAR capture" },
    { icon: "🧱", title: "Build", desc: "EPS workbench" },
    { icon: "🏠", title: "Preview", desc: "3D render" },
  ];
  useEffect(() => {
    const interval = setInterval(() => setActiveStep(p => (p + 1) % steps.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="studio" className="scroll-mt-32 fade-in-section delay-2">
      <div className="glass-card p-6 md:p-10 overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/10 rounded-full border border-[#4CD3B3]/20 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#3D867C]">The Product</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">Phygital Studio.</h2>
          <p className="text-lg text-apple-gray font-medium max-w-2xl mx-auto">An 18m² studio pod where clients walk in, get welcomed by an architect, and walk out with a factory Purchase Order — in 55 minutes.</p>
        </div>
        <div className="bg-white/60 rounded-2xl border border-white/60 p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 flex items-center justify-center" style={{ minHeight: 380 }}>
              <Pod360 />
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {steps.map((s, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeStep === i ? "bg-[#1d1d1f] text-white border-[#1d1d1f]" : "bg-white text-apple-gray border-gray-200 hover:border-gray-300"}`}>
                    <span className="text-sm">{s.icon}</span><span>{s.title}</span>
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3] mb-2">Step {activeStep + 1} of {steps.length}</div>
              <h3 className="text-2xl font-display font-bold tracking-tight mb-3">{steps[activeStep].title}</h3>
              <p className="text-apple-gray font-medium leading-relaxed mb-5">
                {activeStep === 0 && "Client walks into a Fjäll Studio Pod — an 18m² glass-walled showroom in a high-footfall retail location. Designed to attract, engage, and convert."}
                {activeStep === 1 && "An in-house Fjäll architect greets the client, understands their needs, and guides them through the studio experience — no pressure, pure consultation."}
                {activeStep === 2 && "The client uses the Fjäll app to LiDAR-scan their existing room or plot. Every wall, corner, and opening is captured with millimetre precision in under 2 minutes."}
                {activeStep === 3 && "At the workbench, physical EPS sample blocks are assembled to match the digital floorplan. Clients touch and feel the material that will build their home."}
                {activeStep === 4 && "A full 3D isometric preview renders on the studio screen. Clients rotate, zoom, and explore their future home before a single panel is manufactured."}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {getStepMetrics(activeStep).map(m => (
                  <div key={m.label} className="bg-white rounded-xl p-3 border border-gray-100">
                    <div className="text-[10px] font-semibold text-apple-gray uppercase tracking-wider">{m.label}</div>
                    <div className="text-lg font-bold text-[#3D867C]">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getStepMetrics(step: number) {
  const metrics = [[{label:"Pod Size",value:"18m²"},{label:"Locations",value:"Mall / High St"}],[{label:"Staff",value:"2 Architects"},{label:"Consult",value:"15 min"}],[{label:"Accuracy",value:"±2mm"},{label:"Time",value:"< 2 min"}],[{label:"Block Types",value:"40+"},{label:"Tracking",value:"RFID"}],[{label:"Render",value:"Real-time"},{label:"Export",value:"AR / CNC"}]];
  return metrics[step] || metrics[0];
}

/* ============================================================
   CLEAN 3D BOX — All faces share center origin
   No per-face transform-origin. Just translate + rotate.
   ============================================================ */
interface BoxProps {
  x: number; y: number; w: number; d: number; h: number;
  topC: string; sideC: string; frontC: string;
  children?: React.ReactNode;
}

function Box3D({ x, y, w, d, h, topC, sideC, frontC, children }: BoxProps) {
  const hw = w / 2, hd = d / 2, hh = h / 2;
  const faceBase = {
    position: "absolute" as const,
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
  };

  return (
    <div style={{
      position: "absolute", left: x + hw, top: y + hd, width: 1, height: 1,
      WebkitTransformStyle: "preserve-3d" as const,
      transformStyle: "preserve-3d" as const,
    }}>
      {/* Top */}
      <div style={{ ...faceBase, width: w, height: d, left: -hw, top: -hd, background: topC, WebkitTransform: `translateZ(${hh}px)`, transform: `translateZ(${hh}px)` }} />
      {/* Bottom */}
      <div style={{ ...faceBase, width: w, height: d, left: -hw, top: -hd, background: frontC, WebkitTransform: `translateZ(-${hh}px) rotateX(180deg)`, transform: `translateZ(-${hh}px) rotateX(180deg)` }} />
      {/* Front */}
      <div style={{ ...faceBase, width: w, height: h, left: -hw, top: -hh, background: frontC, WebkitTransform: `translateY(-${hd}px) rotateX(90deg)`, transform: `translateY(-${hd}px) rotateX(90deg)` }} />
      {/* Back */}
      <div style={{ ...faceBase, width: w, height: h, left: -hw, top: -hh, background: frontC, WebkitTransform: `translateY(${hd}px) rotateX(-90deg)`, transform: `translateY(${hd}px) rotateX(-90deg)` }} />
      {/* Left */}
      <div style={{ ...faceBase, width: d, height: h, left: -hd, top: -hh, background: sideC, WebkitTransform: `translateX(-${hw}px) rotateY(-90deg)`, transform: `translateX(-${hw}px) rotateY(-90deg)` }} />
      {/* Right */}
      <div style={{ ...faceBase, width: d, height: h, left: -hd, top: -hh, background: sideC, WebkitTransform: `translateX(${hw}px) rotateY(90deg)`, transform: `translateX(${hw}px) rotateY(90deg)` }} />
      {/* Children sit on top */}
      {children && (
        <div style={{
          position: "absolute", left: -hw, top: -hd, width: w, height: d,
          WebkitTransform: `translateZ(${hh}px)`, transform: `translateZ(${hh}px)`,
          WebkitTransformStyle: "preserve-3d" as const, transformStyle: "preserve-3d" as const,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   POD 360 — Full 3D spinning studio
   ============================================================ */
function Pod360() {
  const W = 220, D = 130, H = 100;
  const hw = W / 2, hd = D / 2, hh = H / 2;

  return (
    <div className="relative rounded-2xl border border-white/10 shadow-xl flex items-center justify-center overflow-hidden"
      style={{ width: "100%", maxWidth: 480, height: 380, background: "linear-gradient(160deg, #e8f2f0 0%, #d8eae6 50%, #c8e0dc 100%)" }}>

      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `linear-gradient(rgba(61,134,124,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(61,134,124,0.5) 1px,transparent 1px)`, backgroundSize: "20px 20px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(76,211,179,0.14) 0%, transparent 70%)" }} />

      {/* 3D Scene */}
      <div style={{ perspective: 1000, width: 1, height: 1, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1, WebkitTransformStyle: "preserve-3d" as const, transformStyle: "preserve-3d" as const, WebkitAnimation: "podSpin 20s linear infinite", animation: "podSpin 20s linear infinite" }}>

          {/* ===== FLOOR (the container base) ===== */}
          <div style={{ position: "absolute", width: W, height: D, top: -hd, left: -hw, WebkitTransform: `rotateX(90deg) translateZ(-${hh}px)`, transform: `rotateX(90deg) translateZ(-${hh}px)`, WebkitTransformStyle: "preserve-3d" as const, transformStyle: "preserve-3d" as const }}>
            {/* Floor surface */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #eaece3 0%, #dde0d4 100%)", border: "1px solid rgba(61,134,124,0.2)", boxShadow: "inset 0 0 25px rgba(255,255,255,0.5)" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(61,134,124,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(61,134,124,0.06) 1px,transparent 1px)`, backgroundSize: "14px 14px" }} />
            </div>

            {/* ===== 3D INTERIOR BOXES (all sitting ON the floor) ===== */}

            {/* Workbench — centered */}
            <Box3D x={65} y={40} w={76} d={38} h={20}
              topC="linear-gradient(135deg, #e8dfd6, #d8cfc6)"
              sideC="#c8bfb6"
              frontC="#d0c7be">
              {/* EPS Block 1 */}
              <Box3D x={6} y={6} w={14} d={11} h={7}
                topC="linear-gradient(135deg, #f0eae2, #e2dad0)"
                sideC="#d0c8be"
                frontC="#d8d0c6" />
              {/* EPS Block 2 */}
              <Box3D x={26} y={8} w={12} d={10} h={6}
                topC="linear-gradient(135deg, #eae4da, #ddd5cb)"
                sideC="#ccc4ba"
                frontC="#d4ccc2" />
              {/* EPS Block 3 */}
              <Box3D x={44} y={4} w={16} d={10} h={6}
                topC="linear-gradient(135deg, #ece6de, #d8d0c4)"
                sideC="#cac2b8"
                frontC="#d2cac0" />
              {/* Label */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 5, color: "rgba(100,80,60,0.5)", letterSpacing: "0.8px", whiteSpace: "nowrap" }}>WORKBENCH</div>
            </Box3D>

            {/* Consultation Table — back-left */}
            <Box3D x={14} y={14} w={48} d={32} h={14}
              topC="linear-gradient(135deg, rgba(255,255,255,0.92), rgba(240,248,246,0.86))"
              sideC="rgba(215,228,224,0.7)"
              frontC="rgba(220,232,228,0.75)">
              {/* Tablet */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 16, height: 11, background: "linear-gradient(135deg, #111, #2a2a2a)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ position: "absolute", inset: 2, background: "linear-gradient(135deg, rgba(76,211,179,0.15), rgba(61,134,124,0.06))", borderRadius: 1 }} />
              </div>
            </Box3D>

            {/* LiDAR Scanner — right side */}
            <div style={{ position: "absolute", left: W - 46, top: 38, width: 22, height: 20, transformStyle: "preserve-3d" }}>
              {/* Scanner head */}
              <Box3D x={4} y={2} w={12} d={10} h={8}
                topC="#555"
                sideC="#333"
                frontC="#3a3a3a">
                <div style={{ position: "absolute", top: 2, left: 3, width: 5, height: 5, borderRadius: "50%", background: "#4CD3B3", boxShadow: "0 0 6px #4CD3B3", animation: "pulseGlow 1.5s infinite" }} />
              </Box3D>
              {/* Pole */}
              <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 2.5, height: 10, background: "linear-gradient(to right, #999, #bbb)" }} />
              {/* Base */}
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 18, height: 4, background: "linear-gradient(135deg, #aaa, #888)", borderRadius: 2 }} />
              <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", fontSize: 5, color: "#3D867C", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>LiDAR</div>
            </div>

            {/* Client figure — near entrance (front) */}
            <Box3D x={20} y={D - 30} w={10} d={10} h={16}
              topC="linear-gradient(135deg, #62a0a0, #4a8888)"
              sideC="#3d7070"
              frontC="#4a8080">
              <div style={{ position: "absolute", top: 1, left: 1, width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #e4c49c, #d0b08a)", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", animation: "personBob 3s infinite" }} />
            </Box3D>

            {/* Architect figure — center */}
            <Box3D x={54} y={D - 48} w={10} d={10} h={16}
              topC="linear-gradient(135deg, #4a9a8c, #2c7a6e)"
              sideC="#2f6e64"
              frontC="#3d8a7e">
              <div style={{ position: "absolute", top: 1, left: 1, width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #e4c49c, #d0b08a)", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", animation: "personBob 3s 1.5s infinite" }} />
            </Box3D>

            {/* Welcome Mat */}
            <div style={{ position: "absolute", bottom: 6, left: 12, width: 42, height: 14, transform: "translateZ(0.5px)", background: "linear-gradient(135deg, rgba(61,134,124,0.1), rgba(76,211,179,0.05))", borderRadius: 2, border: "1px dashed rgba(61,134,124,0.2)" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 5, color: "#3D867C", letterSpacing: "0.8px" }}>WELCOME</div>
            </div>

            {/* Dimension labels */}
            <div style={{ position: "absolute", bottom: -12, left: 0, right: 0, textAlign: "center", fontSize: 7, color: "rgba(61,134,124,0.5)", letterSpacing: "1px", fontWeight: 600 }}>6.0m</div>
            <div style={{ position: "absolute", top: "50%", right: -18, transform: "translateY(-50%) rotate(-90deg)", fontSize: 7, color: "rgba(61,134,124,0.5)", letterSpacing: "1px", fontWeight: 600, whiteSpace: "nowrap" }}>3.0m</div>
          </div>

          {/* ===== WALLS ===== */}
          {/* Back Wall */}
          <div style={{ position: "absolute", width: W, height: H, top: -hh, left: -hw, background: "linear-gradient(to bottom, #f0f4f2, #e2ebe8)", border: "1px solid rgba(61,134,124,0.18)", transform: `rotateY(180deg) translateZ(${hd}px)` }}>
            <div style={{ position: "absolute", top: 6, right: 8 }}>
              <img src="./assets/fjall-group-logo.png" alt="Fjäll" style={{ width: 50, height: 16, objectFit: "contain", opacity: 0.85 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 95, height: 48, background: "linear-gradient(135deg, #0a1414, #142828)", border: "1px solid rgba(76,211,179,0.3)", borderRadius: 3, boxShadow: "0 0 12px rgba(76,211,179,0.2)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 2, border: "1px solid rgba(76,211,179,0.12)", borderRadius: 2 }}>
                <svg viewBox="0 0 100 50" width="100%" height="100%"><rect x="25" y="12" width="50" height="28" fill="none" stroke="#4CD3B3" strokeWidth="0.6" rx="1" /><polygon points="25,12 50,3 75,12" fill="none" stroke="#4CD3B3" strokeWidth="0.6" /><rect x="35" y="24" width="10" height="8" fill="none" stroke="#4CD3B3" strokeWidth="0.3" /><rect x="55" y="22" width="12" height="10" fill="none" stroke="#4CD3B3" strokeWidth="0.3" /><text x="50" y="44" fill="#4CD3B3" fontSize="5" textAnchor="middle" opacity="0.5">3D PREVIEW</text></svg>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(76,211,179,0.06), transparent)", animation: "pulseGlow 3s infinite" }} />
            </div>
            <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", fontSize: 5, color: "#3D867C", letterSpacing: "1px", opacity: 0.6 }}>STUDIO SCREEN</div>
          </div>

          {/* Front Wall (glass entrance) */}
          <div style={{ position: "absolute", width: W, height: H, top: -hh, left: -hw, background: "linear-gradient(to top, rgba(200,220,215,0.12), rgba(210,230,225,0.06))", border: "1px solid rgba(61,134,124,0.1)", transform: `translateZ(${hd}px)` }}>
            <div style={{ position: "absolute", bottom: 0, left: 10, width: 48, height: 80, background: "rgba(180,210,205,0.08)", border: "1px solid rgba(61,134,124,0.18)", borderBottom: "none", borderRadius: "2px 2px 0 0" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(61,134,124,0.25)" }} />
            </div>
            <div style={{ position: "absolute", bottom: 6, right: 8, display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.88)", padding: "2px 6px", borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <img src="./assets/fjall-group-logo.png" alt="Fjäll" style={{ width: 40, height: 13, objectFit: "contain" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          </div>

          {/* Left Wall (glass) */}
          <div style={{ position: "absolute", width: D, height: H, top: -hh, left: -hd, background: "linear-gradient(to right, rgba(195,220,215,0.18), rgba(215,235,230,0.06))", border: "1px solid rgba(61,134,124,0.1)", transform: `rotateY(-90deg) translateZ(${hw}px)` }}>
            <div style={{ position: "absolute", top: 10, left: 10, width: 1.5, height: 45, background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)" }} />
            <div style={{ position: "absolute", top: 22, left: 26, width: 1.5, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)" }} />
          </div>

          {/* Right Wall (solid + window) */}
          <div style={{ position: "absolute", width: D, height: H, top: -hh, left: -hd, background: "linear-gradient(to left, rgba(225,238,235,0.85), rgba(212,230,226,0.78))", border: "1px solid rgba(61,134,124,0.14)", transform: `rotateY(90deg) translateZ(${hw}px)` }}>
            <div style={{ position: "absolute", top: 14, left: 10, width: 38, height: 28, background: "linear-gradient(135deg, rgba(185,218,230,0.4), rgba(165,208,220,0.22))", border: "1px solid rgba(61,134,124,0.18)", borderRadius: 2 }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(61,134,124,0.18)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(61,134,124,0.18)" }} />
            </div>
          </div>

          {/* Roof */}
          <div style={{ position: "absolute", width: W, height: D, top: -hd, left: -hw, background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(240,247,245,0.15))", border: "1px solid rgba(61,134,124,0.08)", transform: `rotateX(-90deg) translateZ(${hh}px)` }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 48, height: 28, background: "linear-gradient(135deg, rgba(185,225,240,0.3), rgba(165,215,230,0.18))", border: "1px solid rgba(61,134,124,0.18)", borderRadius: 2 }} />
          </div>

        </div>
      </div>

      {/* Overlays */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full z-10" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(61,134,124,0.15)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
        <img src="./assets/fjall-group-logo.png" alt="Fjäll" style={{ width: 48, height: 14, objectFit: "contain" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <span className="text-[8px] text-[#3D867C] ml-0.5">18m²</span>
      </div>
      <div className="absolute top-3 right-4 text-[8px] font-medium z-10" style={{ color: "rgba(61,134,124,0.5)", letterSpacing: "0.5px" }}>6m × 3m × 2.8m</div>
    </div>
  );
}
