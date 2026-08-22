import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scroll-triggered blur animation
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isReducedMotion) {
      gsap.to(canvas, {
        filter: "blur(8px)",
        opacity: 0.15, // fade it into the background slightly
        scrollTrigger: {
          trigger: "body",
          start: "top -10%", // Start blurring slightly after scrolling begins
          end: "top -100%",  // Fully blurred when the first section (100vh) is scrolled past
          scrub: 1,          // 1 second of smooth scrubbing delay
        },
      });
    }

    let animationFrameId;
    let columns = [];
    const fontSize = 16;
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
      const colCount = Math.floor(canvas.width / fontSize);
      
      // Randomize starting Y positions so the screen is covered immediately
      columns = [];
      for (let i = 0; i < colCount; i++) {
        columns[i] = Math.floor(Math.random() * (canvas.height / fontSize));
      }
    };

    // Pure white shade only
    const colors = ["#FFFFFF"];

    const draw = () => {
      const isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (isReducedMotion) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        
        // Strong glow effect
        ctx.shadowBlur = 22;
        ctx.shadowColor = "#FFFFFF";
        
        ctx.fillText(char, x, y);

        // Reset shadow so it doesn't affect the fading background rectangle
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i]++;
      }

      setTimeout(() => {
        animationFrameId = requestAnimationFrame(draw);
      }, 40); // 50ms delay slows down the falling speed
    };

    window.addEventListener("resize", resize);
    resize();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full opacity-30 mix-blend-screen pointer-events-none"
    />
  );
};
