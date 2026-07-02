import { useState, useCallback, useRef, useEffect } from "react";

type OSView = "build" | "scan" | "bom" | "success";

interface ModalState {
  show: boolean;
  target: OSView;
  title: string;
  desc: string;
  icon: string;
}

interface BoqItem {
  name: string;
  qty: number;
  unit: string;
  unitCost: number;
}

const boqData: BoqItem[] = [
  { name: "EPS External Wall Panel", qty: 24, unit: "units", unitCost: 12500000 },
  { name: "EPS Partition Panel", qty: 12, unit: "units", unitCost: 8500000 },
  { name: "Aluminium Window Frame", qty: 4, unit: "units", unitCost: 22000000 },
  { name: "Steel Door Frame", qty: 2, unit: "units", unitCost: 18500000 },
  { name: "Roof Insulation Layer", qty: 1, unit: "set", unitCost: 85000000 },
  { name: "Electrical Conduit Set", qty: 1, unit: "set", unitCost: 65000000 },
  { name: "Plumbing Assembly", qty: 1, unit: "set", unitCost: 78000000 },
  { name: "Flooring Substrate", qty: 1, unit: "set", unitCost: 95000000 },
  { name: "Interior Finishing Kit", qty: 1, unit: "set", unitCost: 145000000 },
  { name: "HVAC System", qty: 1, unit: "unit", unitCost: 120000000 },
];

function Cube3D({ variant, animating }: { variant: "wireframe" | "shaded" | "scan"; animating?: boolean }) {
  const size = 120;
  const wallH = 80;

  const wireColor = variant === "scan" ? "rgba(0,255,255,0.3)" : "rgba(0,113,227,0.5)";
  const wireFill = variant === "scan" ? "rgba(0,255,255,0.05)" : "rgba(0,113,227,0.05)";
  const gridBg = variant === "scan"
    ? "linear-gradient(to right, rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,255,0.15) 1px, transparent 1px)"
    : "linear-gradient(to right, rgba(0,113,227,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,113,227,0.3) 1px, transparent 1px)";

  return (
    <div
      style={{
        width: size,
        height: size,
        WebkitTransformStyle: "preserve-3d" as const,
        transformStyle: "preserve-3d" as const,
        transformOrigin: `${size / 2}px ${size / 2}px 0`,
        WebkitTransform: "rotateX(60deg) rotateZ(-45deg)",
        transform: "rotateX(60deg) rotateZ(-45deg)",
        position: "relative",
        WebkitAnimation: animating ? "spinSlow 25s linear infinite" : "none",
        animation: animating ? "spinSlow 25s linear infinite" : "none",
        flexShrink: 0,
      }}
    >
      {/* Floor */}
      <div style={{
        position: "absolute", width: size, height: size,
        background: variant === "shaded" ? "#222" : wireFill,
        border: variant === "shaded" ? "1px solid #444" : `2px solid ${wireColor}`,
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        boxShadow: variant === "shaded" ? "0 10px 30px rgba(0,0,0,0.5)" : `0 0 30px rgba(0,113,227,0.2)`,
        backgroundImage: variant !== "shaded" ? gridBg : "none",
        backgroundSize: "30px 30px",
      }} />
      {/* North wall */}
      <div style={{
        position: "absolute", width: size, height: wallH,
        background: variant === "shaded" ? "#333" : wireFill,
        border: variant === "shaded" ? "1px solid #555" : `2px solid ${wireColor}`,
        WebkitTransformOrigin: "top",
        transformOrigin: "top",
        WebkitTransform: "rotateX(90deg)",
        transform: "rotateX(90deg)",
        top: 0,
        backgroundImage: variant !== "shaded" ? gridBg : "none",
        backgroundSize: "30px 30px",
      }} />
      {/* West wall */}
      <div style={{
        position: "absolute", width: wallH, height: size,
        background: variant === "shaded" ? "#444" : wireFill,
        border: variant === "shaded" ? "1px solid #555" : `2px solid ${wireColor}`,
        WebkitTransformOrigin: "left",
        transformOrigin: "left",
        WebkitTransform: "rotateY(-90deg)",
        transform: "rotateY(-90deg)",
        left: 0,
        backgroundImage: variant !== "shaded" ? gridBg : "none",
        backgroundSize: "30px 30px",
      }} />
      {/* Roof (shaded only) */}
      {variant === "shaded" && (
        <div style={{
          position: "absolute", width: size + 4, height: size + 4,
          background: "#111",
          WebkitTransform: `translate(-2px, -2px) translateZ(${wallH}px)`,
          transform: `translate(-2px, -2px) translateZ(${wallH}px)`,
          border: "1px solid #333",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }} />
      )}
    </div>
  );
}

