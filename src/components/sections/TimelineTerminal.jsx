import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ScrambleTitle = ({ text, className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#";
    const element = textRef.current;
    if (!element) return;
    
    element.innerText = "";

    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      const tween = gsap.to(obj, {
        value: 1,
        duration: 1.2,
        ease: "none",
        paused: true,
        onUpdate: function () {
          const progress = obj.value;
          let result = "";
          const finalizeIndex = Math.floor(progress * text.length);
          const currentLength = Math.floor(text.length * progress);
          
          for (let i = 0; i < currentLength; i++) {
            if (i < finalizeIndex) {
              result += text[i];
            } else if (text[i] === " " && i < text.length) {
              result += " "; 
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          element.innerText = result;
        },
        onComplete: () => {
          element.innerText = text;
        }
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => tween.restart(),
        onLeaveBack: () => {
          tween.pause(0);
          element.innerText = "";
        }
      });
    });

    return () => ctx.revert();
  }, [text]);

  return <h3 ref={textRef} className={className}></h3>;
};

export const TimelineTerminal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the timeline glowing line
      gsap.from(".timeline-glow-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      const entries = gsap.utils.toArray(".timeline-entry");
      gsap.fromTo(
        entries,
        { x: (i) => (i % 2 === 0 ? -40 : 40), opacity: 0, scale: 0.97 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-24 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full"
    >
      <div className="flex items-center gap-3 text-3xl font-mono font-bold text-text-primary tracking-widest uppercase mb-16 text-left">
        <span className="text-accent-cyan">//</span>
        <ScrambleTitle text="EXPERIENCE_LOG" className="" />
      </div>

      <div className="timeline-container relative max-w-3xl mx-auto w-full">
        {/* Dim background track */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.05] md:-translate-x-1/2 rounded-full"></div>
        {/* Glowing animated line */}
        <div className="timeline-glow-line absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-accent-cyan/60 to-transparent shadow-[0_0_15px_rgba(145,71,255,0.8)] md:-translate-x-1/2 rounded-full"></div>

        <div className="space-y-12">
          {resume.experience.map((exp, index) => (
            <TimelineEntry key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReducedMotion) {
      if (contentRef.current) {
        contentRef.current.style.height = expanded ? "auto" : "0";
        contentRef.current.style.opacity = expanded ? "1" : "0";
      }
      return;
    }
    if (contentRef.current) {
      if (expanded) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [expanded]);

  return (
    <div
      className={cn(
        "timeline-entry relative flex md:justify-between items-start w-full group",
        isEven ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-cyan -translate-x-1.5 md:-translate-x-2 mt-1.5 group-hover:bg-accent-cyan transition-colors z-10" />

      <div className="ml-12 md:ml-0 md:w-[45%]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-transparent backdrop-blur-[12px] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_0.5px_0_0_rgba(255,255,255,0.05)] p-5 rounded-2xl w-full text-left hover:border-accent-cyan/40 hover:shadow-[0_0_15px_rgba(145,71,255,0.15)] transition-all duration-300"
        >
          <div className="flex items-center text-text-muted font-mono text-sm mb-2">
            <ChevronRight
              size={16}
              className={cn(
                "transition-transform mr-1 text-accent-cyan",
                expanded ? "rotate-90" : "",
              )}
            />
            {exp.period}
          </div>
          <h3 className="text-xl font-bold text-text-primary">{exp.role}</h3>
          <h4 className="text-md text-text-secondary mb-2">{exp.company}</h4>

          <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
            <div className="pt-4 mt-4 border-t border-glass-border">
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="text-accent-emerald mr-2 mt-0.5">❯</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
