import { useState, useEffect } from "react";

const stages = [
  { icon: "🚶", title: "Client Arrives", desc: "Walks into Fjäll Studio", color: "#4CD3B3" },
  { icon: "📱", title: "Opens App", desc: "Launches Fjäll Studio App", color: "#4CD3B3" },
  { icon: "📐", title: "Scans Room", desc: "LiDAR captures space", color: "#4CD3B3" },
  { icon: "🧱", title: "Builds Block", desc: "Places EPS on workbench", color: "#0071e3" },
  { icon: "📋", title: "BoQ Auto", desc: "Materials calculated", color: "#0071e3" },
  { icon: "👁", title: "3D Preview", desc: "Sees their home", color: "#0071e3" },
  { icon: "📄", title: "PO Sent", desc: "Factory receives order", color: "#3D867C" },
  { icon: "🏭", title: "Factory", desc: "CNC cuts panels", color: "#3D867C" },
  { icon: "🚛", title: "Delivered", desc: "Flat-pack arrives", color: "#3D867C" },
  { icon: "🏠", title: "Installed", desc: "Client moves in", color: "#34c759" },
];

export default function ArchitectureSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      id="architecture"
      className="scroll-mt-32"
      style={{
        opacity: 0,
        animation: "fadeInUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards",
        animationDelay: "0.5s",
      }}
    >
      <div className="glass-card-dark p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4CD3B3]/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#0071e3]/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/15 rounded-full border border-[#4CD3B3]/30 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3]">Live Architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-3">
            Client Journey.
          </h2>
          <p className="text-base md:text-lg text-white/50 font-medium max-w-2xl mx-auto">
            Watch how a client walks into the studio and walks out with a factory
            Purchase Order — in under one hour.
          </p>
        </div>

        {/* Animated Journey Path */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Play/pause */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold border border-white/10 hover:bg-white/15 transition"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>

          {/* Path */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[28px] left-[3%] w-[94%] h-[3px] bg-white/5 rounded-full">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${((activeStage + 1) / stages.length) * 100}%`,
                  background: "linear-gradient(90deg, #4CD3B3, #0071e3, #3D867C)",
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Stages */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {stages.map((stage, i) => {
                const isActive = i <= activeStage;
                const isCurrent = i === activeStage;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Node */}
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-2 transition-all duration-500 relative"
                      style={{
                        background: isActive ? `${stage.color}18` : "rgba(255,255,255,0.03)",
                        border: `2px solid ${isActive ? stage.color : "rgba(255,255,255,0.08)"}`,
                        boxShadow: isCurrent ? `0 0 20px ${stage.color}30` : "none",
                        transform: isCurrent ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {stage.icon}
                      {isCurrent && (
                        <div
                          className="absolute -bottom-1 w-2 h-2 rounded-full animate-pulse"
                          style={{ background: stage.color }}
                        />
                      )}
                    </div>
                    <div
                      className="text-[9px] md:text-[10px] font-bold mb-0.5 transition-colors"
                      style={{ color: isActive ? stage.color : "rgba(255,255,255,0.3)" }}
                    >
                      {stage.title}
                    </div>
                    <div className="text-[8px] text-white/20 hidden md:block">{stage.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="mt-6 bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
                style={{
                  background: `${stages[activeStage].color}15`,
                  border: `2px solid ${stages[activeStage].color}30`,
                }}
              >
                {stages[activeStage].icon}
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${stages[activeStage].color}15`, color: stages[activeStage].color }}
                  >
                    Stage {activeStage + 1}
                  </span>
                  <span className="text-[10px] text-white/30">of {stages.length}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{stages[activeStage].title}</h3>
                <p className="text-sm text-white/50">{stages[activeStage].desc}</p>
              </div>
              <div className="text-center shrink-0">
                <div className="text-3xl font-bold" style={{ color: stages[activeStage].color }}>
                  {Math.round(((activeStage + 1) / stages.length) * 100)}%
                </div>
                <div className="text-[9px] text-white/30">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
