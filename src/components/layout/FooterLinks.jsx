import { useState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { resume } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export const FooterLinks = () => {
  const [toastMsg, setToastMsg] = useState("");
  const footerRef = useRef(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const showToast = (e, message, url) => {
    e.preventDefault();
    setToastMsg(`[ ${message} ]`);
    setTimeout(() => {
      setToastMsg("");
      if (url) window.open(url, "_blank");
    }, 1500);
  };

  const handleCopy = (e, text, type, url) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg(`[ ${type} COPIED ]`);
      setTimeout(() => {
        setToastMsg("");
        if (url) {
          if (url.startsWith("mailto:")) {
            window.location.href = url;
          } else {
            window.open(url, "_blank");
          }
        }
      }, 1500);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <footer ref={footerRef} className="py-4 px-8 mb-6 mx-auto w-fit rounded-full border border-white/[0.05] bg-transparent backdrop-blur-[12px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative z-10 opacity-0">
      
      {/* Toast Message */}
      <div 
        className={`absolute -top-14 left-1/2 -translate-x-1/2 bg-transparent backdrop-blur-md border border-accent-emerald/50 text-accent-emerald px-4 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none ${
          toastMsg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {toastMsg}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="flex justify-center items-center gap-6 sm:pr-8 sm:py-1">
          <a
            href={resume.contact.instagram}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => showToast(e, "OPENING INSTAGRAM", resume.contact.instagram)}
            className="text-text-muted hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(145,71,255,0.8)] transition-all duration-300"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={resume.contact.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => showToast(e, "OPENING GITHUB", resume.contact.github)}
            className="text-text-muted hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(145,71,255,0.8)] transition-all duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={resume.contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleCopy(e, resume.contact.phone, "PHONE", resume.contact.whatsapp)}
            className="text-text-muted hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(145,71,255,0.8)] transition-all duration-300"
            title="Open WhatsApp & Copy Number"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href={`mailto:${resume.contact.email}`}
            onClick={(e) => handleCopy(e, resume.contact.email, "EMAIL", `mailto:${resume.contact.email}`)}
            className="text-text-muted hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(145,71,255,0.8)] transition-all duration-300"
            title="Compose Email & Copy Address"
          >
            <Mail size={20} />
          </a>
          <a
            href={resume.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => showToast(e, "OPENING LINKEDIN", resume.contact.linkedin)}
            className="text-text-muted hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(145,71,255,0.8)] transition-all duration-300"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <div className="text-center flex items-center border-t sm:border-t-0 sm:border-l border-white/[0.1] pt-4 mt-4 sm:pt-0 sm:mt-0 sm:pl-8 sm:py-1">
          <p className="font-mono text-sm text-text-muted whitespace-nowrap">
            {resume.handle} // Built with love
          </p>
        </div>
      </div>
    </footer>
  );
};
