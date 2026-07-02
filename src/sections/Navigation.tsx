import FjallLogo from "@/components/FjallLogo";

export default function Navigation() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    ["Studio", "studio"],
    ["App", "app"],
    ["Flow", "flow"],
    ["Journey", "architecture"],
    ["Demo", "demo"],
    ["Economics", "economics"],
  ];

  return (
    <nav className="fixed top-4 md:top-6 w-full z-50 flex justify-center px-4">
      <div className="dynamic-island px-3 md:px-5 py-2 flex items-center justify-between gap-3 md:gap-6 transition-all hover:scale-105 duration-300">
        <FjallLogo className="h-5 md:h-6" />
        <div className="hidden lg:flex space-x-5 text-xs font-medium text-white/70">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition bg-transparent border-none cursor-pointer">
              {label}
            </button>
          ))}
        </div>
        <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4CD3B3] animate-pulse" />
        </div>
      </div>
    </nav>
  );
}
