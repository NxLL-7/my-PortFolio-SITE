import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { resume } from "@/data/resume";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Staggered entrance animation
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion || !navRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".nav-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "cubic-bezier(0.23, 1, 0.32, 1)",
          delay: 0.8, // Wait for hero animation to start
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[90%] max-w-6xl rounded-full px-8",
        scrolled
          ? "top-4 py-2 bg-white/[0.03] backdrop-blur-[20px] backdrop-saturate-[1.6] border border-white/[0.06] shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_0.5px_0_0_rgba(255,255,255,0.05)]"
          : "top-6 py-3 bg-transparent backdrop-blur-[6px] border border-white/[0.03] shadow-none",
      )}
    >
      <div className="w-full mx-auto grid grid-cols-3 items-center">
        <a
          href="#"
          className="nav-item justify-self-start text-2xl font-display font-bold text-text-primary tracking-tighter hover:text-accent-cyan transition-colors opacity-0"
        >
          {resume.handle}
          <span className="text-accent-cyan">.</span>
        </a>

        <nav className="hidden md:flex justify-self-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-item group font-mono text-sm relative flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors duration-300 opacity-0"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent-cyan transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(145,71,255,0.8)]"></span>
            </a>
          ))}
        </nav>

        <a
          href="https://drive.google.com/file/d/1oekWLEbEZPcQR1b7DUKh68dRTg6WeYXA/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="nav-item group relative hidden md:inline-flex items-center gap-2 justify-self-end px-5 py-2 border border-accent-cyan text-accent-cyan font-mono text-sm rounded overflow-hidden hover:shadow-[0_0_15px_rgba(145,71,255,0.4)] transition-shadow duration-300 font-semibold opacity-0"
        >
          <span className="relative z-10 flex items-center gap-2 group-hover:text-bg-primary transition-colors duration-300">
            RESUME
            <Download size={16} className="group-hover:animate-bounce" />
          </span>
          <div className="absolute inset-0 bg-accent-cyan scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
        </a>
      </div>
    </header>
  );
};
