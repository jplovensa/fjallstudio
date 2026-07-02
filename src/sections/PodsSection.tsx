export default function PodsSection() {
  return (
    <section id="hardware" className="scroll-mt-32 fade-in-section delay-2">
      <div className="glass-card p-6 md:p-12 overflow-hidden relative">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl font-display font-bold tracking-tight mb-4">
            Deployable Phygital Pods.
          </h2>
          <p className="text-lg text-apple-gray font-medium max-w-2xl mx-auto">
            The showroom itself is our product. Built entirely using EPS panels,
            these asset-light retail pods can be rapidly deployed in high-footfall
            lifestyle centers. <br />
            <span className="text-apple-blue font-semibold text-xs md:text-sm mt-2 inline-block">
              Interactive 3D: Pod 1 runs continuous simulation. Pod 2 hovers to
              rotate.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60">
          {/* Immersive Game Simulation Pod */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-bold text-apple-gray uppercase tracking-widest mb-4">
              Live Simulation Workbench
            </div>
            <div className="iso-wrapper bg-[#111] rounded-2xl border border-white/20 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] w-full overflow-hidden">
              <div className="iso-pod iso-pod-sim">
                {/* Simulation Floor Grid */}
                <div className="f-floor sim-floor">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "linear-gradient(rgba(76,211,179,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(76,211,179,0.1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>
                <div
                  className="f-north"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "#333",
                  }}
                />
                <div
                  className="f-west"
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    borderColor: "#333",
                  }}
                />
                <div
                  className="f-south"
                  style={{
                    background: "transparent",
                    borderColor: "rgba(0,255,255,0.2)",
                  }}
                />
                <div
                  className="f-east"
                  style={{
                    background: "transparent",
                    borderColor: "rgba(0,255,255,0.2)",
                  }}
                />
                {/* Sweeping Laser Plane & Dropping Blocks */}
                <div className="sim-laser-plane" />
                <div className="sim-eps-block sim-eps-1" />
                <div className="sim-eps-block sim-eps-2" />
                <div className="sim-eps-block sim-eps-3" />
              </div>
            </div>
          </div>

          {/* Standard Interactive Built Pod */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-bold text-apple-gray uppercase tracking-widest mb-4">
              Fully Built Exterior
            </div>
            <div className="iso-wrapper bg-white/50 rounded-2xl border border-white shadow-inner w-full">
              <div className="iso-built-pod">
                <div className="f-floor" />
                <div className="f-north" />
                <div className="f-west" />
                <div className="f-east-solid" />
                <div className="f-south">
                  <div className="f-south-door" />
                </div>
                <div className="f-roof" />
              </div>
            </div>
          </div>

          {/* Architectural Floorplan */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-bold text-apple-gray uppercase tracking-widest mb-4">
              Architectural Plan
            </div>
            <div className="rayon-floorplan flex items-center justify-center w-full max-w-[280px]">
              <div className="rayon-zone-main" />
              <div
                className="rayon-wall"
                style={{ top: 20, left: 20, width: 240, height: 4 }}
              />
              <div
                className="rayon-wall"
                style={{ top: 20, left: 20, width: 4, height: 240 }}
              />
              <div
                className="rayon-wall"
                style={{ top: 20, right: 20, width: 4, height: 240 }}
              />
              <div
                className="rayon-wall"
                style={{ bottom: 20, right: 20, width: 160, height: 4 }}
              />

              <div className="rayon-door-arc" />
              <div className="rayon-table" />

              <div className="rayon-label" style={{ top: 40, left: 40 }}>
                Showroom Zone
              </div>
              <div className="rayon-label" style={{ top: "45%", left: "40%" }}>
                Workbench
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
