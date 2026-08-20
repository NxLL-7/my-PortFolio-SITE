<div align="center">

# ⟁ SiD — Portfolio

**A cyberpunk-themed developer portfolio built with React, GSAP, and Framer Motion.**

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status/deploy-status)](https://sxd-portfolio.netlify.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-9147FF)](#license)

[**⟶ View Live**](https://sxd-portfolio.netlify.app/)

</div>

---

## ✦ Overview

A single-page portfolio for **Siddhartha Chakrabarty** — Full-Stack Developer & Cybersecurity Researcher. The site features a terminal/hacker-inspired aesthetic with matrix rain, particle fields, scanline overlays, and scramble-text animations — all running at 60fps with `prefers-reduced-motion` respect.

### Highlights

- 🖥️ **Terminal Hero** — GSAP-powered typing and character-scramble intro
- 🟢 **Matrix Rain** — Canvas-rendered falling-character background
- ✦ **Particle Field** — Interactive floating particle canvas
- 📡 **Scanline Overlay** — CRT-style scan effect for atmosphere
- 🧊 **Glassmorphism UI** — Frosted-glass cards with blur and glow borders
- ♿ **Accessible** — Reduced-motion fallbacks, keyboard navigation, semantic HTML

---

## ⚙ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | GSAP 3 · Framer Motion 13 |
| **Icons** | Lucide React · React Icons |
| **Forms** | React Hook Form + Zod |
| **Fonts** | Space Grotesk · Inter · JetBrains Mono |
| **Linting** | OxLint |
| **Deployment** | Netlify |

---

## 🗂 Project Structure

```
PortFolio/
├── public/
│   ├── favicon.svg
│   ├── _headers          # Netlify security headers
│   └── _redirects         # SPA catch-all redirect
├── src/
│   ├── components/
│   │   ├── canvas/        # ParticleField, MatrixRain
│   │   ├── layout/        # Navigation, FooterLinks
│   │   ├── sections/      # TerminalHero, AboutMatrix,
│   │   │                  # TimelineTerminal, ProjectVault
│   │   └── ui/            # Scanlines
│   ├── data/
│   │   └── resume.js      # Centralized resume/portfolio data
│   ├── lib/
│   │   └── utils.js       # Utility helpers (cn, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          # Design tokens, glassmorphism, scrollbar
├── index.html
├── netlify.toml
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/NxLL-7/my-PortFolio-SITE.git
cd my-PortFolio-SITE

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint |

---

## 🎨 Design System

The portfolio uses a custom dark theme with purple accent colors and glassmorphism effects.

```
Background     #05080f → #0a0f1a → #111827
Accent         #9147FF (purple) · #10b981 (emerald) · #f59e0b (amber)
Text           #f1f5f9 (primary) · #94a3b8 (secondary) · #64748b (muted)
Glass          rgba(17,24,39,0.7) with 12px blur
```

**Typography:** Space Grotesk for headings, Inter for body, JetBrains Mono for code/terminal elements.

---

## 🌐 Deployment

The site auto-deploys to **Netlify** on push to `main`. The [`netlify.toml`](netlify.toml) configures:

- ✅ SPA routing (all paths → `index.html`)
- ✅ Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- ✅ Aggressive caching for static assets, fonts, and SVGs

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ☕ and late nights by [Siddhartha Chakrabarty](https://github.com/NxLL-7)**

</div>
