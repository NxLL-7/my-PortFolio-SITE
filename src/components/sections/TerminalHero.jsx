import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ChevronDown } from "lucide-react";
import { resume } from "@/data/resume";

gsap.registerPlugin(TextPlugin);

export const TerminalHero = () => {
  const containerRef = useRef(null);
  const glassBoxRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const cursorRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      if (!isReducedMotion) {
        // 1. Fade and slide up the glass container
        tl.from(
          glassBoxRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
          },
          0.2
        );
        
        // 2. Type Name
        tl.to(nameRef.current, {
          text: resume.name,
          duration: 1.2,
          ease: "none",
        });

        // 3. Scramble Role (Looping)
        const roles = resume.title.includes("//") 
            ? resume.title.split("//").map(s => s.trim()).filter(s => s !== "")
            : [resume.title];
        
        let roleIndex = 0;
        const chars = "!<>-_\\/[]{}—=+*^?#";
        
        const animateScramble = (element, newText, duration, onCompleteCb) => {
          const oldText = element.innerText;
          
          return gsap.to({ value: 0 }, {
            value: 1,
            duration: duration,
            ease: "none",
            onUpdate: function () {
              const progress = this.targets()[0].value;
              let result = "";
              
              const finalizeIndex = Math.floor(progress * newText.length);
              const currentLength = Math.floor(oldText.length + (newText.length - oldText.length) * progress);
              
              for (let i = 0; i < currentLength; i++) {
                if (i < finalizeIndex) {
                  result += newText[i];
                } else if (newText[i] === " " && i < newText.length) {
                  result += " "; 
                } else {
                  result += chars[Math.floor(Math.random() * chars.length)];
                }
              }
              element.innerText = result;
            },
            onComplete: () => {
              element.innerText = newText;
              if (onCompleteCb) onCompleteCb();
            }
          });
        };

        const typeRole = () => {
          animateScramble(roleRef.current, roles[roleIndex], 1.2, () => {
            gsap.delayedCall(2, () => {
              animateScramble(roleRef.current, "", 0.8, () => {
                roleIndex = (roleIndex + 1) % roles.length;
                typeRole();
              });
            });
          });
        };

        tl.add(typeRole);

        // 4. Cursor Blink
        gsap.to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.4,
          ease: "steps(1)",
        });

        // 5. Fade in CTA
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );

        gsap.to(ctaRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        });
      } else {
        gsap.set(
          [glassBoxRef.current, ctaRef.current],
          { opacity: 1, y: 0, scale: 1 }
        );
        if (nameRef.current) nameRef.current.innerText = resume.name;
        if (roleRef.current) {
          const fallbackRoles = resume.title.includes("//") 
            ? resume.title.split("//").map(s => s.trim()).filter(s => s !== "")
            : [resume.title];
          roleRef.current.innerText = fallbackRoles.join(" // ");
        }
        gsap.set(cursorRef.current, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Text Container */}
      <div 
        ref={glassBoxRef}
        className="z-10 max-w-4xl self-start"
      >
        <h1
          ref={nameRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide mb-4 text-white uppercase min-h-[2.5rem] sm:min-h-[3.5rem] md:min-h-[4.5rem] whitespace-nowrap"
        ></h1>

        <div className="flex items-center">
          <span className="font-mono text-lg sm:text-xl md:text-2xl text-accent-cyan mr-2">//</span>
          <p
            ref={roleRef}
            className="font-mono text-lg sm:text-xl md:text-2xl text-accent-cyan h-8"
          ></p>
          <span ref={cursorRef} className="inline-block w-2 sm:w-3 h-5 sm:h-6 md:h-7 bg-white ml-2 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
        </div>
      </div>

      {/* Scroll Down CTA */}
      <div
        ref={ctaRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity z-10"
        onClick={scrollToProjects}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToProjects()}
      >
        <span className="font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">
          Scan Projects
        </span>
        <ChevronDown className="text-accent-cyan" size={24} />
      </div>
    </section>
  );
};
