import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make particles clearer when scrolling (as matrix blurs)
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isReducedMotion) {
      gsap.fromTo(
        canvas,
        { opacity: 0.3 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: "body",
            start: "top -10%",
            end: "top -100%",
            scrub: 1,
          },
        }
      );
    }

    let particles = [];
    const connectionDistance = 150;
    const mouseRepelRadius = 200;
    let animationFrameId;

    const colors = [
      { r: 145, g: 71, b: 255 },  // Primary Purple
      { r: 180, g: 122, b: 255 }, // Light Purple
      { r: 123, g: 47, b: 224 },  // Deep Purple
      { r: 107, g: 33, b: 168 },  // Dark Violet
    ];

    let lastWidth = 0;
    let lastHeight = 0;

    const resize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      const heightChanged = Math.abs(window.innerHeight - lastHeight) > 100;

      if (!widthChanged && !heightChanged && lastWidth !== 0) {
        return;
      }

      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Dynamic particle count based on screen size (1 particle per 11,500 px)
      const targetCount = Math.min(220, Math.max(40, Math.floor((canvas.width * canvas.height) / 11500)));

      // Add or remove particles smoothly
      if (particles.length < targetCount) {
        const toAdd = targetCount - particles.length;
        for (let i = 0; i < toAdd; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color,
          });
        }
      } else if (particles.length > targetCount) {
        particles.splice(targetCount);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRepelRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRepelRadius - dist) / mouseRepelRadius;
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.95)`;
        // Enhanced color-matched glow for clearer particles
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 1)`;
        ctx.fill();
        // Reset shadow for lines
        ctx.shadowBlur = 0;

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 0.35 * (1 - dist / connectionDistance);
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 h-full w-full bg-transparent pointer-events-none"
    />
  );
};
