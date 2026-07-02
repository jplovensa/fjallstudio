import FjallLogo from "@/components/FjallLogo";

export default function HeroSection() {
  return (
    <header
      className="text-center py-20 md:py-28"
      style={{
        opacity: 0,
        animation: "fadeInUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards",
        animationDelay: "0.1s",
      }}
    >
      <div className="flex justify-center mb-8">
        <div className="bg-black/90 rounded-3xl px-8 py-5 shadow-2xl" style={{ animation: "pulseGlow 3s infinite" }}>
          <FjallLogo className="h-14 md:h-18" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4CD3B3]/10 rounded-full border border-[#4CD3B3]/20 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4CD3B3] animate-pulse" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#3D867C]">
          Investor Prototype
        </span>
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-display font-bold tracking-tighter text-apple-text mb-6 leading-[0.95]">
        The Apple Store <br className="hidden md:block" />
        <span className="text-[#3D867C]">for Modular Build.</span>
      </h1>

      <p className="text-lg md:text-xl text-apple-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
        Fjäll Studio is the software hook that drives hardware sales.
        Clients scan their space, pick a modular template, and watch as EPS
        panels are calculated, priced, and ordered to factory — in minutes.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}
          className="px-8 py-3.5 bg-[#1d1d1f] text-white rounded-full text-sm font-semibold tracking-tight hover:bg-black transition shadow-lg"
        >
          See the Studio
        </button>
        <button
          onClick={() => document.getElementById("app")?.scrollIntoView({ behavior: "smooth" })}
          className="px-8 py-3.5 bg-white text-[#1d1d1f] rounded-full text-sm font-semibold tracking-tight hover:bg-gray-50 transition shadow-lg border border-gray-200"
        >
          Explore the App
        </button>
      </div>
    </header>
  );
}
