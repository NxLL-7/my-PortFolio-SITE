import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { resume } from "@/data/resume";

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

export const AboutMatrix = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(Object.keys(resume.skills)[0]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const columns = gsap.utils.toArray(".about-col");
      gsap.fromTo(
        columns,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-24 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* About Me Column */}
        <div className="about-col flex flex-col space-y-4 opacity-0">
          <div className="flex items-center gap-3 text-3xl font-mono font-bold text-text-primary tracking-widest uppercase">
            <span className="text-accent-cyan">//</span>
            <ScrambleTitle text="ABOUT" className="" />
          </div>
          <div className="bg-transparent backdrop-blur-[12px] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_0.5px_0_0_rgba(255,255,255,0.05)] p-6 md:p-8 rounded-2xl h-fit">
            <p className="text-text-secondary leading-relaxed text-lg m-0">
              A passionate technologist bridging the gap between full-stack
              development and cybersecurity. Currently pursuing my B.Tech in Computer Science and Engineering, I
              specialize in building secure, scalable web applications while
              constantly researching vulnerabilities and hardening systems. 
            </p>
          </div>
        </div>

        {/* Skills Section Column */}
        <div className="about-col flex flex-col space-y-6 opacity-0">
          <div className="flex items-center gap-3 text-3xl font-mono font-bold text-text-primary tracking-widest uppercase">
            <span className="text-accent-cyan">//</span>
            <ScrambleTitle text="SKILLS" className="" />
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(resume.skills).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-mono transition-all duration-300 ${
                  activeCategory === category
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/[0.02]"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent-cyan/20 border border-accent-cyan/50 rounded-full"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize">{category}_</span>
              </button>
            ))}
          </div>

          {/* Skill Cards */}
          <motion.div 
            layout
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="bg-transparent backdrop-blur-[12px] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_0.5px_0_0_rgba(255,255,255,0.05)] rounded-2xl p-6 overflow-hidden"
          >
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-wrap gap-3"
                >
                  {resume.skills[activeCategory].map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="relative overflow-hidden group bg-white/[0.03] border border-white/[0.05] hover:border-accent-cyan/40 hover:shadow-[0_0_15px_rgba(145,71,255,0.15)] px-4 py-2.5 rounded-lg text-sm font-mono text-text-secondary hover:text-text-primary transition-colors cursor-default"
                    >
                      <span className="relative z-10">{skill}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/10 to-accent-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    </motion.div>
                  ))}
                </motion.div>
             </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
