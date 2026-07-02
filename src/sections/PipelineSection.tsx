export default function PipelineSection() {
  return (
    <section
      id="pipeline"
      className="pt-4 scroll-mt-32"
      style={{
        opacity: 0,
        animation: "fadeInUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards",
        animationDelay: "0.5s",
      }}
    >
      <div className="glass-card-dark p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#4CD3B3]/6 blur-[100px] rounded-full pointer-events-none" />
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/15 rounded-full border border-[#4CD3B3]/30 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3]">Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white">System Pipeline.</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
            Three pillars. The Studio captures input, the App converts it to data, the Factory executes.
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto px-4 z-10">
          <div className="hidden md:block absolute top-[40px] left-[15%] w-[70%] h-[2px] bg-white/10">
            <div className="absolute top-[-1px] h-[4px] w-24 bg-[#4CD3B3] rounded-full" style={{ animation: "dataFlow 2.5s infinite cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 0 15px rgba(76,211,179,0.5)" }} />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 relative z-10">
            {[
              { icon: "🖐️", title: "Phygital Studio", desc: "Tactile EPS block interaction on LiDAR workbench.", active: false },
              { icon: "📱", title: "Fjäll Studio App", desc: "Scan, plan, calculate, preview, and order.", active: true },
              { icon: "🏭", title: "Factory Hub", desc: "CNC machine code generated from every PO.", active: false },
            ].map((c) => (
              <div key={c.title} className="flex flex-col items-center text-center flex-1">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-all ${
                  c.active
                    ? "bg-[#4CD3B3]/15 border-2 border-[#4CD3B3]/50 shadow-[0_0_30px_rgba(76,211,179,0.2)]"
                    : "bg-white/5 border-2 border-white/10"
                }`}>{c.icon}</div>
                <h3 className={`font-bold text-lg mb-2 tracking-tight ${c.active ? "text-[#4CD3B3]" : "text-white"}`}>{c.title}</h3>
                <p className="text-sm text-white/50 font-medium leading-relaxed max-w-[200px]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
