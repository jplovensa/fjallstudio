import FjallLogo from "@/components/FjallLogo";

export default function ClosingSection() {
  return (
    <section className="pt-16 md:pt-32 pb-8" style={{ opacity: 0, animation: "fadeInUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards", animationDelay: "0.8s" }}>
      <div className="text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-10">
          <div className="bg-black/90 rounded-2xl px-6 py-4 shadow-xl">
            <FjallLogo className="h-12 md:h-14" />
          </div>
        </div>
        <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-display font-bold tracking-tighter text-apple-text mb-6 leading-none">
          We didn't just redesign <br className="hidden md:block" />the showroom.
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-apple-gray mb-12 leading-tight max-w-3xl mx-auto">
          We engineered the distance between <br className="hidden md:block" />
          <span className="text-[#3D867C]">imagination and manufacturing</span> down to zero.
        </h3>
        <p className="text-4xl sm:text-5xl md:text-6xl font-display text-apple-text font-bold tracking-tighter mb-10">
          Build It Before You Build It.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "55 min", label: "Studio to PO" },
            { value: "14 days", label: "Factory Build" },
            { value: "42%", label: "Conversion" },
            { value: "12.5x", label: "LTV/CAC" },
          ].map((s) => (
            <div key={s.label} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
              <div className="text-2xl font-display font-bold text-[#3D867C] tracking-tight">{s.value}</div>
              <div className="text-[10px] font-semibold text-apple-gray uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
