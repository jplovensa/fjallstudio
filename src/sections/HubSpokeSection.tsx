export default function HubSpokeSection() {
  return (
    <section className="pt-4 fade-in-section delay-6">
      <div className="glass-card p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/10 rounded-full border border-[#4CD3B3]/20 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D867C]">Deployment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Hub & Spoke.</h2>
            <p className="text-lg text-apple-gray font-medium leading-relaxed mb-6">
              One automated factory (Hub) supplies multiple asset-light studios (Spokes).
              Each new studio is a new revenue node with minimal CAPEX.
            </p>
            <ul className="space-y-4">
              {["Low CAPEX per studio: Rp 400M", "Centralised quality control", "14-day factory turnaround", "Automated BoQ-to-PO pipeline"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#4CD3B3]" />
                  <span className="font-semibold tracking-tight text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hub-container bg-white/30 rounded-3xl border border-white/60 shadow-inner h-[280px] md:h-[320px] relative overflow-hidden flex items-center justify-center">
            <div className="orbital-ring w-[220px] h-[220px] md:w-[260px] md:h-[260px]" style={{ animation: "orbitReverse 25s linear infinite" }}>
              <div className="spoke-node" style={{ top: -20, left: "50%", transform: "translateX(-50%)" }}>📍</div>
              <div className="spoke-node" style={{ bottom: 20, left: 8 }}>📍</div>
              <div className="spoke-node" style={{ bottom: 20, right: 8 }}>📍</div>
            </div>
            <div className="orbital-ring w-[130px] h-[130px] md:w-[150px] md:h-[150px]" style={{ animation: "orbit 20s linear infinite" }}>
              <div className="spoke-node" style={{ top: "50%", left: -20, transform: "translateY(-50%)" }}>📍</div>
              <div className="spoke-node" style={{ top: "50%", right: -20, transform: "translateY(-50%)" }}>📍</div>
            </div>
            <div className="absolute w-14 h-14 md:w-16 md:h-16 bg-[#4CD3B3] rounded-full flex items-center justify-center text-white z-10 border-[3px] border-white shadow-[0_0_30px_rgba(76,211,179,0.5)]">
              <span className="text-lg">🏭</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