export default function SequencerOSSection() {
  const [activeView, setActiveView] = useState<OSView>("build");
  const [modal, setModal] = useState<ModalState>({
    show: false, target: "build", title: "", desc: "", icon: "",
  });
  const [progress, setProgress] = useState(0);
  const modalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateOSState = useCallback((target: OSView) => setActiveView(target), []);

  const triggerModalTransition = useCallback(
    (targetState: OSView, title: string, desc: string, icon: string) => {
      setModal({ show: true, target: targetState, title, desc, icon });
      setProgress(0);
      setTimeout(() => setProgress(100), 50);
      modalTimer.current = setTimeout(() => {
        setModal((m) => ({ ...m, show: false }));
        setTimeout(() => updateOSState(targetState), 300);
      }, 2000);
    },
    [updateOSState]
  );

  useEffect(() => {
    return () => { if (modalTimer.current) clearTimeout(modalTimer.current); };
  }, []);

  const handleAction = (view: OSView) => {
    switch (view) {
      case "build":
        triggerModalTransition("scan", "Syncing LiDAR Sensors", "Scanning physical EPS block positions...", "📡");
        break;
      case "scan":
        triggerModalTransition("bom", "Generating Bill of Materials", "Calculating quantities, costs, and factory routing...", "⚙️");
        break;
      case "bom":
        triggerModalTransition("success", "Transmitting Factory PO", "Sending automated purchase order to production hub...", "🔐");
        break;
      case "success":
        updateOSState("build");
        break;
    }
  };

  const totalCost = boqData.reduce((s, i) => s + i.qty * i.unitCost, 0);

  const navItems: { id: OSView; icon: string; title: string }[] = [
    { id: "build", icon: "🧱", title: "Build Mode" },
    { id: "scan", icon: "📡", title: "LiDAR Scan" },
    { id: "bom", icon: "📋", title: "BoQ & PO" },
  ];

  return (
    <section id="sequencer" className="scroll-mt-32 fade-in-section delay-3">
      <div className="glass-card-dark p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4CD3B3]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0071e3]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/15 rounded-full border border-[#4CD3B3]/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CD3B3] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3]">
              Step 2 — Digital Sequencer OS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
            Sequencer OS.
          </h2>
          <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
            As clients place physical blocks, the Sequencer OS translates each
            interaction into a live Bill of Materials, real-time pricing, and an
            automated factory Purchase Order.
          </p>
        </div>

        {/* iPad Mockup */}
        <div className="max-w-5xl mx-auto ipad-mockup z-10 relative">
          <div className="iphone-screen">
            {/* OS Nav Dock */}
            <div className="os-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`os-nav-btn${activeView === item.id ? " active" : ""}`}
                  title={item.title}
                  onClick={() => updateOSState(item.id)}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            {/* Modal Overlay */}
            <div className={`os-modal-overlay${modal.show ? " active" : ""}`}>
              <div className="os-modal">
                <div className="text-5xl mb-4">{modal.icon}</div>
                <h4 className="font-display font-bold text-2xl text-white mb-2">{modal.title}</h4>
                <p className="text-sm text-white/60 mb-6 font-medium">{modal.desc}</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="os-canvas">
              {/* BUILD */}
              <div className={`os-view${activeView === "build" ? " active" : ""}`}>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 text-center md:text-left z-10 text-white w-full md:w-auto px-4">
                  <div className="text-[10px] font-bold text-[#4CD3B3] uppercase tracking-widest mb-1">Step 1</div>
                  <div className="font-display font-bold text-2xl md:text-3xl tracking-tight">Spatial Wireframe</div>
                  <div className="text-white/50 text-sm font-medium mt-1">Live block interaction mirroring</div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                  <Cube3D variant="wireframe" animating />
                </div>
              </div>

              {/* SCAN */}
              <div className={`os-view${activeView === "scan" ? " active" : ""}`}>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 text-center md:text-left z-20 text-white w-full md:w-auto px-4">
                  <div className="text-[10px] font-bold text-[#00ffff] uppercase tracking-widest mb-1">Step 2</div>
                  <div className="font-display font-bold text-2xl md:text-3xl tracking-tight">LiDAR Sync</div>
                  <div className="text-[#00ffff] text-xs font-bold mt-2 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
                    Scanning Table...
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-full" style={{ opacity: 0.5 }}>
                  <Cube3D variant="scan" animating />
                </div>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.8) 100%)", pointerEvents: "none", zIndex: 5 }} />
                <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 2, background: "#00ffff", boxShadow: "0 0 20px #00ffff", animation: "scanLine 2s linear infinite alternate", zIndex: 6 }} />
              </div>

              {/* BOM */}
              <div className={`os-view${activeView === "bom" ? " active" : ""}`}>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 text-center md:text-left z-10 text-white w-full md:w-auto px-4">
                  <div className="text-[10px] font-bold text-[#34c759] uppercase tracking-widest mb-1">Step 3</div>
                  <div className="font-display font-bold text-2xl md:text-3xl tracking-tight">Production Twin</div>
                  <div className="text-[#34c759] text-xs font-bold mt-2 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#34c759]" />
                    Factory PO Ready
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                  <Cube3D variant="shaded" animating />
                </div>
              </div>

              {/* SUCCESS */}
              <div className={`os-view${activeView === "success" ? " active" : ""}`}>
                <div className="text-center">
                  <div className="text-6xl mb-4 drop-shadow-lg">✅</div>
                  <div className="text-white font-bold text-3xl tracking-tight mb-2">Purchase Order Sent</div>
                  <div className="text-white/60 font-medium">Machine code transmitted to Factory Hub.</div>
                  <div className="mt-6 bg-white/5 rounded-xl px-6 py-3 border border-white/10 inline-block">
                    <div className="text-xs text-white/40 font-mono tracking-widest">PO #FJ-8472-A</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="os-sidebar">
              {/* Build Panel */}
              <div className={`os-panel${activeView === "build" ? " active" : ""}`}>
                <div className="text-[10px] font-bold text-[#4CD3B3] uppercase tracking-widest mb-1">Block Detection</div>
                <div className="font-display font-bold text-xl mb-1 tracking-tight">Build Mode</div>
                <p className="text-sm text-white/40 mb-4">Place physical EPS blocks on the workbench to begin assembly.</p>
                <div className="flex-grow space-y-2 overflow-y-auto">
                  {[
                    { size: "1m", label: "Wall Panel Added", time: "2s ago" },
                    { size: "3m", label: "Partition Added", time: "8s ago" },
                    { size: "1m", label: "Corner Block Added", time: "15s ago" },
                    { size: "2m", label: "Window Frame Added", time: "22s ago" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-2xl flex items-center gap-3 border border-white/5">
                      <div className="w-9 h-9 rounded-lg bg-[#0071e3] flex items-center justify-center text-white font-bold text-sm shrink-0">{item.size}</div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-white truncate">{item.label}</div>
                        <div className="text-[10px] text-white/30">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="os-btn mt-4" onClick={() => handleAction("build")}>Sync LiDAR Scanner</button>
              </div>

              {/* Scan Panel */}
              <div className={`os-panel${activeView === "scan" ? " active" : ""}`}>
                <div className="text-[10px] font-bold text-[#00ffff] uppercase tracking-widest mb-1">Volumetric Analysis</div>
                <div className="font-display font-bold text-xl mb-1 tracking-tight">LiDAR Sync</div>
                <p className="text-sm text-white/40 mb-4">Processing spatial geometry from overhead sensors.</p>
                <div className="flex-grow space-y-2 text-[14px] font-medium overflow-y-auto">
                  {[
                    { label: "Validating joints...", status: "OK", pulse: true },
                    { label: "Calculating loads...", status: "OK", pulse: false },
                    { label: "Mapping plumbing...", status: "OK", pulse: false },
                    { label: "Checking insulation...", status: "OK", pulse: false },
                    { label: "Verifying structure...", status: "OK", pulse: false },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between pb-2 border-b border-white/5">
                      <span className={item.pulse ? "animate-pulse text-[#00ffff]" : "text-white/50"}>{item.label}</span>
                      <span className="text-white font-semibold">{item.status}</span>
                    </div>
                  ))}
                </div>
                <button className="os-btn mt-4" onClick={() => handleAction("scan")}>Generate BoQ</button>
              </div>

              {/* BOM Panel */}
              <div className={`os-panel${activeView === "bom" ? " active" : ""}`}>
                <div className="text-[10px] font-bold text-[#34c759] uppercase tracking-widest mb-1">Live Assembly</div>
                <div className="font-display font-bold text-xl mb-1 tracking-tight">Bill of Materials</div>
                <div className="flex-grow overflow-y-auto space-y-0 pr-1" style={{ maxHeight: 260 }}>
                  {boqData.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                      <div className="min-w-0 flex-1 mr-2">
                        <div className="text-[12px] font-medium text-white truncate">{item.name}</div>
                        <div className="text-[10px] text-white/30">{item.qty} {item.unit} x Rp {(item.unitCost / 1000000).toFixed(1)}M</div>
                      </div>
                      <span className="text-[12px] font-semibold text-white shrink-0">Rp {((item.qty * item.unitCost) / 1000000).toFixed(0)}M</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/20 pt-3 mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Factory Time</span>
                    <span className="text-[#34c759] font-bold text-sm">14 Days</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Unit Cost</span>
                    <span className="text-white font-bold text-lg tracking-tight">Rp {(totalCost / 1000000000).toFixed(2)}B</span>
                  </div>
                </div>
                <button className="os-btn flex items-center justify-center gap-2" onClick={() => handleAction("bom")}>
                  <span>Send Factory PO</span>
                </button>
              </div>

              {/* Success Panel */}
              <div className={`os-panel${activeView === "success" ? " active" : ""}`}>
                <div className="text-[10px] font-bold text-[#34c759] uppercase tracking-widest mb-1 text-center">Complete</div>
                <div className="font-display font-bold text-xl mb-4 tracking-tight text-center">Transmission Complete</div>
                <div className="flex-grow flex flex-col justify-center items-center text-center gap-3">
                  <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Purchase Order</div>
                    <div className="text-xl font-bold text-white font-mono">PO #FJ-8472-A</div>
                    <div className="text-xs text-white/40 mt-1">Factory Hub — Jakarta</div>
                  </div>
                  <div className="w-full bg-white/5 rounded-2xl p-3 border border-white/10">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">BoQ Summary</div>
                    <div className="text-lg font-bold text-[#4CD3B3]">{boqData.length} Line Items</div>
                    <div className="text-xs text-white/40">Rp {(totalCost / 1000000000).toFixed(2)}B Total</div>
                  </div>
                  <div className="w-full bg-white/5 rounded-2xl p-3 border border-white/10">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Production</div>
                    <div className="text-lg font-bold text-[#0071e3]">14 Day Turnaround</div>
                    <div className="text-xs text-white/40">CNC Machine Code Generated</div>
                  </div>
                </div>
                <button className="os-btn mt-4" onClick={() => handleAction("success")}>Start New Session</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
