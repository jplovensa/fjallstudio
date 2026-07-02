import { useState, useRef } from "react";

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setShowVideo(true);
    setIsPlaying(true);
    setTimeout(() => videoRef.current?.play(), 100);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const milestones = [
    { time: "0:00", label: "Enter Studio", desc: "Client walks in" },
    { time: "0:02", label: "LiDAR Scan", desc: "Room captured" },
    { time: "0:04", label: "Floorplan", desc: "Auto-generated" },
    { time: "0:05", label: "EPS Build", desc: "Blocks placed" },
    { time: "0:07", label: "3D Preview", desc: "Home rendered" },
    { time: "0:09", label: "Factory PO", desc: "Order sent" },
    { time: "0:11", label: "Delivered", desc: "Home complete" },
  ];

  return (
    <section id="demo" className="scroll-mt-32 fade-in-section delay-6">
      <div className="glass-card-dark p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4CD3B3]/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CD3B3]/10 rounded-full border border-[#4CD3B3]/20 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CD3B3]">Product Demo</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-3">
            See the Journey.
          </h2>
          <p className="text-base md:text-lg text-white/50 font-medium max-w-2xl mx-auto">
            From the moment a client enters the studio to the factory Purchase Order
            and final delivery — watch the complete Fjäll experience.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl"
            style={{ aspectRatio: "16/9" }}
          >
            {!showVideo ? (
              /* Thumbnail / Play overlay */
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1218] via-[#0c1a1a] to-[#0a1218]">
                {/* Animated studio illustration */}
                <div className="relative mb-4">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-4xl md:text-5xl border-2 border-[#4CD3B3]/30"
                    style={{ background: "rgba(76,211,179,0.1)", animation: "pulseGlow 3s infinite" }}
                  >
                    🏪
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#4CD3B3] flex items-center justify-center text-sm border-2 border-black">
                    ▶
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">Studio to Factory PO</h3>
                <p className="text-xs text-white/40 mb-4">Full client journey walkthrough</p>
                <button
                  onClick={handlePlay}
                  className="px-6 py-2.5 bg-[#4CD3B3] text-black rounded-full text-sm font-bold hover:scale-105 transition flex items-center gap-2"
                >
                  <span>▶</span> Play Walkthrough
                </button>
              </div>
            ) : (
              /* Video */
              <>
                <video
                  ref={videoRef}
                  src={`${import.meta.env.BASE_URL}assets/fjall-journey.mp4`}
                  className="w-full h-full object-cover"
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
                {/* Video controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={isPlaying ? handlePause : handlePlay}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs hover:bg-white/30 transition"
                    >
                      {isPlaying ? "⏸" : "▶"}
                    </button>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4CD3B3] rounded-full transition-all"
                        style={{ width: isPlaying ? "100%" : "0%", transitionDuration: "12s" }}
                      />
                    </div>
                    <span className="text-[10px] text-white/60 font-mono">0:12</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Milestones */}
          <div className="mt-4 grid grid-cols-4 md:grid-cols-7 gap-2">
            {milestones.map((m, i) => (
              <div key={i} className="text-center p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] font-bold text-[#4CD3B3] mb-0.5">{m.time}</div>
                <div className="text-[10px] font-bold text-white leading-tight">{m.label}</div>
                <div className="text-[8px] text-white/30 hidden md:block">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
