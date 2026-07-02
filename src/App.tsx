import AmbientMesh from "@/components/AmbientMesh";
import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import StudioSection from "@/sections/StudioSection";
import AppSection from "@/sections/AppSection";
import FlowSection from "@/sections/FlowSection";
import ArchitectureSection from "@/sections/ArchitectureSection";
import HubSpokeSection from "@/sections/HubSpokeSection";
import EconomicsSection from "@/sections/EconomicsSection";
import DemoSection from "@/sections/DemoSection";
import ClosingSection from "@/sections/ClosingSection";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <>
      <AmbientMesh />
      <Navigation />
      <main className="pt-36 pb-32 px-4 sm:px-8 max-w-[1400px] mx-auto space-y-12">
        <HeroSection />
        <StudioSection />
        <AppSection />
        <FlowSection />
        <ArchitectureSection />
        <HubSpokeSection />
        <EconomicsSection />
        <DemoSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
