import { useEffect } from "react";
import { ParticleField } from "./components/canvas/ParticleField";
import { MatrixRain } from "./components/canvas/MatrixRain";
import { Scanlines } from "./components/ui/Scanlines";
import { Navigation } from "./components/layout/Navigation";
import { TerminalHero } from "./components/sections/TerminalHero";
import { AboutMatrix } from "./components/sections/AboutMatrix";
import { TimelineTerminal } from "./components/sections/TimelineTerminal";
import { ProjectVault } from "./components/sections/ProjectVault";
import { FooterLinks } from "./components/layout/FooterLinks";

function App() {
  useEffect(() => {
    // Prevent the browser from remembering scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Force scroll to top on mount/reload
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative min-h-screen text-text-primary selection:bg-accent-cyan selection:text-bg-primary">
      {/* Background elements stay constantly rendered behind everything */}
      <div className="fixed inset-0 pointer-events-none -z-50 bg-[#05080f]" />
      <Scanlines />
      <MatrixRain />
      <ParticleField />

      <Navigation />

      <main className="relative z-10 overflow-hidden">
        <TerminalHero />
        <AboutMatrix />
        <TimelineTerminal />
        <ProjectVault />
      </main>

      <FooterLinks />
    </div>
  );
}

export default App;
