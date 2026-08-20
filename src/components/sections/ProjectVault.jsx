import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export const ProjectVault = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReducedMotion) return;

    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: x * 0.05,
      y: y * 0.05,
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Full-Stack":
        return "group-hover:text-emerald-400 group-hover:border-emerald-400/50";
      case "Cybersec":
        return "group-hover:text-rose-500 group-hover:border-rose-500/50";
      case "Event":
        return "group-hover:text-blue-500 group-hover:border-blue-500/50";
      default:
        return "group-hover:text-accent-cyan group-hover:border-accent-cyan/50";
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-24 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full"
    >
      <div className="flex items-center gap-3 text-3xl font-mono font-bold text-text-primary tracking-widest uppercase mb-16 text-left">
        <span className="text-accent-cyan">//</span>
        <ScrambleTitle text="PROJECT_VAULT" className="" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {resume.projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="project-card min-h-[420px] bg-transparent backdrop-blur-[12px] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_0.5px_0_0_rgba(255,255,255,0.05)] p-6 rounded-2xl flex flex-col hover:border-accent-cyan/40 hover:shadow-[0_0_15px_rgba(145,71,255,0.15)] transition-colors transition-shadow duration-300 relative group overflow-hidden"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex justify-between items-start mb-6 z-10">
              <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                {project.name}
              </h3>
              <span 
                className={cn(
                  "text-xs font-mono px-2 py-1 bg-white/[0.02] border border-glass-border rounded text-text-muted transition-colors duration-300",
                  getTypeColor(project.type)
                )}
              >
                {project.type}
              </span>
            </div>

            <ul className="text-text-secondary text-sm mb-6 flex-grow leading-relaxed z-10 space-y-3">
              {project.description.map((point, i) => (
                <li key={i} className="flex group/point">
                  <span className="text-accent-emerald mr-2 mt-0.5 opacity-60 group-hover/point:opacity-100 transition-opacity duration-300">❯</span>
                  {point}.
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-glass-border z-10">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs font-mono text-text-muted opacity-70">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
