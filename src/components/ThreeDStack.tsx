import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Server, Database, Code, Cpu, Shield, Globe, Terminal, 
  Sparkles, Layers, Activity, Play, Info
} from "lucide-react";

interface ThreeDStackProps {
  theme?: "light" | "dark";
}

export default function ThreeDStack({ theme = "dark" }: ThreeDStackProps) {
  // Parallax / tilt state for interactive depth look
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Periodically change dynamic binary stats or active items for micro-ambient movement
  const [pulseCount, setPulseCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((c) => c + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;
    
    setCoords({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setActiveElement(null);
  };

  // Safe classes matched to theme
  const isDark = theme === "dark";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none cursor-crosshair preserve-3d"
      style={{ perspective: "1250px" }}
    >
      
      {/* PARALLAX SHIFTING GRAPHICS BOX */}
      <div
        className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] lg:max-w-[520px] aspect-[1.2] transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${-coords.y * 12}deg) rotateY(${coords.x * 12}deg) translateZ(0)`,
        }}
      >
        {/* Main Visual SVG containing the exact replicated isometric workspace */}
        <svg
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] filter transition-all duration-300"
        >
            
            {/* DEFINES FOR PREMIUM GRAPHICS GRADIENTS AND FILTERS */}
            <defs>
              <linearGradient id="motherboardGrad" x1="240" y1="180" x2="480" y2="340" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#112936" />
                <stop offset="50%" stopColor="#1c3e4f" />
                <stop offset="100%" stopColor="#0d1b22" />
              </linearGradient>

              <linearGradient id="cpuBaseGrad" x1="280" y1="210" x2="380" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#254d62" />
                <stop offset="100%" stopColor="#0a1a24" />
              </linearGradient>

              <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5b4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0dbc95" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00c0a0" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="dbCyl" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a1c24" />
                <stop offset="40%" stopColor="#153e48" />
                <stop offset="70%" stopColor="#0c232c" />
                <stop offset="100%" stopColor="#051015" />
              </linearGradient>

              <linearGradient id="floorPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c2d5db" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>

              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient Background Grid Nodes */}
            <g opacity={isDark ? "0.08" : "0.02"}>
              <line x1="100" y1="50" x2="100" y2="450" stroke="#00f5b4" strokeWidth="1" />
              <line x1="200" y1="50" x2="200" y2="450" stroke="#00f5b4" strokeWidth="1" />
              <line x1="300" y1="50" x2="300" y2="450" stroke="#00f5b4" strokeWidth="1" />
              <line x1="400" y1="50" x2="400" y2="450" stroke="#00f5b4" strokeWidth="1" />
              <line x1="500" y1="50" x2="500" y2="450" stroke="#00f5b4" strokeWidth="1" />
              <line x1="50" y1="100" x2="550" y2="100" stroke="#00f5b4" strokeWidth="1" />
              <line x1="50" y1="200" x2="550" y2="200" stroke="#00f5b4" strokeWidth="1" />
              <line x1="50" y1="300" x2="550" y2="300" stroke="#00f5b4" strokeWidth="1" />
              <line x1="50" y1="400" x2="550" y2="400" stroke="#00f5b4" strokeWidth="1" />
            </g>

            {/* ========================================================
                1. ISOMETRIC FLOOR SAFETY REFLECTION PLATES 
               ======================================================== */}
            {/* Left floor plate under terminal */}
            <g>
              <polygon 
                points="110,380 270,300 430,380 270,460" 
                fill={isDark ? "url(#floorPlateGrad)" : "rgba(100,116,139,0.06)"} 
                stroke={isDark ? "#0dbc95" : "#0d9488"} 
                strokeWidth="1.5" 
                strokeOpacity="0.45" 
              />
              <polygon 
                points="110,390 270,310 430,390 270,470" 
                fill="none" 
                stroke={isDark ? "#22d3ee" : "#06b6d4"} 
                strokeWidth="1" 
                strokeOpacity="0.3" 
              />
            </g>

            {/* Right floor plate under right monitor */}
            <g>
              <polygon 
                points="380,310 480,260 580,310 480,360" 
                fill={isDark ? "url(#floorPlateGrad)" : "rgba(100,116,139,0.06)"} 
                stroke={isDark ? "#22d3ee" : "#06b6d4"} 
                strokeWidth="1.5" 
                strokeOpacity="0.35" 
              />
              <polygon 
                points="380,318 480,268 580,318 480,368" 
                fill="none" 
                stroke={isDark ? "#10b981" : "#10b981"} 
                strokeWidth="1" 
                strokeOpacity="0.2" 
              />
            </g>

            {/* ========================================================
                2. LEFT BACK-FACING LIGHT MONITOR (Symmetrical screen base)
               ======================================================== */}
            <g 
              onMouseEnter={() => setActiveElement("left-monitor")}
              onMouseLeave={() => setActiveElement(null)}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
            >
              {/* Stand base pedestal plate */}
              <polygon points="170,140 210,120 250,140 210,160" fill={isDark ? "#1e293b" : "#cbd5e1"} stroke={isDark ? "#334155" : "#94a3b8"} strokeWidth="1" />
              <polygon points="170,140 210,120 210,125 170,145" fill={isDark ? "#0f172a" : "#64748b"} />
              <polygon points="250,140 210,160 210,165 250,145" fill={isDark ? "#0f172a" : "#64748b"} />
              <polygon points="170,145 210,165 250,145 210,125" fill={isDark ? "#273549" : "#e2e8f0"} stroke={isDark ? "#3d4e68" : "#94a3b8"} strokeWidth="1" />

              {/* Symmetrical screen stand column */}
              <rect x="204" y="60" width="12" height="65" rx="3" fill={isDark ? "#334155" : "#e2e8f0"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.2" />
              {/* Screen rear ball joint */}
              <circle cx="210" cy="65" r="9" fill={isDark ? "#1e293b" : "#94a3b8"} />

              {/* Monitor back cover frame */}
              <polygon points="150,55 210,5 270,55 210,105" fill={isDark ? "#132030" : "#cbd5e1"} stroke={isDark ? "#253b53" : "#94a3b8"} strokeWidth="1.5" />
              {/* Symmetrical core ventilation ridge */}
              <polygon points="195,45 210,20 225,45 210,75" fill={isDark ? "#1e293b" : "#f1f5f9"} stroke={isDark ? "#00f5b4" : "#0d9488"} strokeWidth="1" strokeOpacity="0.4" />
            </g>

            {/* ========================================================
                3. CENTRAL CPU SYSTEM PLATFORM & MOTHERBOARD (Pulsing trails)
               ======================================================== */}
            {/* Neon Green Circuit Tracks on table */}
            <g opacity="0.85">
              {/* Circuit line to DB Cylinders */}
              <path d="M350,215 L445,170 M445,170 L480,185" stroke={isDark ? "#00f5b4" : "#0d9488"} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3 M350 215 L445 170" />
              {/* Circuit line connecting monitors */}
              <path d="M210,140 L270,170 M270,170 L270,225" stroke={isDark ? "#22d3ee" : "#06b6d4"} strokeWidth="1.4" strokeLinecap="round" />
              {/* CPU ground trail circuit */}
              <path d="M350,295 L415,263 M415,263 L450,280" stroke={isDark ? "#00f5b4" : "#0dbc95"} strokeWidth="2" strokeLinecap="round" fill="none" className="animate-pulse" />
              <circle cx="450" cy="280" r="3" fill="#00f5b4" />
            </g>

            {/* Raised central motherboard module */}
            <g 
              onMouseEnter={() => setActiveElement("cpu")}
              onMouseLeave={() => setActiveElement(null)}
              className="cursor-pointer transition-all duration-300"
            >
              {/* Blue Isometric base */}
              <polygon points="230,220 330,160 490,240 390,300" fill="url(#motherboardGrad)" stroke={isDark ? "#22d3ee" : "#06b6d4"} strokeWidth="1.5" />
              {/* Motherboard thickness extrusion */}
              <polygon points="230,220 390,300 390,314 230,234" fill="#0a1a24" />
              <polygon points="490,240 390,300 390,314 490,254" fill="#061219" />

              {/* CENTRAL PROCESSOR CPU IN CENTER */}
              <g>
                {/* Microprocessor Base Plate */}
                <polygon points="295,212 365,170 425,200 355,242" fill="url(#cpuBaseGrad)" stroke={isDark ? "#00f5b4" : "#0d9488"} strokeWidth="1.2" />
                
                {/* Silicon CPU Core center socket chip */}
                <polygon points="320,208 360,185 398,204 358,227" fill={isDark ? "#040d12" : "#ffffff"} stroke={isDark ? "#e11d48" : "#ef4444"} strokeWidth="1.5" />
                
                {/* Circuit Grid matrix inside Processor socket */}
                <line x1="330" y1="202" x2="368" y2="221" stroke={isDark ? "#3b82f6" : "#2563eb"} strokeWidth="1" strokeOpacity="0.6" />
                <line x1="340" y1="196" x2="378" y2="215" stroke={isDark ? "#3b82f6" : "#2563eb"} strokeWidth="1" strokeOpacity="0.6" />
                <line x1="350" y1="190" x2="388" y2="209" stroke={isDark ? "#3b82f6" : "#2563eb"} strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2 2" />

                {/* GLOWING CPU PIN SENSORS EXTENDING (All four sides) */}
                {/* Left pins */}
                <g stroke={isDark ? "#00f5b4" : "#0d9488"} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" className="animate-pulse">
                  <line x1="285" y1="205" x2="295" y2="210" />
                  <line x1="295" y1="210" x2="305" y2="215" />
                  <line x1="305" y1="215" x2="315" y2="220" />
                  <line x1="315" y1="220" x2="325" y2="225" />
                  <line x1="325" y1="225" x2="335" y2="230" />
                </g>
                {/* Right pins */}
                <g stroke={isDark ? "#00f5b4" : "#0d9488"} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" className="animate-pulse">
                  <line x1="385" y1="218" x2="395" y2="223" />
                  <line x1="395" y1="223" x2="405" y2="228" />
                  <line x1="405" y1="228" x2="415" y2="233" />
                  <line x1="415" y1="233" x2="425" y2="238" />
                  <line x1="425" y1="238" x2="435" y2="243" />
                </g>
                {/* Top-Right pins */}
                <g stroke={isDark ? "#22d3ee" : "#22d3ee"} strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
                  <line x1="375" y1="175" x2="383" y2="179" />
                  <line x1="385" y1="180" x2="393" y2="184" />
                  <line x1="395" y1="185" x2="403" y2="189" />
                  <line x1="405" y1="190" x2="413" y2="194" />
                </g>
                {/* Top-Left pins */}
                <g stroke={isDark ? "#22d3ee" : "#22d3ee"} strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
                  <line x1="315" y1="190" x2="323" y2="186" />
                  <line x1="325" y1="185" x2="333" y2="181" />
                  <line x1="335" y1="180" x2="343" y2="176" />
                  <line x1="345" y1="175" x2="353" y2="171" />
                </g>
              </g>
            </g>

            {/* ========================================================
                4. THREE GLOWING DATABASE CYLINDERS (At Top Right)
               ======================================================== */}
            <g 
              onMouseEnter={() => setActiveElement("database")}
              onMouseLeave={() => setActiveElement(null)}
              className="cursor-pointer transition-all duration-300"
            >
              {/* Cylinders group */}
              {/* Base floor shadow */}
              <ellipse cx="380" cy="275" rx="16" ry="6" fill="black" fillOpacity="0.3" pointerEvents="none" />
              <ellipse cx="430" cy="305" rx="16" ry="6" fill="black" fillOpacity="0.3" pointerEvents="none" />
              <ellipse cx="480" cy="335" rx="16" ry="6" fill="black" fillOpacity="0.3" pointerEvents="none" />

              {/* Cylinder 1 (Left database) */}
              <g transform="translate(380, 205)">
                <path d="M-15,0 L-15,35 A15,6 0 0,0 15,35 L15,0 A15,6 0 0,0 -15,0 Z" fill="url(#dbCyl)" stroke={isDark ? "#223b44" : "#94a3b8"} strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="15" ry="6" fill="#00f5b4" fillOpacity="0.85" />
                <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#040d12" />
                {/* Luminous teal stripes */}
                <path d="M-15,12 A15,6 0 0,0 15,12" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="1" />
                <path d="M-15,22 A15,6 0 0,0 15,22" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="1" />
              </g>

              {/* Cylinder 2 (Middle database) */}
              <g transform="translate(430, 225)">
                <path d="M-15,0 L-15,35 A15,6 0 0,0 15,35 L15,0 A15,6 0 0,0 -15,0 Z" fill="url(#dbCyl)" stroke={isDark ? "#223b44" : "#94a3b8"} strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="15" ry="6" fill="#00f5b4" fillOpacity="0.85" />
                <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#040d12" />
                <path d="M-15,12 A15,6 0 0,0 15,12" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="1" />
                <path d="M-15,22 A15,6 0 0,0 15,22" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="1" />
              </g>

              {/* Cylinder 3 (Right database) */}
              <g transform="translate(480, 255)">
                <path d="M-15,0 L-15,35 A15,6 0 0,0 15,35 L15,0 A15,6 0 0,0 -15,0 Z" fill="url(#dbCyl)" stroke={isDark ? "#223b44" : "#94a3b8"} strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="15" ry="6" fill="#00f5b4" fillOpacity="0.85" />
                <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#040d12" />
                <path d="M-15,12 A15,6 0 0,0 15,12" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="1" />
                <path d="M-15,22 A15,6 0 0,0 15,22" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="1" />
              </g>

              {/* ASCENDING STREAM OF FLOATING BINARY CHARACTERS */}
              {/* Database 1 stream */}
              <g transform="translate(380, 160)" fontSize="9" fontFamily="monospace" fontWeight="extrabold" fill="#00f5b4" opacity="0.8">
                <text x="-8" y={-20 - (pulseCount % 3) * 6} fillOpacity={0.9}>0</text>
                <text x="4" y={-10 - (pulseCount % 3) * 6} fillOpacity={0.7} fill="#22d3ee">1</text>
                <text x="-2" y={0 - (pulseCount % 3) * 6} fillOpacity={0.5}>0</text>
                <text x="6" y={10 - (pulseCount % 3) * 6} fillOpacity={0.3} fill="#22d3ee">1</text>
                <text x="-6" y={20 - (pulseCount % 3) * 6} fillOpacity={0.1}>0</text>
              </g>
              
              {/* Database 2 stream */}
              <g transform="translate(430, 180)" fontSize="9" fontFamily="monospace" fontWeight="extrabold" fill="#00f5b4" opacity="0.8">
                <text x="2" y={-15 - ((pulseCount + 15) % 3) * 6} fillOpacity={0.9} fill="#22d3ee">1</text>
                <text x="-6" y={-5 - ((pulseCount + 15) % 3) * 6} fillOpacity={0.7}>0</text>
                <text x="8" y={5 - ((pulseCount + 15) % 3) * 6} fillOpacity={0.5} fill="#22d3ee">1</text>
                <text x="-4" y={15 - ((pulseCount + 15) % 3) * 6} fillOpacity={0.3}>0</text>
              </g>

              {/* Database 3 stream */}
              <g transform="translate(480, 210)" fontSize="9" fontFamily="monospace" fontWeight="extrabold" fill="#22d3ee" opacity="0.75">
                <text x="-4" y={-18 - ((pulseCount + 8) % 3) * 6} fillOpacity={0.9}>1</text>
                <text x="6" y={-8 - ((pulseCount + 8) % 3) * 6} fillOpacity={0.7} fill="#00f5b4">0</text>
                <text x="-8" y={2 - ((pulseCount + 8) % 3) * 6} fillOpacity={0.4}>1</text>
                <text x="2" y={12 - ((pulseCount + 8) % 3) * 6} fillOpacity={0.2} fill="#00f5b4">0</text>
              </g>
            </g>

            {/* ========================================================
                5. RIGHT ISOMETRIC MONITOR VIEWPORT & STAND
               ======================================================== */}
            <g 
              onMouseEnter={() => setActiveElement("right-monitor")}
              onMouseLeave={() => setActiveElement(null)}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
            >
              {/* Symmetrical screen pedestal plate */}
              <polygon points="440,260 480,240 520,260 480,280" fill={isDark ? "#2a3746" : "#cbd5e1"} stroke={isDark ? "#3b4a5d" : "#94a3b8"} strokeWidth="1" />
              <polygon points="440,260 480,240 480,245 440,265" fill={isDark ? "#0f172a" : "#64748b"} />
              <polygon points="520,260 480,280 480,285 520,265" fill={isDark ? "#0f172a" : "#64748b"} />
              <polygon points="440,265 480,285 520,265 480,245" fill={isDark ? "#172230" : "#f1f5f9"} stroke={isDark ? "#283849" : "#cbd5e1"} strokeWidth="1" />

              {/* Screen stand support column */}
              <rect x="474" y="200" width="12" height="50" rx="3" fill={isDark ? "#334155" : "#e2e8f0"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.2" />

              {/* Desktop Screen Outer Box Bezels facing left isometrically */}
              {/* Back chassis body */}
              <polygon points="420,155 500,110 500,175 420,220" fill={isDark ? "#0c1722" : "#cbd5e1"} stroke={isDark ? "#1f2a36" : "#64748b"} strokeWidth="1.5" />
              {/* Front Screen Glass Panel display */}
              <polygon points="425,158 495,115 495,170 425,213" fill={isDark ? "#080e14" : "#1e293b"} stroke={isDark ? "#1a2531" : "#475569"} strokeWidth="1" />

              {/* Synthesized Dashboard interface mock charts */}
              <g opacity="0.85">
                <line x1="435" y1="150" x2="455" y2="138" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <line x1="435" y1="160" x2="480" y2="134" stroke="#eab308" strokeWidth="1.5" />
                <line x1="435" y1="168" x2="475" y2="145" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="435" y1="176" x2="485" y2="147" stroke="#00f5b4" strokeWidth="1.5" strokeDasharray="3 3 M435 176 L485 147" />
                <line x1="435" y1="184" x2="465" y2="167" stroke="#22d3ee" strokeWidth="1.5" />
                <line x1="435" y1="192" x2="455" y2="180" stroke="#ef4444" strokeWidth="1.5" />
              </g>

              {/* Interactive tag `</>` below screen */}
              <text x="460" y="196" fill="#00f5b4" fontSize="10" fontFamily="sans-serif" transform="rotate(-30, 460, 196)" fontWeight="extrabold">&lt;/&gt;</text>
            </g>

            {/* ========================================================
                6. LEFT-FRONT INTERACTIVE CODE BOARD ENGINE (Main terminal)
               ======================================================== */}
            <g 
              onMouseEnter={() => setActiveElement("code-screen")}
              onMouseLeave={() => setActiveElement(null)}
              className="cursor-pointer transition-all duration-300"
            >
              {/* Main code editor box stand support plate on floor */}
              <polygon points="120,380 280,300 280,312 120,392" fill={isDark ? "#172332" : "#94a3b8"} stroke={isDark ? "#283a4f" : "#cbd5e1"} strokeWidth="1" />
              <polygon points="280,300 440,380 440,392 280,312" fill={isDark ? "#0f1722" : "#64748b"} />
              <polygon points="120,392 280,312 440,392 280,412" fill={isDark ? "#233346" : "#cbd5e1"} stroke={isDark ? "#384d64" : "#94a3b8"} strokeWidth="1" />

              {/* Symmetrical screen standing console base */}
              <polygon points="150,290 280,210 410,290 280,370" fill={isDark ? "#0c151e" : "#f8fafc"} stroke={isDark ? "#1a2c3d" : "#e2e8f0"} strokeWidth="2" />
              {/* Glass layout layer display */}
              <polygon points="155,290 280,213 405,290 280,367" fill={isDark ? "#070c12" : "#ffffff"} stroke={isDark ? "#22d3ee" : "#0d9488"} strokeWidth="1.5" />

              {/* Syntax highlighting lines representing lines of React/TS code */}
              <g opacity="0.9">
                <line x1="175" y1="284" x2="215" y2="260" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="175" y1="295" x2="265" y2="241" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <line x1="175" y1="305" x2="285" y2="239" stroke="#00f5b4" strokeWidth="2" strokeLinecap="round" />
                <line x1="185" y1="316" x2="255" y2="274" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
                <line x1="195" y1="326" x2="285" y2="272" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                <line x1="195" y1="337" x2="315" y2="265" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <line x1="185" y1="348" x2="265" y2="300" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <line x1="175" y1="358" x2="225" y2="328" stroke="#00f5b4" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* `</>` indicator inside of code panel */}
              <text x="250" y="328" fill="#22d3ee" fontSize="12" fontFamily="monospace" fontWeight="black" transform="rotate(-30, 250, 328)">&lt;/&gt;</text>
            </g>

            {/* ========================================================
                7. FLOATING TRANSLUCENT SATELLITE HUD PANELS
               ======================================================== */}
            {/* Panel 1: Gear (Top left floating) */}
            <motion.g 
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="cursor-pointer"
            >
              <polygon points="144,180 192,152 240,180 192,208" fill="#15b89a" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
              {/* Gears inside */}
              <circle cx="192" cy="180" r="10" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" fill="none" />
              <circle cx="192" cy="180" r="4" fill="#ffffff" />
            </motion.g>

            {/* Panel 2: Curly Braces `{}` (Bottom Left floating) */}
            <motion.g 
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="cursor-pointer"
            >
              <polygon points="100,265 158,231 216,265 158,299" fill="#00f5b4" fillOpacity="0.85" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
              {/* Curly braces `{}` */}
              <text x="145" y="272" fill="#ffffff" fontSize="20" fontFamily="monospace" transform="rotate(-30, 145, 272)" fontWeight="black">{"{"}</text>
              <text x="160" y="264" fill="#ffffff" fontSize="20" fontFamily="monospace" transform="rotate(-30, 160, 264)" fontWeight="black">{"}"}</text>
            </motion.g>

            {/* Panel 3: Closing tags `</>` (Bottom right floating of console) */}
            <motion.g 
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="cursor-pointer"
            >
              <polygon points="240,300 298,266 356,300 298,334" fill="#00f5b4" fillOpacity="0.85" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
              <text x="282" y="306" fill="#ffffff" fontSize="16" fontFamily="monospace" transform="rotate(-30, 282, 306)" fontWeight="black">&lt;/&gt;</text>
            </motion.g>

          </svg>

        </div>

    </div>
  );
}
