import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Scanlines = () => {
  const scanRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Fade in the scanline overlay
      if (!isReducedMotion && containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: "var(--scanline-opacity, 0.05)", duration: 1.5, ease: "power2.out", delay: 0.5 }
        );
      }

      // Animate the scan bar from top to bottom
      if (scanRef.current) {
        gsap.to(scanRef.current, {
          y: "100vh",
          duration: 8,
          ease: "linear",
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Animated CRT Scan Bar */}
      <div 
        ref={scanRef}
        className="absolute top-0 left-0 right-0 h-[10vh] bg-gradient-to-b from-transparent via-[#9147FF]/5 to-transparent shadow-[0_0_20px_rgba(145,71,255,0.1)] opacity-40 mix-blend-screen"
        style={{ transform: "translateY(-100%)" }}
      />
    </div>
  );
};
